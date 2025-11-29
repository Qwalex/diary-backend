FROM node:25-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# генерация клиента Prisma (без подключения к БД)
RUN npx prisma generate && npm run build

ENV NODE_ENV=production
EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]