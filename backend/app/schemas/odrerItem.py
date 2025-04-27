from pydantic import BaseModel

class OrderItemBase(BaseModel):
    order_id: int
    pizza_id: int
    quantity: int

class OrderItemCreate(OrderItemBase):
    pass

class OrderItemRead(OrderItemBase):
    id: int

    class Config:
        orm_mode = True