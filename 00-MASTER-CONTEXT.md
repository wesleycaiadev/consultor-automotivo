# MF V3 --- MASTER CONTEXT & CODEX OPERATING CONTRACT

> Projeto: MF --- Marques Felipe Curadoria Automotiva\
> Documento: contexto mestre, regras do agente e roteamento de leitura\
> Objetivo: permitir que o Codex retome o projeto com contexto
> suficiente sem ler dezenas de arquivos\
> Regra: este documento deve ser lido no início de toda nova sessão
> importante

------------------------------------------------------------------------

## 1. Missão

Construir o V3 da experiência digital de Marques Felipe como um produto
automotivo de alta qualidade, com: - identidade proprietária; - UX
crítica \>= 9.5; - Car Finder e conversão buscando 10; - arquitetura
simples; - performance; - acessibilidade; - manutenção baixa; -
implementação fiel ao design.

O objetivo não é criar "o site com mais efeitos". O objetivo é criar a
experiência mais coerente, memorável, clara e confiável possível para
MF.

------------------------------------------------------------------------

## 2. Produto

A solução combina:

1.  landing page institucional;
2.  showroom;
3.  página detalhada de veículo;
4.  busca personalizada de veículo;
5.  entregas e prova social;
6.  contato por WhatsApp;
7.  área administrativa enxuta.

Marques Felipe deve ser percebido como consultor/curador, não apenas
vendedor.

### Território de mensagem

-   "O carro certo. Sem o risco da escolha errada."
-   "Escolher bem começa antes da chave."
-   "Comprar um carro não deveria ser uma aposta."

------------------------------------------------------------------------

## 3. Fontes de verdade

Em caso de dúvida, seguir esta ordem:

1.  task atual em `03-IMPLEMENTATION-TASKS.md`;
2.  regras de UX/Design em `01-PRODUCT-DESIGN-UX.md`;
3.  arquitetura/stack em `02-ARCHITECTURE-ENGINEERING.md`;
4.  Figma e screenshots aprovados;
5.  quality gates em `04-QUALITY-RELEASE.md`;
6.  código já aprovado.

Não reinterpretar silenciosamente.

------------------------------------------------------------------------

## 4. Os cinco documentos

### 00-MASTER-CONTEXT.md

Este arquivo. Contexto, escopo, regras e protocolo.

### 01-PRODUCT-DESIGN-UX.md

Brand, logo, Design System, UX, responsive, motion, referências, Home,
Showroom, Vehicle Detail, Car Finder, Entregas e Admin.

### 02-ARCHITECTURE-ENGINEERING.md

Angular, TypeScript, SCSS, Supabase, estrutura de pastas, estado, dados,
segurança, SEO, performance e decisões de engenharia.

### 03-IMPLEMENTATION-TASKS.md

Roadmap executável. Cada task contém contexto, objetivo, leitura,
implementação, restrições, testes e Definition of Done.

### 04-QUALITY-RELEASE.md

Scorecards, gates 9.5+, acessibilidade, performance, segurança, testes,
auditorias e release.

------------------------------------------------------------------------

## 5. Protocolo do Codex

Antes de alterar código em uma task:

1.  leia este arquivo se for uma nova sessão;
2.  leia a task exata;
3.  leia somente as seções dos demais documentos citadas pela task;
4.  consulte o frame Figma correspondente, se disponível;
5.  analise screenshots relevantes;
6.  inspecione código existente;
7.  liste em no máximo 10 linhas:
    -   entendimento;
    -   arquivos a tocar;
    -   riscos;
    -   divergências;
    -   plano;
8.  implemente somente a task;
9.  rode validações;
10. compare visualmente;
11. aplique Definition of Done;
12. pare no checkpoint.

------------------------------------------------------------------------

## 6. Regra de economia de contexto/tokens

Não ler todos os cinco documentos integralmente em toda task.

A task informa quais seções consultar.

Não reexplicar decisões já documentadas.

Não gerar relatórios gigantes quando um checkpoint curto resolve.

Não reescrever arquivos inteiros para uma alteração pequena.

Não fazer pesquisas externas se o problema já estiver resolvido nos
documentos.

------------------------------------------------------------------------

## 7. Restrições absolutas

Não: - transformar o site em SaaS; - usar estética black/gold clichê; -
adicionar neon/glow; - adicionar glassmorphism sem justificativa; -
arredondar tudo; - usar Poppins/Montserrat; - trocar a paleta; - trocar
Instrument Serif + Manrope + Geist; - remover MF Frame; - colocar
"MARQUES FELIPE" gigante ao lado do MF na navbar desktop; - criar CRM; -
salvar leads do Car Finder; - criar checkout; - criar carrinho; - criar
financiamento; - adicionar NgRx sem problema real; - adicionar backend
customizado sem necessidade; - adicionar Three.js antes do gate; - usar
fade-up universal; - sequestrar scroll; - adicionar biblioteca por
conveniência.

------------------------------------------------------------------------

## 8. Decisões congeladas

### Desktop navbar

Monograma MF sozinho.

### Mobile navbar

MF + Marques Felipe permitido quando equilibrado.

### Footer

Wordmark grande permitido.

### Shapes

Cantos retos. MF Frame 45° é exceção proprietária.

### Conversão

WhatsApp.

### Admin

Veículos, imagens, entregas, feedbacks e configurações essenciais.

### Leads

Não existem no Admin.

------------------------------------------------------------------------

## 9. Como usar Figma

Figma é referência visual e de comportamento.

Quando houver acesso MCP: - ler frame/nó; - extrair layout; - spacing; -
typography; - colors; - states; - components; - responsive clues.

Não assumir que todo detalhe do Figma está correto se conflitar com um
gate de UX. Reportar antes de alterar.

Quando o MCP estiver indisponível: - usar screenshots aprovados; - usar
este pacote; - não bloquear desenvolvimento; - registrar a divergência
para revisão posterior.

------------------------------------------------------------------------

## 10. Como usar screenshots

Classificar decisões em: - PRESERVE; - REFINE; - REWORK; - REMOVE; -
EXPLORE.

Screenshots não autorizam copiar defeitos.

------------------------------------------------------------------------

## 11. Escopo funcional

### Público

-   Home;
-   Showroom;
-   Vehicle Detail;
-   Car Finder;
-   Entregas;
-   Sobre/Felipe;
-   WhatsApp;
-   Instagram.

### Admin

-   Login;
-   Dashboard mínimo;
-   Showroom CRUD;
-   Media Manager;
-   Entregas CRUD;
-   Feedbacks CRUD.

### Fora do escopo

-   CRM;
-   leads;
-   pipeline;
-   pagamento;
-   chat;
-   logística;
-   marketplace multi-vendedor;
-   conta do cliente.

------------------------------------------------------------------------

## 12. Critério de sucesso

A experiência deve continuar reconhecível como MF sem depender apenas da
logo.

A pergunta de controle é:

> Se removermos o logotipo, a geometria, fotografia, tipografia, ritmo,
> motion e comportamento ainda parecem pertencer à mesma marca?

Se a resposta for não, a identidade ainda precisa de trabalho.

------------------------------------------------------------------------

## 13. Prompt inicial recomendado

Execute somente a TASK-001 descrita em `03-IMPLEMENTATION-TASKS.md`.

Antes: - leia `00-MASTER-CONTEXT.md`; - leia somente as seções
adicionais exigidas pela task; - não execute nenhuma task posterior; -
não adicione tecnologia não aprovada; - apresente plano curto antes de
editar.

Depois: - implemente; - rode validações; - aplique o Definition of
Done; - pare no checkpoint.
