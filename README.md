# Marques Felipe — Curadoria Automotiva

> Uma experiência digital para transformar a busca por um carro em uma decisão clara, segura e bem assessorada.

[Ver projeto em produção](https://mf-consultor-automotivo.vercel.app/) · [Explorar showroom](https://mf-consultor-automotivo.vercel.app/showroom) · [Encontrar meu carro](https://mf-consultor-automotivo.vercel.app/encontrar-meu-carro)

## Visão geral

Este projeto é uma plataforma completa de curadoria automotiva. A área pública apresenta a proposta da consultoria, veículos disponíveis e um fluxo de busca personalizada. O painel administrativo centraliza a publicação de veículos, fotos, catálogo FIPE, entregas e feedbacks.

O foco não é apenas listar carros: é organizar contexto, procedência e próximos passos para que cada escolha seja mais segura.

## Principais experiências

- **Showroom responsivo:** vitrine pública com filtros por categoria, faixa de investimento, condição e motorização.
- **Detalhe do veículo:** galeria, informações técnicas e chamada direta para atendimento pelo WhatsApp.
- **Busca personalizada:** formulário guiado que transforma preferências do cliente em uma solicitação clara para a curadoria.
- **Painel administrativo protegido:** gestão de veículos, imagens, status de publicação, destaques, entregas e feedbacks.
- **Catálogo FIPE:** marcas, modelos e versões pesquisáveis para reduzir erros durante o cadastro.
- **Experiência editorial:** tipografia, motion e preloader autoral alinhados ao posicionamento premium da marca.

## Stack e arquitetura

| Camada | Tecnologias e decisões |
| --- | --- |
| Front-end | Angular 22, componentes standalone, Signals, TypeScript strict e Angular Router |
| Renderização | SSR com hidratação no cliente e rotas públicas preparadas para compartilhamento/SEO |
| Estilos | SCSS, design tokens e componentes reutilizáveis sem dependências visuais pesadas |
| Dados | Supabase (PostgreSQL, Auth e Storage privado) com políticas RLS |
| Qualidade | ESLint, Prettier, Vitest e Playwright |
| Deploy | Vercel com rewrite para suportar deep links do Angular |

## Segurança, qualidade e SEO

- Rotas administrativas protegidas por guard e validação de papel administrativo.
- RLS habilitado nas tabelas sensíveis; leitura pública limitada a conteúdo publicado.
- Storage de veículos e entregas privado, com acesso controlado por políticas.
- Nenhuma service key é exposta no cliente; arquivos de ambiente permanecem ignorados pelo Git.
- Metadados por rota, canonical URL, Open Graph, Twitter Cards, JSON-LD, `robots.txt` e sitemap.
- Verificações automatizadas para lint, formatação, segurança, testes unitários e testes end-to-end.

## Executar localmente

### Pré-requisitos

- Node.js `22.22.3` ou superior (consulte `.nvmrc`)
- npm
- Um projeto Supabase configurado para desenvolvimento

```bash
git clone https://github.com/wesleycaiadev/consultor-automotivo.git
cd consultor-automotivo
npm install
npm start
```

Acesse `http://localhost:4200`.

### Configuração de ambiente

Crie seus arquivos de ambiente locais a partir das configurações do projeto e use apenas a URL do Supabase e a chave **publishable/anon** no navegador. Nunca versione ou exponha uma chave `service_role`/secret.

## Comandos úteis

```bash
npm start                       # servidor local com recarregamento
npm run build                   # build SSR de produção
npm run lint                    # análise estática
npm run format:check            # verifica formatação
npm test -- --watch=false       # testes unitários
npm run security:check          # políticas e proteções de segurança
npm run test:e2e                # build + jornada end-to-end
```

## Estrutura resumida

```text
src/app/
├── core/          # autenticação, guards, SEO e repositórios
├── features/      # páginas públicas e administrativas
├── layout/        # shells e navegação
└── shared/        # modelos, diretivas e componentes reutilizáveis
supabase/
└── migrations/    # schema, RLS, Storage e catálogo FIPE
scripts/           # verificações de segurança e sincronização de catálogo
```

## Critérios de engenharia

O projeto prioriza clareza de domínio, responsividade real, acessibilidade, segurança por padrão e uma interface que não compromete performance por efeitos visuais. Alterações são validadas com build, testes e verificações específicas antes do deploy.

## Contato

Para conhecer a curadoria automotiva, acesse [marquesfelipe.com.br](https://marquesfelipe.com.br) ou fale com a equipe pelo projeto publicado.
