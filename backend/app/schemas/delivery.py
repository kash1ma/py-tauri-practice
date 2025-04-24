from datetime import datetime
from pydantic   import BaseModel, ConfigDict, Field

class DeleveryBase(BaseModel):
    order_id: int
    address: str
    delivery_type: str
    courier_name: srt
    phone: str
    dispatched_at: datetime
    delivered_at: datetime
    status: str

class DeliveryCreate(DeleveryBase):
    pass

class DeliveryRead(DeleveryBase):
    id: int

    class Config:
        orm_mode = True
