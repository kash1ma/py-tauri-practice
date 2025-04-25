from datetime import datetime
from pydantic   import BaseModel, ConfigDict, Field

class DeliveryBase(BaseModel):
    order_id: int
    address: str
    delivery_type: str
    courier_name: str
    phone: str
    dispatched_at: datetime
    delivered_at: datetime
    status: str

class DeliveryCreate(DeliveryBase):
    pass

class DeliveryRead(DeliveryBase):
    id: int

    class Config:
        orm_mode = True
