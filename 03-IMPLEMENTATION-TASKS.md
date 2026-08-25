# MF V3 --- IMPLEMENTATION TASKS

> Documento executável do Codex\
> Regra: uma task por vez; nenhuma task autoriza a próxima\
> Cada task contém objetivo, leituras mínimas, implementação, validações
> e Definition of Done

------------------------------------------------------------------------

## COMO EXECUTAR

Prompt padrão:

``` text
Execute somente [TASK-ID].

Leia 00-MASTER-CONTEXT.md e a seção desta task.
Leia apenas as seções adicionais indicadas em “Leitura mínima”.
Consulte Figma/screenshots quando aplicável.

Antes de editar:
- entendimento em até 10 linhas;
- arquivos a tocar;
- riscos;
- plano curto.

Implemente apenas o escopo.
Rode as validações.
Aplique o Definition of Done.
Pare no checkpoint.
```

------------------------------------------------------------------------

# TASK-001 --- Reconhecimento e auditoria inicial

## Objetivo

Inspecionar repositório, stack existente, screenshots, Figma e conflitos
antes de modificar qualquer coisa.

## Leitura mínima

-   00 § Fontes de verdade
-   01 § Direção visual
-   02 § Stack

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Não editar código ainda.
2.  Identificar se projeto já existe ou se precisa ser inicializado.
3.  Confirmar Angular/versões sem migrar silenciosamente.
4.  Mapear frames e screenshots.
5.  Gerar PRESERVE/REFINE/REWORK/REMOVE/EXPLORE.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   Relatório curto de estado
-   Lista de conflitos
-   Plano para TASK-002

## Definition of Done

Nenhuma alteração estrutural; diagnóstico confiável.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-002 --- Bootstrap técnico do projeto

## Objetivo

Inicializar ou normalizar a fundação Angular. Bootstrap aqui significa
inicialização, NÃO Bootstrap CSS.

## Leitura mínima

-   02 § Stack
-   02 § Estrutura
-   02 § Git

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Angular 22 quando projeto novo.
2.  TypeScript strict.
3.  SCSS.
4.  Routing.
5.  Standalone Components.
6.  Criar estrutura core/shared/layout/features sem componentes
    fictícios.
7.  Configurar lint/format.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   npm build
-   lint
-   inspeção da árvore

## Definition of Done

Build limpo; estrutura simples; Bootstrap CSS ausente.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-003 --- Design tokens globais

## Objetivo

Traduzir Design System MF para tokens reutilizáveis.

## Leitura mínima

-   01 § Cores
-   01 § Grid e spacing
-   02 § Design tokens

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Criar colors.
2.  Spacing.
3.  Container/grid.
4.  Motion durations.
5.  Z-index mínimo.
6.  Breakpoints.
7.  Não criar token para valor usado uma única vez sem motivo.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   Busca por hardcodes desnecessários
-   build

## Definition of Done

Componentes futuros conseguem consumir foundation sem duplicar valores.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-004 --- Tipografia e carregamento

## Objetivo

Configurar Instrument Serif, Manrope e Geist com performance e
fallbacks.

## Leitura mínima

-   01 § Tipografia
-   04 § Performance

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Definir @font-face ou estratégia escolhida.
2.  Font-display adequado.
3.  Escalas fluidas com clamp quando apropriado.
4.  Estilos display/body/UI.
5.  Evitar CLS.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   Network/font check
-   mobile typography

## Definition of Done

Fontes corretas, legíveis e sem regressão perceptível.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-005 --- Primitive MF Frame

## Objetivo

Criar a assinatura geométrica reutilizável.

## Leitura mínima

-   01 § MF Frame
-   02 § MF Frame Implementation

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Implementar corte 45° 16/24px.
2.  Aplicável a image/button.
3.  API simples.
4.  Sem duplicação.
5.  Fallback seguro.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   visual 16/24
-   responsive
-   build

## Definition of Done

MF Frame consistente e reutilizável.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-006 --- Buttons e links editoriais

