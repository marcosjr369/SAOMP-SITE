"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
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

const membrosFicticios: Membro[] = [
  { nome: "Marcos Júnior Félix", email: "marcos.felix@email.com", telefone: "+244 912345678", nascimento: "1995-06-10", genero: "Masculino", obra: "IAM", vigararia: "São Pedro Apóstolo", paroquia: "Paróquia Central", anoAdmissao: "2018", tipoMembro: "Oracao" },
  { nome: "Edilson Eduardo", email: "edilson.eduardo@email.com", telefone: "+244 923456789", nascimento: "1990-01-20", genero: "Masculino", obra: "Liga", vigararia: "Cazanga", paroquia: "Paróquia São João", anoAdmissao: "2019", tipoMembro: "Promessa" },
  { nome: "Francisco Victoriano", email: "francisco.victoriano@email.com", telefone: "+244 934567890", nascimento: "1985-11-15", genero: "Masculino", obra: "Familia", vigararia: "Fatima", paroquia: "Paróquia Nossa Senhora", anoAdmissao: "2017", tipoMembro: "Assessor" },
  { nome: "Júlio António", email: "julio.antonio@email.com", telefone: "+244 945678901", nascimento: "2000-03-05", genero: "Masculino", obra: "Uniao", vigararia: "Santo António", paroquia: "Paróquia Santo António", anoAdmissao: "2021", tipoMembro: "Oracao" },
];

export default function BuscaMembros() {
  const [search, setSearch] = useState("");
  const [filterObra, setFilterObra] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  const [selectedMembro, setSelectedMembro] = useState<Membro | null>(null);

  const filteredMembros = membrosFicticios.filter((membro) => {
    const matchName = membro.nome.toLowerCase().includes(search.toLowerCase());
    const matchObra = filterObra ? membro.obra === filterObra : true;
    const matchTipo = filterTipo ? membro.tipoMembro === filterTipo : true;
    return matchName && matchObra && matchTipo;
  });

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 mt-16">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-800">Buscar Membros</h1>
          <p className="text-gray-600">Pesquise por nome, obra ou tipo de membro</p>
        </header>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md grid md:grid-cols-3 gap-6 items-end">
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium">Nome</Label>
            <Input
              placeholder="Digite o nome do membro"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="transition border-gray-300 focus:border-yellow-500 focus:ring-yellow-200"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium">Obra</Label>
            <Select onValueChange={(v) => setFilterObra(v)}>
              <SelectTrigger className="border-gray-300 focus:border-yellow-500">
                <SelectValue placeholder="Selecione a obra" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IAM">Infância e Adolescência Missionária</SelectItem>
                <SelectItem value="Liga">Liga Missionária</SelectItem>
                <SelectItem value="Familia">Família Missionária</SelectItem>
                <SelectItem value="Uniao">União Missionária</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium">Tipo de Membro</Label>
            <Select onValueChange={(v) => setFilterTipo(v)}>
              <SelectTrigger className="border-gray-300 focus:border-yellow-500">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Oracao">Membro de Oração</SelectItem>
                <SelectItem value="Promessa">Membro com Promessa</SelectItem>
                <SelectItem value="Assessor">Assessor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembros.length > 0 ? (
            filteredMembros.map((membro, idx) => (
              <Card
                key={idx}
                className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={() => setSelectedMembro(membro)}
              >
                <CardContent className="flex items-center gap-4">
                  <User size={40} className="text-yellow-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">{membro.nome}</h3>
                    <p className="text-sm text-gray-600">{membro.obra} • {membro.tipoMembro}</p>
                    <p className="text-xs text-gray-400">{membro.vigararia} - {membro.paroquia}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center py-4">Nenhum membro encontrado.</p>
          )}
        </div>

        {selectedMembro && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-3xl bg-white rounded-2xl shadow-xl animate-fade-in">
              <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                <div className="shrink-0 flex flex-col items-center justify-start">
                  <User size={80} className="text-yellow-500 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 text-center">{selectedMembro.nome}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                  <div className="flex items-center gap-2 text-gray-700"><Mail className="text-yellow-500" size={20} /> <span>{selectedMembro.email}</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Phone className="text-yellow-500" size={20} /> <span>{selectedMembro.telefone}</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Calendar className="text-yellow-500" size={20} /> <span>{selectedMembro.nascimento}</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Users className="text-yellow-500" size={20} /> <span>{selectedMembro.genero}</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Layers className="text-yellow-500" size={20} /> <span>{selectedMembro.obra}</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><MapPin className="text-yellow-500" size={20} /> <span>{selectedMembro.vigararia} - {selectedMembro.paroquia}</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Star className="text-yellow-500" size={20} /> <span>{selectedMembro.tipoMembro}</span></div>
                  <div className="flex items-center gap-2 text-gray-700"><Calendar className="text-yellow-500" size={20} /> <span>Ano de Admissão: {selectedMembro.anoAdmissao}</span></div>
                </div>
              </CardContent>
              <div className="p-4 text-right border-t border-gray-200">
                <button
                  className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-xl hover:bg-yellow-600 transition-colors"
                  onClick={() => setSelectedMembro(null)}
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
