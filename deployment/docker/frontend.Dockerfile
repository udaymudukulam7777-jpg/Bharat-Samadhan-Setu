# Multi-stage build for React frontend
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit

COPY . .
RUN npm run build

# Nginx production serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ../nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
