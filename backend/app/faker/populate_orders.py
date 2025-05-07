from faker import Faker
from sqlalchemy.orm import Session
from app.models.order_model import Order
from app.models.user_model import User
from app.db.session import SessionLocal

fake = Faker()

def generate_fake_orders(db: Session, count: int = 10):
    users = db.query(User).all()
    if not users:
        print("Нет пользователей для создания заказов.")
        return

    for _ in range(count):
        fake_order = Order(
            user_id=fake.random_element(users).id,
            status=fake.random_element(["pending", "completed", "cancelled"]),
            payment_method=fake.random_element(["credit_card", "cash", "paypal"]),
        )
        db.add(fake_order)
    db.commit()
    print(f"{count} фейковых заказов добавлено в базу данных.")

if __name__ == "__main__":
    db = SessionLocal()
    generate_fake_orders(db, count=10)
    db.close()