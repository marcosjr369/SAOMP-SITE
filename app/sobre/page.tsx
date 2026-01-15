"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
  FaPray,
  FaBook,
  FaChevronDown,
  FaChevronUp,
  FaHistory,
  FaUserFriends,
} from "react-icons/fa";

const obras = [
  {
    title: "Famílias Missinárias (FM)",
    first: "Pontifícia Obra da Propagação da Fé",
    description:
      "Nasce do pedido de cooperação por parte do Instituto das Missões Estrangeiras de Paris, que já tinha as suas missões no Oriente e que desde o princípio, teve a seguinte característica: a universalidade. A fundadora teve como legenda 'todos os fiéis para todos os infiéis', exortava todos os fiéis a assumirem compromisso improrrogável: a Igreja é e deve ser missionária. A jovem Paulina Maria Jaricot formou em 1818 uma associação com um grupo de jovens operários, no intuito de colaborarem com os missionários em terras de missão, resultando assim na fundação da Obra da Propagação da Fé, a 03 de Maio de 1822, em Lyon (França).",
    image: "/liga.jpeg",
  },
  {
    title: "Infância e Adolescência Missionária (IAM)",
    first: "Pontifícia Obra da Santa Infância Missionária",
    description:
      "Dom Carlos Augusto Maria de Forbin-Janson, depois de uma viagem missionária, primeiro à Índia, e em seguida aos EUA e ao Canadá, tomou a peito a luta contra a morte de crianças, praticado sistematicamente em alguns países. As notícias vindas dos missionários do Oriente, de modo especial da China, sobre a dura realidade das crianças (mortalidade, abandono…) sensibilizou o coração de Dom Carlos Forbin-Janson, bispo de Nancy e de Toul, Primaz de Lorena (França), despertando-lhe o desejo de aliviar o sofrimento e salvar a vida de tantos inocentes.",
    image: "/iam.jpeg",
  },
  {
    title: "Liga Missionária Juvenil (LMJ)",
    first: "Pontifícia Obra de São Pedro Apóstolo",
    description:
      "Apoia a formação do clero local, seminaristas e vocações sacerdotais nas terras de missão, garantindo a continuidade pastoral das jovens Igrejas.",
    image: "/mundo.jpeg",
  },
  {
    title: "Vocacionados, Religiosos e Religiosas",
    first: "Pontifícia Obra da União Missionária",
    description:
      "O Bem-Aventurado Pe. Paulo Manna (PIME), percebendo a pouca consciência missionária por parte do clero, fundou a União Missionária, a fim de despertar os Padres para missão além-fronteiras, a partir da vocação missionária de cada baptizado. A Obra foi fundada no dia 31 de Outubro de 1916 e aprovada pelo Papa Bento XV.",
    image: "/terra.jpeg",
  },
];

