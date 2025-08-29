# Production build для Next.js frontend на Ubuntu
FROM node:22-alpine

# Принимаем build argument для API URL
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Устанавливаем зависимости
RUN apk add --update --no-cache openssl

WORKDIR /app

# Копируем package.json для установки зависимостей
COPY package*.json ./

# Устанавливаем ТОЛЬКО production зависимости
RUN npm ci --only=production --no-audit --no-fund --prefer-offline --no-optional

# Копируем собранное приложение с локалки
COPY .next ./.next
COPY public ./public
COPY next.config.ts ./

# Ограничиваем память для Node.js
ENV NODE_OPTIONS="--max-old-space-size=128"

EXPOSE 3000

CMD ["npm", "start"]
