"use client";

import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-b from-gray-900 to-black text-white pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white p-2 shrink-0">
                <Image
                  src="/logo.jpeg"
                  alt="SAOMP Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 64px) 100vw, 64px"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">SAOMP</h3>
                <p className="text-sm text-gray-300 leading-tight font-medium">
                  Secretariado Arquidiocesano das
                  <br />
                  Obras Missionárias Pontifícias
                </p>
                <p className="text-xs text-gray-400 mt-2">Luanda - Angola</p>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
              Levando a mensagem de Cristo aos povos, fortalecendo a fé, a
              missão e a caridade através das obras missionárias pontifícias.
            </p>

            <div className="flex gap-3 pt-2">
              {[Facebook, Instagram, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-yellow-400 transition-all duration-300 transform hover:-translate-y-1"
                  aria-label="Redes sociais"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-800 text-white">
              Navegação
            </h4>
            <ul className="space-y-3.5">
              {[
                { href: "/", label: "Início" },
                { href: "/buscar-membro", label: "Membros" },
                { href: "/sobre", label: "História" },
                { href: "/galeria", label: "Galeria" },
                { href: "/documentos", label: "Documentos" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-100 mr-3 transition-opacity"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-800 text-white">
              Contacto
            </h4>

            <ul className="space-y-5 text-gray-300">
              <li className="flex items-start gap-3">
                <div className="p-2 bg-gray-800 rounded-lg mt-0.5">
                  <MapPin className="w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <p className="font-medium">Endereço</p>
                  <p className="text-sm text-gray-400">Luanda, Angola</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="p-2 bg-gray-800 rounded-lg mt-0.5">
                  <Phone className="w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <p className="font-medium">Telefone</p>
                  <a
                    href="tel:+244923456789"
                    className="text-sm text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    +244 923 456 789
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="p-2 bg-gray-800 rounded-lg mt-0.5">
                  <Mail className="w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href="mailto:contato@saomp-luanda.org"
                    className="text-sm text-gray-400 hover:text-yellow-400 transition-colors break-all"
                  >
                    contato@saomp-luanda.org
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © {currentYear} SAOMP - Secretariado Arquidiocesano das Obras
              Missionárias Pontifícias
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
