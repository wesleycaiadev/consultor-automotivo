# MF V3 --- ARCHITECTURE, ENGINEERING & TECHNOLOGY

> Objetivo: arquitetura simples, moderna, sustentável e amigável ao
> Codex\
> Princípio: complexidade só entra quando resolver um problema real

------------------------------------------------------------------------

# 1. ESCLARECIMENTO: "BOOTSTRAP"

Quando as tasks dizem **Bootstrap do projeto**, isso significa:

> inicializar/configurar a fundação do projeto.

NÃO significa usar a biblioteca CSS **Bootstrap**.

A biblioteca Bootstrap CSS NÃO faz parte da stack.

------------------------------------------------------------------------

# 2. STACK

## Frontend

-   Angular 22
-   TypeScript strict
-   Standalone Components
-   Angular Signals
-   Angular Router
-   Reactive Forms
-   SCSS
-   CSS Custom Properties

## Backend/Data

-   Supabase
-   PostgreSQL
-   Auth
-   Storage
-   RLS
-   migrations

## Motion

-   CSS primeiro
-   GSAP
-   ScrollTrigger

## Testing

-   testes unitários no runner configurado pelo Angular
-   Playwright para E2E crítico

## Tooling

-   ESLint
-   Prettier
-   Git/GitHub

------------------------------------------------------------------------

# 3. POR QUE ANGULAR

O projeto já possui direção Angular e o objetivo é manter uma base: -
organizada; - tipada; - escalável sem exagero; - boa para Admin +
experiência pública; - compatível com Signals; - boa separação de
features.

Não trocar para React/Next apenas porque uma referência externa usa
React.

Se a stack existente do repositório for outra quando o Codex iniciar: 1.
não migrar automaticamente; 2. auditar; 3. reportar; 4. solicitar
decisão.

------------------------------------------------------------------------

# 4. POR QUE NÃO TAILWIND

SCSS + CSS Variables combinam melhor com: - tokens MF; - composição
editorial; - MF Frame; - regras globais controladas; - tradução Figma →
CSS; - menor ruído de classes.

Não adicionar Tailwind no meio do projeto.

------------------------------------------------------------------------

# 5. ESTRUTURA

``` text
src/app/
├── core/
│   ├── auth/
│   ├── config/
│   ├── guards/
│   ├── services/
│   └── supabase/
├── shared/
│   ├── ui/
│   ├── directives/
│   ├── pipes/
│   ├── models/
│   └── utilities/
├── layout/
│   ├── public-shell/
│   └── admin-shell/
└── features/
    ├── home/
    ├── showroom/
    ├── vehicle-detail/
    ├── car-finder/
    ├── deliveries/
    ├── about/
    └── admin/
        ├── dashboard/
        ├── vehicles/
        ├── deliveries/
        └── feedbacks/
```

------------------------------------------------------------------------

# 6. COMPONENT BOUNDARIES

Shared: somente componentes realmente reutilizáveis.

Exemplos: - Button - EditorialLink - SectionMarker - MFImageFrame -
Accordion - FilterTabs - Stepper - Input - Select - Textarea - Status -
MediaUploader

Não colocar Hero em shared.

------------------------------------------------------------------------

# 7. STATE MANAGEMENT

Signals primeiro.

Usar para: - auth; - filters; - finder; - UI local; - derived state.

Não usar NgRx inicialmente.

Gate para adicionar store: - múltiplas features compartilham estado
complexo; - efeitos e sincronização ficaram difíceis; - Signals/services
não resolvem elegantemente.

------------------------------------------------------------------------

# 8. DATA ACCESS

UI não fala diretamente com Supabase quando houver domínio.

Criar: - VehicleRepository/Service - DeliveryRepository/Service -
FeedbackRepository/Service - AuthService - WhatsappComposerService

Benefícios: - testes; - troca de implementação; - UI limpa; -
centralização de erros.

------------------------------------------------------------------------

# 9. ROUTES

``` text
/
 /showroom
 /showroom/:slug
 /entregas
 /sobre
 /encontrar-meu-carro (opcional, conforme UX)

 /admin/login
 /admin
 /admin/veiculos
 /admin/veiculos/novo
 /admin/veiculos/:id
 /admin/entregas
 /admin/feedbacks
```

Lazy load: - admin; - detail; - finder se rota; - features pesadas.

------------------------------------------------------------------------

# 10. DATA MODEL

## vehicles

-   id
-   slug
-   brand
-   model
-   version
-   manufacturing_year
-   model_year
-   mileage
-   price
-   transmission
-   fuel
-   color
-   location
-   description
-   status
-   featured
-   created_at
-   updated_at

Status: - draft - published - sold

## vehicle_images

-   id
-   vehicle_id
-   storage_path
-   alt_text
-   sort_order
-   is_cover

## deliveries

-   id
-   customer_name
-   vehicle_id optional
-   vehicle_name
-   city
-   testimonial
-   delivery_date
-   status

## delivery_images

-   id
-   delivery_id
-   storage_path
-   sort_order
-   is_cover

## feedbacks

-   id
-   author
-   text
-   status
-   sort_order

## profiles

Admin profile/role.

------------------------------------------------------------------------

# 11. CAR FINDER DATA

Não persistir.

Estado local: - category - budget - condition - brand? - model? - notes?

No final: WhatsappComposerService gera mensagem.

------------------------------------------------------------------------

# 12. SUPABASE

