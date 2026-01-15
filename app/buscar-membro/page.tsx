"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Users,
  Layers,
  MapPin,
  Star
} from "lucide-react";

type Membro = {
  nome: string;
  email: string;
  telefone: string;
  nascimento: string;
  genero: string;
  obra: string;
  vigararia: string;
  paroquia: string;
  anoAdmissao: string;
  tipoMembro: string;
};

export default function BuscaMembros() {
  const [membros, setMembros] = useState<Membro[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterObra, setFilterObra] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  const [selectedMembro, setSelectedMembro] = useState<Membro | null>(null);

  useEffect(() => {
  async function fetchMembros() {
    try {
      const res = await fetch("https://saomp-back.vercel.app/api");

      if (!res.ok) {
        throw new Error("Erro ao buscar membros");
      }

      const data = await res.json();

      const membrosFormatados: Membro[] = data.members.map((m: any) => ({
        nome: m.nome,
        email: m.email,
        telefone: String(m.telefone),
        nascimento: new Date(m.nascimento).toLocaleDateString("pt-BR"),
        genero: m.genero,
        obra: m.obra,
        vigararia: m.vigararia,
        paroquia: m.paroquia,
        anoAdmissao: new Date(m.anoAdmissao).getFullYear().toString(),
        tipoMembro: m.tipoMembro,
      }));

      setMembros(membrosFormatados);
    } catch (error) {
      console.error("Erro ao buscar membros:", error);
    } finally {
      setLoading(false);
    }
  }

  fetchMembros();
}, []);

  const filteredMembros = membros.filter((membro) => {
    const matchName = membro.nome.toLowerCase().includes(search.toLowerCase());
    const matchObra = filterObra ? membro.obra === filterObra : true;
    const matchTipo = filterTipo ? membro.tipoMembro === filterTipo : true;
    return matchName && matchObra && matchTipo;
  });

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 mt-16">
      <div className="max-w-6xl mx-auto space-y-10">

        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-800">Buscar membros</h1>
          <p className="text-gray-600">Pesquise por nome, obra ou tipo de membro</p>
        </header>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md grid md:grid-cols-3 gap-6 items-end">
          <div className="space-y-2">
            <Label>Nome</Label>
            <Input
              placeholder="Digite o nome"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Obra</Label>
            <Select onValueChange={setFilterObra}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a obra" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IAM">IAM</SelectItem>
                <SelectItem value="Liga">Liga</SelectItem>
                <SelectItem value="Familia">Família</SelectItem>
                <SelectItem value="Uniao">União</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tipo</Label>
            <Select onValueChange={setFilterTipo}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Oracao">Oração</SelectItem>
                <SelectItem value="Promessa">Promessa</SelectItem>
                <SelectItem value="Assessor">Assessor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="col-span-full text-center text-gray-500">
              Carregando membros...
            </p>
          ) : filteredMembros.length > 0 ? (
            filteredMembros.map((membro, idx) => (
              <Card
                key={idx}
                className="cursor-pointer hover:shadow-lg"
                onClick={() => setSelectedMembro(membro)}
              >
                <CardContent className="flex gap-4">
                  <User size={40} className="text-yellow-500" />
                  <div>
                    <h3 className="font-semibold">{membro.nome}</h3>
                    <p className="text-sm text-gray-600">
                      {membro.obra} • {membro.tipoMembro}
                    </p>
                    <p className="text-xs text-gray-400">
                      {membro.vigararia} - {membro.paroquia}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Nenhum membro encontrado.
            </p>
          )}
        </div>

        {selectedMembro && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <Card className="max-w-3xl w-full">
              <CardContent className="p-8 grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2 text-center">
                  <User size={80} className="mx-auto text-yellow-500" />
                  <h2 className="text-2xl font-bold">{selectedMembro.nome}</h2>
                </div>

                <Info icon={Mail} text={selectedMembro.email} />
                <Info icon={Phone} text={selectedMembro.telefone} />
                <Info icon={Calendar} text={selectedMembro.nascimento} />
                <Info icon={Users} text={selectedMembro.genero} />
                <Info icon={Layers} text={selectedMembro.obra} />
                <Info icon={MapPin} text={`${selectedMembro.vigararia} - ${selectedMembro.paroquia}`} />
                <Info icon={Star} text={selectedMembro.tipoMembro} />
                <Info icon={Calendar} text={`Ano de admissão: ${selectedMembro.anoAdmissao}`} />
              </CardContent>

              <div className="p-4 text-right">
                <button
                  onClick={() => setSelectedMembro(null)}
                  className="bg-yellow-500 text-white px-6 py-2 rounded-xl"
                >
                  Fechar
                </button>
              </div>
            </Card>
          </div>
        )}

      </div>
    </section>
  );
}
function Info({ icon: Icon, text }: any) {
  return (
    <div className="flex gap-2 items-center text-gray-700">
      <Icon size={18} className="text-yellow-500" />
      <span>{text}</span>
    </div>
  );
}
