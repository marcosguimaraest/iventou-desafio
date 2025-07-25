FROM node:lts-alpine AS base

# ---------

FROM base AS deps

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# ---------

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs

RUN adduser --system --uid 1001 api

RUN chown api:nodejs .

COPY --chown=api:nodejs . .

COPY --from=deps /app/node_modules ./node_modules

RUN npx prisma generate

USER api

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"

ENTRYPOINT ["npm", "run", "start"]
