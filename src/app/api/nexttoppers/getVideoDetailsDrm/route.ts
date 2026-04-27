import { NextRequest } from "next/server";
import { proxyGet, optionsResponse } from "@/lib/proxy";

export async function GET(req: NextRequest) {
  return proxyGet(req, "/api/nexttoppers/getVideoDetailsDrm");
}

export function OPTIONS() {
  return optionsResponse();
}
