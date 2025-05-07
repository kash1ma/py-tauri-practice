from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.controllers import order_controller
from app.schemas.order_schemas import OrderRead, OrderCreate, OrderUpdate

router = APIRouter(prefix="/orders", tags=["orders"])

@router.get("/", response_model=list[OrderRead])
def read_orders(db: Session = Depends(get_db)):
    return order_controller.get_all_orders(db)

@router.get("/{order_id}", response_model=OrderRead)
def read_order(order_id: int, db: Session = Depends(get_db)):
    return order_controller.get_order_by_id(db, order_id)

@router.post("/", response_model=OrderRead)
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    return order_controller.create_order(db, order)

@router.put("/{order_id}", response_model=OrderRead)
def update_order(order_id: int, order: OrderUpdate, db: Session = Depends(get_db)):
    return order_controller.update_order(db, order_id, order)

@router.delete("/{order_id}")
def delete_order(order_id: int, db: Session = Depends(get_db)):
    return order_controller.delete_order(db, order_id)