import { NextResponse, type NextRequest } from "next/server";
const BYPASS_COOKIE = "saomp_acesso";

const maintenanceHtml = `<!doctype html>
<html lang="pt">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex" />
  <title>SAOMP - Em breve</title>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body {
      min-height: 100vh; display: flex; align-items: center; justify-content: center;
      padding: 24px; background: #fbfbf8; color: #111827; text-align: center;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    }
    img { width: 96px; height: 96px; border-radius: 50%; object-fit: cover; }
    h1 { margin-top: 24px; font-size: 1.75rem; font-weight: 600; }
    p { margin-top: 12px; max-width: 28rem; color: #4b5563; line-height: 1.6; }
    .bar { width: 64px; height: 4px; margin: 24px auto 0; border-radius: 9999px; background: #eab308; }
  </style>
</head>
<body>
  <div>
    <img src="/logo.jpeg" alt="SAOMP" />
    <h1>Site em construção</h1>
    <p>O site do Secretariado Arquidiocesano das Obras Missionárias Pontifícias estará disponível em breve.</p>
    <div class="bar"></div>
  </div>
</body>
</html>`;

export function proxy(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "1") return NextResponse.next();

  const bypassKey = process.env.MAINTENANCE_BYPASS_KEY;

  if (bypassKey) {
    const queryKey = request.nextUrl.searchParams.get("acesso");

    if (queryKey === bypassKey) {
      const url = request.nextUrl.clone();
      url.searchParams.delete("acesso");
      const response = NextResponse.redirect(url);
      response.cookies.set(BYPASS_COOKIE, bypassKey, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
      });
      return response;
    }

    if (request.cookies.get(BYPASS_COOKIE)?.value === bypassKey) {
      return NextResponse.next();
    }
  }

  return new NextResponse(maintenanceHtml, {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Retry-After": "86400",
      "Cache-Control": "no-store",
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.[a-zA-Z0-9]+$).*)"],
};
