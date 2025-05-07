from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.controllers import delivery_controller
from app.schemas.delivery_schemas import DeliveryRead, DeliveryCreate, DeliveryUpdate

router = APIRouter(prefix="/deliveries", tags=["deliveries"])

@router.get("/", response_model=list[DeliveryRead])
def read_deliveries(db: Session = Depends(get_db)):
    return delivery_controller.get_all_deliveries(db)

@router.get("/{delivery_id}", response_model=DeliveryRead)
def read_delivery(delivery_id: int, db: Session = Depends(get_db)):
    return delivery_controller.get_delivery_by_id(db, delivery_id)

@router.post("/", response_model=DeliveryRead)
def create_delivery(delivery: DeliveryCreate, db: Session = Depends(get_db)):
    return delivery_controller.create_delivery(db, delivery)

@router.put("/{delivery_id}", response_model=DeliveryRead)
def update_delivery(delivery_id: int, delivery: DeliveryUpdate, db: Session = Depends(get_db)):
    return delivery_controller.update_delivery(db, delivery_id, delivery)

@router.delete("/{delivery_id}")
def delete_delivery(delivery_id: int, db: Session = Depends(get_db)):
    return delivery_controller.delete_delivery(db, delivery_id)