import type { NextRequest, NextResponse } from "next/server";

export const ADMIN_SESSION_COOKIE = "saomp_admin_session";
export const ADMIN_TOKEN_COOKIE = "saomp_admin_token";
export const ADMIN_SESSION_SECONDS = 60 * 60 * 8;
export const ADMIN_API_URL = "https://saomp-back.vercel.app/api";

const tokenKeys = new Set(["token", "accessToken", "access_token", "jwt"]);

export function extractBackendToken(value: unknown): string | null {
  if (!value || typeof value !== "object") return null;
  if (Array.isArray(value)) {
    for (const item of value) {
      const token = extractBackendToken(item);
      if (token) return token;
    }
    return null;
  }

  for (const [key, nested] of Object.entries(value)) {
    if (tokenKeys.has(key) && typeof nested === "string") return nested;
    const token = extractBackendToken(nested);
    if (token) return token;
  }
  return null;
}

export function removeBackendTokens(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(removeBackendTokens);
  if (!value || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !tokenKeys.has(key))
      .map(([key, nested]) => [key, removeBackendTokens(nested)]),
  );
}

export function getBackendHeaders(request: NextRequest) {
  const headers = new Headers({ Accept: "application/json" });
  const token = request.cookies.get(ADMIN_TOKEN_COOKIE)?.value;
  const forwardedCookies = request.cookies
    .getAll()
    .filter(({ name }) => name !== ADMIN_SESSION_COOKIE && name !== ADMIN_TOKEN_COOKIE)
    .map(({ name, value }) => `${name}=${value}`);

  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (forwardedCookies.length) headers.set("Cookie", forwardedCookies.join("; "));
  return headers;
}

export function copyBackendCookies(source: Headers, response: NextResponse) {
  const cookies = source.getSetCookie?.() ?? [];
  for (const cookie of cookies) {
    const attributes = cookie
      .split(";")
      .map((attribute) => attribute.trim())
      .filter((attribute) => {
        const lower = attribute.toLowerCase();
        return !lower.startsWith("domain=") && !lower.startsWith("path=");
      })
      .filter((attribute) => process.env.NODE_ENV === "production" || attribute.toLowerCase() !== "secure")
      .map((attribute) =>
        process.env.NODE_ENV !== "production" && attribute.toLowerCase() === "samesite=none"
          ? "SameSite=Lax"
          : attribute,
      );
    attributes.push("Path=/");
    response.headers.append("Set-Cookie", attributes.join("; "));
  }
}