const padroeiros = [
  {
    name: "São Francisco Xavier",
    description:
      "São Francisco Xavier é conhecido como o 'Apóstolo do Oriente'. A Igreja crê que ele tenha convertido mais pessoas ao cristianismo do que qualquer outro missionário desde São Paulo. Nasceu no dia 07 de Abril de 1506, no Castelo de Xavier, em Navarra, perto de Pamplona. Foi filho de família aristocrata navarra. Seu pai Juan de Jasso era conselheiro da corte do Rei João III de navarra, e sua mãe, Maria de Azpilicueta e Javier, era a única herdeira de duas famílias nobres de Navarra. Seguindo a tradição basca de atribuição de sobrenome, foi baptizado herdando o nome de sua mãe, de Xavier. O seu nome é correctamente escrito Francisco de Xavier e não Francisco Xavier, já que Xavier provém do nome da terra da qual a família é obrigatória. Era o caçula da família. A família do Francisco, apesar de rica e influente, tinha com a população local um excelente relacionamento devido a sua caridade e amor para com o próximo.",
    fullDescription:
      "São Francisco Xavier é conhecido como o 'Apóstolo do Oriente'. A Igreja crê que ele tenha convertido mais pessoas ao cristianismo do que qualquer outro missionário desde São Paulo.\n\nNome: Francisco Jasso D´Azpilicueta y Javier.\nSão Francisco Xavier nasceu no dia 07 de Abril de 1506, no Castelo de Xavier, em Navarra, perto de Pamplona.\n\nFoi filho de família aristocrata navarra. Seu pai Juan de Jasso era conselheiro da corte do Rei João III de navarra, e sua mãe, Maria de Azpilicueta e Javier, era a única herdeira de duas famílias nobres de Navarra. Seguindo a tradição basca de atribuição de sobrenome, foi baptizado herdando o nome de sua mãe, de Xavier. O seu nome é correctamente escrito Francisco de Xavier e não Francisco Xavier, já que Xavier provém do nome da terra da qual a família é obrigatória. Era o caçula da família.\n\nA família do Francisco, apesar de rica e influente, tinha com a população local um excelente relacionamento devido a sua caridade e amor para com o próximo.\n\nEstudos\n\nFrancisco cresceu muito estudioso e para melhor se preparar, em sua juventude vai a Paris. Aos 07 anos inicia os seus estudos colegiais em Grandia/Espanha. Aos 14 anos entra no Colégio de Santa Bárbara, de Paris para completar as disciplinas de Filosofia, Literatura e Humanidades. Foi aqui que aprendeu a fundo as línguas francesa, alemã e italiana. Com 18 anos ingressou à Universidade de Paris, formando-se em Latim, Filosofia e Humanidades, onde em 1528 obteve o grau de licenciatura. Após terminar esta formação, atinge a cátedra em Artes de Engenharia.\n\nNo colégio de Santa Bárbara, firmou uma forte e íntima amizade com o seu colega Inácio de Loyola, que, entretanto, seguia uma carreira militar. Inácio abandona o exército em consequência de um grave acidente. Ao começo, Francisco rejeitou a influência de Inácio, o que repetia a frase de Jesus Cristo: 'Francisco, que te aproveitas ganhar o mundo inteiro, se vens perder a sua alma?'. Esta sentença do evangelho, repetida dia após dia, fixou-lhe bem fundo no espírito de Xavier. No verão de 1533 era ele humilde discípulo de Inácio. Francisco, junto com Inácio, iniciam um conjunto de exercícios espirituais, imaginados pelo primeiro, com vista ao estudo da doutrina cristã e benefício da humanidade.\n\nFoi um dos sete primeiros seguidores de Santo Inácio, fundador dos Jesuítas, consagrando-se ao serviço de Deus em Montmatre, no dia 01 de Agosto de 1534, onde professaram os votos de pobreza e castidade, e resolveram ir à Terra Santa, fizeram uma peregrinação pelos Lugares Santos, iniciaram desde ali a sua obra missionária, podendo-se em todos caso à disposição do Papa, ingressaram no Seminário de Veneza a 15 de Agosto de 1530, com o propósito de fundarem a milícia dos Filhos de Jesus. Aos 24 de Junho de 1536, Francisco Xavier é ordenado sacerdote. Juntos e com mais cinco colegas fundaram o grupo chamado 'A companhia de Jesus'. A esses companheiros juntaram-se muitos outros que se espalharam pelo mundo para pregar o Evangelho.\n\nMissão\n\nEm Portugal, D. João III precisava de uma ordem de evangelizadores que, com a cruz na mão, lavassem a notícia desta nação de bravos e bons homens, aos recém-descobertos povos de além-mar. Solicita ao Papa que lhe sejam destinados alguns Padres Jesuítas, atendendo às suas afamadas técnicas de evangelização. Francisco Xavier acaba por ser escolhido e com entusiamo inicia a sua missão.\n\nNo Oriente percorre para Índia, em Goa e depois às ilhas de Madrasta, Macacar, Malaca, Molucas, Amboíno e Moro. As condições de vivência são difíceis, mas as feitorias portuguesas começam a solidificar após a sua passagem. No Japão continua o seu percurso evangelizador e rapidamente entra nas relações das mais importantes famílias do Império do Sol Nascente. Fracassa no contacto com Imperador e com o Shogum, que não aceitam os seus intentos religiosos. Segue à Etiópia, onde conquista o Imperador e a Imperatriz, movendo-se com facilidade nos círculos de poder da nação.\n\nRegresso à Índia e expedição à China / Morte\n\nDoente e cansado retorna à Goa aos 06 de Maio de 1551, com 44 anos de idade. Dedica os seus últimos tempos de vida ao trabalho humanístico e cultural. Os cristãos da Índia haviam progredido, mas também multiplicara-se os problemas e os abusos. Francisco pôs ordem com firmeza e caridade. Quatro meses depois embarcou novamente sonhando com China. Teve de vencer muitas dificuldades com o chefe da região. Francisco Xavier sonhava entrar na China para evangelizar. Em 1552 chega à Ilha de Sancán (Shang Chavan) a uns 20 km da China. Enquanto preparava a ida, Xavier caiu doente. Só ficava lá um navio português. E um comerciante chinês que o acompanhava, abandonou-o e não voltou. Francisco, na miséria, refugiou-se no navio. Um comerciante compassivo levou para a sua cabana. Francisco piorava e morre aos 03 de Dezembro de 1552, numa humilde esteira de vimes, abraçado ao crucifixo, presente do amigo Inácio.\n\nFoi sepultado em Sanchoao, mas em Fevereiro de 1553 seu corpo incorrupto foi transportado e sepultado na Igreja de São Paulo, em Malaca. Aos 11 de Dezembro de 1553, o corpo é levado para Goa, aos 02 de Dezembro de 1637, o corpo de São Francisco é colocado em uma caixa de vidro e prata, e encontra-se hoje na Basílica de Bom Jesus de Goa, que é lugar de peregrinação.\n\nBeatificação, Canonização e Nomeação como Padroeiro das Missões\n\nFoi beatificado por Paulo V, aos 25 de Outubro de 1605 e canonizado por Gregório XV, aos 12 de Março de 1622, a sua festa litúrgica é celebrada no dia 03 de Dezembro. Foi nomeado Padroeiro das Missões e de todo missionário, junto com Santa Teresinha do Menino Jesus, no dia 14 de Dezembro de 1928, pelo Papa Pio XI.\n\nOração de São Francisco Xavier\n\nDeus eterno e criador de todas as coisas,\nLembrai-Vos que as almas dos infiéis são obras de vossas mãos,\nE que são feitas a vossa imagem e semelhança.\nVede, porém, Senhor, como em desonra do Vosso Nome\nO inferno se enche destas almas.\nLembrai-Vos que Jesus Cristo Vosso Filho,\nDerramou todo seu Sangue e padeceu morte atrocíssima por elas.\nNão permitais, pois, Senhor, que o vosso Filho seja mais tempo desprezado pelos infiéis.\nDeixai-Vos antes aplacar e mover à piedade\nPelas orações de vossos Santos e da Igreja,\nEsposa de Vosso Santíssimo Filho.\nLembrai-vos da vossa misericórdia\nE, esquecendo da sua idolatria e infelicidade,\nFazei que também eles enfim conheçam a Jesus Cristo,\nNosso Senhor, que é nossa Salvação, Vida e Ressurreição nossa,\nE por quem fomos livres e salvos,\nA quem seja dado a honra, glória e louvor para sempre.\nAmém!",
    image: "/xavier.jpeg",
  },
  {
    name: "Santa Teresinha do Menino Jesus",
    description:
      "Santa Teresa de Lisieux, conhecida por Teresinha do Menino Jesus ou Santa das Rosas, é uma das santas caracterizada pela espiritualidade. Seu culto espalhou-se em pouco tempo por todos os recantos do mundo católico. Santa Teresinha do Menino Jesus nasceu em Alençon, França, no dia 02 de Janeiro de 1873. Foi baptizada dois dias depois do seu nascimento na Igreja de Notre Dame com o nome de Marie Françoise Thérêse. Seu pai, Luiz Martin, relojeiro e joalheiro, que aos 20 anos tentou ser monge da Ordem de São Bernardo, estava perto dos 50 anos, quando nasceu a sua nona filha. Sua mãe, Zélia Martin, famosa bordadeira do conhecido 'ponto de Aleçon', gera Teresa aos 41 anos.",
    fullDescription:
      "Santa Teresa de Lisieux, conhecida por Teresinha do Menino Jesus ou Santa das Rosas, é uma das santas caracterizada pela espiritualidade. Seu culto espalhou-se em pouco tempo por todos os recantos do mundo católico.\n\nFamília\n\nSanta Teresinha do Menino Jesus nasceu em Alençon, França, no dia 02 de Janeiro de 1873. Foi baptizada dois dias depois do seu nascimento na Igreja de Notre Dame com o nome de Marie Françoise Thérêse.\n\nSeu pai, Luiz Martin, relojeiro e joalheiro, que aos 20 anos tentou ser monge da Ordem de São Bernardo, estava perto dos 50 anos, quando nasceu a sua nona filha. Sua mãe, Zélia Martin, famosa bordadeira do conhecido 'ponto de Aleçon', gera Teresa aos 41 anos. Vítima de câncer, essa piedosa mulher falece no dia 28 de Agosto de 1877. Os outros irmãos morreram ainda pequenos e suas irmãs chamavam-se Maria, Paulina, Leónia e Celina.\n\nA menina de Lisieux\n\nAos três anos, a pequena Teresa já era decidida a não recusar nada ao Bom Deus. Louis Martin transferira-se com cinco filhas para a cidade de Lisieux, por sugestão do cunhado, senhor Guérin. Aí, cercada do pai que chamava sua caçula de 'minha rainha' e pela ternura das irmãs, Teresa recebe uma formação exigente cheia de piedade. Na festa de Pentecostes de 1883, ela é milagrosamente curada de uma enfermidade através de um sorriso que lhe oferece a Virgem Maria. Educada pelas Monjas Benditas. Até Outubro de 1885, completa seus estudos em casa sob orientação da Madame Papincan. Fez a Primeira Comunhão no dia 08 de Maio de 1884, depois de uma intensa preparação, esse grande dia marca a fusão, de Teresinha com Jesus.\n\nNo dia 14 de Junho do mesmo ano, recebe o sacramento da Crisma, muito consciente dos dons que são implantados no coração. No Natal de 1886, viveu uma profunda consciência espiritual uma virada decisão na sua vida, que ela chama de conversão. Aos 13 anos de idade, a menina chorona e caprichosa, conforme o seu próprio testemunho, abandona os cueiros da infância. Supera a fragilidade emotiva, consequência da perda da mãe, e inicia uma corrida de gigante de perfeição.\n\nA vida no Carmelo\n\nPõe-se a pensar seriamente em abraçar a vida religiosa como Monja Carmelita, a exemplo de suas irmãs Maria e Paulina, no Carmelo de Lisieux, mas foi impedida o seu sonho devido a sua pouca idade. Por ocasião de uma peregrinação à Itália, depois de vista Loreto e alguns pontos de Roma, numa audiência com o Papa Leão XII a um grupo de peregrinos de Lisieux, no dia 20 de Novembro de 1887, audaciosamente ela suplica ao Santo Padre a permissão para ingressar ao Carmelo aos 15 anos de idade.\n\nNo dia 09 de Abril de 1888, após muitas dificuldades, conseguiu realizar seu sonho e foi aceita na clausura do Carmelo. Recebe o hábito de ordem da Virgem no dia 10 de Janeiro do ano seguinte. Emite os votos religiosos no dia 08 de Setembro de 1890, festa da Natividade da Virgem Maria. Inicia no Carmelo o caminho da perfeição traçada pela Madre fundadora, Santa Teresa de Jesus, cumprindo com fervor e fidelidade os ofícios que lhe são confiados.\n\nEm 1895, por obediência, começa a escrever suas memórias que vieram a ser publicadas após a sua morte, com o título 'História da minha alma'. Esta memória veio a ser responsável pela divulgação da vida e espiritualidade de Santa Teresinha no mundo inteiro, sendo traduzida em 58 línguas.\n\nNo dia 09 de Junho de 1895, na festa da Santíssima Trindade, ofereceu-se como vítima de holocausto ao Amor Misericordioso de Deus. Aos 03 de Abril do ano seguinte, na noite entre Quinta feira e Sexta feira Santa, teve uma primeira manifestação de tuberculose, a doença que chegou de a levar à morte. Teresa não se rebelou.\n\nAcolheu a sua enfermidade como misteriosa visita do Esposo Divino. Foram 27 meses de terrível martírio. Começou na Santa Teresinha, uma prova de fé, mas permaneceu firme até ao fim, sem jamais deixar-se abalar. Tudo aceitava com paciência e amor. Chegou mesmo a dizer que jamais pensou que fosse capaz de sofrer tanto.\n\n... chamou-a para que ela nos revelasse a estrada do abandono em suas mãos; Teresinha não decepcionou o seu Bem-Amado. Ela mostra-nos o quanto é saudável acertarmos os nossos próprios limites e assumir a nossa pequenez, sem nos envergonharmos de nossa humanidade. Nada há de extraordinário na vida dessa monja. O que há de especial em Teresinha, é a simplicidade com que amou a Deus.\n\nMeu Deus, eu te amo\n\nTendo piorado a sua saúde, aos 08 de Junho de 1897 é conduzida à enfermeira do Carmelo. Suas irmãs e as outas monjas, na pressa de não perder nenhuma das suas palavras, anotaram tudo o que ela dizia entre as dores atrozes e gemidos. Poucos antes de morrer, sem o menor consolo, exclamou: 'Não me arrependo de me haver entregue ao amor'. Às 19 horas do dia seguinte, isto é, no dia 30 de Setembro de 1897 fixou os olhos no crucifico e exclamou: 'Meu Deus, eu te amo'. Depois de um êxtase que teve a duração de um credo, expirou. Obscura e anónima, para os braços do pai, a humilde carmelita que veio a ser chamada a maior santa dos tempos modernos. Logo após a sua morte, iniciaram as suas peregrinações no seu túmulo, e muitas graças foram atribuídas à sua intercessão.\n\nBeatificação, Canonização e Nomeação à Padroeira das Missões\n\nO Papa Pio XI beatificou-a em 1923, canonizou-a no dia 17 de Maio de 1925 e nomeou-a Padroeira das Missões e de todos os missionários, no dia 14 de Dezembro de 1928, junto com São Francisco Xavier. Foi proclamada Doutora da Igreja pelo Papa São João Paulo II, em Roma, no dia 19 de Outubro de 1997. A sua festa é celebrada no dia 01 de Outubro. No Oriente é chamada frequentemente de 'Pequena Flor', como 'Santa das Rosas', porque Santa Teresinha gostava muito de flores.\n\nMensagem de Santa Teresinha do Menino Jesus\n1- Sigamos o caminho da simplicidade\n2- Entreguemo-nos com todo nosso ser ao amor\n3- Em tudo busquemos fazer cumprir a vontade de Deus\n4- E que o zelo pela salvação das pessoas devore nossos corações.",
    image: "/teresinha.jpeg",
  },
];

