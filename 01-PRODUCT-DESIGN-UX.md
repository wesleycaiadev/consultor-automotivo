# MF V3 --- PRODUCT, BRAND, DESIGN SYSTEM & UX

> Documento: direção de produto e experiência\
> Uso: fonte principal para decisões visuais, UX, motion e
> responsividade

------------------------------------------------------------------------

# 1. POSICIONAMENTO

MF --- Marques Felipe Curadoria Automotiva.

Felipe: - entende a necessidade; - filtra opções; - reduz assimetria de
informação; - avalia procedência; - ajuda a evitar compra ruim; - conduz
a decisão.

A experiência deve transmitir: - confiança; - precisão; - calma; -
conhecimento; - proximidade; - sofisticação sem ostentação.

------------------------------------------------------------------------

# 2. DIREÇÃO VISUAL

**Swiss Editorial + Modern Industrial + Automotive Curation + Quiet
Luxury**

Princípios: - grid editorial; - assimetria controlada; - whitespace; -
fotografia protagonista; - hairlines; - contraste tipográfico; -
metadata técnica; - baixa ornamentação; - sensação de materialidade; -
ritmo cinematográfico controlado.

Evitar: - template automotivo; - Tesla clone; - supercarro como atalho
para "premium"; - estética de IA; - cards SaaS; - gradients gratuitos; -
glow; - badges em excesso.

------------------------------------------------------------------------

# 3. LOGO E IDENTIDADE

## 3.1 Monograma MF

Conceito: - M + F integrados; - construção geométrica; - diagonal; -
precisão; - legibilidade pequena.

Não usar símbolos automotivos óbvios.

## 3.2 Lockups

Desktop navbar: - MF sozinho; - 32--40px aproximadamente; - não
adicionar wordmark gigante.

Mobile: - MF + Marques Felipe pode ser usado.

Footer: - MARQUES FELIPE grande permitido.

## 3.3 Micro logo

Testar 16/24/32/64px. Se a diagonal colapsar em 16/24px, criar MF Micro
simplificado.

------------------------------------------------------------------------

# 4. MF FRAME

Assinatura geométrica baseada no monograma.

-   corte 45°;
-   tamanhos base 16px / 24px;
-   precisão industrial;
-   sem estética gamer.

Aplicações: - image mask; - primary CTA; - selected state; - progress; -
transição; - preloader; - detalhe de cursor.

Regra: não aplicar em todos os elementos.

------------------------------------------------------------------------

# 5. CORES

``` text
Paper       #F8F7F3
Porcelain   #F1F0EB
Silver      #C5C7C3
Graphite    #444844
MF Ink      #1B1C1A
MF Oxide    #A34832
```

Distribuição aproximada: - 80--90% neutrals; - 8--15% Ink/Graphite; -
2--4% Oxide.

Oxide: - active; - focus; - marker; - selected; - progress; - cursor; -
micro detail.

------------------------------------------------------------------------

# 6. TIPOGRAFIA

## Instrument Serif

Display/editorial.

## Manrope

Body.

## Geist

UI, nav, metadata, technical labels.

Não usar display serif em todo lugar. Não usar uppercase em parágrafos.
Metadata deve ser escaneável.

------------------------------------------------------------------------

# 7. GRID E SPACING

Desktop: - 12 colunas; - gutter 24px; - margens \~64px; - container até
1440px.

Tablet: - margens \~32px.

Mobile: - 20--24px.

Base spacing: 8px.

Escala: 4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 64 / 80 / 120 / 160.

------------------------------------------------------------------------

# 8. COMPONENT LANGUAGE

## Buttons

Primary: - Ink; - Paper; - MF cut; - estados completos.

Secondary: - outline; - sem shadow.

Editorial link: - texto; - seta; - microaccent.

## Hairlines

1px. Silver/Graphite conforme contraste.

## Vehicle Card

Não parecer card de ecommerce. Imagem domina. Dados ficam abaixo/ao lado
conforme composição.

## Filters

