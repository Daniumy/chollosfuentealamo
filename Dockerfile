# ---- Etapa 1: compilar ----
FROM node:24-alpine AS build
WORKDIR /app

# Primero solo package*.json: si no cambian, Docker reutiliza la capa de npm ci (builds más rápidos)
COPY package*.json ./
RUN npm ci

COPY . .
ARG APP_VERSION=local-docker
ENV VITE_APP_VERSION=$APP_VERSION
RUN npm run build

# ---- Etapa 2: servir ----
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80