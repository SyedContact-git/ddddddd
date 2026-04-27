import { NextRequest } from "next/server";
import { proxyPost, optionsResponse } from "@/lib/proxy";

export async function POST(req: NextRequest) {
  return proxyPost(req, "/api/pw/verify");
}

export function OPTIONS() {
  return optionsResponse();
}
