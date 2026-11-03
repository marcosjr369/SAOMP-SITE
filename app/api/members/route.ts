import { NextResponse } from "next/server";

const MEMBERS_API_URL = "https://saomp-back.vercel.app/api";

type MemberRecord = Record<string, unknown>;

function getMembers(data: unknown): MemberRecord[] {
  const list = Array.isArray(data)
    ? data
    : data &&
        typeof data === "object" &&
        "members" in data &&
        Array.isArray(data.members)
      ? data.members
      : [];

  return list.filter(
    (member): member is MemberRecord =>
      Boolean(member) && typeof member === "object" && !Array.isArray(member),
  );
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export async function GET() {
  try {
    const upstream = await fetch(MEMBERS_API_URL, { cache: "no-store" });
    const data: unknown = await upstream.json().catch(() => null);

    if (!upstream.ok) {
      const message =
        data &&
        typeof data === "object" &&
        "message" in data &&
        typeof data.message === "string"
          ? data.message
          : `O servidor respondeu com o erro ${upstream.status}.`;
      return NextResponse.json(
        { message },
        { status: upstream.status, headers: { "Cache-Control": "no-store" } },
      );
    }

    const members = getMembers(data).map((member) => ({
      _id: asString(member._id),
      nome: asString(member.nome),
      genero: asString(member.genero),
      obra: asString(member.obra),
      vigararia: asString(member.vigararia),
      paroquia: asString(member.paroquia),
      anoAdmissao: asString(member.anoAdmissao),
      tipoMembro: asString(member.tipoMembro),
    }));

    return NextResponse.json(members, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      {
        message:
          "Não foi possível ligar ao servidor. Verifique a sua ligação à internet.",
      },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
