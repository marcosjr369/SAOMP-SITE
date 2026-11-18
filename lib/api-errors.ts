/**
 * Tradução dos erros do servidor em mensagens claras para quem usa o site.
 */

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export type StatusMessages = Partial<Record<number, string>>;

const NETWORK_MESSAGE =
  "Não foi possível ligar ao servidor. Verifique a sua ligação à internet e tente novamente.";

const SERVER_MESSAGE =
  "O serviço está temporariamente indisponível. Tente novamente dentro de alguns minutos.";

const DEFAULT_STATUS_MESSAGES: Record<number, string> = {
  400: "Alguns dados não são válidos. Verifique o formulário e tente novamente.",
  401: "A sua sessão terminou. Entre novamente para continuar.",
  403: "Não tem permissão para fazer esta ação.",
  404: "O registo pedido não foi encontrado.",
  408: "O servidor demorou demasiado a responder. Tente novamente.",
  409: "Já existe um registo com estes dados.",
  413: "Os dados enviados são demasiado grandes.",
  422: "Alguns dados não são válidos. Verifique o formulário e tente novamente.",
  429: "Demasiadas tentativas seguidas. Aguarde um momento e tente novamente.",
};

/** Mensagens técnicas que nunca devem chegar ao utilizador. */
const TECHNICAL_PATTERN =
  /objectid|cast to|validation failed|stack|exception|undefined|null|econn|etimedout|enotfound|fetch failed|is not configured|internal server error|bad gateway|service unavailable|syntaxerror|typeerror|referenceerror|mongo|prisma|sql|jwt|token/i;

/** Erros técnicos com um significado conhecido. */
const KNOWN_PATTERNS: [RegExp, string][] = [
  [/e11000|duplicate key|already exists/i, DEFAULT_STATUS_MESSAGES[409]],
  [
    /jwt expired|token expired|invalid token|jwt malformed/i,
    DEFAULT_STATUS_MESSAGES[401],
  ],
];

function pickMessage(body: unknown): string | null {
  if (typeof body === "string") return body;
  if (!body || typeof body !== "object") return null;

  const record = body as Record<string, unknown>;
  for (const key of ["message", "error", "msg", "detail"]) {
    const value = record[key];
    if (typeof value === "string") return value;
    if (value && typeof value === "object") {
      const nested = pickMessage(value);
      if (nested) return nested;
    }
  }

  if (Array.isArray(record.errors)) {
    for (const item of record.errors) {
      const nested = pickMessage(item);
      if (nested) return nested;
    }
  }
  return null;
}

function friendlyBackendMessage(body: unknown, status: number): string | null {
  const raw = pickMessage(body)?.trim();
  if (!raw) return null;

  for (const [pattern, replacement] of KNOWN_PATTERNS) {
    if (pattern.test(raw)) return replacement;
  }

  if (status >= 500) return null;
  if (raw.length > 200 || /[{}<>]/.test(raw) || TECHNICAL_PATTERN.test(raw)) {
    return null;
  }
  return raw.endsWith(".") || raw.endsWith("!") || raw.endsWith("?")
    ? raw
    : `${raw}.`;
}

/**
 * Lê uma resposta de erro do servidor e devolve um `ApiError` com uma
 * mensagem amigável. As mensagens em `overrides` têm prioridade sobre as
 * do servidor para o estado correspondente.
 */
export async function readApiError(
  response: Response,
  overrides: StatusMessages = {},
): Promise<ApiError> {
  const text = await response.text().catch(() => "");
  let body: unknown = text;
  try {
    body = JSON.parse(text);
  } catch {
    // corpo em texto simples
  }
  return createApiError(response.status, body, overrides);
}

export function createApiError(
  status: number,
  body: unknown,
  overrides: StatusMessages = {},
): ApiError {
  const message =
    overrides[status] ??
    friendlyBackendMessage(body, status) ??
    DEFAULT_STATUS_MESSAGES[status] ??
    (status >= 500
      ? SERVER_MESSAGE
      : "Não foi possível concluir o pedido. Tente novamente.");
  return new ApiError(message, status);
}

/** Converte qualquer erro apanhado num `catch` numa mensagem para o ecrã. */
export function errorMessage(
  error: unknown,
  fallback = "Ocorreu um erro inesperado. Tente novamente.",
): string {
  if (error instanceof TypeError) return NETWORK_MESSAGE;
  if (error instanceof DOMException && error.name === "AbortError") {
    return "O pedido foi cancelado. Tente novamente.";
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}
