import type { Localized } from "@/lib/i18n";

export const profile = {
  name: "Diego Dallaqua",
  role: {
    pt: "Desenvolvedor Full Stack",
    en: "Full Stack Developer",
  } satisfies Localized,
  location: {
    pt: "Presidente Prudente, SP",
    en: "Presidente Prudente, Brazil",
  } satisfies Localized,
  bio: {
    pt: "Desenvolvedor Full Stack formado em Ciência da Computação pela UTFPR. Eu crio aplicativos de ponta a ponta, da API à interface, com Flutter, Node.js/TypeScript, Java/Spring e React. Estou procurando minha primeira vaga júnior, onde posso desenvolver minhas habilidades e entregar produtos simples de usar e fáceis de manter.",
    en: "Full-stack developer with a degree in Computer Science from UTFPR. I build end-to-end applications, from APIs to interfaces, with Flutter, Node.js/TypeScript, Java/Spring, and React. I'm looking for my first junior position where I can develop my skills and deliver simple-to-use, easy-to-maintain products.",
  } satisfies Localized,
  philosophy: {
    pt: "Fazer bem feito é uma forma silenciosa de respeitar quem vem depois.",
    en: "Doing it well is a quiet way of respecting whoever comes after.",
  } satisfies Localized,
  email: "dldallaquapro@gmail.com",
  linkedin: "https://www.linkedin.com/in/diego-dallaqua/",
  github: "https://github.com/diegodallaqua",
};

/**
 * Linha do tempo da página inicial.
 *
 * `text: null` marca um trecho que ainda não foi escrito: a página mostra uma
 * célula vazia com o rótulo de `pending`. Para preencher, troque `null` pelo
 * texto nos dois idiomas (e `when` pelo período, se houver).
 */
export type TimelineEntry = {
  id: string;
  label: Localized;
  when: Localized | null;
  text: Localized | null;
  pending?: Localized;
  projectSlug?: string;
};

export const timeline: TimelineEntry[] = [
  {
    id: "formacao",
    label: { pt: "Formação", en: "Education" },
    when: { pt: "2022 – 2026", en: "2022 – 2026" },
    text: {
      pt: "Bacharelado em Ciência da Computação na UTFPR. Antes, curso técnico em Eletroeletrônica no SENAI Santo Paschoal Crepaldi (2019 – 2020).",
      en: "BSc in Computer Science at UTFPR (Universidade Tecnológica Federal do Paraná). Before that, a technical course in Electronics at SENAI Santo Paschoal Crepaldi (2019 – 2020).",
    },
  },
  {
    id: "experiencia",
    label: { pt: "Experiência", en: "Experience" },
    when: { pt: "ago 2023 – set 2024", en: "Aug 2023 – Sep 2024" },
    text: {
      pt: "Estágio em desenvolvimento Flutter na UTFPR Campus Santa Helena. Construí telas e fluxos do Manejo App, aplicativo multiplataforma feito com o SENAR-PR para ajudar produtores rurais no manejo de pragas e doenças, integrado a uma API REST em Node.js.",
      en: "Flutter development intern at UTFPR Santa Helena. I built screens and flows for Manejo App, a cross-platform app made with SENAR-PR to help farmers manage pests and diseases, connected to a Node.js REST API.",
    },
  },
  {
    id: "tcc",
    label: { pt: "Trabalho de conclusão", en: "Final project" },
    when: { pt: "ago 2025 – jul 2026", en: "Aug 2025 – Jul 2026" },
    text: {
      pt: "Estágio em desenvolvimento full stack, entregue como TCC: o Rede Campo Online, desenvolvido com uma API REST em Node.js e TypeScript, banco de dados com MariaDB e interface em Flutter Web. Alcançou a pontuação de 4,83 na escala de usabilidade SUS e uma média de 93,5 no Lighthouse.",
      en: "Full-stack development internship, delivered as my final project: Rede Campo Online, featuring a Node.js and TypeScript REST API, a MariaDB database and a Flutter Web developed interface. It achieved a score of 4.83 on the SUS usability scale, with a 93.5 Lighthouse average.",
    },
    projectSlug: "rede-campo-online",
  },
  {
    id: "certificacoes",
    label: { pt: "Certificações", en: "Certifications" },
    when: { pt: "2026", en: "2026" },
    text: {
      pt: "Quality Assurance, pela GFT, e Java com IA, pelo Itaú.",
      en: "Quality Assurance, by GFT, and Java with AI, by Itaú.",
    },
  },
  {
    id: "hoje",
    label: { pt: "Hoje", en: "Now" },
    when: null,
    text: {
      pt: "Desenvolvedor Full Stack em Presidente Prudente, SP, em busca de oportunidades.",
      en: "Full Stack Developer in Presidente Prudente, Brazil, looking for opportunities.",
    },
  },
];