## Objetivo

Criar ações base do produto.

## Leitura mínima

-   01 § Components
-   04 § Accessibility

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Primary.
2.  Secondary.
3.  Editorial link.
4.  Default/hover/focus/pressed/disabled.
5.  MF cut apenas onde definido.
6.  Touch targets.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   keyboard
-   focus
-   mobile

## Definition of Done

Estados completos e visualmente MF.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-007 --- Navbar V3

## Objetivo

Implementar navegação pública responsiva.

## Leitura mínima

-   01 § Navbar
-   01 § Logo
-   04 § Navigation gate

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Desktop MF sozinho.
2.  Links PT-BR.
3.  CTA Fale com Felipe.
4.  Scroll state.
5.  Mobile menu editorial.
6.  Focus management.
7.  Não usar wordmark gigante desktop.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   keyboard
-   mobile menu
-   scroll
-   reduced motion

## Definition of Done

Navegação \>=9.5 e decisão de marca respeitada.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-008 --- Primitives editoriais

## Objetivo

Criar SectionMarker, hairline, image frame e helpers de layout.

## Leitura mínima

-   01 § Component Language
-   01 § Grid

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Poucos primitives.
2.  Sem abstração excessiva.
3.  Auto-responsivos.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   visual matrix
-   build

## Definition of Done

Base editorial pronta sem componentes genéricos demais.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-009 --- Accordion do problema

## Objetivo

Criar interação acessível para dúvidas/riscos.

## Leitura mínima

-   01 § Problema
-   04 § Accessibility

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Button semantic.
2.  aria-expanded.
3.  Keyboard.
4.  Animation curta.
5.  Mobile tap.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   keyboard
-   screen-reader semantics
-   reduced motion

## Definition of Done

Conteúdo acessível sem depender de hover.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-010 --- Form primitives

## Objetivo

Criar Input/Select/Textarea/erro/helper.

## Leitura mínima

-   01 § Components
-   04 § Forms

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Labels reais.
2.  Focus.
3.  Error.
4.  Disabled.
5.  Autofill.
6.  Mobile keyboard considerations.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   keyboard
-   error state
-   mobile

## Definition of Done

Form foundation pronta para Finder/Admin.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-011 --- Hero layout desktop/mobile

## Objetivo

Construir Hero sem motion complexo.

## Leitura mínima

-   01 § Hero
-   01 § Responsive
-   04 § Hero gate

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Foto real Felipe.
2.  Headline.
3.  Supporting copy.
4.  Primary/secondary CTA.
5.  Composição desktop assimétrica.
6.  Composição mobile própria.
7.  Não tratar foto como card.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   360/390/430/1024/1440
-   5-second clarity review

## Definition of Done

Hero \>=9.5 antes de animação.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-012 --- Hero motion

## Objetivo

Adicionar motion somente após aprovação do layout.

## Leitura mínima

-   01 § Motion
-   04 § Motion gate

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Timeline curta.
2.  MF/diagonal/mask/photo/headline/nav/CTA conforme necessário.
3.  Não bloquear interação.
4.  Reduced motion.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   CPU throttle
-   reduced motion
-   no CLS

## Definition of Done

Motion reforça identidade sem reduzir clareza.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-013 --- Seção Problema

## Objetivo

Implementar narrativa de risco da compra.

## Leitura mínima

-   01 § Problema

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Headline.
2.  Accordion.
3.  Whitespace.
4.  Hairlines.
5.  Copy específica.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   desktop/mobile
-   keyboard

## Definition of Done

Problema compreensível e não genérico.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-014 --- Curadoria + Processo

## Objetivo

Implementar solução e método 01--04.

## Leitura mínima

-   01 § Curadoria
-   01 § Processo

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Paper→Ink quando aprovado.
2.  Perfil/Curadoria/Validação/Negociação.
3.  Evitar jargão.
4.  Scroll behavior opcional depois do layout.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   mobile reading order
-   contrast

## Definition of Done

Método claro sem depender de motion.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-015 --- Showroom preview Home