const fundadores = [
  {
    name: "Paulina Maria Jaricot",
    description:
      "Paulina Maria Jaricot nasceu no dia 22 de Julho de 1799, em Lyon, França. Ela foi a última filha do casal francês António Jaricot e Joana Latier. O casal teve sete filhos, incluindo o filho Filéias (foi Padre), que nasceu dois anos antes, em 2 de Fevereiro de 1797, que foi muito influente na vida de Paulina, alimentando o seu amor para as Missões. Paulina Maria Jaricot nasceu de uma família proprietária de uma fábrica de seda, rica e negociante. Desde a sua infância recebeu profunda educação cristã.",
    fullDescription: `Paulina Maria Jaricot nasceu no dia 22 de Julho de 1799, em Lyon, França. Ela foi a última filha do casal francês António Jaricot e Joana Latier. O casal teve sete filhos, incluindo o filho Filéias (foi Padre), que nasceu dois anos antes, em 2 de Fevereiro de 1797, que foi muito influente na vida de Paulina, alimentando o seu amor para as Missões. Paulina Maria Jaricot nasceu de uma família proprietária de uma fábrica de seda, rica e negociante. Desde a sua infância recebeu profunda educação cristã.

A visão das Missões – Fundação da Propagação da Fé
Com 15 anos, Paulina sofreu uma queda feia. Não muito tempo depois, sua mãe querida morreu. Levou meses para a Paulina se recuperar emocionalmente e fisicamente. Quando isso aconteceu, ela retomou sua vida social, mas com menos prazer do que antes. Seu coração, ela escreveu, neste momento, foi "feito para o mundo inteiro".

Após grave enfermidade e morte da mãe, em 1816, Paulina resolveu servir somente a Deus. Nesta oportunidade, fez voto privado de castidade e adoptou um estilo de vida e de vestir das mais pobres operárias. Por meio de seu querido irmão, Filéias, seminarista do Seminário de Saint–Sulpice, em Paris, onde se preparava para ser missionário da China, Paulina toma conhecimento e mantém-se informada da situação difícil das missões. Paulina, além de esforçar-se em dar a conhecer as necessidades das missões (pertencia também à Associação dos Padres das Missões Estrangeiras), amadurecia em sua mente algo mais orgânico que poderia suscitar o entusiasmo e evoluir interiormente; algo, inclusive, que pudesse envolver todos os católicos e ser uma verdadeira ajuda para todas as missões indistintamente. Assim, ela começou a interessar-se pelas missões na China e nos Estados Unidos da América.

Um dia, enquanto rezava, Paulina teve uma visão de duas lamparinas. Uma não tinha petróleo, a outra estava transbordando e de sua abundância derramou óleo na lâmpada vazia. Para Paulina, a lamparina drenada significou a fé em sua França natal, ainda se recuperando da turbulência da Revolução Francesa. A lamparina cheia foi a grande fé dos católicos nas Missões – especialmente no novo mundo. Ajudando a fé dos jovens países, Paulina sabia que as sementes plantadas iriam crescer e dar muitos frutos. Então ela veio com um plano para apoiar os missionários. Ela reuniu as trabalhadoras da fábrica de seda de sua família em "grupos de 10". Todos no grupo comprometeram-se a orar diariamente pelas missões e oferecer, a cada semana, uma oferta, o equivalente a uma moeda de um centavo. Cada membro do grupo, então, convidou mais 10 amigas a fazerem o mesmo.

Ao aparecer o grande projecto de Paulina Jaricot, que um dia converter-se-ia na Obra da Propagação da Fé, seu irmão Filéias, recém ordenado sacerdote, sugere à irmã que se consagre, inteiramente, a uma actividade organizada a favor das missões, "A minha vocação, escrevia Paulina, impedia-me de fixar a minha atenção apenas numa obra até ao ponto de esquecer-me das demais… desejo permanecer livre para poder ir aonde as necessidades são maiores". Suas outras Obras foram: o Rosário vivo (1826), a Obra de Boa Imprensa (bibliotecas populares e volantes, 1826), o Banco do Céu (1830), a Congregação de Filhas de Maria (1831).

O mundo católico considera Paulina Jaricot como uma mulher de extraordinária têmpera de alma e ampla visão das necessidades da Igreja; uma mulher verdadeiramente amante da Igreja, que viveu quase sempre incompreendida, combatida, caluniada e até perseguida pelos superiores. Paulina era de temperamento prático: todas as suas iniciativas revelam um espírito sumamente realista, capaz de dar vida e corpo a uma ideia. Suas actividades, são aparentemente simples e susceptíveis de serem atribuídas a qualquer pessoa, denotavam, porém, uma percepção exacta da realidade social e espiritual do seu campo.

Morte
Paulina morreu no dia 09 de Janeiro de 1862; a oração encontrada a pós a sua morte, escrita em sua própria mão, terminou com estas palavras: "Maria, ó minha Mãe, eu sou Tua!", 1963, 100 anos após sua morte, o Papa João XXIII assinou o decreto que proclamava as virtudes de Paulina Jaricot, declarando "venerável". A causa de sua beatificação e canonização continua.

Processo de Beatificação
As autoridades eclesiásticas, que repetidamente recomendaram a Obra aos Bispos, sacerdotes e fiéis, reconhecendo em Paulina Jaricot um instrumento dócil, generoso e heroico da Divina Providência para evangelização, introduziram a causa da Beatificação, em 18 de Janeiro 1830. Em 25 de Fevereiro 1963, o Papa João XXIII assinou o decreto que proclama a heroicidade das virtudes de Paulina Maria Jaricot. Por isso declarou-se "venerável", o que significa que a Igreja compromete-se em beatificá-la. Um milagre, porém, fruto de sua intercessão é a condição, normalmente necessária.

Três lições da vida de Paulina Maria Jaricot
Há três aspectos da vida de Paulina Jaricot que podemos modelar em nossas próprias vidas:
- Compromisso com a missão todos os dias. Para Paulina, a missão não foi reservada para certos momentos, mas para todos os dias. Os grupos de trabalhadoras na fábrica de sua família comprometeram-se com a oração diária e sacrifício regular. Cada dia, podemos oferecer uma oração para os missionários e os povos de todo mundo.
- Uma visão para todo o mundo! Paulina sentiu fortemente que ajuda oferecida às missões de seu dia deve ser universal – que ninguém seja esquecido. E quando a Obra da Propagação da Fé foi formalmente criada, esta mesma visão prevaleceu – oração e sacrifício para as missões do mundo.
- Viver no amor. Como uma jovem mulher, Paulina expressou o desejo de "amar sem medida, sem fim". Se era seu trabalho para as missões, ou para os doentes ou os pobres, o amor motivava as acções de Paulina Jaricot. Na verdade, o coração da vocação missionária é o mandamento do amor. Nosso amor deve derramar na comunidade, estendendo além de nós mesmos, para os lugares distantes, onde ninguém está sendo ajudado, os mais vulneráveis são esquecidos e os pobres são muitas vezes abandonados, que é onde o missionário será missionário de verdade. E é aí que, através da Juventude Missionária das Pontifícias Obras Missionárias, você também pode ser missionário, através de suas orações e sacrifícios diários.`,
    obra: "Obra da Propagação da Fé",
  },
  {
    name: "Carlos Augusto Maria José de Forbin-Janson",
    description:
      "Carlos Augusto Maria José de Forbin-Janson nasceu em Paris a 03 de Novembro de 1785, de uma nobre família do sul de França. Em 1805, antes de completar 20 anos, foi nomeado auditor do Conselho do Estado. Era um jovem muito competente e talentoso. Poderia aspirar a uma linda e ambiciosa carreira pelo mundo. Mas, sem hesitar, aos 23 anos largou tudo para ingressar ao Seminário.",
    fullDescription: `Carlos Augusto Maria José de Forbin-Janson nasceu em Paris a 03 de Novembro de 1785, de uma nobre família do sul de França.

Missão
Em 1805, antes de completar 20 anos, foi nomeado auditor do Conselho do Estado. Era um jovem muito competente e talentoso. Poderia aspirar a uma linda e ambiciosa carreira pelo mundo. Mas, sem hesitar, aos 23 anos largou tudo para ingressar ao Seminário. Viu-se chamado ao sacerdócio numa época em que a situação da Igreja da França era, particularmente, muito delicada. O imperador francês estava numa luta aberta com o Papa. Foi ordenado sacerdote em 1811.

No dia 24 de Junho de 1824, aos 39 anos, Carlos de Forbin-Janson foi nomeado bispo de Nancy e Primado de Lorena. Mas, em 1830, por questões políticas teve de abandonar a diocese. Possuía um grande ardor pela vocação missionária. Em colaboração com o Pe. Rauzan, do clero diocesano, fundou a Missão de França e percorreu todo país fazendo pregações missionárias, sempre com muito zelo e talento. Um artigo publicado em Marselha sobre Forbin-Janson afirma: "zelo apostólico missionário, eloquência nas pregações, grande domínio da Sagrada Escritura" … Homem de puro estilo missionário. A sua dedicação às pessoas era intensa. Tanto de dia, como de noite, sempre se encontrava disposto a servir, desde os mais pobres até aos mais afortunados, inclusive diante do rei e de família real. A sua caridade não tinha limites.

Fundação da Obra da Santa Infância Missionária
Como Sacerdote e Bispo, sempre se sentiu impulsionado pelos sinais dos tempos, inspirado por iniciativas a favor da caridade missionária da Igreja. Muito preocupado com as crianças, encontrou-se em Lyon (1843) com Paulina Jaricot (fundadora da Obra da Propagação da Fé), que o apoio plenamente no seu projecto de ajudar as crianças no mundo inteiro, através do lema: "crianças ajudam e evangelizam crianças". O Projecto nasceu e cresceu e foi fundada a 19 de Maio de 1843.

Dom Carlos de Forbin-Janson teve os seguintes objectivos para fundar a Infância Missionária:
 Salvar as crianças da morte e da miséria
 Baptizá-las e dá-las educação cristã
 Prepará-las para serem apóstolos das crianças

Morte
No dia 11 de Julho, um ano após a fundação desta Obra, morre Dom Carlos de Forbin-Janson. Em Maio de 1845, a Obra da Infância Missionária já estava organizada em 61 dioceses da França. Somente esta obra teve o privilégio de ser fundada por um bispo e isto, em parte, talvez explicou seu crescimento e expansão tão rapidamente, num espaço de tempo tão curto. O crescimento continuou não em países de tradição católica, mas também em nações e territórios de missão. Os primeiros Padres nativos da Uganda, ordenados em 1913, foram membros desta Obra, quando crianças.`,
    obra: "Obra da Santa Infância Missionária",
  },
  {
    name: "Joana Bigard",
    description:
      "Joana Bigard nasceu na cidade de Coutances, Normandia, França, a 2 de Dezembro de 1859, numa família abastada, filha de Victor Bigard e Estefânia Bigard. Aos 14 anos já demonstrava interesse em ingressar na vida religiosa. Em sua vida familiar passou por momentos muito trágicos: perdeu o pai, quando tinha 19 anos e seu irmão, René, logo depois, aos 28 anos.",
    fullDescription: `Joana Bigard nasceu na cidade de Coutances, Normandia, França, a 2 de Dezembro de 1859, numa família abastada, filha de Victor Bigard e Estefânia Bigard.

Vida Religiosa
Aos 14 anos já demonstrava interesse em ingressar na vida religiosa. Em sua vida familiar passou por momentos muito trágicos: perdeu o pai, quando tinha 19 anos e seu irmão, René, logo depois, aos 28 anos. Aos 23 anos de idade, consagrou a sua vida ao amor e fidelidade a Jesus Cristo. Sofreu muito por causa desta sua consagração.

Joana Bigard herdou da sua mãe Estefânia um profundo interesse pela vida espiritual e, por conseguinte, desenvolveu um forte sentimento pelas necessidades dos operários do Evangelho, mas especialmente pelos sacerdotes comprometidos no campo das missões. Apesar da sua timidez e da sua própria saúde precária, comprometeu-se profundamente neste ideal, que se tornaria a finalidade de toda sua vida. Por isso, começou a percorrer todas as dioceses de França e viajou pelo estrangeiro, chegando mesmo a Roma (Itália).

Depois de ter oferecido uma grande ajuda económica para a construção da igreja de São Francisco Xavier, em Quioto (Japão), e após o falecimento de seu pai, Joana vendeu tudo e retirou-se com a mãe para viver em dois quartos, pequenos e miseráveis, para assim poder destinar todos os seus bens às missões. Manteve uma assídua correspondência epistolar com os missionários e respondeu prontamente ao pedido de Dom Cousin, comprometendo-se na angariação dos fundos necessários para a construção de um seminário no Japão.

Fundação da Obra de São Pedro Apóstolo
Joana gostava de se definir como uma "cabeça de ferro", pela sua tenacidade na realização das actividades que tinha em mente, mas depressa os projectos passaram a ser tão numerosos, e alguns dos quais eram tão prolongados, que ela compreendeu que, sem uma organização, não poderia cumprir a sua tarefa de assistência às missões.

O Espírito Santo suscitou uma mulher leiga, Joana Bigard, que, com sua mãe Estefânia Bigard, sentem a necessidade da formação do clero nativo, em terras de missão. Sentiram o chamamento de Deus, diz João Paulo II, e consagraram todos os bens, energias e as suas vidas na propagação do Evangelho promovendo a formação dos sacerdotes, homens e mulheres consagrados à vida religiosa.

Joana e sua mãe souberam assumir com entusiasmo e tenacidade um instrumento válido para a realização deste nobre compromisso. Conhecem o Evangelho e a história das missões no mundo. Joana comunica-se com Pe. Villion, grande missionário no Japão e, através deste, com Dom Cousin, bispo de Nagasaki, cuja comunidade era nova e antiga. Nova, porque o bispo acabava de congregá-la, antiga, porque sua origem remontava há 250 anos, tempos de São Francisco Xavier. A fé foi sendo alimentada de pai para filho… durante esses 250 anos. Agora reconhecida a liberdade religiosa, um bispo os congregava.

Foi organizado um pequeno seminário com a capacidade de 50 alunos. No dia da inauguração apareceram mais. Escreve uma carta à Joana pedindo-lhe uma ajuda para ampliar o seminário e manter os seminaristas para não ter que dispensar essas vocações.

A Obra de São Pedro Apóstolo teve início no dia 01 de Junho de 1889, em Caen (França), foi aprovada oficialmente em 1895, com uma bênção do Papa Leão XIII.

Morte
Depois da morte da mãe Estefânia, no dia 05 de Janeiro de 1903, Joana Bigard foi atingida por uma forte depressão, que transformou a sua vida num angustiante calvário. Consciente da sua situação, confiou a Obra às Irmãs Franciscanas Missionárias de Maria, de Friburgo. Depois de várias hospitalizações em várias clínicas e do agravamento do seu estado mental, Joana foi transferida para a casa das Irmãs de São José, em Aleçon (França), onde veio a falecer aos 18 de Abril de 1934.

Joana Bigard deixou como herança à Igreja uma forte consciência da universalidade do compromisso missionário, uma nítida consciência da importância do clero indígena, com uma visão profética para a sua época, uma maior sensibilidade do laicado para a mobilização espiritual e humana das Igrejas mais antigas, num contexto de solidariedade para com as Igrejas jovens: sementes de uma primavera missionária, que haveriam de florescer em todos os sectores da Igreja em missão.

Em 1903, escreveu ela: "Deus me faz pagar caro a hora de ser chamada a mãe dos sacerdotes. Os queridos seminaristas nunca saberão quanto isso me custou".`,
    obra: "Obra de São Pedro Apóstolo",
  },
  {
    name: "Bem-Aventurado Paulo Manna",
    description:
      "Quinto dos seis filhos de Vincenzo e Lorenza Ruggiero, Paulo Manna nasceu no dia 16 de Janeiro de 1872, em Avelino, Itália. Em 1887 ingressou nos Salvatorianos, pois desejava ardentemente ser missionário. Em 1891 deixou a congregação Salvatoriana para ingressar no Seminário Lombardo para as Missões Estrangeiras de Milão e foi ordenado sacerdote em 1894, aos 24 anos de idade.",
    fullDescription: `Bem-Aventurado Paulo Manna

Quinto dos seis filhos de Vincenzo e Lorenza Ruggiero, Paulo Manna nasceu no dia 16 de Janeiro de 1872, em Avelino, Itália.

Vida Religiosa
Em 1887 ingressou nos Salvatorianos, pois desejava ardentemente ser missionário. Em 1891 deixou a congregação Salvatoriana para ingressar no Seminário Lombardo para as Missões Estrangeiras de Milão e foi ordenado sacerdote em 1894, aos 24 anos de idade. Neste mesmo ano foi enviado à Birmânia para trabalhar entre os indígenas da tribo Ghekku. Aí permaneceu durante 12 anos e fundou a missão de Mamblò.

Destacou-se através dos conhecimentos linguísticos e métodos de inculturação. Em 1907, por graves motivos de saúde teve de voltar à Itália e passou a dedicar-se na promoção, sensibilização e consciencialização dos missionários dos cristãos, revelando os seus talentos de organizador e escritor.

Em 1909 publica o livro "Operatti autem pauci", com cinco edições e várias traduções. Escreveu inúmeros livros e estudos sobre as missões. Com as suas animações e declarações ponderadas e cheias de ímpetos, o Beato Padre Manna procedeu de maneira profética o Concílio Ecuménico Vaticano II, várias das suas ideias foram, depois, retomadas nos documentos missionários: Ad Gentes (cf. 2 e 39); Lumen Gentium (cf. 28); Optatam Totius (cf. 20); Unitatis Redintegratio e Nostra Aetate.

Fundação da Obra União Missionária
Paulo Manna fundou a Obra da União Missionária graças a colaboração de Guido Maria Conforti, bispo de Parma e fundador do Instituto Missionário Xaveriano. Foi fundada a 31 de Outubro de 1916, e aprovada pelo Papa Bento XV.

A Obra da União Missionária ficou conhecida e difundida rapidamente. Tudo isso graças a sua personalidade como escritor.

Outros cargos que ocupou
Por encargo da "Propagação Fide", em 1921 fundou na localidade de Ducenta, Caserta (Itália), Seminário Meridional para as Missões Estrangeiras e em 1924 foi nomeado Superior-Geral do Instituto Missionário.

Em 1926, foi nomeado Superior Geral do Pontifício Instituto para as Missões Estrangeiras. 11 anos mais tarde a Propagação Fide nomeou-o como chefe do Secretariado Internacional da União Missionária do Clero, permitindo-lhe retomar o contacto directo com o clero italiano e do mundo. Logo após editou o livro "O problema missionário e os sacerdotes".

Enquanto na Itália ainda ocorria a II Guerra Mundial, em 1943 foi nomeado Superior Regional do PIME para a Itália Meridional. Dois anos mais tarde dedicou a sua vida à sua última revista missionária "Venga il Tuo Regno", destinada às famílias.

Morte
Morreu em Nápoles, a 15 de Novembro de 1952. Os seus restos mortais repousam em Ducenta, no seu "Seminário", que, em 13 de Setembro de 1990, foi visitado pelo Papa João Paulo II.

Após a sua morte, a Obra da União Missionária já estava implantada em mais de 50 países. Hoje, são mais de 100, a maior parte dos países onde estão organizadas as Obras Missionárias Pontifícias. A figura desta Obra Pontifícia pode ser assim resumida: um homem com temperamento de fogo que queria realizar a exclamação de Paulo: "Ele deve reinar" (1 Co 15, 25). Convencido de que a salvação das almas constitui a lei suprema e que toda Igreja deve comprometer-se ao serviço de todos os homens. Ele foi com a sua palavra e com os seus actos, um dos grandes motivadores do renovado impulso missionário dos novos tempos dentro da Igreja.

Beatificação
Iniciado em Nápoles em 1971, o processo para a causa da beatificação foi concluído em Roma, aos 24 de Abril, com o decreto papal sobre o milagre atribuído ao Servo de Deus. Foi beatificado pelo Papa João Paulo II, aos 04 de Novembro de 2001. O seu biógrafo justamente o definiu "uma alma de fogo". O seu lema foi sempre: "Toda a Igreja, para todo o mundo!".`,
    obra: "Obra da União Missionária",
  },
];

