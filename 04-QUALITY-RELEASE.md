# MF V3 --- QUALITY, UX GATES, TESTING & RELEASE

> Objetivo: impedir que "parece bom" seja confundido com "está pronto"

------------------------------------------------------------------------

# 1. REGRA

Nenhuma nota é concedida para agradar.

Para qualquer pilar abaixo de 9.5: 1. problema; 2. evidência; 3.
impacto; 4. correção; 5. validação.

------------------------------------------------------------------------

# 2. SCORECARD

Avaliar: - Identidade MF - Clareza - Hero - Navegação - Storytelling -
Showroom - Vehicle Detail - Car Finder - Conversão WhatsApp - Mobile -
Accessibility - Motion - Performance percebida - Admin - Confiança

Targets: - Identidade: 10 - Finder: 10 - WhatsApp: 10 - demais críticos:
\>=9.5

------------------------------------------------------------------------

# 3. GLOBAL GATE

DONE exige: - objetivo compreensível; - ação principal; - hierarchy; -
desktop/mobile; - keyboard; - focus; - reduced motion; -
loading/empty/error quando aplicável; - sem regressão visual; - sem erro
de console relevante; - build válido.

------------------------------------------------------------------------

# 4. HERO GATE

Em \~5s: - quem é Felipe; - o que faz; - dor resolvida; - próximo passo.

Falha: - headline ilegível; - CTA perdido; - foto como card genérico; -
wordmark desktop gigante; - animação antes da mensagem.

------------------------------------------------------------------------

# 5. NAVIGATION GATE

-   labels claros;
-   focus;
-   mobile menu;
-   active;
-   CTA;
-   sem termos ingleses desnecessários;
-   sem layout shift no scroll.

------------------------------------------------------------------------

# 6. SHOWROOM GATE

Escanear rapidamente: - modelo; - versão; - ano; - km; - preço.

Obrigatório: - filtros; - states; - fotos reais; - mobile; - no hover
dependency.

------------------------------------------------------------------------

# 7. DETAIL GATE

-   gallery rápida;
-   specs;
-   preço;
-   CTA;
-   sections;
-   WhatsApp contextual;
-   sticky não cobre conteúdo;
-   mobile.

------------------------------------------------------------------------

# 8. FINDER GATE

-   uma decisão por etapa mobile;
-   progress;
-   back preserva;
-   optional é optional;
-   summary;
-   WhatsApp;
-   no login;
-   no DB;
-   no lock icons;
-   conclusão rápida.

------------------------------------------------------------------------

# 9. ADMIN GATE

Testar tarefas: 1. login; 2. novo veículo; 3. upload; 4. capa; 5.
publicar; 6. editar preço; 7. vender; 8. criar entrega; 9. feedback.

Medir: - clareza; - erros; - recuperação; - número de decisões; -
consistência.

------------------------------------------------------------------------

# 10. ACCESSIBILITY

## Keyboard

Todo fluxo principal.

## Focus

Sempre visível.

## Semantics

-   headings;
-   nav;
-   main;
-   buttons;
-   forms.

## Touch

\~44px+.

## Motion

reduced-motion.

## Contrast

validar tamanhos reais.

## Images

alt strategy.

## Forms

label/helper/error.

------------------------------------------------------------------------

# 11. PERFORMANCE

Verificar: - LCP; - CLS; - INP; - font loading; - image loading; -
chunks; - GSAP; - unused JS; - mobile throttle.

Regras: - Three não entra critical path; - gallery não carrega tudo
eager; - admin lazy; - dimensões de imagem reservadas.

------------------------------------------------------------------------

# 12. MOTION QA

Perguntar para cada animação: - orienta? - responde? - conecta? -
hierarquiza? - reforça MF?

Se nenhuma: remover.

Testar: - reduced motion; - coarse pointer; - slow CPU; - tab
navigation; - rapid interaction.

------------------------------------------------------------------------

# 13. SECURITY

Checklist: - RLS; - public read published only; - admin write; -
storage; - no service role; - env; - upload validation; - auth expiry; -
unauthorized routes; - WhatsApp encoding; - dependencies.

------------------------------------------------------------------------

# 14. SEO

-   unique title;
-   description;
-   canonical;
-   OG;
-   sitemap;
-   robots;
-   semantic headings;
-   vehicle URL stable;
-   admin noindex;
-   structured data somente correto.

------------------------------------------------------------------------

# 15. TEST MATRIX

## Mobile

360 390/393 430

## Tablet

768/820

## Desktop

1024 1280 1440 \>=1600 spot-check

## Input

mouse keyboard touch/coarse pointer

## Preferences

reduced motion

## Network

fast throttled

------------------------------------------------------------------------

# 16. CONTENT STRESS TEST

Testar: - modelo curto; - modelo muito longo; - preço alto; -
"Consulte"; - km curto/longo; - sem opcionais; - muitas fotos; - uma
foto; - depoimento curto; - depoimento maior.

UI não pode depender do conteúdo perfeito do mock.

------------------------------------------------------------------------

# 17. VISUAL REGRESSION

Comparar: - Figma; - screenshots V2/V3; - localhost.

Checar: - typography; - scale; - spacing; - crop; - MF Frame; - Oxide; -
navbar; - footer; - mobile; - motion timing.

Não buscar pixel-perfect se o frame tiver erro de UX documentado.

------------------------------------------------------------------------

# 18. TESTES AUTOMATIZADOS

Prioridade E2E: 1. Showroom → Detail 2. Finder completo 3. Admin login
4. Create vehicle 5. Upload 6. Publish

Unit: - finder state; - WhatsApp; - mapping; - validators.

------------------------------------------------------------------------

# 19. RELEASE GATE

Antes do release:

### Engineering

-   build;
-   lint;
-   tests;
-   E2E crítico.

### UX

-   nenhum crítico \<9.5.

### A11y

-   sem blocker.

### Security

-   RLS/storage aprovados.

### Performance

-   sem regressão crítica.

### Content

-   contatos;
-   Instagram;
-   WhatsApp;
-   localização;
-   fotos;
-   copy.

### Admin

-   Felipe consegue operar.

------------------------------------------------------------------------

# 20. FORMATO DA AUDITORIA FINAL

  Pilar           Nota Evidência   Gap   Ação
  ------------- ------ ----------- ----- ------
  Identidade                             
  Hero                                   
  Navegação                              
  Showroom                               
  Detail                                 
  Finder                                 
  WhatsApp                               
  Mobile                                 
  A11y                                   
  Motion                                 
  Performance                            
  Admin                                  

------------------------------------------------------------------------

# 21. DEFINITION OF RELEASE

O produto pode ser lançado quando: - design continua MF; - experiência
pública é clara; - showroom é confiável; - Finder é excelente; -
WhatsApp funciona; - Admin funciona; - mobile é primeira classe; -
motion não atrapalha; - performance é sólida; - acessibilidade foi
tratada; - segurança está no backend/RLS; - nenhuma feature
desnecessária foi criada.

O objetivo final não é uma nota.

A nota é apenas um mecanismo para impedir mediocridade.
