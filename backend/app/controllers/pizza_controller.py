from sqlalchemy.orm import Session
from app.models.pizza import Pizza as PizzaModel
from app.schemas.pizza import PizzaCreate, PizzaUpdate
from fastapi import HTTPException

def get_all_pizzas(db: Session):
    return db.query(PizzaModel).all()

def create_pizza(db: Session, pizza: PizzaCreate):
    db_pizza = PizzaModel(**pizza.dict())
    db.add(db_pizza)
    db.commit()
    db.refresh(db_pizza)
    return db_pizza

def update_pizza(db: Session, pizza_id: int, pizza: PizzaUpdate):
    db_pizza = db.query(PizzaModel).filter(PizzaModel.id == pizza_id).first()
    if not db_pizza:
        raise HTTPException(status_code=404, detail="Pizza not found")
    for key, value in pizza.dict(exclude_unset=True).items():
        setattr(db_pizza, key, value)
    db.commit()
    db.refresh(db_pizza)
    return db_pizza

def delete_pizza(db: Session, pizza_id: int):
    db_pizza = db.query(PizzaModel).filter(PizzaModel.id == pizza_id).first()
    if not db_pizza:
        raise HTTPException(status_code=404, detail="Pizza not found")
    db.delete(db_pizza)
    db.commit()
    return {"detail": "Pizza deleted successfully"}
