import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_API_URL,
  ADMIN_SESSION_COOKIE,
  copyBackendCookies,
  getBackendHeaders,
} from "@/lib/admin-backend";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  if (!request.cookies.has(ADMIN_SESSION_COOKIE)) {
    return NextResponse.json(
      { message: "Sessão administrativa inválida ou expirada." },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  const { id } = await context.params;
  try {
    const upstream = await fetch(
      `${ADMIN_API_URL}/admin/members/${encodeURIComponent(id)}/verify`,
      {
        method: "PATCH",
        headers: getBackendHeaders(request),
        cache: "no-store",
      },
    );
    const response = new NextResponse(await upstream.text() || null, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("content-type") || "application/json",
        "Cache-Control": "no-store",
      },
    });
    copyBackendCookies(upstream.headers, response);
    return response;
  } catch {
    return NextResponse.json(
      { message: "Não foi possível contactar o serviço de membros." },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}