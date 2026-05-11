# Estágio de Build
FROM node:20-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio de Produção (Servindo com um servidor leve)
FROM node:20-alpine

WORKDIR /app
# Instala um servidor estático simples
RUN npm install -g serve

# Copia apenas o que é necessário do estágio de build
COPY --from=build /app/dist ./dist
# Garante que a pasta public foi processada (o Vite faz isso automaticamente para o dist)

EXPOSE 5173

# Serve a pasta dist na porta 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
