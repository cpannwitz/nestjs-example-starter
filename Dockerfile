FROM node:12.14.1-alpine AS development

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --network-concurrency=1

COPY . .

EXPOSE 4000

RUN yarn build

FROM node:12.14.1-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --production=true

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["yarn", "start:prod:migrations"]