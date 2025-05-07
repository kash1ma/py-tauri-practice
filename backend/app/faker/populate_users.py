from faker import Faker
from sqlalchemy.orm import Session
from app.models.user_model import User
from app.db.session import SessionLocal
from app.core.security import hash_password

fake = Faker()

def generate_fake_users(db: Session, count: int = 10):
    for _ in range(count):
        fake_user = User(
            email=fake.unique.email(),
            phone=fake.unique.phone_number(),
            username=fake.user_name(),
            hashed_password=hash_password("password123"),
            role="user"
        )
        db.add(fake_user)
    db.commit()
    print(f"{count} фейковых пользователей добавлено в базу данных.")

if __name__ == "__main__":
    db = SessionLocal()
    generate_fake_users(db, count=10)
    db.close()