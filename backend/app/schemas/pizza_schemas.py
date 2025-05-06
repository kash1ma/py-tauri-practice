from pydantic import BaseModel

class PizzaBase(BaseModel):
    name: str
    description: str
    price_cents: int

class PizzaCreate(PizzaBase):
    pass

class PizzaUpdate(PizzaBase):
    id: int

class PizzaInDBBase(PizzaBase):
    id: int

    class Config:
        orm_mode = True

class Pizza(PizzaInDBBase):
    pass
