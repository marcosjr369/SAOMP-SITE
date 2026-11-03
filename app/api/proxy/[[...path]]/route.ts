import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_SECONDS,
  ADMIN_TOKEN_COOKIE,
  copyBackendCookies,
  extractBackendToken,
  getBackendHeaders,
  removeBackendTokens,
} from "@/lib/admin-backend";
import {
  forwardBackendRequest,
  ProxyConfigurationError,
  sanitizePublicMembers,
  type ProxyTarget,
} from "@/lib/backend-proxy";

type RouteContext = { params: Promise<{ path?: string[] }> };

function jsonResponse(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function proxyFailure(error: unknown) {
  if (error instanceof ProxyConfigurationError) {
    return jsonResponse(
      { message: `Configuração da proxy em falta: ${error.message}.` },
      503,
    );
  }
  return jsonResponse(
    { message: "Não foi possível contactar o servidor." },
    502,
  );
}

function clearAdminSession(request: NextRequest) {
  const response = jsonResponse({ authenticated: false });
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

async function handleAdminLogin(request: NextRequest) {
  let credentials: { email?: unknown; password?: unknown };
  try {
    credentials = await request.json();
  } catch {
    return jsonResponse({ message: "Informe o email e a palavra-passe." }, 400);
  }

  if (
    typeof credentials.email !== "string" ||
    typeof credentials.password !== "string" ||
    !credentials.email.trim() ||
    !credentials.password
  ) {
    return jsonResponse({ message: "Informe o email e a palavra-passe." }, 400);
  }

  const upstream = await forwardBackendRequest({
    target: "api",
    path: ["admin", "login"],
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: credentials.email.trim(),
      password: credentials.password,
    }),
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
}

async function proxyRequest(
  request: NextRequest,
  context: RouteContext,
  method: string,
) {
  const { path = [] } = await context.params;
  const isAdminLogin =
    path.length === 2 && path[0] === "admin" && path[1] === "login";

  if (isAdminLogin) {
    if (method === "POST") {
      try {
        return await handleAdminLogin(request);
      } catch (error) {
        return proxyFailure(error);
      }
    }
    if (method === "DELETE") return clearAdminSession(request);
    return jsonResponse({ message: "Método não permitido." }, 405);
  }

  const target: ProxyTarget =
    request.headers.get("x-proxy-base") === "api" ? "api" : "backend";
  const isPublicApiRead =
    target === "api" && method === "GET" && path.length === 0;
  const isPublicRegistration =
    target === "api" && path.length === 0 && method === "POST";
  const publicApiRoot = target === "api" && path.length === 0;

  if (
    !isPublicApiRead &&
    !isPublicRegistration &&
    !request.cookies.has(ADMIN_SESSION_COOKIE)
  ) {
    return jsonResponse(
      { message: "Sessão administrativa inválida ou expirada." },
      401,
    );
  }

  try {
    const headers = getBackendHeaders(request);
    const contentType = request.headers.get("content-type");
    if (contentType) headers.set("Content-Type", contentType);

    const upstream = await forwardBackendRequest({
      target,
      path,
      method,
      headers,
      body:
        method === "GET" || method === "HEAD"
          ? undefined
          : await request.arrayBuffer(),
      search: request.nextUrl.search,
    });
    const responseContentType = upstream.headers.get("content-type") ?? "";

    if (responseContentType.includes("application/json")) {
      const body = await upstream.text();
      let data: unknown;
      try {
        data = JSON.parse(body);
      } catch {
        data = { message: "O servidor devolveu uma resposta inválida." };
      }

      if (publicApiRoot && method === "GET" && upstream.ok) {
        const sanitizedMembers = sanitizePublicMembers(data);
        if (!sanitizedMembers) {
          return jsonResponse(
            { message: "O servidor devolveu uma lista de membros inválida." },
            502,
          );
        }
        data = sanitizedMembers;
      }

      const response =
        upstream.status === 204 || upstream.status === 304
          ? new NextResponse(null, { status: upstream.status })
          : NextResponse.json(data, { status: upstream.status });
      response.headers.set("Cache-Control", "no-store");
      copyBackendCookies(upstream.headers, response);
      return response;
    }

    const buffer = await upstream.arrayBuffer();
    const response = new NextResponse(
      method === "HEAD" || upstream.status === 204 || upstream.status === 304
        ? null
        : buffer,
      {
        status: upstream.status,
        headers: {
          "Content-Type": responseContentType || "application/octet-stream",
          "Content-Disposition":
            (upstream.headers.get("content-disposition") ?? "").replace(
              /attachment/i,
              "inline",
            ) || "inline",
          "Cache-Control": "no-store",
        },
      },
    );
    copyBackendCookies(upstream.headers, response);
    return response;
  } catch (error) {
    console.error("[proxy] request failed:", error);
    return proxyFailure(error);
  }
}

export function GET(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context, "GET");
}

export function POST(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context, "POST");
}

export function PUT(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context, "PUT");
}

export function PATCH(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context, "PATCH");
}

export function DELETE(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context, "DELETE");
}

export function HEAD(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context, "HEAD");
}
