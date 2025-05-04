from datetime import datetime
from pydantic import BaseModel
from typing import Optional

class OrderBase(BaseModel):
    user_id: int
    status: str
    payment_method: str

class OrderCreate(OrderBase):
    pass

class OrderUpdate(BaseModel):
    status: Optional[str] = None
    payment_method: Optional[str] = None

class OrderRead(OrderBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
