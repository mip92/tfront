# Husky Setup

## Что настроено

### Pre-commit хук (`.husky/pre-commit`)

Автоматически запускается перед каждым коммитом и проверяет:

1. **ESLint** - проверка качества кода
2. **TypeScript** - проверка типов (`tsc --noEmit`)
3. **Build check** - проверка сборки (только если изменены файлы в `src/` или `package.json`)

### Commit-msg хук (`.husky/commit-msg`)

Проверяет сообщение коммита:

- Не пустое
- Минимум 10 символов

## Как это работает

### ✅ Успешный коммит

```bash
git add .
git commit -m "Fix stepper colors and add husky setup"
# 🔍 Running pre-commit checks...
# 📝 Running ESLint...
# 🔧 Checking TypeScript compilation...
# 🏗️  Running build check...
# ✅ All checks passed! Commit allowed.
# 📝 Checking commit message...
# ✅ Commit message looks good!
```

### ❌ Неудачный коммит (если есть ошибки)

```bash
git add .
git commit -m "Fix stepper"
# 🔍 Running pre-commit checks...
# 📝 Running ESLint...
# ❌ ESLint errors found!
# Commit blocked.
```

## Обход проверок (только в крайних случаях)

Если нужно срочно закоммитить без проверок:

```bash
git commit -m "Emergency fix" --no-verify
```

## Настройка

### Добавление новых проверок

Отредактируйте `.husky/pre-commit`:

```bash
# Добавить новую проверку
echo "🧪 Running tests..."
npm run test
```

### Отключение проверок

Временно отключить все хуки:

```bash
git config core.hooksPath /dev/null
```

Включить обратно:

```bash
git config core.hooksPath .husky
```

## Скрипты в package.json

- `npm run lint` - ESLint проверка
- `npm run type-check` - TypeScript проверка типов
- `npm run build:check` - проверка сборки
- `npm run build:docker` - полная сборка для Docker

## Логи

Все проверки выводят подробную информацию о процессе. Если что-то не работает, проверьте:

1. Установлены ли все зависимости (`npm install`)
2. Нет ли ошибок в коде
3. Правильно ли настроены скрипты в `package.json`
