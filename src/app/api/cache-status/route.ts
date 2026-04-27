import { NextResponse } from "next/server";
import { getCacheStats } from "@/lib/proxy";

export const dynamic = "force-dynamic";

export async function GET() {
  const stats = getCacheStats();
  return NextResponse.json(
    {
      success: true,
      cache: {
        strategy: "auto-revalidate",
        refreshIntervalSeconds: stats.revalidateSeconds,
        description:
          "GET requests use Next.js Data Cache with automatic revalidation every 60s. POST requests use in-memory cache with 60s TTL.",
        postCache: {
          size: stats.postCacheSize,
          entries: stats.entries,
        },
      },
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store",
      },
    }
  );
}
