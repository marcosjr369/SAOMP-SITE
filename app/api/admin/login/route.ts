import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_API_URL,
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_SECONDS,
  ADMIN_TOKEN_COOKIE,
  copyBackendCookies,
  extractBackendToken,
  removeBackendTokens,
} from "@/lib/admin-backend";

export async function POST(request: NextRequest) {
  let credentials: { email?: unknown; password?: unknown };
  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Informe o email e a palavra-passe." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (
    typeof credentials.email !== "string" ||
    typeof credentials.password !== "string" ||
    !credentials.email.trim() ||
    !credentials.password
  ) {
    return NextResponse.json(
      { message: "Informe o email e a palavra-passe." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const upstream = await fetch(`${ADMIN_API_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        email: credentials.email.trim(),
        password: credentials.password,
      }),
      cache: "no-store",
    });
    const upstreamBody = await upstream.text();
    let responseBody = upstreamBody;
    let token: string | null = null;

    try {
      const parsed: unknown = JSON.parse(upstreamBody);
      token = extractBackendToken(parsed);
      responseBody = JSON.stringify(removeBackendTokens(parsed));
    } catch {
      responseBody = upstreamBody;
    }

    const headers = new Headers({ "Cache-Control": "no-store" });
    const contentType = upstream.headers.get("content-type");
    if (contentType) headers.set("Content-Type", contentType);
    const response = new NextResponse(responseBody || null, {
      status: upstream.status,
      headers,
    });

    copyBackendCookies(upstream.headers, response);
    if (upstream.ok) {
      response.cookies.set(ADMIN_SESSION_COOKIE, "1", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: ADMIN_SESSION_SECONDS,
      });
      if (token) {
        response.cookies.set(ADMIN_TOKEN_COOKIE, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: ADMIN_SESSION_SECONDS,
        });
      }
    }
    return response;
  } catch {
    return NextResponse.json(
      { message: "Não foi possível contactar o servidor de autenticação." },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.json(
    { authenticated: false },
    { headers: { "Cache-Control": "no-store" } },
  );
  for (const name of [ADMIN_SESSION_COOKIE, ADMIN_TOKEN_COOKIE]) {
    response.cookies.set(name, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });
  }
  for (const { name } of request.cookies.getAll()) {
    if (name.startsWith("saomp_admin_")) {
      response.cookies.set(name, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 0,
      });
    }
  }
  return response;
}