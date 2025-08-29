#!/bin/bash

# Загружаем переменные окружения
if [ -f "docker-hub.env" ]; then
    source docker-hub.env
else
    echo "⚠️  Файл docker-hub.env не найден. Используем значения по умолчанию."
    # Конфигурация по умолчанию
    REGISTRY="docker.io"
    USERNAME="mip92"
    IMAGE_NAME="tattoo-client"
    TAG="latest"
fi

echo "🚀 Собираю frontend Docker образ для локальной разработки..."

# Проверяем, что мы в правильной директории
if [ ! -f "Dockerfile" ]; then
    echo "❌ Ошибка: Dockerfile не найден. Запустите скрипт из корня tclient."
    exit 1
fi

# Сначала собираем приложение локально
echo "🔧 Собираю приложение локально..."
npm run build:docker

if [ $? -ne 0 ]; then
    echo "❌ Ошибка сборки приложения!"
    exit 1
fi

echo "✅ Приложение успешно собрано локально!"

# Собираем frontend образ для локального использования
echo "🔨 Собираю frontend Docker образ локально..."
docker build -t ${USERNAME}/${IMAGE_NAME}:${TAG} .

if [ $? -ne 0 ]; then
    echo "❌ Ошибка сборки образа!"
    exit 1
fi

echo "✅ Frontend образ успешно собран локально!"
echo "🐳 Для production используйте GitHub Actions workflow"
echo "📝 Для локального тестирования: docker run -p 3000:3000 ${USERNAME}/${IMAGE_NAME}:${TAG}"
