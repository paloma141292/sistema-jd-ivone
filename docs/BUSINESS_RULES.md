# Regras de negócio — resumo

## Identidade dos domínios

- **Usuário** representa quem acessa o sistema.
- **Participante** representa quem é acompanhado nas turmas/chamadas.
- **Grupo** controla permissões.
- **Perfil** contextualiza regras e operação.
- **Turma** delimita o escopo operacional.

## Histórico

- Mudança de Turma não reescreve chamadas antigas.
- Registros históricos devem manter a Turma/regra vigente no momento da operação.
- Alterações críticas geram auditoria.

## Escopo

- Permissões definem o que o usuário pode fazer.
- Perfil/Turma definem sobre quais dados ele pode atuar.
- Filtros de tela nunca podem ampliar o escopo autorizado.
- Exportações devem respeitar o mesmo conjunto de dados que o usuário pode consultar.

## Relatório Oficial EBD

- frequência, Bíblias e Revistas derivam das chamadas finalizadas;
- Visitantes e Oferta são complementados no Relatório Oficial;
- a tela utiliza registro sistêmico de conferência;
- linhas de assinatura existem apenas na impressão/PDF;
- relatório conferido só volta à edição por reabertura formal com motivo e nova versão.

## Conferência

Fluxo principal:

`Rascunho → Enviado → Em análise → Conferido → Enviado à sede`

Fluxo com ajuste:

`Em análise → Necessita ajuste → Corrigido → Reenviado → Em análise → Conferido`
