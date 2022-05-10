FROM node:16-alpine
WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install; yarn cache clean

COPY . .

RUN yarn run next build

EXPOSE 80
CMD ["yarn", "run", "next", "start", "-p", "80"]
