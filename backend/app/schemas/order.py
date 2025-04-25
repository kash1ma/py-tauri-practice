from pydantic import BaseModel

class OrderBase(BaseModel):
    user_id: int
    delivery_id: int
    status: str

class OrderCreate(OrderBase):
    pass

class OrderRead(OrderBase):
    id: int

    class Config:
        orm_mode = True

