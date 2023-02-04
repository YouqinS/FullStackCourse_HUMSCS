FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .
ENV BACKEND_URL=/api/
RUN npm install
RUN npm run build

RUN npm install -g serve
CMD ["serve", "build"]