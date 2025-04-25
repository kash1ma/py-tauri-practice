from pydantic import BaseModel

class OrderItemBase(BaseModel):
    pizza_id: int
    quantity: int

class OrderItemCreate(OrderItemBase):
    pass

class OrderItemRead(OrderItemBase):
    id: int

    class Config:
        orm_mode = True