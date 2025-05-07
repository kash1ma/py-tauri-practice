from faker import Faker
from sqlalchemy.orm import Session
from app.models.delivery_model import Delivery
from app.models.order_model import Order
from app.db.session import SessionLocal

fake = Faker()

def generate_fake_deliveries(db: Session, count: int = 10):
    orders = db.query(Order).all()
    if not orders:
        print("Нет заказов для создания доставок.")
        return

    for _ in range(count):
        dispatched = fake.date_time_this_year()
        delivered = fake.date_time_between(start_date=dispatched, end_date="now")
        fake_delivery = Delivery(
            order_id=fake.random_element(orders).id,
            address=fake.address(),
            courier_name=fake.name(),
            phone=fake.phone_number(),
            dispatched_at=dispatched,
            delivered_at=delivered,
            status=fake.random_element(["pending", "in transit", "delivered", "cancelled"])
        )
        db.add(fake_delivery)
    db.commit()
    print(f"{count} фейковых доставок добавлено в базу данных.")

if __name__ == "__main__":
    db = SessionLocal()
    generate_fake_deliveries(db, count=10)
    db.close()