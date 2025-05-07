from faker import Faker
from sqlalchemy.orm import Session
from app.models.order_item_model import OrderItem
from app.models.order_model import Order
from app.models.pizza_model import Pizza
from app.db.session import SessionLocal

fake = Faker()

def generate_fake_order_items(db: Session, count: int = 10):
    orders = db.query(Order).all()
    pizzas = db.query(Pizza).all()
    if not orders or not pizzas:
        print("Нет заказов или пицц для создания элементов заказа.")
        return

    for _ in range(count):
        fake_order_item = OrderItem(
            order_id=fake.random_element(orders).id,
            pizza_id=fake.random_element(pizzas).id,
            quantity=fake.random_int(min=1, max=5)
        )
        db.add(fake_order_item)
    db.commit()
    print(f"{count} фейковых элементов заказа добавлено в базу данных.")

if __name__ == "__main__":
    db = SessionLocal()
    generate_fake_order_items(db, count=10)
    db.close()