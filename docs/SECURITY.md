# Segurança e privacidade

## Edição de portfólio

- nenhuma base real de participantes é versionada;
- estado local compartilhado não é versionado;
- `node_modules`, backups e arquivos de ambiente são ignorados;
- os dados em `*.example.json` são fictícios.

## Limitações do protótipo

A V15.5 ainda depende de estado no navegador e serviço local simples. Para produção, são necessárias pelo menos:

- autenticação no servidor;
- hash de senha com algoritmo próprio para credenciais (Argon2id/bcrypt/scrypt);
- autorização por endpoint;
- banco de dados transacional;
- validação de entrada no backend;
- proteção CSRF/XSS/CSP conforme arquitetura final;
- logs/auditoria persistentes;
- gestão de segredos/variáveis de ambiente;
- TLS/HTTPS no ambiente implantado.
