import type { Localized } from "@/lib/i18n";

/**
 * Captura de tela de um projeto.
 *
 * Sem `src`, a página mostra uma célula vazia rotulada com `caption`. Para
 * publicar a captura, coloque o arquivo em `public/projects/<slug>/` e
 * preencha `src`, `width`, `height` e `alt`.
 */
export type Shot = {
  frame: "desktop" | "mobile";
  caption: Localized;
  src?: string;
  width?: number;
  height?: number;
  alt?: Localized;
};

export type Side = {
  /** Título do lado: "API", "Front end", "Conteúdo e servidor"... */
  title: Localized;
  /**
   * Repositório no GitHub. `public: false` mostra o nome sem link (repositório
   * privado); troque para `true` quando ele for aberto.
   */
  repo: { name: string; url: string; public: boolean };
  stack: string[];
  highlights: Localized<string[]>;
};

/**
 * Amostra real de API mostrada no painel "API": requisição e resposta
 * copiadas dos READMEs ou do código de cada repositório.
 */
export type ApiSample = {
  title: Localized;
  code: Localized;
};

export type Project = {
  slug: string;
  name: string;
  /** Endereço da plataforma no ar. Sem ele, a página não mostra o link. */
  liveUrl?: string;
  api: ApiSample;
  kind: Localized;
  summary: Localized;
  description: Localized<string[]>;
  backend: Side;
  frontend: Side;
  shots: Shot[];
  /** Observação honesta sobre o estado do projeto (dados de teste, licença...). */
  notes: Localized<string[]>;
  logo?: { src: string; width: number; height: number };
  /**
   * Marca impressa na capa do disco. `bleed: true` é uma arte com fundo
   * próprio, que ocupa a área inteira da capa em vez de ficar centralizada;
   * `focus` é o object-position do recorte (padrão: centro).
   */
  mark: {
    src: string;
    width: number;
    height: number;
    bleed?: boolean;
    focus?: string;
  };
};

const gh = (repo: string) => `https://github.com/diegodallaqua/${repo}`;

