"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DocumentsSection() {
  const router = useRouter();

  return (
    <section className="py-20 bg-yellow-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Documentos Oficiais
          </h2>
          <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
            Acesse todos os documentos oficiais e acompanhe o trabalho das Obras Missionárias Pontifícias na Arquidiocese.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Button
            onClick={() => router.push("/documentos")}
            className="bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-white text-lg md:text-xl px-8 py-5 flex items-center gap-3 mx-auto"
          >
            <FileText size={20} />
            Ver Documentos
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
