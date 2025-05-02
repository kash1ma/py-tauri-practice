# Makefile

# Запуск всех сервисов
up:
	docker-compose up --build

# Остановка сервисов
down:
	docker-compose down

# Перезапуск (с ребилдом)
restart:
	docker-compose down
	docker-compose up --build

# Запуск бэкенда в интерактивном режиме
backend-shell:
	docker exec -it backend /bin/bash

# Запуск миграций Alembic внутри backend-контейнера
create-migration:
	docker exec -it backend alembic upgrade head

# Генерация новой миграции
makemigration:
	docker exec -it backend alembic revision --autogenerate -m "new migration"

migration:
	docker exec -it backend alembic upgrade head
	docker exec -it backend alembic revision --autogenerate -m "new migration"

# Тесты
test:
	docker exec -it backend pytest

# Очистка проекта
clean:
	docker-compose down -v --remove-orphans
	docker system prune -f
