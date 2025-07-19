# Backend - IVentou Desafio

Backend desenvolvido em NestJS com Prisma e PostgreSQL.

## Pré-requisitos

- Node.js 22.x
- pnpm 10.x
- Docker e Docker Compose

## Configuração

1. Clone o repositório
2. Instale as dependências:
   ```bash
   pnpm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```

4. Inicie o banco de dados:
   ```bash
   pnpm db:up
   ```

5. Execute as migrações:
   ```bash
   pnpm db:migrate
   ```

## Scripts disponíveis

- `pnpm dev` - Executa o servidor em modo de desenvolvimento
- `pnpm build` - Compila o projeto
- `pnpm start` - Executa o servidor em produção
- `pnpm test` - Executa os testes
- `pnpm lint` - Executa o linter
- `pnpm db:up` - Inicia o banco de dados
- `pnpm db:down` - Para o banco de dados
- `pnpm db:migrate` - Executa as migrações
- `pnpm db:studio` - Abre o Prisma Studio

## Estrutura do projeto

```
src/
├── app.controller.ts    # Controller principal
├── app.service.ts       # Service principal
├── app.module.ts        # Módulo principal
├── main.ts             # Ponto de entrada da aplicação
└── env.ts              # Configuração de variáveis de ambiente
```

## CI/CD

O projeto possui um workflow de CI configurado que:

1. Instala as dependências
2. Gera o cliente Prisma
3. Executa as migrações
4. Executa o linter
5. Compila o projeto
6. Executa os testes

## Tecnologias utilizadas

- **NestJS** - Framework para Node.js
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **Vitest** - Framework de testes
- **ESLint** - Linter
- **TypeScript** - Linguagem de programação 
