import { NextRequest, NextResponse } from "next/server";

const UPSTREAM = "https://apiserverpro.vercel.app";
const REVALIDATE_SECONDS = 60;

export async function proxyGet(req: NextRequest, path: string) {
  const qs = req.nextUrl.search;
  const url = `${UPSTREAM}${path}${qs}`;
  try {
    const res = await fetch(url, {
      headers: forwardHeaders(req),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    return relay(res, true);
  } catch (e) {
    return errorResponse(e);
  }
}

export async function proxyPost(req: NextRequest, path: string) {
  const qs = req.nextUrl.search;
  const url = `${UPSTREAM}${path}${qs}`;
  let body: string | undefined;
  try {
    body = await req.text();
  } catch {
    body = undefined;
  }
  const cacheKey = `${url}:${body ?? ""}`;
  const cached = postCache.get(cacheKey);
  if (cached && Date.now() - cached.ts < REVALIDATE_SECONDS * 1000) {
    return new NextResponse(cached.body, {
      status: cached.status,
      headers: {
        "Content-Type": cached.ct,
        ...corsHeaders,
        "X-Cache": "HIT",
        "X-Cache-Age": String(Math.floor((Date.now() - cached.ts) / 1000)),
      },
    });
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        ...forwardHeaders(req),
        "Content-Type": "application/json",
      },
      body: body || undefined,
      cache: "no-store",
    });
    const ct = res.headers.get("content-type") || "application/json";
    const buf = await res.arrayBuffer();
    postCache.set(cacheKey, {
      body: buf,
      status: res.status,
      ct,
      ts: Date.now(),
    });
    return new NextResponse(buf, {
      status: res.status,
      headers: { "Content-Type": ct, ...corsHeaders, "X-Cache": "MISS" },
    });
  } catch (e) {
    return errorResponse(e);
  }
}

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface PostCacheEntry {
  body: ArrayBuffer;
  status: number;
  ct: string;
  ts: number;
}

const postCache = new Map<string, PostCacheEntry>();

function forwardHeaders(req: NextRequest): Record<string, string> {
  const h: Record<string, string> = {};
  const skip = new Set([
    "host",
    "connection",
    "transfer-encoding",
    "content-length",
  ]);
  req.headers.forEach((v, k) => {
    if (!skip.has(k.toLowerCase())) h[k] = v;
  });
  return h;
}

async function relay(upstream: Response, cached: boolean) {
  const ct = upstream.headers.get("content-type") || "application/json";
  const body = await upstream.arrayBuffer();
  return new NextResponse(body, {
    status: upstream.status,
    headers: {
      "Content-Type": ct,
      ...corsHeaders,
      "X-Cache": cached ? "REVALIDATE" : "BYPASS",
      "Cache-Control": `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=${REVALIDATE_SECONDS * 2}`,
    },
  });
}

function errorResponse(e: unknown) {
  const msg = e instanceof Error ? e.message : "Unknown proxy error";
  return NextResponse.json(
    { success: false, error: msg },
    { status: 502, headers: { ...corsHeaders } }
  );
}

export function optionsResponse() {
  return new NextResponse(null, {
    status: 204,
    headers: { ...corsHeaders },
  });
}

export function getCacheStats() {
  return {
    postCacheSize: postCache.size,
    revalidateSeconds: REVALIDATE_SECONDS,
    entries: Array.from(postCache.entries()).map(([key, entry]) => ({
      key: key.length > 120 ? key.slice(0, 120) + "..." : key,
      status: entry.status,
      ageSeconds: Math.floor((Date.now() - entry.ts) / 1000),
    })),
  };
}
