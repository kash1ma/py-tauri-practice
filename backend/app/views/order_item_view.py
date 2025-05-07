from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.controllers.order_item_controller import (
    get_order_items,
    get_order_item_by_id,
    create_order_item,
    update_order_item,
    delete_order_item
)
from app.schemas.order_item_schemas import OrderItemCreate, OrderItemUpdate, OrderItemRead

router = APIRouter(prefix="/order-items", tags=["order-items"])

@router.get("/", response_model=list[OrderItemRead])
def read_order_items(db: Session = Depends(get_db)):
    return get_order_items(db)

@router.get("/{order_item_id}", response_model=OrderItemRead)
def read_order_item(order_item_id: int, db: Session = Depends(get_db)):
    return get_order_item_by_id(db, order_item_id)

@router.post("/", response_model=OrderItemRead)
def create_item(order_item: OrderItemCreate, db: Session = Depends(get_db)):
    return create_order_item(db, order_item)

@router.put("/{order_item_id}", response_model=OrderItemRead)
def update_item(order_item_id: int, order_item: OrderItemUpdate, db: Session = Depends(get_db)):
    return update_order_item(db, order_item_id, order_item)

@router.delete("/{order_item_id}")
def delete_item(order_item_id: int, db: Session = Depends(get_db)):
    return delete_order_item(db, order_item_id)