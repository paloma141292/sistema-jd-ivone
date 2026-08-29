# Testes e validação — V15.5

## Resultado da rodada final

| Validação | Resultado |
|---|---:|
| Arquivos JavaScript ativos | 19/19 OK |
| Scripts JavaScript inline | 22/22 OK |
| Páginas HTML por HTTP | 23/23 OK |
| Links locais estáticos | 287/287 OK |
| Fluxo normal de conferência | OK |
| Fluxo ajuste → correção → reenvio | OK |
| Migração de estados legados | OK |
| Histórico e auditoria | OK |
| Reabertura/versionamento | OK |
| Endpoint `/api/health` | HTTP 200 |
| Rota antiga de aprovação | 404 esperado |

## Cenários centrais

1. chamada finalizada → relatório → envio → conferência;
2. envio → solicitação de ajuste → correção da chamada → reenvio → conferência;
3. tentativa de edição durante conferência;
4. reabertura após conferência com motivo obrigatório;
5. preservação de histórico e auditoria;
6. conversão das permissões/estados antigos na migração V15.5.

## Limitação do ambiente de teste

A automação visual E2E com Chromium foi bloqueada pela política do ambiente usado na validação. Por isso, a validação automatizada cobriu regras, integração JavaScript, sintaxe, links e HTTP, mas não reivindica comparação visual pixel a pixel.
