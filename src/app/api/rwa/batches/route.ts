import { NextRequest } from "next/server";
import { proxyGet, proxyPost, optionsResponse } from "@/lib/proxy";

export async function GET(req: NextRequest) {
  return proxyGet(req, "/api/rwa/batches");
}

export async function POST(req: NextRequest) {
  return proxyPost(req, "/api/rwa/batches");
}

export function OPTIONS() {
  return optionsResponse();
}