## Objetivo

Criar preview editorial de 3--5 veículos.

## Leitura mínima

-   01 § Showroom
-   04 § Showroom gate

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Vehicle presentation.
2.  CTA Explorar showroom.
3.  Fotos reais robustas.
4.  Assimetria desktop.
5.  Mobile legível.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   realistic image crops
-   mobile

## Definition of Done

Preview gera desejo sem parecer ecommerce.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-016 --- Car Finder CTA Home

## Objetivo

Criar interrupção de conversão.

## Leitura mínima

-   01 § Car Finder

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Não encontrou o seu?
2.  Mensagem humana.
3.  CTA iniciar busca.
4.  Não criar formulário inline gigante.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   CTA visibility
-   mobile

## Definition of Done

Próximo passo evidente.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-017 --- Entregas preview

## Objetivo

Criar prova social documental.

## Leitura mínima

-   01 § Entregas

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Foto real.
2.  Cliente.
3.  Veículo.
4.  Cidade.
5.  Frase curta.
6.  Sem stars.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   mobile
-   content variability

## Definition of Done

Prova social humana e confiável.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-018 --- Sobre Felipe + CTA final + Footer

## Objetivo

Fechar narrativa da Home.

## Leitura mínima

-   01 § Sobre Felipe
-   01 § Footer

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Sobre curto.
2.  CTA final.
3.  Footer expressivo.
4.  Wordmark grande permitido.
5.  Admin lock discreto.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   keyboard
-   links
-   mobile

## Definition of Done

Home termina com confiança e ação clara.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-019 --- Auditoria UX completa da Home

## Objetivo

Não criar feature; corrigir gaps.

## Leitura mínima

-   04 § Scorecards

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Pontuar Hero/Nav/storytelling/mobile/a11y/motion/conversion.
2.  Para \<9.5: problema→impacto→correção→validação.
3.  Corrigir apenas gaps comprovados.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   scorecard
-   visual regression

## Definition of Done

Nenhum pilar crítico da Home \<9.5.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-020 --- Modelo e repository de veículos

## Objetivo

Criar domínio e acesso a dados.

## Leitura mínima

-   02 § Data Model
-   02 § Data Access

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Types.
2.  Mapping.
3.  Repository interface/service.
4.  Mock/dev strategy se Supabase ainda não pronto.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   unit mapping
-   typecheck

## Definition of Done

UI não depende de detalhes do Supabase.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-021 --- Vehicle Card V3

## Objetivo

Criar apresentação reutilizável do veículo.

## Leitura mínima

-   01 § Showroom
-   04 § Showroom gate

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Image.
2.  Model/version.
3.  Year/km/price.
4.  Optional technical metadata.
5.  Hover desktop.
6.  Focus.
7.  No rounded ecommerce card.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   keyboard
-   real images
-   mobile

## Definition of Done

Escaneável e robusto.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-022 --- Filtros do Showroom

## Objetivo

Criar filtros com Signals.

## Leitura mínima

-   01 § Showroom
-   02 § State

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Todos/SUV/Sedan/Hatch/Picape.
2.  Selected/focus.
3.  Optional URL sync somente se útil.
4.  Sem overengineering.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   state unit
-   keyboard

## Definition of Done

Filtro instantâneo e compreensível.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-023 --- Estados do Showroom

## Objetivo

Loading/empty/error/no-results.

## Leitura mínima

-   04 § Global Gate

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Skeleton só se útil.
2.  Empty CTA para Finder.
3.  Retry em error.
4.  No-results após filtro.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   state matrix

## Definition of Done

Nenhum estado quebrado ou sem próximo passo.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-024 --- Página Showroom

## Objetivo

Compor grid completo.

## Leitura mínima

-   01 § Showroom

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Asymmetric desktop.
2.  Mobile adapted.
3.  Filters.
4.  Vehicle Cards.
5.  Finder interruption.
6.  Pagination/load strategy simples.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   responsive
-   content stress

## Definition of Done

