from faker import Faker
from sqlalchemy.orm import Session
from app.models.pizza_model import Pizza
from app.db.session import SessionLocal

fake = Faker()

def generate_fake_pizzas(db: Session, count: int = 10):
    for _ in range(count):
        fake_pizza = Pizza(
            name=fake.word().capitalize() + " Pizza",
            description=fake.text(max_nb_chars=50),
            price_cents=fake.random_int(min=500, max=2000)
        )
        db.add(fake_pizza)
    db.commit()
    print(f"{count} фейковых пицц добавлено в базу данных.")

if __name__ == "__main__":
    db = SessionLocal()
    generate_fake_pizzas(db, count=10)
    db.close()