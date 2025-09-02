# Система автоматического обновления токенов

## Обзор

Система автоматически обрабатывает 401 Unauthorized ошибки и обновляет access token через refresh token, используя очередь запросов для предотвращения множественных одновременных обновлений.

## Компоненты

### 1. TokenManager (`src/lib/tokenManager.ts`)

Основной класс для управления токенами:

- **Очередь запросов**: Предотвращает множественные одновременные обновления токенов
- **Автоматическое обновление**: При 401 ошибке автоматически обновляет токен
- **События**: Отправляет события о начале/завершении/ошибке обновления токена

### 2. GraphQL Client (`src/lib/graphql.ts`)

Apollo Client с интегрированным error link:

- Перехватывает 401 ошибки
- Автоматически обновляет токены
- Повторяет оригинальные запросы с новыми токенами

### 3. AuthContext (`src/contexts/AuthContext.tsx`)

Контекст аутентификации с поддержкой обновления токенов:

- Управляет состоянием пользователя и токенов
- Интегрируется с TokenManager
- Обрабатывает logout при неудачном обновлении

### 4. TokenRefreshIndicator (`src/components/TokenRefreshIndicator.tsx`)

UI компонент для отображения процесса обновления токена:

- Показывает индикатор загрузки во время обновления
- Слушает события от TokenManager

### 5. Автоматическое обновление

Система работает полностью автоматически - ручное обновление токенов не требуется.

## Как это работает

1. **Обнаружение 401 ошибки**: GraphQL client перехватывает 401 ошибки
2. **Проверка очереди**: Если уже идет обновление токена, запрос добавляется в очередь
3. **Обновление токена**: Вызывается GraphQL мутация `refreshToken` с refresh token
4. **Обновление localStorage**: Новые токены сохраняются в localStorage
5. **Повтор запроса**: Оригинальный запрос повторяется с новым токеном
6. **Обработка очереди**: Все запросы в очереди выполняются с новым токеном

## События

Система отправляет следующие события:

- `token-refresh-start`: Начало обновления токена
- `token-refresh-complete`: Успешное обновление токена
- `token-refresh-error`: Ошибка обновления токена

## Конфигурация

### Переменные окружения

```env
NEXT_PUBLIC_API_URL=http://your-server.com/graphql
```

### GraphQL мутация для обновления токенов

Система использует GraphQL мутацию:

```graphql
mutation RefreshToken($input: RefreshTokenInput!) {
  refreshToken(input: $input) {
    access_token
    refresh_token
    user {
      id
      email
      firstName
      lastName
      role {
        id
        name
      }
    }
  }
}
```

Входные данные:

```typescript
{
  input: {
    refreshToken: "your_refresh_token";
  }
}
```

Ответ:

```json
{
  "refreshToken": {
    "access_token": "new_access_token",
    "refresh_token": "new_refresh_token",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": {
        "id": 1,
        "name": "admin"
      }
    }
  }
}
```

## Использование

### Автоматическое обновление

Система работает автоматически. При получении 401 ошибки:

1. Токен автоматически обновляется
2. Запрос повторяется с новым токеном
3. Пользователь не замечает процесс обновления

### Обработка ошибок

```typescript
// Слушаем события обновления токенов
useEffect(() => {
  const handleTokenError = (event) => {
    console.error("Token refresh failed:", event.detail);
    // Перенаправляем на страницу входа
    router.push("/auth");
  };

  window.addEventListener("token-refresh-error", handleTokenError);
  return () =>
    window.removeEventListener("token-refresh-error", handleTokenError);
}, []);
```

## Безопасность

- Refresh token автоматически очищается при ошибке обновления
- Пользователь перенаправляется на страницу входа при неудачном обновлении
- Токены хранятся в localStorage (можно заменить на httpOnly cookies)

## Отладка

Для отладки включите логи в консоли:

```typescript
// В TokenManager
console.log("401 error detected, attempting token refresh...");
console.log("Token refresh failed:", error);
```

## Расширение

### Добавление новых типов ошибок

```typescript
// В TokenManager.is401Error()
is401Error(error: any): boolean {
  return (
    error?.networkError?.statusCode === 401 ||
    error?.graphQLErrors?.some((e: any) => e.extensions?.code === "UNAUTHENTICATED") ||
    error?.message?.includes("401") ||
    error?.message?.includes("Unauthorized") ||
    // Добавьте новые условия здесь
    error?.extensions?.code === "YOUR_CUSTOM_ERROR_CODE"
  );
}
```

### Кастомные события

```typescript
// Отправка кастомных событий
window.dispatchEvent(
  new CustomEvent("custom-token-event", {
    detail: { token: newToken, timestamp: Date.now() },
  })
);
```
