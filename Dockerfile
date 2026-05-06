## Build stage
FROM node:22-alpine AS build

WORKDIR /app

# Install deps (better layer caching)
COPY package.json package-lock.json ./
RUN npm ci

# Build
COPY . .
RUN npm run build

## Runtime stage (static hosting)
FROM nginx:1.27-alpine AS runtime

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
