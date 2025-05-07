from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.order_item_model import OrderItem
from app.schemas.order_item_schemas import OrderItemCreate, OrderItemUpdate

def get_order_items(db: Session):
    return db.query(OrderItem).all()

def get_order_item_by_id(db: Session, order_item_id: int):
    order_item = db.query(OrderItem).filter(OrderItem.id == order_item_id).first()
    if not order_item:
        raise HTTPException(status_code=404, detail="Элемент заказа не найден")
    return order_item

def create_order_item(db: Session, order_item: OrderItemCreate):
    db_order_item = OrderItem(
        order_id=order_item.order_id,
        pizza_id=order_item.pizza_id,
        quantity=order_item.quantity
    )
    db.add(db_order_item)
    db.commit()
    db.refresh(db_order_item)
    return db_order_item

def update_order_item(db: Session, order_item_id: int, order_item: OrderItemUpdate):
    db_order_item = db.query(OrderItem).filter(OrderItem.id == order_item_id).first()
    if not db_order_item:
        raise HTTPException(status_code=404, detail="Элемент заказа не найден")
    
    for key, value in order_item.dict(exclude_unset=True).items():
        setattr(db_order_item, key, value)
    
    db.commit()
    db.refresh(db_order_item)
    return db_order_item

def delete_order_item(db: Session, order_item_id: int):
    db_order_item = db.query(OrderItem).filter(OrderItem.id == order_item_id).first()
    if not db_order_item:
        raise HTTPException(status_code=404, detail="Элемент заказа не найден")
    
    db.delete(db_order_item)
    db.commit()
    return {"detail": "Элемент заказа успешно удален"}