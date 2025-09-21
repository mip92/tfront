# Multi-Step Registration Stepper

Многоэтапный степер для регистрации пользователей с верификацией по email или SMS.

## Обзор

Степер реализует 4-этапный процесс регистрации согласно предоставленной документации:

1. **Этап 1**: Ввод email или телефона
2. **Этап 2**: Верификация кода
3. **Этап 3**: Создание пароля
4. **Этап 4**: Личная информация (необязательно)

## Компоненты

### RegistrationStepper

Основной компонент, управляющий всем процессом регистрации с горизонтальным макетом.

```tsx
import { RegistrationStepper } from '@/components/registration/RegistrationStepper';

<RegistrationStepper
  onComplete={() => console.log('Registration completed!')}
/>;
```

### RegistrationStepperVertical

Альтернативная версия с вертикальным макетом и боковой панелью прогресса.

```tsx
import { RegistrationStepperVertical } from '@/components/registration/RegistrationStepperVertical';

<RegistrationStepperVertical
  onComplete={() => console.log('Registration completed!')}
/>;
```

### Stepper UI Component

Базовый компонент степера, вдохновленный [shadcn/vue stepper](https://www.shadcn-vue.com/docs/components/stepper), адаптированный для React.

```tsx
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperTitle,
  StepperDescription,
  StepperSeparator,
} from '@/components/ui/stepper';

<Stepper currentStep={2} orientation="horizontal">
  <StepperItem step={1}>
    <StepperTrigger>
      <StepperIndicator>1</StepperIndicator>
      <div>
        <StepperTitle>Step 1</StepperTitle>
        <StepperDescription>Description</StepperDescription>
      </div>
    </StepperTrigger>
  </StepperItem>
  <StepperSeparator />
  <StepperItem step={2}>
    <StepperTrigger>
      <StepperIndicator>2</StepperIndicator>
      <div>
        <StepperTitle>Step 2</StepperTitle>
        <StepperDescription>Description</StepperDescription>
      </div>
    </StepperTrigger>
  </StepperItem>
</Stepper>
```

### Этапы регистрации

#### Step1StartRegistration

- Ввод email или украинского номера телефона
- Валидация данных
- Отправка кода верификации

#### Step2VerifyCode

- Ввод 6-значного кода
- Автоматическое форматирование ввода
- Возможность повторной отправки кода
- Таймер для повторной отправки

#### Step3SetPassword

- Создание пароля с проверкой сложности
- Индикатор силы пароля
- Подтверждение пароля

#### Step4PersonalInfo

- Ввод имени и фамилии (необязательно)
- Возможность пропустить этап

## Хуки

### useRegistration

Хук для управления состоянием регистрации.

```tsx
import { useRegistration } from '@/hooks/useRegistration';

const {
  state,
  startRegistration,
  verifyCode,
  setPassword,
  setPersonalInfo,
  resendCode,
  goBackStep,
  resetRegistration,
  skipPersonalInfo,
} = useRegistration();
```

## Типы

Все типы определены в `/src/types/registration.ts`:

- `RegistrationStep` - номера этапов (1-4)
- `RegistrationState` - состояние регистрации
- `Step1FormData`, `Step2FormData`, `Step3FormData`, `Step4FormData` - данные форм
- Интерфейсы для API ответов

## Интеграция

Степер интегрирован в существующую страницу регистрации (`/src/app/register/RegisterClient.tsx`) с возможностью переключения между простой и многоэтапной регистрацией.

## Особенности

### Валидация

- Email: стандартная валидация email
- Телефон: украинские номера (+380 или 0XXXXXXXXX)
- Пароль: минимум 8 символов, заглавные/строчные буквы, цифры
- Код: ровно 6 цифр

### UX

- Визуальный индикатор прогресса
- Автоматическое форматирование ввода
- Таймеры для повторной отправки
- Обработка ошибок
- Возможность возврата на предыдущий этап

### Безопасность

- Временные токены с ограниченным временем жизни
- Валидация на клиенте и сервере
- Безопасное хранение состояния

## Настройка

### GraphQL мутации

В файле `/src/graphql/mutations/auth.graphql` подготовлены мутации для многоэтапной регистрации. Они будут активны после добавления соответствующих резолверов на бэкенде.

### Переменные окружения

Для работы в production убедитесь, что:

- Настроены переменные для отправки email/SMS
- Настроены JWT секреты
- Настроены таймауты для токенов

## Отладка

В development режиме отображается debug информация с текущим состоянием регистрации.

## Будущие улучшения

1. Добавление реальных GraphQL мутаций
2. Интеграция с сервисами отправки SMS/email
3. Добавление анимаций переходов
4. Поддержка темной темы
5. Мобильная оптимизация
6. Интернационализация
