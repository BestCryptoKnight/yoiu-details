# frontend
FROM node:16-alpine as frontend-build

WORKDIR /frontend

COPY frontend/ ./

RUN yarn install

RUN yarn build:client

# # backend
FROM node:18-alpine as backend-build

WORKDIR /yoiu

COPY backend/ ./

RUN yarn install

RUN yarn build

COPY --from=frontend-build /frontend/packages/client/build ./client

EXPOSE 3000

CMD [ "node", "dist/src/main.js" ]