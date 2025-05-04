# frontend/Dockerfile
FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Собираем приложение
RUN npm run build

# Открываем порт для приложения
EXPOSE 1420

# Запускаем приложение
CMD ["npm", "run", "dev"]