export const projects: Project[] = [
  {
    slug: "pontuo",
    name: "Pontuo",
    liveUrl: "https://pontuo.vercel.app",
    api: {
      title: { pt: "Desempenho por matéria", en: "Performance by subject" },
      code: {
        pt: `GET /api/performance/me/subjects
Authorization: Bearer <token>

200 OK
[
  { "id": 5, "description": "Biologia", "questions": 12,
    "answered": 11, "correct": 8, "accuracy": 66.67 },
  { "id": 7, "description": "Química", "questions": 8,
    "answered": 8, "correct": 3, "accuracy": 37.50 }
]`,
        en: `GET /api/performance/me/subjects
Authorization: Bearer <token>

200 OK
[
  { "id": 5, "description": "Biologia", "questions": 12,
    "answered": 11, "correct": 8, "accuracy": 66.67 },
  { "id": 7, "description": "Química", "questions": 8,
    "answered": 8, "correct": 3, "accuracy": 37.50 }
]`,
      },
    },
    kind: {
      pt: "Plataforma de simulados para vestibular",
      en: "Mock-exam platform for university entrance exams",
    },
    summary: {
      pt: "O estudante monta um simulado por área, matéria e vestibular, responde contra o relógio e acompanha a evolução do desempenho.",
      en: "Students build a mock exam by area, subject and entrance exam, answer against the clock and follow how their performance evolves.",
    },
    description: {
      pt: [
        "O Pontuo prepara estudantes para vestibulares como ENEM, FUVEST e VUNESP. O catálogo organiza instituições, vestibulares, áreas do conhecimento, matérias, tópicos e questões de múltipla escolha.",
        "O simulado é montado, corrigido e travado no servidor. O gabarito nunca chega ao estudante antes da resposta, e o desempenho é calculado por área, matéria, tópico e dificuldade.",
      ],
      en: [
        "Pontuo prepares students for Brazilian entrance exams such as ENEM, FUVEST and VUNESP. The catalog organizes institutions, exams, knowledge areas, subjects, topics and multiple-choice questions.",
        "Each mock exam is drawn, graded and locked on the server. The answer key never reaches the student before they answer, and performance is computed by area, subject, topic and difficulty.",
      ],
    },
    backend: {
      title: { pt: "API REST", en: "REST API" },
      repo: { name: "api-pontuo", url: gh("api-pontuo"), public: true },
      stack: [
        "Java 17",
        "Spring Boot 4",
        "Spring Security",
        "Spring Data JPA",
        "MariaDB",
        "Flyway",
        "JUnit",
        "Mockito",
        "GitHub Actions",
      ],
      highlights: {
        pt: [
          "Simulado montado no servidor: GET /api/questions/draw sorteia questões com filtros combinados.",
          "Correção feita e congelada no servidor no momento da resposta; o gabarito não vai para o estudante.",
          "JWT (HS256) com perfis Estudante e Administrador, senhas em BCrypt e logout por revogação do token.",
          "Desempenho por área, matéria, tópico e dificuldade, tópicos mais fracos e evolução simulado a simulado.",
          "Banco versionado em 16 migrations Flyway, com os 27 estados e as 5.571 cidades do Brasil já cadastrados.",
          "Testes unitários, web, de repositório e de integração; CI no GitHub Actions com MariaDB.",
        ],
        en: [
          "Server-side exam assembly: GET /api/questions/draw draws questions with combinable filters.",
          "Grading happens on the server and is frozen at answer time; the answer key never reaches the student.",
          "JWT (HS256) with Student and Administrator roles, BCrypt passwords and logout by token revocation.",
          "Performance by area, subject, topic and difficulty, weakest topics, and exam-by-exam progress.",
          "Database versioned in 16 Flyway migrations, seeded with Brazil’s 27 states and 5,571 cities.",
          "Unit, web, repository and integration tests; CI on GitHub Actions against MariaDB.",
        ],
      },
    },
    frontend: {
      title: { pt: "Aplicação web", en: "Web app" },
      repo: { name: "pontuo", url: gh("pontuo"), public: true },
      stack: [
        "React 19",
        "TypeScript",
        "Vite",
        "React Router",
        "Vitest",
        "Playwright",
      ],
      highlights: {
        pt: [
          "Montagem por área, disciplina, assunto, vestibular e dificuldade, mostrando quantas questões estão disponíveis.",
          "Execução com cronômetro, salvamento confirmado, retomada e finalização automática.",
          "Análise de desempenho com gráfico e tabela alternativa para leitores de tela.",
          "Código organizado por funcionalidade, com regras de domínio separadas de React e de HTTP.",
          "Testes unitários com Vitest e fluxos de navegador com Playwright sobre uma API simulada por contrato.",
          "Layout responsivo, teclado, foco visível, estados de carregamento, erro e vazio, e movimento reduzido.",
        ],
        en: [
          "Exam builder by area, subject, topic, entrance exam and difficulty, showing how many questions are available.",
          "Timed sessions with confirmed saving, resume and automatic submission.",
          "Performance analysis with a chart and an alternative table for screen readers.",
          "Feature-based code, with domain rules kept apart from React and HTTP.",
          "Unit tests with Vitest and browser flows with Playwright against a contract-mocked API.",
          "Responsive layout, keyboard support, visible focus, loading, error and empty states, and reduced motion.",
        ],
      },
    },
    shots: [
      {
        frame: "desktop",
        caption: { pt: "Visão geral do estudante", en: "Student overview" },
        src: "/projects/pontuo/dashboard-desktop.png",
        width: 1863,
        height: 878,
        alt: {
          pt: "Painel do Pontuo com simulados concluídos, aproveitamento geral, gráfico de evolução e simulados recentes.",
          en: "Pontuo dashboard with completed exams, overall accuracy, a progress chart and recent exams.",
        },
      },
      {
        frame: "mobile",
        caption: { pt: "Visão geral no celular", en: "Overview on mobile" },
        src: "/projects/pontuo/dashboard-mobile.png",
        width: 396,
        height: 791,
        alt: {
          pt: "Painel do Pontuo em tela de celular.",
          en: "Pontuo dashboard on a phone screen.",
        },
      },
      {
        frame: "desktop",
        caption: { pt: "Resultado do simulado", en: "Mock exam result" },
        src: "/projects/pontuo/result-desktop.png",
        width: 1440,
        height: 1044,
        alt: {
          pt: "Resultado de um simulado com aproveitamento, acertos, erros e conferência das respostas.",
          en: "Mock exam result with accuracy, right and wrong answers, and an answer review.",
        },
      },
      {
        frame: "mobile",
        caption: { pt: "Entrada no celular", en: "Sign-in on mobile" },
        src: "/projects/pontuo/login-mobile.png",
        width: 397,
        height: 789,
        alt: {
          pt: "Tela de login do Pontuo em celular.",
          en: "Pontuo sign-in screen on a phone.",
        },
      },
    ],
    notes: {
      pt: [
        "Capturas geradas pelos testes de navegador, com dados de teste.",
        "API sob licença MIT.",
      ],
      en: [
        "Captures produced by the browser tests, with test data.",
        "API released under the MIT license.",
      ],
    },
    // Recorte puxado para baixo: o "P" sobe e fica no centro óptico da capa.
    mark: {
      src: "/projects/pontuo/alter-logo.png",
      width: 1254,
      height: 1254,
      bleed: true,
      focus: "50% 50%",
    },
  },
  {
    slug: "rede-campo-online",
    name: "Rede Campo Online",
    api: {
      title: { pt: "Recursos da API", en: "API resources" },
      code: {
        pt: `GET /health
200 OK
{ "ok": true }

GET  /news            // leitura pública
POST /news            // Authorization: Bearer <token>
GET  /publications    // artigos, teses, livros, capítulos
POST /images          // upload para o Cloudflare R2, variantes WebP`,
        en: `GET /health
200 OK
{ "ok": true }

GET  /news            // public read
POST /news            // Authorization: Bearer <token>
GET  /publications    // articles, theses, books, chapters
POST /images          // upload to Cloudflare R2, WebP variants`,
      },
    },
    kind: {
      pt: "Site e painel do grupo de pesquisa Rede Campo",
      en: "Website and admin panel for the Rede Campo research group",
    },
    summary: {
      pt: "Plataforma pública de notícias, projetos, eventos, publicações e membros, com painel administrativo para o grupo manter todo o conteúdo.",
      en: "A public platform for news, projects, events, publications and members, with an admin panel where the group maintains all content.",
    },
    description: {
      pt: [
        "Desenvolvido como Trabalho de Conclusão de Curso para o grupo de pesquisa Rede Campo. A área pública reúne notícias, projetos, eventos, membros e publicações acadêmicas: artigos, teses, livros e capítulos.",
        "O painel administrativo, protegido por login, gerencia todo esse conteúdo. Front end e API foram escritos do zero e conversam por uma API REST própria.",
      ],
      en: [
        "Built as an undergraduate final project for the Rede Campo research group. The public area brings together news, projects, events, members and academic publications: articles, theses, books and chapters.",
        "A login-protected admin panel manages all of that content. Front end and API were written from scratch and talk over their own REST API.",
      ],
    },
    backend: {
      title: { pt: "API REST", en: "REST API" },
      repo: {
        name: "API-rede-campo-online",
        url: gh("API-rede-campo-online"),
        public: true,
      },
      stack: [
        "Node.js",
        "TypeScript",
        "Express",
        "TypeORM",
        "MariaDB",
        "TSyringe",
        "Celebrate",
        "Sharp",
        "Cloudflare R2",
      ],
      highlights: {
        pt: [
          "25 recursos REST organizados por domínio: membros, projetos, eventos, notícias e publicações.",
          "Arquitetura modular com DDD e Clean Architecture, injeção de dependência com TSyringe e TypeScript strict.",
          "JWT com blacklist no logout e validação declarada nas rotas com Celebrate e Joi.",
          "Imagens no Cloudflare R2, com variantes WebP geradas pelo Sharp.",
          "Helmet, CORS e rate limit na camada HTTP; schema versionado por migrations.",
        ],
        en: [
          "25 REST resources organized by domain: members, projects, events, news and publications.",
          "Modular architecture with DDD and Clean Architecture, dependency injection with TSyringe and strict TypeScript.",
          "JWT with a logout blacklist and route-level validation with Celebrate and Joi.",
          "Images stored on Cloudflare R2, with WebP variants generated by Sharp.",
          "Helmet, CORS and rate limiting at the HTTP layer; schema versioned through migrations.",
        ],
      },
    },
    frontend: {
      title: {
        pt: "Site e painel em Flutter Web",
        en: "Flutter Web site and panel",
      },
      repo: {
        name: "rede_campo_online",
        url: gh("rede_campo_online"),
        public: true,
      },
      stack: ["Flutter Web", "Dart", "MobX", "GetIt", "go_router"],
      highlights: {
        pt: [
          "Área pública com home, sobre, notícias, projetos, eventos, publicações e membros.",
          "Painel em /admin protegido por login JWT, com guarda de rota.",
          "Arquitetura feature-first com stores MobX e listagens paginadas genéricas reaproveitadas no painel.",
          "Versão desktop e versão mobile de cada tela, com breakpoints responsivos.",
          "Upload de mídia com recorte de imagem e cache das imagens de rede.",
        ],
        en: [
          "Public area with home, about, news, projects, events, publications and members.",
          "Admin panel at /admin behind JWT login, with a route guard.",
          "Feature-first architecture with MobX stores and generic paginated lists reused across the panel.",
          "A desktop and a mobile version of every screen, with responsive breakpoints.",
          "Media upload with image cropping and cached network images.",
        ],
      },
    },
    shots: [
      {
        frame: "desktop",
        caption: { pt: "Página inicial", en: "Home page" },
        src: "/projects/rede-campo-online/home-desktop.png",
        width: 1919,
        height: 942,
        alt: {
          pt: 'Página inicial da Rede Campo com o título "Levando inovação e tecnologia até o produtor!" e o botão "Veja Nossos Projetos".',
          en: 'Rede Campo home page with the headline "Levando inovação e tecnologia até o produtor!" and a button to the projects.',
        },
      },
      {
        frame: "mobile",
        caption: { pt: "Página inicial no celular", en: "Home page on mobile" },
        src: "/projects/rede-campo-online/home-mobile.png",
        width: 397,
        height: 851,
        alt: {
          pt: 'Página inicial da Rede Campo em tela de celular, com menu recolhido e a seção "Sobre nós".',
          en: 'Rede Campo home page on a phone screen, with a collapsed menu and the "Sobre nós" section.',
        },
      },
      {
        frame: "desktop",
        caption: { pt: "Página sobre o grupo", en: "About page" },
        src: "/projects/rede-campo-online/about-us-desktop.png",
        width: 1919,
        height: 942,
        alt: {
          pt: 'Página "A Rede Campo" com a apresentação do grupo, missão, visão e valores.',
          en: 'The "A Rede Campo" page with the group’s introduction, mission, vision and values.',
        },
      },
      {
        frame: "mobile",
        caption: {
          pt: "Entrada no painel pelo celular",
          en: "Admin sign-in on mobile",
        },
        src: "/projects/rede-campo-online/login-mobile.png",
        width: 399,
        height: 856,
        alt: {
          pt: "Tela de login do painel administrativo da Rede Campo Online em celular.",
          en: "Rede Campo Online admin sign-in screen on a phone.",
        },
      },
    ],
    notes: {
      pt: [
        "Repositórios públicos apenas para portfólio; não é software open source.",
      ],
      en: [
        "Repositories are public for portfolio purposes only; this is not open-source software.",
      ],
    },
    logo: {
      src: "/projects/rede-campo-online/logo-white.png",
      width: 707,
      height: 353,
    },
    mark: {
      src: "/projects/rede-campo-online/mark-mono.png",
      width: 1041,
      height: 693,
    },
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);

/**
 * Matriz de tecnologias da página inicial: em quais projetos cada uma aparece.
 */
export type StackGroup = {
  id: string;
  title: Localized;
  rows: { name: string; projects: string[] }[];
};

export const stackMatrix: StackGroup[] = [
  {
    id: "back",
    title: { pt: "Back end", en: "Back end" },
    rows: [
      { name: "Java", projects: ["pontuo"] },
      { name: "Spring Boot", projects: ["pontuo"] },
      { name: "Node.js", projects: ["rede-campo-online"] },
      { name: "Express", projects: ["rede-campo-online"] },
      { name: "TypeORM", projects: ["rede-campo-online"] },
      { name: "MariaDB / MySQL", projects: ["pontuo", "rede-campo-online"] },
      { name: "Flyway", projects: ["pontuo"] },
    ],
  },
  {
    id: "front",
    title: { pt: "Front end", en: "Front end" },
    rows: [
      { name: "TypeScript", projects: ["pontuo"] },
      { name: "React", projects: ["pontuo"] },
      { name: "Vite", projects: ["pontuo"] },
      { name: "Flutter", projects: ["rede-campo-online"] },
      { name: "Dart", projects: ["rede-campo-online"] },
      { name: "MobX", projects: ["rede-campo-online"] },
    ],
  },
  {
    id: "quality",
    title: { pt: "Qualidade e infra", en: "Quality and infra" },
    rows: [
      { name: "JWT", projects: ["pontuo", "rede-campo-online"] },
      { name: "JUnit / Mockito", projects: ["pontuo"] },
      { name: "Vitest", projects: ["pontuo"] },
      { name: "Playwright", projects: ["pontuo"] },
      { name: "GitHub Actions", projects: ["pontuo", "rede-campo-online"] },
      { name: "Cloudflare R2", projects: ["pontuo", "rede-campo-online"] },
    ],
  },
];
