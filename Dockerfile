FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Adicionando a geração do Prisma Client
RUN npx prisma generate

RUN npm run build

CMD ["node", "dist/main"]
