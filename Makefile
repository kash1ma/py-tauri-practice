# Makefile

# Запуск всех сервисов
up:
	docker compose up --build

# Остановка сервисов
down:
	docker compose down

# Перезапуск (с ребилдом)
restart:
	docker compose down
	docker compose up --build

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
	docker compose down -v --remove-orphans
	docker system prune -f

lint-python:
	autoflake --in-place --remove-unused-variables --remove-all-unused-imports --recursive ./backend

# Команда для удаления старых миграций
cleanup-migrations:
	@echo "Удаляю старые миграции, если их больше 3..."
	python backend/clear_migrate.py

# Команда для создания фейковых данных
fake-pizzas:
	docker exec -it backend python -m app.faker.populate_pizzas

# Команда для создания фейковых пользователей
fake-users:
    docker exec -it backend python -m app.faker.populate_users

# Команда для создания фейковых заказов
fake-orders:
    docker exec -it backend python -m app.faker.populate_orders

fake-deliveries:
    docker exec -it backend python -m app.faker.populate_delivery

fake-order-items:
    docker exec -it backend python -m app.faker.populate_order_items

# Команда для создания фейковых данных
fake-data:
	docker exec -it backend python -m app.faker.populate_users
	docker exec -it backend python -m app.faker.populate_orders
	docker exec -it backend python -m app.faker.populate_delivery
	docker exec -it backend python -m app.faker.populate_pizzas
	docker exec -it backend python -m app.faker.populate_order_items