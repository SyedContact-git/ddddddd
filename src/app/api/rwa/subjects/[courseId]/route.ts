import { NextRequest } from "next/server";
import { proxyGet, optionsResponse } from "@/lib/proxy";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await params;
  return proxyGet(req, `/api/rwa/subjects/${encodeURIComponent(courseId)}`);
}

export function OPTIONS() {
  return optionsResponse();
}
