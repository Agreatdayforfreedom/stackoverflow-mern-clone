FROM node:18-alpine as base

WORKDIR /usr/src/app

COPY package*.json /

EXPOSE 4000

RUN npm install -g nodemon && npm install

COPY . /
