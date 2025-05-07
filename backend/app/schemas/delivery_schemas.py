from pydantic import BaseModel
from datetime import datetime

class DeliveryBase(BaseModel):
    order_id: int
    address: str
    courier_name: str
    phone: str
    dispatched_at: datetime
    delivered_at: datetime
    status: str

class DeliveryCreate(DeliveryBase):
    pass

class DeliveryUpdate(BaseModel):
    courier_name: str
    phone: str
    dispatched_at: datetime
    delivered_at: datetime
    status: str

class DeliveryRead(DeliveryBase):
    id: int

    class Config:
        orm_mode = True