Showroom \>=9.5 visual/UX.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-025 --- Motion do Showroom

## Objetivo

Adicionar microinterações e continuidade.

## Leitura mínima

-   01 § Motion
-   04 § Motion

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Scale sutil.
2.  Cursor contextual opcional.
3.  No essential hover.
4.  Transition para detail se robusta.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   reduced motion
-   pointer coarse

## Definition of Done

Motion útil e sem custo excessivo.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-026 --- Gallery Vehicle Detail

## Objetivo

Criar galeria responsiva.

## Leitura mínima

-   01 § Vehicle Detail

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Cover.
2.  Thumbnails/index.
3.  Fullscreen.
4.  Swipe/touch.
5.  Keyboard close/nav quando modal.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   mobile swipe
-   keyboard
-   image loading

## Definition of Done

Galeria previsível e rápida.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-027 --- Informação Vehicle Detail

## Objetivo

Construir identidade/specs/sections.

## Leitura mínima

-   01 § Vehicle Detail
-   04 § Detail gate

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Price.
2.  Specs.
3.  Description.
4.  Equipment.
5.  Options.
6.  History.
7.  Observations.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   content stress
-   mobile

## Definition of Done

Densidade alta sem visual marketplace.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-028 --- CTA de interesse e WhatsApp contextual

## Objetivo

Criar conversão do veículo.

## Leitura mínima

-   01 § Vehicle Detail
-   02 § Car Finder Data

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Sticky CTA.
2.  Mensagem com veículo.
3.  URL encoding.
4.  Não esconder conteúdo.
5.  Mobile safe-area.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   message unit
-   mobile sticky

## Definition of Done

Conversão clara e contextual.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-029 --- Auditoria Vehicle Detail

## Objetivo

Corrigir gaps \<9.5.

## Leitura mínima

-   04 § Vehicle Detail gate

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Scorecard.
2.  A11y.
3.  Performance images.
4.  CTA.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   audit

## Definition of Done

Detail \>=9.5.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-030 --- Finder state model

## Objetivo

Criar estado do fluxo sem backend.

## Leitura mínima

-   01 § Car Finder
-   02 § State

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Signals.
2.  Steps.
3.  Back.
4.  Persistence durante sessão do fluxo.
5.  Validation.
6.  No DB.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   unit state transitions

## Definition of Done

Estado previsível e testável.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-031 --- Finder Categoria

## Objetivo

Implementar passo 1.

## Leitura mínima

-   01 § Car Finder

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  SUV/Sedan/Hatch/Picape/Outro.
2.  Large touch targets.
3.  Selected state.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   mobile
-   keyboard

## Definition of Done

Uma decisão clara.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-032 --- Finder Orçamento

## Objetivo

Implementar passo 2.

## Leitura mínima

-   01 § Car Finder

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Faixas de orçamento.
2.  Sem input complexo inicialmente.
3.  Back preserva categoria.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   state
-   mobile

## Definition of Done

Decisão rápida.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-033 --- Finder Condição

## Objetivo

Implementar passo 3.

## Leitura mínima

-   01 § Car Finder

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Novo/Seminovo/Tanto faz.
2.  Linguagem simples.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   state

## Definition of Done

Sem ambiguidade.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-034 --- Finder Marca e Modelo

## Objetivo

Passos opcionais.

## Leitura mínima

-   01 § Car Finder

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Skip explícito.
2.  Não bloquear se usuário não sabe.
3.  Search/select somente se lista justificar.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   skip path
-   back

## Definition of Done

Opcional de verdade.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-035 --- Finder Observações

## Objetivo

Campo livre final.

## Leitura mínima

-   01 § Car Finder
-   04 § Forms

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Textarea.
2.  Limite razoável.
3.  Helper curto.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   mobile keyboard

## Definition of Done

Sem fricção.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-036 --- Finder Resumo

## Objetivo

Revisão antes do envio.

## Leitura mínima

-   01 § Car Finder

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Resumo visual.
2.  Editar passos.
3.  Não perder estado.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   edit/back