Estados: - default; - hover; - selected; - focus; - disabled se
aplicável.

## Forms

Reto, técnico, limpo. Erro explícito. Focus visível.

------------------------------------------------------------------------

# 9. HOME

Ordem:

1.  Navbar
2.  Hero
3.  Problema
4.  Curadoria
5.  Processo
6.  Showroom Preview
7.  Car Finder CTA
8.  Entregas
9.  Felipe
10. Final CTA
11. Footer

A transição entre seções deve formar narrativa.

------------------------------------------------------------------------

# 10. NAVBAR

Desktop: - MF; - Início; - Curadoria; - Showroom; - Entregas; - Sobre; -
CTA Fale com Felipe.

"Showroom" pode permanecer. Evitar inglês desnecessário.

Scroll: - estado transparente/integrado; - depois Paper ou Paper
translúcido; - hairline discreta; - active state Oxide.

Mobile: - MF/lockup; - Menu; - fullscreen editorial; - CTA WhatsApp.

------------------------------------------------------------------------

# 11. HERO

Meta: entendimento em \~5 segundos.

Conteúdo: - Felipe; - curadoria automotiva; - redução de risco; - CTA.

Headline preferida:

**O CARRO CERTO.**\
**SEM O RISCO DA**\
*ESCOLHA ERRADA.*

Supporting: Marques Felipe ajuda você a encontrar, avaliar e escolher
seu próximo veículo com mais segurança, procedência e clareza.

CTA: - Encontrar meu carro - Ver showroom

Fotografia: - real; - protagonista; - não um card.

Desktop: composição assimétrica.

Mobile: pode usar composição própria; não copiar desktop.

------------------------------------------------------------------------

# 12. PROBLEMA

Headline: **Comprar um carro não deveria ser uma aposta.**

Tópicos: - Procedência; - Histórico; - Preço; - Avaliação; -
Manutenção; - Documentação; - Revenda.

Desktop: accordion/editorial interaction.

Mobile: tap/accordion.

Sem cards.

------------------------------------------------------------------------

# 13. CURADORIA

Quebra Paper → Ink permitida e recomendada.

Processo: 01 Perfil\
02 Curadoria\
03 Validação\
04 Negociação

Evitar jargão inglês sem benefício.

------------------------------------------------------------------------

# 14. PROCESSO

Storytelling: - simples; - progressivo; - compreensível sem animação.

Scroll-linked é melhoria, não requisito de compreensão.

------------------------------------------------------------------------

# 15. SHOWROOM

Objetivo: descobrir veículos com rapidez e desejo.

Filtros: - Todos - SUV - Sedan - Hatch - Picape

Informações: - marca/modelo; - versão; - ano; - km; - preço; - câmbio; -
combustível.

Desktop: grid assimétrico.

Mobile: uma coluna forte ou composição editorial adaptada.

Fotos: layout deve funcionar com celular/garagem/rua/loja.

Estados: - loading; - empty; - error; - filters empty.

------------------------------------------------------------------------

# 16. VEHICLE DETAIL

Estrutura:

1.  Gallery
2.  Identidade do veículo
3.  Preço
4.  Specs principais
5.  Visão geral
6.  Equipamentos
7.  Opcionais
8.  Descrição
9.  Histórico/observações
10. CTA

CTA: **Tenho interesse neste veículo**

WhatsApp: mensagem contextual com veículo.

Sem: - cart; - checkout; - buyer login.

------------------------------------------------------------------------

# 17. CAR FINDER

Área crítica 10/10.

Fluxo: 1. Categoria 2. Orçamento 3. Condição 4. Marca opcional 5. Modelo
opcional 6. Observações 7. Resumo 8. WhatsApp

Mobile: uma decisão principal por etapa.

Obrigatório: - voltar sem perder; - progresso; - seleção clara; -
resumo; - sem login; - sem lead salvo.

Não usar cadeado em etapas futuras.

Final: **Entendi o que você procura.**

CTA: **Enviar minha busca para Felipe →**

