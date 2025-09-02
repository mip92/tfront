# Tattoo Client

Next.js приложение для управления тату-салоном с GraphQL API.

## 🚀 Быстрый старт

```bash
# Установка зависимостей
npm install

# Создание .env файла
echo "NEXT_PUBLIC_API_URL=http://localhost:4000/graphql" > .env

# Генерация GraphQL типов
npm run codegen

# Запуск в режиме разработки
npm run dev
```

## 🔧 Основные команды

```bash
npm run dev          # Запуск dev сервера
npm run build        # Сборка проекта
npm run codegen      # Генерация GraphQL типов
npm run lint         # Проверка кода
```

## 📁 Структура

```
src/
├── app/             # App Router страницы
├── components/      # React компоненты
├── contexts/        # React контексты
├── generated/       # GraphQL типы (автогенерируются)
├── graphql/         # GraphQL операции
└── lib/            # Утилиты
```

## 🐳 Docker

```bash
# Локальная сборка
./build-frontend.sh

# Production деплой
docker pull mip92/tattoo-client:latest
```

## 🔐 Переменные окружения

- `NEXT_PUBLIC_API_URL` - GraphQL сервер (по умолчанию: `http://localhost:4000/graphql`)

## 📦 Технологии

- Next.js 15
- TypeScript
- GraphQL + Apollo Client
- Tailwind CSS
- shadcn/ui
