"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { ArrowRight, KeyRound, LoaderCircle, ShieldCheck } from "lucide-react";

export default function AdminAccessPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const responseText = await response.text();
      let body: { message?: string; error?: { message?: string } } | null = null;
      try {
        body = JSON.parse(responseText);
      } catch {
        body = null;
      }
      if (!response.ok) {
        throw new Error(
          body?.message ||
            body?.error?.message ||
            responseText ||
            "Não foi possível iniciar sessão.",
        );
      }
      window.location.replace("/admin/membros");
    } catch (loginError) {
      setError(
        loginError instanceof TypeError
          ? "Sem ligação ao servidor. Tente novamente."
          : loginError instanceof Error
            ? loginError.message
            : "Ocorreu um erro ao iniciar sessão.",
      );
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#f0f2ec] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[min(680px,calc(100svh-168px))] w-full max-w-5xl overflow-hidden border border-gray-200 bg-white shadow-[0_24px_70px_-45px_rgb(0_0_0/0.4)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative flex min-h-64 flex-col justify-between overflow-hidden bg-[#101915] p-7 text-white sm:p-10 lg:p-12">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full border border-white/10" />
          <div className="relative flex items-center gap-3">
            <span className="relative h-11 w-11 overflow-hidden rounded-lg bg-white">
              <Image src="/logo.jpeg" alt="SAOMP" fill sizes="44px" className="object-cover" />
            </span>
            <span>
              <span className="block font-display text-xl font-semibold">SAOMP</span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-white/55">Área reservada</span>
            </span>
          </div>
          <div className="relative mt-10 max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e2d800]">
              Administração
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Gestão de membros
            </h1>
            <div className="mt-6 h-1 w-14 bg-[#fef200]" />
          </div>
          <p className="relative mt-10 flex items-center gap-2 text-xs text-white/55">
            <ShieldCheck size={15} /> Acesso restrito
          </p>
        </div>

        <div className="flex items-center px-6 py-10 sm:px-10 lg:px-12">
          <form onSubmit={submit} className="mx-auto w-full max-w-sm">
            <span className="grid h-11 w-11 place-items-center bg-[#f2f3ec] text-gray-800">
              <KeyRound size={19} />
            </span>
            <h2 className="mt-6 font-display text-3xl font-semibold text-gray-950">
              Entrar no painel
            </h2>
            <p className="mt-2 text-sm text-gray-500">Entre com as credenciais da sua conta administradora.</p>

            <label htmlFor="admin-email" className="mt-8 block text-sm font-medium text-gray-800">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              autoFocus
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 h-12 w-full border border-gray-300 bg-white px-3 text-sm text-gray-950 outline-none transition focus:border-gray-950"
            />

            <label htmlFor="admin-password" className="mt-5 block text-sm font-medium text-gray-800">
              Palavra-passe
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 h-12 w-full border border-gray-300 bg-white px-3 text-sm text-gray-950 outline-none transition focus:border-gray-950"
            />

            {error && (
              <p role="alert" className="mt-3 border-l-2 border-red-600 bg-red-50 px-3 py-2 text-sm text-red-800">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 bg-gray-950 px-4 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? <LoaderCircle size={17} className="animate-spin" /> : <ArrowRight size={17} />}
              {loading ? "A validar..." : "Aceder"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}