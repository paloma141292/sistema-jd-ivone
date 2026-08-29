# ADR-001 — Conferência integrada ao Relatório Oficial

**Status:** aceita na V15.5

## Contexto

O desenho anterior possuía uma tela exclusiva de aprovação. Na prática, o responsável precisava abrir/consultar os dados do relatório para decidir se aprovava ou solicitava correção. Isso criava duplicidade de navegação, estado e manutenção.

## Decisão

Eliminar a tela exclusiva e transformar o Relatório Oficial no centro de decisão.

O relatório passa a oferecer ações contextuais de envio, conferência, solicitação de ajuste, reenvio, reabertura e envio à sede.

## Consequências positivas

- menos telas e menor carga cognitiva;
- decisão tomada no mesmo contexto em que os dados são analisados;
- trilha de auditoria centralizada;
- menor risco de estados divergentes entre relatório e aprovação;
- manutenção mais simples.

## Cuidados

- migração precisa reconhecer estados/permissões antigos sem reativar a tela legada;
- edição deve ficar bloqueada nas etapas de conferência;
- reabertura precisa preservar a versão já conferida.
