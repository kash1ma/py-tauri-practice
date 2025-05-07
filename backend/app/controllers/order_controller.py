from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.order_model import Order as OrderModel
from app.schemas.order_schemas import OrderCreate, OrderUpdate

def get_all_orders(db: Session):
    return db.query(OrderModel).all()

def get_order_by_id(db: Session, order_id: int):
    db_order = db.query(OrderModel).filter(OrderModel.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Заказ не найден")
    return db_order

def create_order(db: Session, order: OrderCreate):
    db_order = OrderModel(
        user_id=order.user_id,
        status=order.status,
        payment_method=order.payment_method
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

def update_order(db: Session, order_id: int, order: OrderUpdate):
    db_order = db.query(OrderModel).filter(OrderModel.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Заказ не найден")
    
    if order.status is not None:
        db_order.status = order.status
    if order.payment_method is not None:
        db_order.payment_method = order.payment_method
    
    db.commit()
    db.refresh(db_order)
    return db_order

def delete_order(db: Session, order_id: int):
    db_order = db.query(OrderModel).filter(OrderModel.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Заказ не найден")
    db.delete(db_order)
    db.commit()
    return {"detail": "Заказ удален"}