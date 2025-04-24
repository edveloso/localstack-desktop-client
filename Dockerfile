# Etapa 1: Build
FROM node:20-alpine AS builder

# Define diretório de trabalho
WORKDIR /app

# Copia arquivos necessários para instalar dependências e construir
COPY package.json package-lock.json ./
RUN npm install

# Copia todo o código da aplicação
COPY . .

# Gera build do Next.js
RUN npm run build

# Etapa 2: Runtime
FROM node:20-alpine

# Define diretório de trabalho
WORKDIR /app

# Copia os arquivos construídos da etapa anterior
COPY --from=builder /app ./

# Instala apenas dependências de produção
RUN npm install --omit=dev

# Define variáveis de ambiente para AWS/LocalStack
ENV AWS_REGION=us-east-1
ENV AWS_ACCESS_KEY_ID=test
ENV AWS_SECRET_ACCESS_KEY=test
ENV AWS_ENDPOINT=http://host.docker.internal:4566
ENV DOCKER=true

ENV PORT=3030
EXPOSE 3030
CMD ["npm", "start"]