Usar migrations.

Nunca configurar produção só clicando no dashboard sem versionamento.

Buckets: - vehicles - deliveries

Public read: somente conteúdo publicado.

Admin write: somente usuário autorizado.

------------------------------------------------------------------------

# 13. AUTH & SECURITY

Supabase Auth.

Angular Guard: UX.

RLS: segurança real.

Nunca: - service role no frontend; - segredo em git; - confiar em botão
escondido; - confiar em rota não linkada.

Uploads: - MIME; - size; - policy; - path; - admin authorization.

------------------------------------------------------------------------

# 14. ERROR HANDLING

Repository traduz erro técnico para resultado tratável.

UI: - mensagem humana; - retry quando aplicável; - não mostrar stack
trace.

Admin: erro de persistência não pode apagar formulário.

------------------------------------------------------------------------

# 15. DESIGN TOKENS NO CÓDIGO

Centralizar em SCSS/CSS variables.

Exemplo conceitual:

``` css
:root {
  --mf-paper: #f8f7f3;
  --mf-porcelain: #f1f0eb;
  --mf-silver: #c5c7c3;
  --mf-graphite: #444844;
  --mf-ink: #1b1c1a;
  --mf-oxide: #a34832;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;

  --motion-micro: 180ms;
  --motion-ui: 320ms;
  --motion-editorial: 760ms;
}
```

Não hardcodar repetidamente.

------------------------------------------------------------------------

# 16. MF FRAME IMPLEMENTATION

Preferir abordagem CSS robusta: - clip-path; - pseudo-element; - mask
conforme necessidade.

Não duplicar SVG diferente em 20 componentes.

Criar primitive/helper documentado.

Testar: - image; - button; - responsive; - high DPI.

------------------------------------------------------------------------

# 17. MOTION ENGINEERING

CSS: - hover; - focus; - underline; - accordion simples; - micro state.

GSAP: - hero timeline; - complex reveal; - scroll-linked storytelling; -
continuity transition.

Não adicionar Lenis inicialmente.

Scroll suave nativo primeiro.

Gate Lenis: somente se a experiência exigir e keyboard/reduced motion
permanecerem corretos.

------------------------------------------------------------------------

# 18. THREE.JS

Não instalar na foundation.

Gate: - UX sem 3D \>=9.5; - performance aceitável; - conceito visual
aprovado; - fallback definido.

Se aprovado: lazy import.

------------------------------------------------------------------------

# 19. IMAGES

Estratégia: - width/height; - aspect-ratio; - srcset; - sizes; -
AVIF/WebP; - lazy; - hero eager/high priority apenas quando apropriado.

Admin deve guardar imagem original/otimizada conforme estratégia
escolhida.

Não carregar galeria inteira acima da dobra.

------------------------------------------------------------------------

# 20. SEO

Público indexável.

Implementar: - title; - description; - canonical; - Open Graph; -
sitemap; - robots; - semantic headings; - vehicle metadata; - structured
data apenas se semanticamente adequado.

Admin: noindex.

------------------------------------------------------------------------

# 21. SSR / PRERENDER

Avaliar Angular SSR/prerender para: - Home; - Showroom; - vehicle pages.

Não adicionar complexidade se deployment/infra não justificar.

Decisão deve considerar: - SEO; - dados dinâmicos; - Supabase; -
hosting.

------------------------------------------------------------------------

# 22. TESTING

Unit: - domain mapping; - formatter; - WhatsApp composer; - finder
state; - validation.

Component: - interactive states críticos.

E2E: 1. Home → Showroom; 2. filter; 3. Vehicle Detail; 4. Finder
completo; 5. Admin login; 6. create vehicle; 7. upload; 8. publish.

------------------------------------------------------------------------

# 23. PERFORMANCE

Budgets conceituais: - evitar JS desnecessário; - lazy admin; - lazy
GSAP feature; - lazy Three; - imagens otimizadas; - zero layout shift
evitável.

Testar throttling.

------------------------------------------------------------------------

# 24. ACCESSIBILITY ENGINEERING

HTML semântico primeiro.

Buttons reais. Links reais. Labels. Focus. Escape em modals. Focus trap
quando necessário. ARIA somente quando HTML nativo não resolver.

Reduced motion: media query + lógica GSAP.

------------------------------------------------------------------------

# 25. GIT

Branches/tasks pequenas.

Commit lógico por task aprovada.

Exemplo: `feat(home): implement MF hero v3`

Não misturar: - refactor; - feature; - dependency upgrade; - redesign.

------------------------------------------------------------------------

# 26. DEPENDENCY GATE

Antes de `npm install`: 1. problema; 2. por que nativo não resolve; 3.
tamanho; 4. manutenção; 5. acessibilidade; 6. alternativa.

Se não houver justificativa, não instalar.

------------------------------------------------------------------------

# 27. O QUE NÃO PRECISAMOS

Inicialmente: - Bootstrap CSS; - Tailwind; - NgRx; - NestJS; -
GraphQL; - monorepo; - microfrontend; - Docker obrigatório; -
Storybook; - Lenis; - Three.js.

Podem existir no futuro somente após gate.

------------------------------------------------------------------------

# 28. PRINCÍPIO FINAL

Arquitetura deve desaparecer para o usuário.

Se uma escolha de engenharia aumenta complexidade sem melhorar: -
qualidade; - segurança; - velocidade; - manutenção;

não adotar.
