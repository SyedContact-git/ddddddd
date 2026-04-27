import { NextRequest, NextResponse } from "next/server";

const UPSTREAM = "https://apiserverpro.vercel.app";

export async function proxyGet(req: NextRequest, path: string) {
  const qs = req.nextUrl.search;
  const url = `${UPSTREAM}${path}${qs}`;
  try {
    const res = await fetch(url, {
      headers: forwardHeaders(req),
      cache: "no-store",
    });
    return relay(res);
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
    return relay(res);
  } catch (e) {
    return errorResponse(e);
  }
}

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

async function relay(upstream: Response) {
  const ct = upstream.headers.get("content-type") || "application/json";
  const body = await upstream.arrayBuffer();
  return new NextResponse(body, {
    status: upstream.status,
    headers: {
      "Content-Type": ct,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

function errorResponse(e: unknown) {
  const msg = e instanceof Error ? e.message : "Unknown proxy error";
  return NextResponse.json(
    { success: false, error: msg },
    {
      status: 502,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

export function optionsResponse() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
