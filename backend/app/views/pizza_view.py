from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.controllers import pizza_controller
from app.schemas.pizza_schemas import Pizza, PizzaCreate, PizzaUpdate

router = APIRouter(prefix="/pizzas", tags=["pizzas"])

@router.get("/", response_model=list[Pizza])
def read_pizzas(db: Session = Depends(get_db)):
    return pizza_controller.get_all_pizzas(db)

@router.post("/", response_model=Pizza)
def create_pizza(pizza: PizzaCreate, db: Session = Depends(get_db)):
    return pizza_controller.create_pizza(db, pizza)

@router.put("/{pizza_id}", response_model=Pizza)
def update_pizza(pizza_id: int, pizza: PizzaUpdate, db: Session = Depends(get_db)):
    return pizza_controller.update_pizza(db, pizza_id, pizza)

@router.delete("/{pizza_id}")
def delete_pizza(pizza_id: int, db: Session = Depends(get_db)):
    return pizza_controller.delete_pizza(db, pizza_id)
