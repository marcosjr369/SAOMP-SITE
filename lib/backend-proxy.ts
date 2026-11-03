export type ProxyTarget = "api" | "backend";

export class ProxyConfigurationError extends Error {
  constructor(variable: string) {
    super(`${variable} is not configured`);
    this.name = "ProxyConfigurationError";
  }
}

type MemberRecord = Record<string, unknown>;

const PUBLIC_MEMBER_FIELDS = [
  "_id",
  "nome",
  "genero",
  "obra",
  "vigararia",
  "paroquia",
  "anoAdmissao",
  "tipoMembro",
] as const;

type ForwardBackendRequestOptions = {
  target: ProxyTarget;
  path: string[];
  method: string;
  headers?: HeadersInit;
  body?: BodyInit;
  search?: string;
};

export async function forwardBackendRequest({
  target,
  path,
  method,
  headers: requestHeaders,
  body,
  search = "",
}: ForwardBackendRequestOptions): Promise<Response> {
  const envName = target === "api" ? "API_URL" : "BACKEND_SERVER";
  const baseUrl = process.env[envName]?.replace(/\/+$/, "");

  if (!baseUrl) throw new ProxyConfigurationError(envName);

  const pathSegments = path.map((segment) => {
    if (
      !segment ||
      segment === "." ||
      segment === ".." ||
      /[\\/]/.test(segment)
    ) {
      throw new Error("Invalid proxy path");
    }
    return encodeURIComponent(segment);
  });
  const url = `${baseUrl}${pathSegments.length ? `/${pathSegments.join("/")}` : ""}${search}`;
  const headers = new Headers(requestHeaders);

  if (!headers.has("Accept")) headers.set("Accept", "application/json");

  const normalizedMethod = method.toUpperCase();
  return fetch(url, {
    method: normalizedMethod,
    headers,
    body:
      normalizedMethod === "GET" || normalizedMethod === "HEAD"
        ? undefined
        : body,
    cache: "no-store",
  });
}

export function sanitizePublicMembers(data: unknown): unknown[] | null {
  const list = Array.isArray(data)
    ? data
    : data &&
        typeof data === "object" &&
        "members" in data &&
        Array.isArray(data.members)
      ? data.members
      : data &&
          typeof data === "object" &&
          "data" in data &&
          Array.isArray(data.data)
        ? data.data
        : null;

  if (!list) return null;

  return list
    .filter(
      (member): member is MemberRecord =>
        Boolean(member) && typeof member === "object" && !Array.isArray(member),
    )
    .map((member) =>
      Object.fromEntries(
        PUBLIC_MEMBER_FIELDS.filter((field) => field in member).map((field) => [
          field,
          member[field],
        ]),
      ),
    );
}
