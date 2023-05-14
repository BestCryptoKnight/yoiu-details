FROM node:16.13.2-alpine as builder
WORKDIR /app
COPY . .

RUN yarn
RUN yarn build:client

FROM nginx:alpine
COPY --from=0 /app/packages/client/build/ /var/www/html/
CMD ["nginx","-g","daemon off;"]