const oracoes = [
  {
    title: "Credo Missionário",
    icon: FaBook,
    description:
      "Cremos que Deus nos escolheu desde o seio materno, chamou-nos por sua graça e resolveu revelar a nós o seu Filho, para que o anunciássemos até aos confins da terra. Cremos ser missionários e missionárias por vocação, servos e servas de Jesus Cristo, escolhidos e escolhidas para anunciar o evangelho de Deus. Cremos que a missão não vem de nós, ela é a resposta ao Plano do Pai, que, em seu imenso amor, que a salvação da humanidade e, por isso lhe 'deu Filho único, para todo que nele crer não pereça, mas tenha a vida eterna.'",
  },
  {
    title: "Pai Nosso Missionário",
    icon: FaPray,
    description:
      "Pai dos mais de seis bilhões de pessoas que povoam a terra. Que estais no Céu. Na nossa família, no nosso país e em todo mundo. Santificado seja o Vosso nome. Sobretudo na pessoa do mais pobre e dos abandonados. Venha a nós o vosso reino. E aos irmãos dos cinco continente, sobretudo os que não vos conhecem. Seja feita a vossa vontade assim na terra como no Céu. Para que todos vivam na justiça, na paz, no amor e sigam pelo caminho da verdade.",
  },
];

export default function SobrePage() {
  const [openOracao, setOpenOracao] = useState<number | null>(null);
  const [openPadroeiro, setOpenPadroeiro] = useState<number | null>(null);
  const [openFundador, setOpenFundador] = useState<number | null>(null);
  const [showFullDescription, setShowFullDescription] = useState<
    Record<string, boolean>
  >({});

  const toggleFullDescription = (
    index: number,
    type: "padroeiro" | "fundador"
  ) => {
    const key = `${type}-${index}`;
    setShowFullDescription((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section className="bg-gray-50 flex flex-col justify-center items-center">
      <div className="relative h-[60vh] w-full flex flex-col justify-center items-center">
        <Image
          src="/movimento12.jpeg"
          alt="Obras Missionárias Pontifícias"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/65 flex items-center">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Obras Missionárias Pontifícias
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto"
            >
              No coração da Igreja, a serviço da missão universal de anunciar
              Cristo a todos os povos.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Identidade Missionária
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            As Obras Missionárias Pontifícias são o instrumento oficial da
            Igreja Católica para despertar, animar e sustentar a cooperação
            missionária universal, colocando todas as Igrejas locais em comunhão
            com a missão evangelizadora confiada por Cristo. As OMP têm como
            finalidade{" "}
            <span className="font-semibold text-yellow-600">
              "Promover o espírito missionário universal em todo o povo de
              Deus".
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold mb-3 text-center">
            Origem e Reconhecimento
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed text-center">
            Surgidas no século XIX a partir da fé viva de leigos comprometidos,
            especialmente com Pauline Jaricot, as Obras Missionárias foram
            reconhecidas como Pontifícias em 1922 pelo Papa Pio XI, tornando-se
            expressão direta da solicitude missionária do Santo Padre.
          </p>
        </motion.div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-16 w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Padroeiros das Missões
          </h2>
          <p className="text-gray-600 text-lg">
            Conheça os santos padroeiros que inspiram o trabalho missionário
          </p>
        </div>

        <div className="space-y-6 mb-16">
          {padroeiros.map((padroeiro, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenPadroeiro(openPadroeiro === index ? null : index)
                }
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="text-left">
                    <h3 className="text-xl font-bold">{padroeiro.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Clique para{" "}
                      {openPadroeiro === index ? "fechar" : "expandir"}{" "}
                      informações
                    </p>
                  </div>
                </div>
                <div className="p-2">
                  <motion.div
                    animate={{ rotate: openPadroeiro === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {openPadroeiro === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 border-t">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:w-2/5">
                          <div className="relative h-64 lg:h-auto lg:min-h-100 w-full rounded-lg overflow-hidden shadow-lg">
                            <Image
                              src={padroeiro.image}
                              alt={padroeiro.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 100vw, 40vw"
                            />
                          </div>
                          <div className="mt-4 text-center space-y-2">
                            <span className="inline-block px-4 py-2 text-sm font-semibold bg-yellow-500 text-white rounded-full">
                              Padroeiro das Missões
                            </span>
                            <div className="flex flex-col items-center mt-3 text-gray-600">
                              <div className="flex items-center gap-2">
                                <FaHistory className="w-4 h-4" />
                                <span className="font-medium">
                                  Festa Litúrgica:
                                </span>
                              </div>
                              <span className="mt-1">
                                {padroeiro.name.includes("Francisco")
                                  ? "03 de Dezembro"
                                  : "01 de Outubro"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="lg:w-3/5">
                          <div className="prose prose-lg max-w-none">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-4">
                              {showFullDescription[`padroeiro-${index}`]
                                ? padroeiro.fullDescription
                                : padroeiro.description}
                            </p>

                            {padroeiro.fullDescription.length >
                              padroeiro.description.length && (
                              <button
                                onClick={() =>
                                  toggleFullDescription(index, "padroeiro")
                                }
                                className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-medium transition-colors mb-4"
                              >
                                {showFullDescription[`padroeiro-${index}`] ? (
                                  <>
                                    <FaChevronUp className="w-4 h-4" />
                                    Ver menos
                                  </>
                                ) : (
                                  <>
                                    <FaChevronDown className="w-4 h-4" />
                                    Ler história completa
                                  </>
                                )}
                              </button>
                            )}

                            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                              <div className="flex items-center gap-2 text-gray-600">
                                <span className="font-medium">
                                  Proclamado Padroeiro:
                                </span>
                                <span>
                                  14 de Dezembro de 1928 pelo Papa Pio XI
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <span className="font-medium">Título:</span>
                                <span>
                                  {padroeiro.name.includes("Francisco")
                                    ? "Apóstolo do Oriente"
                                    : "Doutora da Igreja"}
                                </span>
                              </div>
                              {padroeiro.name.includes("Teresinha") && (
                                <div className="text-gray-600">
                                  <span className="font-medium">
                                    Também conhecida como:
                                  </span>
                                  <span className="ml-2">
                                    Santa das Rosas, Pequena Flor
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Fundadores das Obras Missionárias
          </h2>
          <p className="text-gray-600 text-lg">
            Conheça as pessoas inspiradas por Deus para fundar as Obras
            Missionárias Pontifícias
          </p>
        </div>

        <div className="space-y-6 mb-16">
          {fundadores.map((fundador, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenFundador(openFundador === index ? null : index)
                }
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="text-left">
                    <h3 className="text-xl font-bold">{fundador.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500">
                        Clique para{" "}
                        {openFundador === index ? "fechar" : "expandir"}{" "}
                        informações
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <motion.div
                    animate={{ rotate: openFundador === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {openFundador === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 border-t">
                      <div className="flex flex-col">
                        <div className="mb-6">
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full mb-4">
                            <FaUserFriends className="w-4 h-4 text-yellow-600" />
                            <span className="font-semibold text-yellow-700">
                              {fundador.obra}
                            </span>
                          </div>
                        </div>

                        <div className="prose prose-lg max-w-none">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-4">
                            {showFullDescription[`fundador-${index}`]
                              ? fundador.fullDescription
                              : fundador.description}
                          </p>

                          {fundador.fullDescription.length >
                            fundador.description.length && (
                            <button
                              onClick={() =>
                                toggleFullDescription(index, "fundador")
                              }
                              className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-medium transition-colors mb-6"
                            >
                              {showFullDescription[`fundador-${index}`] ? (
                                <>
                                  <FaChevronUp className="w-4 h-4" />
                                  Ver menos
                                </>
                              ) : (
                                <>
                                  <FaChevronDown className="w-4 h-4" />
                                  Ler história completa
                                </>
                              )}
                            </button>
                          )}

                          <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                            <div className="flex items-center gap-2 text-gray-600">
                              <span className="font-medium">Status:</span>
                              <span>
                                {fundador.name.includes("Paulo Manna")
                                  ? "Beato"
                                  : fundador.name.includes("Paulina")
                                  ? "Venerável"
                                  : "Servo(a) de Deus"}
                              </span>
                            </div>
                            {fundador.name.includes("Paulo Manna") && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <span className="font-medium">
                                  Beatificação:
                                </span>
                                <span>
                                  04 de Novembro de 2001 pelo Papa João Paulo II
                                </span>
                              </div>
                            )}
                            {fundador.name.includes("Paulina") && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <span className="font-medium">
                                  Declarada Venerável:
                                </span>
                                <span>
                                  25 de Fevereiro de 1963 pelo Papa João XXIII
                                </span>
                              </div>
                            )}
                            <div className="text-gray-600">
                              <span className="font-medium">Contribuição:</span>
                              <span className="ml-2">
                                Fundação de uma das quatro Obras Missionárias
                                Pontifícias
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            As Quatro Obras Missionárias
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Unidas num único espírito missionário, as OMP atuam de forma
            complementar, garantindo formação, animação, espiritualidade e
            partilha solidária.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {obras.map((obra, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative h-72">
                <Image
                  src={obra.image}
                  alt={obra.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              </div>
              <div className="p-6">
                <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold bg-yellow-500 text-white rounded-full">
                  {obra.first}
                </span>
                <h3 className="text-xl font-bold mb-3">{obra.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {obra.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white py-20 w-full">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Orações Missionárias
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Orai sem cessar pelos missionários e pela evangelização dos povos
            </p>
          </motion.div>

          <div className="space-y-6">
            {oracoes.map((oracao, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenOracao(openOracao === index ? null : index)
                  }
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                      <oracao.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold">{oracao.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Clique para{" "}
                        {openOracao === index ? "fechar" : "expandir"} oração
                      </p>
                    </div>
                  </div>
                  <div className="p-2">
                    <motion.div
                      animate={{ rotate: openOracao === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaChevronDown className="w-5 h-5 text-gray-500" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {openOracao === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t">
                        <div className="bg-green-50 p-4 rounded-lg mb-6">
                          <p className="text-gray-700 italic text-center font-medium">
                            "Rezai sem cessar" - 1 Tessalonicenses 5:17
                          </p>
                        </div>
                        <div className="prose prose-lg max-w-none">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {oracao.description}
                          </p>
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-100">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <oracao.icon className="w-4 h-4" />
                            <span className="font-medium">
                              Oração recomendada para todos os missionários
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-20 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Estrutura e Organização
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
              As Obras Missionárias Pontifícias atuam em nível universal,
              nacional e diocesano. Na Arquidiocese de Luanda, o Secretariado
              Arquidiocesano coordena a animação missionária, promove a formação
              pastoral e fortalece a comunhão entre vigararias, paróquias,
              movimentos e comunidades.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
