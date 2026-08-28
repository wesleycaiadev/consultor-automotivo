# TASK-056 — Scorecard final e release

Data: 28 de agosto de 2026

| Pilar | Nota | Evidência | Gap / ação |
| --- | ---: | --- | --- |
| Identidade MF | 10 | Tipografia, frame e lockup verificados nas regressões visual e mobile da TASK-055. | — |
| Clareza | 9.6 | Hero, CTAs e Finder descrevem a proposta e o próximo passo. | Revisar copy com Felipe quando houver conteúdo comercial final. |
| Hero | 9.6 | CTA, fotografia e mensagem continuam legíveis em desktop e mobile. | — |
| Navegação | 9.6 | Menu responsivo, rotas e CTA testados no E2E. | — |
| Storytelling | 9.5 | Processo, curadoria, showroom e CTA final têm encadeamento editorial. | Depende de futuras entregas e depoimentos reais. |
| Showroom | 9.6 | Estados, fotos, CTA e filtro por categoria persistida; E2E cobre Sedã → detalhe. | Aplicar a migração remota para tornar `category` a fonte de verdade de todos os anúncios. |
| Vehicle Detail | 9.6 | Galeria, especificações e WhatsApp contextual possuem testes unitários e E2E. | — |
| Car Finder | 10 | Fluxo guiado, resumo e WhatsApp cobertos por testes. | — |
| Conversão WhatsApp | 10 | Número e mensagens codificadas estão validados por unit/E2E. | — |
| Mobile | 9.6 | Layout e navegação responsiva verificados nas regressões anteriores e fluxos E2E. | Validar em aparelhos físicos antes de campanha paga. |
| Accessibility | 9.6 | Semântica, foco, teclado e preferências de movimento cobertos nas TASKs 051 e 055. | Auditoria manual com leitor de tela continua recomendada. |
| Motion | 9.5 | Motion editorial é CSS-first, contextual e respeita `prefers-reduced-motion`. | Não adicionar movimento decorativo. |
| Performance percebida | 9.5 | Build SSR válido, inicial estimado em 96,59 kB transferidos e áreas administrativas lazy. | Três avisos CSS pré-existentes no admin excedem orçamento e devem ser reduzidos em manutenção própria. |
| Admin | 9.6 | Login, publicação e cadastro isolado validados em E2E; catálogo FIPE e upload foram cobertos nas tasks anteriores. | A categoria é seleção explícita: a FIPE não fornece um tipo de carro confiável para classificação automática. |
| Confiança | 9.5 | RLS, Storage privado, validação de upload e checagem de segredos passaram no gate de segurança. | Aplicar a migração remota antes do release. |

## Trade-offs documentados

- A categoria não é inferida automaticamente da FIPE: uma versão FIPE não contém classificação de carroceria suficientemente confiável. O administrador escolhe SUV, Sedã, Hatch, Picape ou Outro no cadastro.
- A migração inclui compatibilidade temporária para os anúncios antigos conhecidos (Siena e Range Rover). Após aplicar a migração, a coluna `vehicles.category` substitui essa ponte em todos os novos e existentes registros.
- Os avisos de orçamento CSS pertencem a três áreas administrativas existentes. Não houve aumento no chunk crítico público nesta task; a redução desses estilos fica como manutenção separada para não reescrever o design system no gate final.

## Gate de release

Build, lint, 67 testes unitários, segurança e 4 E2E estão aprovados. O release fica pendente exclusivamente da execução de `20260828213318_add_vehicle_category.sql` no projeto Supabase remoto e da confirmação do filtro com os dados de produção.
