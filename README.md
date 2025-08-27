# Tattoo Client

Клиентское приложение для тату-салона, построенное на Next.js с использованием GraphQL.

## 🚀 Технологии

- **Next.js 14** - React фреймворк
- **GraphQL** - API для получения данных
- **TypeScript** - типизированный JavaScript
- **Tailwind CSS** - утилитарный CSS фреймворк
- **shadcn/ui** - компоненты интерфейса

## 📁 Структура проекта

```
src/
├── app/                 # App Router страницы
├── components/          # React компоненты
├── contexts/           # React контексты
├── generated/          # Автогенерированные GraphQL типы
├── graphql/            # GraphQL схемы и операции
└── lib/                # Утилиты и конфигурация
```

## 🔧 GraphQL Генерация

Проект использует автоматическую генерацию TypeScript типов из GraphQL схемы.

### Установка зависимостей

```bash
npm install
```

### Генерация GraphQL типов

Для генерации типов выполните:

```bash
npm run codegen
```

Этот скрипт:

1. Читает GraphQL схему
2. Генерирует TypeScript типы в `src/generated/graphql.tsx`
3. Создает хуки для GraphQL операций

### Конфигурация

Настройки генерации находятся в `codegen.yml`:

```yaml
overwrite: true
schema: "your-graphql-endpoint"
documents: "src/**/*.tsx"
generates:
  src/generated/graphql.tsx:
    plugins:
      - "typescript"
      - "typescript-operations"
      - "typescript-react-apollo"
```

## 🚀 Запуск проекта

### Разработка

```bash
npm run dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

### Сборка

```bash
npm run build
npm start
```

## 📝 Использование GraphQL

После генерации типов вы можете использовать их в компонентах:

```tsx
import { useGetProductsQuery } from "../generated/graphql";

export const ProductsList = () => {
  const { data, loading, error } = useGetProductsQuery();

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;

  return (
    <div>
      {data?.products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};
```

## 🔐 Аутентификация

Проект включает систему аутентификации с защищенными маршрутами:

- `/auth` - страница входа
- `/dashboard` - защищенная панель
- `/admin` - административная панель

## 🎨 Темы

Поддерживается переключение между светлой и темной темами через `ThemeContext`.

## 📦 Основные зависимости

- `@apollo/client` - GraphQL клиент
- `@graphql-codegen/cli` - генерация типов
- `@graphql-codegen/typescript` - TypeScript плагин
- `@graphql-codegen/typescript-operations` - плагин для операций
- `@graphql-codegen/typescript-react-apollo` - React Apollo плагин

## 🛠️ Разработка

### Добавление новых GraphQL операций

1. Создайте файл с GraphQL запросом в `src/graphql/`
2. Запустите генерацию: `npm run codegen`
3. Импортируйте сгенерированные хуки в компоненты

### Структура GraphQL файлов

```
src/graphql/
├── queries/     # GraphQL запросы
├── mutations/   # GraphQL мутации
└── fragments/   # GraphQL фрагменты
```

## 📚 Полезные команды

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Генерация GraphQL типов
npm run codegen

# Сборка проекта
npm run build

# Запуск production версии
npm start

# Проверка типов TypeScript
npm run type-check

# Линтинг
npm run lint
```

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Запустите генерацию GraphQL типов
5. Создайте Pull Request

## 📄 Лицензия

MIT License
