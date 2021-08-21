FROM node:16
WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY . .

RUN yarn run next build

EXPOSE 80
CMD ["yarn", "run", "next", "start", "-p", "80"]