## Definition of Done

Usuário sabe exatamente o que enviará.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-037 --- WhatsApp Composer Finder

## Objetivo

Compor mensagem final.

## Leitura mínima

-   02 § Car Finder Data
-   04 § Security

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Mensagem PT-BR.
2.  Encoding.
3.  Omitir opcionais vazios.
4.  Abrir destino adequado.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   unit exact cases

## Definition of Done

Mensagem útil e sem dados quebrados.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-038 --- Finder motion e UX audit

## Objetivo

Finalizar experiência 10/10.

## Leitura mínima

-   01 § Motion
-   04 § Finder gate

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Transitions funcionais.
2.  Progress.
3.  Reduced motion.
4.  Scorecard.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   full E2E mobile
-   keyboard

## Definition of Done

Finder \>=9.5; buscar 10.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-039 --- Supabase migrations

## Objetivo

Criar schema versionado.

## Leitura mínima

-   02 § Data Model
-   02 § Supabase

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  profiles.
2.  vehicles.
3.  vehicle_images.
4.  deliveries.
5.  delivery_images.
6.  feedbacks.
7.  Indexes/constraints necessários.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   migration review

## Definition of Done

Schema mínimo e consistente.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-040 --- RLS e Storage

## Objetivo

Aplicar segurança real.

## Leitura mínima

-   02 § Auth & Security
-   04 § Security

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Public published read.
2.  Admin write.
3.  Storage vehicles/deliveries.
4.  No service key client.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   anonymous tests
-   admin tests

## Definition of Done

Políticas comprovadas.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-041 --- Auth Admin

## Objetivo

Criar login/service/guard.

## Leitura mínima

-   02 § Auth & Security

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Supabase Auth.
2.  Session Signal.
3.  Guard.
4.  Logout.
5.  Error handling.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   auth tests

## Definition of Done

Admin inacessível sem auth/RLS.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-042 --- Admin Shell

## Objetivo

Criar estrutura operacional.

## Leitura mínima

-   01 § Admin UX
-   02 § Routes

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Sidebar.
2.  Visão geral.
3.  Showroom.
4.  Entregas.
5.  Feedbacks.
6.  Settings essencial.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   desktop/tablet/mobile quick tasks

## Definition of Done

Admin simples e consistente.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-043 --- Admin Vehicle List

## Objetivo

Listar e gerenciar status.

## Leitura mínima

-   01 § Admin UX

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Table/list.
2.  Photo.
3.  Vehicle.
4.  Year.
5.  Price.
6.  Status.
7.  Updated.
8.  Actions.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   loading/empty/error

## Definition of Done

Gestão rápida.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-044 --- Admin Full Edit

## Objetivo

Form completo do veículo.

## Leitura mínima

-   01 § Admin UX
-   04 § Forms

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Basic.
2.  Specs.
3.  Equipment.
4.  Description.
5.  Media.
6.  Publication.
7.  Unsaved/error behavior.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   validation
-   persist error

## Definition of Done

Cadastro confiável.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-045 --- Admin Quick Edit

## Objetivo

Editar campos frequentes.

## Leitura mínima

-   01 § Admin UX

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Price.
2.  Mileage.
3.  Status.
4.  Featured.
5.  Cover.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   keyboard
-   save error

## Definition of Done

Ação rápida sem duplicar Full Edit.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-046 --- Media Manager

## Objetivo

Upload profissional.

## Leitura mínima

-   01 § Admin UX
-   02 § Images
-   04 § Security

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Multi upload.
2.  Drag/drop.
3.  Progress.
4.  Reorder.
5.  Cover.
6.  Delete.
7.  Error.
8.  Validation.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   bad file
-   large file
-   reorder

## Definition of Done

Mídia gerenciável sem confusão.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-047 --- Entregas Admin

## Objetivo

CRUD de entregas.

## Leitura mínima

-   01 § Entregas
-   02 § Data Model

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Customer.
2.  Vehicle.
3.  City.
4.  Testimonial.
5.  Date.
6.  Images.
7.  Status.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   CRUD states

