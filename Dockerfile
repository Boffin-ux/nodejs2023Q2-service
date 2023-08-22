FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm ci && npm cache clean --force

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app .

EXPOSE ${PORT}

RUN npx prisma generate

CMD ["npm", "run", "start:migrate"]
