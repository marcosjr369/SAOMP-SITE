export type ProxyBase = "api" | "backend";

export function backendProxyUrl(path: string[] = []) {
  const suffix = path.map((segment) => encodeURIComponent(segment)).join("/");
  return suffix ? `/api/proxy/${suffix}` : "/api/proxy";
}

export function backendProxyHeaders(target: ProxyBase, init?: HeadersInit) {
  const headers = new Headers(init);
  headers.set("x-proxy-base", target);
  return headers;
}