## Definition of Done

Conteúdo público gerenciável.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-048 --- Feedbacks Admin

## Objetivo

CRUD simples.

## Leitura mínima

-   01 § Admin UX

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Create/edit/publish/hide/delete/order.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   CRUD

## Definition of Done

Sem feature extra.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-049 --- Admin UX audit

## Objetivo

Avaliar operação real.

## Leitura mínima

-   04 § Admin gate

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Tempo para publicar.
2.  Error recovery.
3.  Mobile quick edits.
4.  A11y.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   scorecard

## Definition of Done

Admin \>=9.5.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-050 --- SEO técnico

## Objetivo

Preparar indexação pública.

## Leitura mínima

-   02 § SEO
-   04 § SEO

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Titles.
2.  Descriptions.
3.  Canonical.
4.  OG.
5.  Sitemap.
6.  Robots.
7.  Structured data quando correto.
8.  Admin noindex.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   metadata audit

## Definition of Done

SEO base completo.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-051 --- Accessibility audit

## Objetivo

Auditoria transversal.

## Leitura mínima

-   04 § Accessibility

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Keyboard.
2.  Focus.
3.  Contrast.
4.  Labels.
5.  Headings.
6.  Alt.
7.  Reduced motion.
8.  Touch.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   manual + automated where available

## Definition of Done

Nenhum blocker crítico.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-052 --- Performance audit

## Objetivo

Otimizar sem matar identidade.

## Leitura mínima

-   02 § Performance
-   04 § Performance

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Images.
2.  Chunks.
3.  GSAP.
4.  Fonts.
5.  CLS.
6.  LCP.
7.  Network/CPU throttle.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   Lighthouse
-   throttle

## Definition of Done

Performance percebida \>=9.5.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-053 --- E2E críticos

## Objetivo

Automatizar fluxos essenciais.

## Leitura mínima

-   02 § Testing

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Showroom→Detail.
2.  Finder.
3.  Admin login.
4.  Create/edit/publish vehicle.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   Playwright

## Definition of Done

Fluxos críticos protegidos.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-054 --- Security review

## Objetivo

Revisão final de auth/data/storage.

## Leitura mínima

-   02 § Security
-   04 § Security

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  RLS.
2.  Storage.
3.  Env.
4.  URLs.
5.  No secrets.
6.  Dependencies.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   security checklist

## Definition of Done

Sem falha conhecida de autorização.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-055 --- Visual regression V3

## Objetivo

Comparar implementação com referências.

## Leitura mínima

-   01 inteiro conforme telas
-   04 § Visual

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Desktop/mobile.
2.  Typography.
3.  Spacing.
4.  MF Frame.
5.  Navbar decision.
6.  Photo crop.
7.  Motion.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   screenshots

## Definition of Done

Sem regressão visual relevante.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------

# TASK-056 --- Scorecard final e Release

## Objetivo

Gate final.

## Leitura mínima

-   04 inteiro

## Antes de editar

-   Inspecionar implementação existente relacionada.
-   Consultar Figma/screenshots se esta task tiver representação visual.
-   Não reescrever áreas fora do escopo.
-   Reportar conflito antes de decidir silenciosamente.

## Implementação

1.  Pontuar todos pilares.
2.  Corrigir qualquer crítico \<9.5.
3.  Documentar trade-offs.
4.  Build final.

## Restrições

-   Não adicionar feature adjacente.
-   Não adicionar dependência sem passar pelo Dependency Gate.
-   Não alterar Design System fora da necessidade explícita.
-   Não avançar para a próxima task.

## Validações

-   build
-   E2E
-   scorecard

## Definition of Done

Release somente com gates atendidos.

## Checkpoint

Ao concluir, responder somente com: 1. arquivos alterados; 2. validações
executadas; 3. divergências restantes; 4. resultado do DoD; 5.
recomendação `APROVAR` ou `CORRIGIR`.

------------------------------------------------------------------------
