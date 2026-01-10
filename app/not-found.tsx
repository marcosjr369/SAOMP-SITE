import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-lg text-center">

        <h1 className="text-6xl font-extrabold text-gray-900 tracking-tight">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Página não encontrada
        </h2>

        <p className="mt-3 text-gray-600 leading-relaxed">
          A página que estás a procurar não existe, foi removida ou o endereço
          foi digitado incorretamente.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
            bg-yellow-500 hover:bg-yellow-600 text-white font-semibold
            transition shadow-sm"
          >
            <Home size={18} />
            Voltar ao Início
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
            bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold
            transition"
          >
            <ArrowLeft size={18} />
            Página anterior
          </Link>
        </div>
      </div>
    </main>
  );
}
