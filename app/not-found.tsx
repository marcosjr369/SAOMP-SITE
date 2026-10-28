import Link from "next/link";
import { FileText, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fbfbf8] px-6 pt-[76px]">
      <div className="bg-dots absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="relative max-w-lg text-center">
        <p className="font-display text-[8rem] md:text-[10rem] font-semibold leading-none tracking-tight text-gray-950">
          4<span className="text-yellow-500 [-webkit-text-stroke:3px_#1c1a00]">0</span>4
        </p>

        <h1 className="mt-2 text-2xl font-semibold text-gray-950">
          Página não encontrada
        </h1>

        <p className="mt-3 text-gray-600 leading-relaxed">
          A página que estás a procurar não existe, foi removida ou o endereço
          foi digitado incorretamente.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-yellow-500 px-6 py-3 font-semibold transition-colors hover:bg-yellow-400"
          >
            <Home size={18} />
            Voltar ao Início
          </Link>

          <Link
            href="/documentos"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-gray-800 ring-1 ring-gray-200 transition-colors hover:bg-gray-50"
          >
            <FileText size={18} />
            Ver Documentos
          </Link>
        </div>
      </div>
    </div>
  );
}
