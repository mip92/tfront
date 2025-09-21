# Руководство по компоненту Stepper

## Обзор

Компонент Stepper создан на основе дизайна [shadcn/vue stepper](https://www.shadcn-vue.com/docs/components/stepper) и адаптирован для React с поддержкой TypeScript. Он предоставляет гибкий и доступный способ отображения многоэтапных процессов.

## Установка

Компонент уже включен в проект и находится в `src/components/ui/stepper.tsx`.

## Базовое использование

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

function MyStepper() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <Stepper currentStep={currentStep} orientation="horizontal">
      <StepperItem step={1}>
        <StepperTrigger>
          <StepperIndicator>1</StepperIndicator>
          <div>
            <StepperTitle>Step 1</StepperTitle>
            <StepperDescription>First step description</StepperDescription>
          </div>
        </StepperTrigger>
      </StepperItem>
      <StepperSeparator />
      <StepperItem step={2}>
        <StepperTrigger>
          <StepperIndicator>2</StepperIndicator>
          <div>
            <StepperTitle>Step 2</StepperTitle>
            <StepperDescription>Second step description</StepperDescription>
          </div>
        </StepperTrigger>
      </StepperItem>
    </Stepper>
  );
}
```

## API Reference

### Stepper

Основной контейнер степера.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentStep` | `number` | - | Текущий активный этап |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Ориентация степера |
| `children` | `React.ReactNode` | - | Дочерние элементы |
| `className` | `string` | - | Дополнительные CSS классы |

### StepperItem

Отдельный элемент степера.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `step` | `number` | - | Номер этапа |
| `children` | `React.ReactNode` | - | Дочерние элементы |
| `className` | `string` | - | Дополнительные CSS классы |

### StepperTrigger

Кнопка-триггер для этапа.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Дочерние элементы |
| `className` | `string` | - | Дополнительные CSS классы |
| `onClick` | `() => void` | - | Обработчик клика |

### StepperIndicator

Индикатор этапа (кружок с номером или иконкой).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Содержимое индикатора |
| `className` | `string` | - | Дополнительные CSS классы |

### StepperTitle

Заголовок этапа.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Текст заголовка |
| `className` | `string` | - | Дополнительные CSS классы |

### StepperDescription

Описание этапа.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Текст описания |
| `className` | `string` | - | Дополнительные CSS классы |

### StepperSeparator

Разделитель между этапами.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isCompleted` | `boolean` | `false` | Завершен ли предыдущий этап |
| `className` | `string` | - | Дополнительные CSS классы |

## Примеры использования

### Горизонтальный степер

```tsx
<Stepper currentStep={2} orientation="horizontal">
  <StepperItem step={1}>
    <StepperTrigger>
      <StepperIndicator>1</StepperIndicator>
      <div>
        <StepperTitle>Contact Info</StepperTitle>
        <StepperDescription>Enter your details</StepperDescription>
      </div>
    </StepperTrigger>
  </StepperItem>
  <StepperSeparator isCompleted={true} />
  <StepperItem step={2}>
    <StepperTrigger>
      <StepperIndicator>2</StepperIndicator>
      <div>
        <StepperTitle>Verification</StepperTitle>
        <StepperDescription>Verify your email</StepperDescription>
      </div>
    </StepperTrigger>
  </StepperItem>
</Stepper>
```

### Вертикальный степер

```tsx
<Stepper currentStep={2} orientation="vertical">
  <StepperItem step={1}>
    <StepperTrigger>
      <StepperIndicator>1</StepperIndicator>
      <div>
        <StepperTitle>Step 1</StepperTitle>
        <StepperDescription>First step</StepperDescription>
      </div>
    </StepperTrigger>
  </StepperItem>
  <StepperSeparator isCompleted={true} />
  <StepperItem step={2}>
    <StepperTrigger>
      <StepperIndicator>2</StepperIndicator>
      <div>
        <StepperTitle>Step 2</StepperTitle>
        <StepperDescription>Second step</StepperDescription>
      </div>
    </StepperTrigger>
  </StepperItem>
</Stepper>
```

### С кастомными индикаторами

```tsx
<Stepper currentStep={2} orientation="horizontal">
  <StepperItem step={1}>
    <StepperTrigger>
      <StepperIndicator>
        <Check className="h-4 w-4" />
      </StepperIndicator>
      <div>
        <StepperTitle>Completed</StepperTitle>
        <StepperDescription>This step is done</StepperDescription>
      </div>
    </StepperTrigger>
  </StepperItem>
  <StepperSeparator isCompleted={true} />
  <StepperItem step={2}>
    <StepperTrigger>
      <StepperIndicator>
        <Loader2 className="h-4 w-4 animate-spin" />
      </StepperIndicator>
      <div>
        <StepperTitle>In Progress</StepperTitle>
        <StepperDescription>Currently working on this</StepperDescription>
      </div>
    </StepperTrigger>
  </StepperItem>
</Stepper>
```

## Стилизация

Компонент использует CSS классы Tailwind и автоматически адаптируется к теме:

- **Завершенные этапы**: `border-primary bg-primary text-primary-foreground`
- **Текущий этап**: `border-primary bg-background text-primary`
- **Будущие этапы**: `border-muted bg-background text-muted-foreground`

## Доступность

Компонент полностью поддерживает доступность:

- Семантическая разметка
- Поддержка клавиатурной навигации
- ARIA атрибуты
- Поддержка screen readers

## Интеграция с регистрацией

Степер интегрирован в процесс регистрации в двух вариантах:

1. **RegistrationStepper** - горизонтальный макет
2. **RegistrationStepperVertical** - вертикальный макет с боковой панелью

## Демонстрация

Посетите `/stepper-demo` для интерактивной демонстрации всех возможностей компонента.

## Будущие улучшения

1. **Анимации** - плавные переходы между этапами
2. **Кастомные темы** - дополнительные цветовые схемы
3. **Адаптивность** - автоматическое переключение ориентации
4. **Валидация** - встроенная поддержка валидации этапов
5. **Состояния** - расширенные состояния (ошибка, предупреждение, успех)