------------------------------------------------------------------------

# 18. ENTREGAS

Prova social documental.

Mostrar: - pessoa; - veículo; - cidade; - foto; - frase curta.

Evitar: - 5 stars; - review carousel genérico; - depoimentos longos.

------------------------------------------------------------------------

# 19. SOBRE FELIPE

Curto. Humano. Fotografia real.

Explicar: - olhar; - método; - compromisso; - forma de trabalhar.

Não criar biografia corporativa longa.

------------------------------------------------------------------------

# 20. FOOTER

Pode ser expressivo.

-   MARQUES FELIPE grande;
-   MF gráfico;
-   Instagram;
-   WhatsApp;
-   Showroom;
-   Curadoria;
-   Entregas;
-   localização;
-   copyright;
-   cadeado Admin discreto.

Cadeado não representa segurança.

------------------------------------------------------------------------

# 21. ADMIN UX

Admin = eficiência.

Navegação: - Visão geral; - Showroom; - Entregas; - Feedbacks; -
Configurações.

Vehicle statuses: - Rascunho; - Publicado; - Vendido.

Quick Edit: - preço; - km; - status; - destaque; - capa.

Full Edit: - dados; - specs; - equipamentos; - descrição; - mídia; -
publicação.

Media Manager: - multi upload; - drag/drop; - reorder; - cover; -
delete; - progress; - error.

------------------------------------------------------------------------

# 22. MOTION

Escalas:

``` text
Micro       120–250ms
UI          250–450ms
Editorial   600–1000ms
Cinematic   1000–1800ms
```

CSS primeiro. GSAP quando sequência justificar.

Hero: 1. MF; 2. diagonal; 3. mask; 4. Felipe; 5. headline clipping; 6.
navbar; 7. CTA.

\~1.5--2s, sem bloquear.

Showroom: - scale \~1.025; - metadata; - contextual cursor opcional; -
continuidade para detail.

Reduced motion obrigatório.

------------------------------------------------------------------------

# 23. 3D

Opcional.

Só depois de UX, performance e identidade funcionarem sem 3D.

Se usado: - abstrato MF; - dark chrome; - discreto; - lazy; - fallback
mobile.

Não usar carro 3D aleatório.

------------------------------------------------------------------------

# 24. RESPONSIVE

Não empilhar desktop.

Breakpoints devem responder ao conteúdo, não só números fixos.

Testar: - 360; - 390/393; - 430; - tablet; - 1024/1280; - 1440; -
desktop largo.

Mobile: - CTA alcançável; - 44px touch; - sem hover dependency; -
headlines controladas; - finder fullscreen.

------------------------------------------------------------------------

# 25. REFERÊNCIAS

## Awwwards

Estudar: - art direction; - pacing; - transitions; - typography; - image
reveal; - scroll storytelling.

Não copiar: - loaders longos; - navegação escondida; - scroll
sequestrado.

## 21st.dev

Estudar mecanismos: - scroll media expansion; - container scroll; - zoom
parallax; - sticky scroll; - scroll progress; - gallery interactions.

Não copiar React para Angular. Recriar o princípio.

## Pinterest

Moodboard: - automotive editorial; - modernist grid; - tailoring; -
materials; - documentary delivery photography.

Pinterest não é fonte de UX.

## Regra de referência

Antes de adotar: 1. qual problema resolve? 2. combina com MF? 3. melhora
clareza? 4. funciona mobile? 5. custo de performance? 6. é proprietária
após adaptação?

------------------------------------------------------------------------

# 26. UX SCORE TARGETS

-   Identidade MF: 10
-   Hero: \>=9.5
-   Navegação: \>=9.5
-   Storytelling: \>=9.5
-   Showroom: \>=9.5
-   Detail: \>=9.5
-   Finder: 10
-   WhatsApp conversion: 10
-   Mobile: \>=9.5
-   Motion: \>=9.5
-   A11y: \>=9.5
-   Admin: \>=9.5

Não inventar nota. Justificar.
