# Arquitetura

## Visão geral

A V15.5 utiliza uma arquitetura de protótipo local:

- **Front-end:** HTML5, CSS3 e JavaScript sem framework.
- **Persistência principal do navegador:** `localStorage`.
- **Sincronização em rede local:** serviço Node.js na porta 3000.
- **Relatórios:** construídos no navegador a partir do estado autorizado do usuário.

## Componentes

### Front-end

As telas são organizadas por domínio: participantes, chamada, relatórios, usuários e administração. Módulos JavaScript compartilhados concentram autenticação, escopo, identidade, notificações, migrações e workflow do Relatório Oficial.

### Serviço local

`Backend/server.js` fornece:

- `GET /api/health`;
- leitura/mesclagem do estado compartilhável;
- atualização e remoção de chaves individuais;
- rotas legadas de participantes para compatibilidade do protótipo.

Dados de sessão/login não são compartilhados pelo serviço.

## Controle de acesso

A camada atual possui Grupos, Perfis, Turmas e permissões explícitas. Filtros podem **restringir** o conjunto autorizado, mas nunca ampliar o acesso.

## Limite arquitetural atual

Como autorização e parte dos dados residem no cliente, esta versão é adequada a demonstração/protótipo controlado, não a exposição pública em produção. O roadmap move autenticação, autorização e persistência para o servidor.
