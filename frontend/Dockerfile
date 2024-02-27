FROM node:18

WORKDIR /usr/src/client

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .
