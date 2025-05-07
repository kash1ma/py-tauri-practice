from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.delivery_model import Delivery
from app.schemas.delivery_schemas import DeliveryCreate, DeliveryUpdate

def get_all_deliveries(db: Session):
    return db.query(Delivery).all()

def get_delivery_by_id(db: Session, delivery_id: int):
    delivery = db.query(Delivery).filter(Delivery.id == delivery_id).first()
    if not delivery:
        raise HTTPException(status_code=404, detail="Доставка не найдена")
    return delivery

def create_delivery(db: Session, delivery: DeliveryCreate):
    db_delivery = Delivery(**delivery.dict())
    db.add(db_delivery)
    db.commit()
    db.refresh(db_delivery)
    return db_delivery

def update_delivery(db: Session, delivery_id: int, delivery: DeliveryUpdate):
    db_delivery = db.query(Delivery).filter(Delivery.id == delivery_id).first()
    if not db_delivery:
        raise HTTPException(status_code=404, detail="Доставка не найдена")
    
    for key, value in delivery.dict(exclude_unset=True).items():
        setattr(db_delivery, key, value)
    
    db.commit()
    db.refresh(db_delivery)
    return db_delivery

def delete_delivery(db: Session, delivery_id: int):
    db_delivery = db.query(Delivery).filter(Delivery.id == delivery_id).first()
    if not db_delivery:
        raise HTTPException(status_code=404, detail="Доставка не найдена")
    db.delete(db_delivery)
    db.commit()
    return {"detail": "Доставка успешно удалена"}