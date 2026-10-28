import {
  HeartHandshake,
  Sparkles,
  Flame,
  Church,
  type LucideIcon,
} from "lucide-react";

export type Obra = {
  sigla: string;
  nome: string;
  pontificia: string;
  publico: string;
  icon: LucideIcon;
  description: string;
};

export const obras: Obra[] = [
  {
    sigla: "FM",
    nome: "Famílias Missionárias",
    pontificia: "Pontifícia Obra da Propagação da Fé",
    publico: "Famílias",
    icon: HeartHandshake,
    description:
      "Nasce do pedido de cooperação por parte do Instituto das Missões Estrangeiras de Paris, que já tinha as suas missões no Oriente e que desde o princípio, teve a seguinte característica: a universalidade. A fundadora teve como legenda 'todos os fiéis para todos os infiéis', exortava todos os fiéis a assumirem compromisso improrrogável: a Igreja é e deve ser missionária. A jovem Paulina Maria Jaricot formou em 1818 uma associação com um grupo de jovens operários, no intuito de colaborarem com os missionários em terras de missão, resultando assim na fundação da Obra da Propagação da Fé, a 03 de Maio de 1822, em Lyon (França).",
  },
  {
    sigla: "IAM",
    nome: "Infância e Adolescência Missionária",
    pontificia: "Pontifícia Obra da Santa Infância Missionária",
    publico: "Crianças e adolescentes",
    icon: Sparkles,
    description:
      "Dom Carlos Augusto Maria de Forbin-Janson, depois de uma viagem missionária, primeiro à Índia, e em seguida aos EUA e ao Canadá, tomou a peito a luta contra a morte de crianças, praticado sistematicamente em alguns países. As notícias vindas dos missionários do Oriente, de modo especial da China, sobre a dura realidade das crianças (mortalidade, abandono…) sensibilizou o coração de Dom Carlos Forbin-Janson, bispo de Nancy e de Toul, Primaz de Lorena (França), despertando-lhe o desejo de aliviar o sofrimento e salvar a vida de tantos inocentes.",
  },
  {
    sigla: "LMJ",
    nome: "Liga Missionária Juvenil",
    pontificia: "Pontifícia Obra de São Pedro Apóstolo",
    publico: "Jovens",
    icon: Flame,
    description:
      "Apoia a formação do clero local, seminaristas e vocações sacerdotais nas terras de missão, garantindo a continuidade pastoral das jovens Igrejas.",
  },
  {
    sigla: "UM",
    nome: "Vocacionados, Religiosos e Religiosas",
    pontificia: "Pontifícia Obra da União Missionária",
    publico: "Sacerdotes e consagrados",
    icon: Church,
    description:
      "O Bem-Aventurado Pe. Paulo Manna (PIME), percebendo a pouca consciência missionária por parte do clero, fundou a União Missionária, a fim de despertar os Padres para missão além-fronteiras, a partir da vocação missionária de cada baptizado. A Obra foi fundada no dia 31 de Outubro de 1916 e aprovada pelo Papa Bento XV.",
  },
];
