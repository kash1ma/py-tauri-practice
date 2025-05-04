import os
import glob

migrations_folder = "backend/alembic/versions"

def delete_old_migrations(migrations_folder, limit=3):
    # Получаем список файлов миграций, сортируем по времени создания (от самых старых)
    migration_files = sorted(glob.glob(os.path.join(migrations_folder, "*.py")), key=os.path.getctime)
    
    if len(migration_files) > limit:
        migrations_to_delete = migration_files[:-limit]
        for migration in migrations_to_delete:
            print(f"Удаляю миграцию: {migration}")
            os.remove(migration)
        print(f"Удалено {len(migrations_to_delete)} миграций.")
    else:
        print(f"Количество миграций ({len(migration_files)}) меньше или равно {limit}, удаление не требуется.")

if __name__ == "__main__":
    delete_old_migrations(migrations_folder)
