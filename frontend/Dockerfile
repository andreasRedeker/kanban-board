### STAGE 1: Build ###
FROM node:18-alpine AS build-stage

WORKDIR ./app

COPY ./package*.json /app/

RUN npm ci

COPY ./ /app/

RUN npm run build -- --output-path=./dist/out --output-hashing=all


### STAGE 2: Serve with NGINX ###
FROM nginx:stable-alpine
COPY --from=build-stage /app/dist/out/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf