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
import { CheckCircle, AlertTriangle } from "lucide-react";

const API_URL = "https://saomp-back.vercel.app/api";

type FormData = {
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

const initialState: FormData = {
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
};

export default function CadastroMembro() {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function isFormValid() {
    return Object.values(formData).every((v) => v.trim() !== "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!isFormValid()) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        nome: formData.nome,
        email: formData.email,
        telefone: Number(formData.telefone),
        nascimento: new Date(formData.nascimento).toISOString(),
        genero: formData.genero,
        obra: formData.obra,
        vigararia: formData.vigararia,
        paroquia: formData.paroquia,
        anoAdmissao: new Date(`${formData.anoAdmissao}-01-01`).toISOString(),
        tipoMembro: formData.tipoMembro,
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Erro ao cadastrar membro");
      }

      setSuccess(true);
      setFormData(initialState);
    } catch (err: any) {
      setError(err.message || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 mt-16">
      <div className="max-w-3xl mx-auto space-y-6">
        {success && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-5 flex gap-3">
              <CheckCircle className="text-green-600" size={26} />
              <div>
                <h3 className="font-semibold text-green-800">
                  Membro cadastrado com sucesso
                </h3>
                <p className="text-sm text-green-700">
                  Os dados foram enviados para o sistema.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-5 flex gap-3">
              <AlertTriangle className="text-red-600" size={26} />
              <p className="text-red-700 font-medium">{error}</p>
            </CardContent>
          </Card>
        )}

        <Card className="shadow-lg rounded-2xl border-t border-yellow-500">
          <CardContent className="p-8 md:p-10">
            <h1 className="text-4xl text-center font-bold text-gray-800">
              Cadastro de Membro
            </h1>
            <p className="text-sm text-gray-500 mb-8 text-center">
              Torna-se membro das Obras Missionárias Pontifícias
            </p>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div>
                <h2 className="font-semibold text-lg mb-4 text-gray-700">
                  Dados Pessoais
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Nome">
                    <Input
                      value={formData.nome}
                      onChange={(e) => handleChange("nome", e.target.value)}
                    />
                  </Field>

                  <Field label="Email">
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </Field>

                  <Field label="Telefone">
                    <Input
                      value={formData.telefone}
                      onChange={(e) => handleChange("telefone", e.target.value)}
                    />
                  </Field>

                  <Field label="Data de Nascimento">
                    <Input
                      type="date"
                      value={formData.nascimento}
                      onChange={(e) =>
                        handleChange("nascimento", e.target.value)
                      }
                    />
                  </Field>
                </div>

                <div className="mt-4">
                  <Label>Gênero</Label>
                  <RadioGroup
                    className="flex gap-6 mt-2"
                    value={formData.genero}
                    onValueChange={(v) => handleChange("genero", v)}
                  >
                    <Option value="Masculino" />
                    <Option value="Feminino" />
                  </RadioGroup>
                </div>
              </div>

              <div>
                <h2 className="font-semibold text-lg mb-4 text-gray-700">
                  Dados Missionários
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <SelectField
                    label="Etapa"
                    value={formData.obra}
                    onChange={(v) => handleChange("obra", v)}
                    options={["IAM", "Liga Missionária", "Familia Missionária", "União Missionária"]}
                  />

                  <SelectField
                    label="Vigararia"
                    value={formData.vigararia}
                    onChange={(v) => handleChange("vigararia", v)}
                    options={[
                      "São Pedro Apóstolo",
                      "Santo António",
                      "São João Baptista da Cazanga",
                      "Nª Sª de Fátima",
                      "Carlos Luanga",
                      "São João Calabria",
                      "Nª Sª da Conceição"
                    ]}
                  />

                  <Field label="Paróquia">
                    <Input
                      value={formData.paroquia}
                      onChange={(e) => handleChange("paroquia", e.target.value)}
                    />
                  </Field>

                  <Field label="Ano de Admissão">
                    <Input
                      type="number"
                      value={formData.anoAdmissao}
                      onChange={(e) =>
                        handleChange("anoAdmissao", e.target.value)
                      }
                    />
                  </Field>
                </div>

                <div className="mt-4">
                  <Label>Tipo de Membro</Label>
                  <RadioGroup
                    className="grid md:grid-cols-4 gap-2 mt-5"
                    value={formData.tipoMembro}
                    onValueChange={(v) => handleChange("tipoMembro", v)}
                  >
                    <Option value="Oracao" label="Oração" />
                    <Option value="Promessa" />
                    <Option value="Assessor" />
                    <Option value="Director" />
                  </RadioGroup>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-lg py-6 rounded-xl"
              >
                {loading ? "Cadastrando..." : "Cadastrar Membro"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Field({ label, children }: any) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Option({ value, label }: any) {
  return (
    <div className="flex items-center gap-2">
      <RadioGroupItem value={value} />
      <Label>{label || value}</Label>
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
};

function SelectField({
  label,
  value,
  onChange,
  options,
}: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={`Selecione ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

