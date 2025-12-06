FROM node:24-alpine
WORKDIR /app

RUN corepack enable

COPY ./package.json .
COPY ./pnpm-lock.yaml .

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 80
CMD ["pnpm", "run", "start", "-p", "80"]
