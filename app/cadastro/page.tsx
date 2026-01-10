"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function CadastroMembro() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    nascimento: "",
    genero: "",
    obra: "",
    vigararia: "",
    paroquia: "",
    anoAdmissao: "",
    tipoMembro: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value !== "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      console.warn("Formulário incompleto:", formData);
      return;
    }

    console.group("📋 Dados do Membro Cadastrado");
    Object.entries(formData).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });
    console.groupEnd();

    setSuccess(true);
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4 mt-16">
      <div className="max-w-3xl mx-auto space-y-6">
        {success && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 flex gap-4 items-start">
              <CheckCircle className="text-green-600 mt-1" size={28} />
              <div>
                <h3 className="font-semibold text-green-800 text-lg">
                  Membro cadastrado com sucesso
                </h3>
                <p className="text-sm text-green-700 mt-1">
                  Os dados foram validados e registados corretamente.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="bg-white rounded-2xl shadow p-6 md:p-10">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Dados Pessoais & Missionários
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Preencha todos os campos obrigatórios (*)
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Dados Pessoais */}
            <div>
              <h2 className="font-semibold text-lg text-gray-700 mb-4">
                Dados Pessoais
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome Completo *</Label>
                  <Input placeholder="Seu nome" onChange={(e) => handleChange("nome", e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input type="email" placeholder="exemplo@email.com" onChange={(e) => handleChange("email", e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label>Telefone *</Label>
                  <Input placeholder="+244 9..." onChange={(e) => handleChange("telefone", e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label>Data de Nascimento *</Label>
                  <Input type="date" onChange={(e) => handleChange("nascimento", e.target.value)} />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Label>Gênero *</Label>
                <RadioGroup className="flex gap-6 mt-2" onValueChange={(v) => handleChange("genero", v)}>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="Masculino" />
                    <Label>Masculino</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="Feminino" />
                    <Label>Feminino</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

 
            <div>
              <h2 className="font-semibold text-lg text-gray-700 mb-4">
                Dados Missionários
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Obra Missionária *</Label>
                  <Select onValueChange={(v) => handleChange("obra", v)}>
                    <SelectTrigger>
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
                  <Label>Vigararia *</Label>
                  <Select onValueChange={(v) => handleChange("vigararia", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a vigararia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="São Pedro Apóstolo">São Pedro Apóstolo</SelectItem>
                      <SelectItem value="Santo António">Santo António</SelectItem>
                      <SelectItem value="Cazanga">São João Baptista da Cazanga</SelectItem>
                      <SelectItem value="Calabria">São João Calábria</SelectItem>
                      <SelectItem value="Lwanga">São Carlos Lwanga</SelectItem>
                      <SelectItem value="Conceicao">Da Conceição</SelectItem>
                      <SelectItem value="Fatima">Nossa Senhora de Fátima</SelectItem>
                      <SelectItem value="Agostinho">Santo Agostinho</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Paróquia *</Label>
                  <Input placeholder="Nome da Paróquia" onChange={(e) => handleChange("paroquia", e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label>Ano de Admissão *</Label>
                  <Input type="number" placeholder="Ex: 2021" onChange={(e) => handleChange("anoAdmissao", e.target.value)} />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Label>Tipo de Membro *</Label>
                <RadioGroup className="grid md:grid-cols-3 gap-4 mt-2" onValueChange={(v) => handleChange("tipoMembro", v)}>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="Oracao" />
                    <Label>Membro de Oração</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="Promessa" />
                    <Label>Membro com Promessa</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="Assessor" />
                    <Label>Assessor</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-lg py-6 rounded-xl"
            >
              Cadastrar Membro
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
