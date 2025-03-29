FROM node:22-alpine
WORKDIR /app

RUN corepack enable

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn config set nodeLinker node-modules
RUN yarn install; yarn cache clean

COPY . .

RUN yarn run build

EXPOSE 80
CMD ["yarn", "run", "start", "-p", "80"]
