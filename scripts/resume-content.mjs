// Resume-specific copy (EN + PT-BR). Structural facts (companies, periods, tech
// stacks, education dates, contact links) still come from src/data and
// src/config/site.ts; this file only holds the wording that is deliberately
// more detailed than the website's cards.
//
// Both languages describe the same facts. Each experience has the same number
// of bullets in both languages (checked by the build script).

export const content = {
  en: {
    lang: "en",
    intl: "en-US",
    file: "David-Nascimento-Resume-EN.pdf",
    title: "{name} — Resume",
    role: "Senior Full Stack Software Engineer",
    tagline: "React · Node.js · TypeScript",
    location: "Santa Catarina, Brazil",
    sections: {
      summary: "Professional summary",
      skills: "Technical skills",
      experience: "Professional experience",
      education: "Education",
      languages: "Languages",
      technologies: "Technologies",
    },
    summary:
      "Senior Full Stack Software Engineer with 10+ years of experience in web and mobile applications, enterprise platforms and SaaS products. Hands-on with React, Angular, Node.js, TypeScript, APIs, SQL/NoSQL databases and AWS. Experience with PWAs, system integrations, real-time synchronization and application architecture, including technical leadership of a development squad and collaboration with multidisciplinary teams.",
    skills: [
      ["Frontend & mobile", "React, Angular, Next.js, TypeScript, JavaScript, React Native, PWA, HTML, CSS"],
      ["Backend & APIs", "Node.js, NestJS, Fastify, Go, PHP, C#/.NET, REST, SOAP, WebSockets"],
      ["Data", "PostgreSQL, MongoDB, MySQL, Redis, Prisma, SQL"],
      ["Cloud, messaging & DevOps", "AWS (Lambda, SQS, SNS), Docker, Kubernetes, CI/CD, BullMQ, RabbitMQ, Git/GitHub"],
      ["Quality & observability", "Jest, unit and integration testing, regression and smoke tests, observability, log analysis"],
      ["Integrations & products", "Stripe, Meta/Instagram APIs, OAuth, OpenAPI, SaaS, mobile applications, GIS"],
    ],
    experience: {
      altaa: {
        company: "Altaa Digital",
        role: "Senior Software Engineer — Backend",
        project: "Pousti project",
        bullets: [
          "Worked exclusively on the backend of Pousti, an AI-powered content creation SaaS, evolving the APIs and contracts consumed by the frontend.",
          "Implemented fixes across agentic onboarding, data persistence and visual generation flows, including asset processing and storage.",
          "Maintained the Meta/Instagram and Stripe integrations covering publishing, metrics, OAuth, trials, subscriptions and POPs credits.",
          "Investigated incidents end to end using logs and observability practices, and validated changes with regression tests, staging QA and smoke tests.",
        ],
      },
      antero: {
        company: "Antero Sistemas",
        role: "Software Consultant — Full Stack & Mobile",
        project: "Independent projects",
        bullets: [
          "Delivered web and mobile solutions on demand, from architecture to implementation, integrations and ongoing support.",
          "Lamp InPunto (V1, mobile app): defined the architecture and integration flows between the app and custom hardware used for sample processing and results delivery, coordinating technical decisions with a distributed team. V2, adding an administrative interface, is in planning.",
          "Antero Pedidos: built a custom order management platform with Next.js, React and TypeScript, as an independent project, to organize business workflows and reduce reliance on manual processes.",
          "Antero Sistemas website: designed and developed the corporate site with Next.js and TypeScript, featuring responsive interfaces, service presentation and email delivery integrated through Resend and Cloudflare.",
        ],
      },
      imagem: {
        company: "Imagem Geosistemas",
        role: "Full Stack Developer",
        project: "Petrobras projects",
        bullets: [
          "Developed web applications and GIS solutions for Petrobras projects, working on geospatial visualization and integration services.",
          "Implemented tools to map wells and occurrences along seismic lines, focused on operational visibility and traceability.",
          "Integrated user interfaces, mapping services, databases and APIs to support operational workflows, applying observability and CI/CD practices.",
        ],
      },
      videosoft: {
        company: "Videosoft Soluções em Autoatendimento",
        role: "Full Stack Developer",
        bullets: [
          "Evolved the VS Food PWA and self-service platforms for restaurants and retail, and served as technical lead of a development squad.",
          "Built integrations configurable from the admin panel, allowing changes without republishing the PWA.",
          "Developed an integration bot in NestJS, connected to WebSockets, AWS Lambda and queues, to synchronize product changes in real time, replacing periodic updates with event-driven communication.",
          "Implemented integrations with iFood, NCR Aloha/Colibri, TOTVS and GCOM, as well as testing and validation initiatives.",
          "Contributed to automated testing strategies with Jest and to the CI/CD routines used to build and deliver the PWA.",
        ],
      },
      efrete: {
        company: "e-Frete",
        role: "Full Stack Developer",
        bullets: [
          "Developed web features, APIs and integrations for freight quotation, tracking and management.",
          "Contributed to the Frete Cargas app (later Frete Mínimo) and to gamification solutions for truck drivers.",
          "Worked on database performance improvements and application stability.",
        ],
      },
      nox: {
        company: "NOX Gerenciamento e Monitoramento de Riscos",
        role: "Software Developer — Intern to Junior",
        bullets: [
          "Developed ERP systems, route visualization interfaces and business applications for logistics and administrative operations.",
          "Created a SOAP API for truck driver coordinates and a route monitoring solution using AWS SQS/SNS.",
          "Developed a Java desktop application integrated with a biometric reader to open a gate barrier.",
        ],
      },
    },
    education: {
      avantis: "Bachelor's Degree in Information Systems",
      unipds: "Postgraduate Studies (Lato Sensu) in Applied AI Engineering",
      inProgress: "In progress since {date}",
    },
    languages: [
      ["Portuguese", "Native"],
      ["English", "Technical and professional communication"],
    ],
  },

  pt: {
    lang: "pt-BR",
    intl: "pt-BR",
    file: "David-Nascimento-Curriculo-PT.pdf",
    title: "{name} — Currículo",
    role: "Engenheiro de Software Full Stack Sênior",
    tagline: "React · Node.js · TypeScript",
    location: "Santa Catarina, Brasil",
    sections: {
      summary: "Resumo profissional",
      skills: "Competências técnicas",
      experience: "Experiência profissional",
      education: "Formação",
      languages: "Idiomas",
      technologies: "Tecnologias",
    },
    summary:
      "Engenheiro de Software Full Stack Sênior com mais de 10 anos de experiência em aplicações web e mobile, plataformas corporativas e produtos SaaS. Experiência com React, Angular, Node.js, TypeScript, APIs, bancos de dados SQL/NoSQL e AWS. Atuação em PWAs, integrações de sistemas, sincronização em tempo real e arquitetura de aplicações, incluindo liderança técnica de squad e colaboração com equipes multidisciplinares.",
    skills: [
      ["Frontend e mobile", "React, Angular, Next.js, TypeScript, JavaScript, React Native, PWA, HTML, CSS"],
      ["Backend e APIs", "Node.js, NestJS, Fastify, Go, PHP, C#/.NET, REST, SOAP, WebSockets"],
      ["Dados", "PostgreSQL, MongoDB, MySQL, Redis, Prisma, SQL"],
      ["Cloud, mensageria e DevOps", "AWS (Lambda, SQS, SNS), Docker, Kubernetes, CI/CD, BullMQ, RabbitMQ, Git/GitHub"],
      ["Qualidade e observabilidade", "Jest, testes unitários e de integração, regressão e smoke tests, observabilidade, análise de logs"],
      ["Integrações e produtos", "Stripe, Meta/Instagram APIs, OAuth, OpenAPI, SaaS, aplicações mobile, GIS"],
    ],
    experience: {
      altaa: {
        company: "Altaa Digital",
        role: "Engenheiro de Software Sênior — Backend",
        project: "Projeto Pousti",
        bullets: [
          "Atuei exclusivamente no backend da Pousti, SaaS de criação de conteúdo com IA, evoluindo as APIs e os contratos consumidos pelo frontend.",
          "Implementei correções em fluxos de onboarding agêntico, persistência e geração visual, incluindo processamento e armazenamento de assets.",
          "Mantive as integrações com Meta/Instagram e Stripe para publicações, métricas, OAuth, trials, assinaturas e créditos POPs.",
          "Investiguei incidentes de ponta a ponta com logs e práticas de observabilidade, e validei mudanças com testes de regressão, QA em staging e smoke tests.",
        ],
      },
      antero: {
        company: "Antero Sistemas",
        role: "Consultor de Software — Full Stack e Mobile",
        project: "Projetos independentes",
        bullets: [
          "Desenvolvi soluções web e mobile sob demanda, da arquitetura à implementação, integrações e sustentação.",
          "Lamp InPunto (V1, aplicativo mobile): defini a arquitetura e os fluxos de integração entre o aplicativo e um hardware personalizado usado no processamento de amostras e no envio de resultados, coordenando decisões técnicas com uma equipe distribuída. A V2, com interface administrativa, está em planejamento.",
          "Antero Pedidos: desenvolvi, em projeto independente, uma plataforma sob medida de gestão de pedidos com Next.js, React e TypeScript, para organizar fluxos de trabalho e reduzir a dependência de processos manuais.",
          "Site da Antero Sistemas: projetei e desenvolvi o site institucional com Next.js e TypeScript, com interfaces responsivas, apresentação de serviços e envio de e-mails integrado via Resend e Cloudflare.",
        ],
      },
      imagem: {
        company: "Imagem Geosistemas",
        role: "Desenvolvedor Full Stack",
        project: "Projetos Petrobras",
        bullets: [
          "Desenvolvi aplicações web e soluções GIS para projetos Petrobras, atuando na visualização geoespacial e em serviços de integração.",
          "Implementei ferramentas de mapeamento de poços e ocorrências em linhas sísmicas, com foco em visibilidade operacional e rastreabilidade.",
          "Integrei interfaces, serviços de mapas, bancos de dados e APIs para apoiar fluxos operacionais, aplicando práticas de observabilidade e CI/CD.",
        ],
      },
      videosoft: {
        company: "Videosoft Soluções em Autoatendimento",
        role: "Desenvolvedor Full Stack",
        bullets: [
          "Atuei na evolução da PWA VS Food e de plataformas de autoatendimento para restaurantes e varejo, e liderei tecnicamente um squad de desenvolvimento.",
          "Construí integrações configuráveis pelo painel administrativo, permitindo alterações sem a necessidade de republicar a PWA.",
          "Desenvolvi um robô de integrações em NestJS, conectado a WebSockets, AWS Lambda e filas, para sincronizar alterações de produtos em tempo real, substituindo atualizações periódicas por comunicação orientada a eventos.",
          "Implementei integrações com iFood, NCR Aloha/Colibri, TOTVS e GCOM, além de iniciativas de testes e validação.",
          "Contribuí com estratégias de testes automatizados com Jest e com as rotinas de CI/CD usadas para integração e entrega da PWA.",
        ],
      },
      efrete: {
        company: "e-Frete",
        role: "Desenvolvedor Full Stack",
        bullets: [
          "Desenvolvi funcionalidades web, APIs e integrações para cotações, rastreamento e gestão de fretes.",
          "Contribuí para o aplicativo Frete Cargas (posteriormente Frete Mínimo) e para soluções de gamificação voltadas a caminhoneiros.",
          "Atuei em melhorias de desempenho de banco de dados e na estabilidade da aplicação.",
        ],
      },
      nox: {
        company: "NOX Gerenciamento e Monitoramento de Riscos",
        role: "Desenvolvedor de Software — de Estagiário a Júnior",
        bullets: [
          "Desenvolvi sistemas ERP, interfaces de visualização de rotas e aplicações corporativas para operações logísticas e administrativas.",
          "Criei uma API SOAP para coordenadas de caminhoneiros e uma solução de monitoramento de rotas com AWS SQS/SNS.",
          "Desenvolvi uma aplicação desktop em Java integrada a um leitor biométrico para abertura de cancela.",
        ],
      },
    },
    education: {
      avantis: "Bacharelado em Sistemas de Informação",
      unipds: "Pós-graduação Lato Sensu em Engenharia de IA Aplicada",
      inProgress: "Em andamento desde {date}",
    },
    languages: [
      ["Português", "Nativo"],
      ["Inglês", "Comunicação técnica e profissional"],
    ],
  },
};
