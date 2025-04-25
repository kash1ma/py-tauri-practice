from typing import Optional
from pydantic import BaseModel

class PizaaBase(BaseModel):
    name: str
    description: str
    price_cents: int

class PizzaCreate(PizaaBase):
    pass

class PizzaUpdate(PizaaBase):
    id: int

class PizzaInDBBase(PizaaBase):
    id: int

    class Config:
        orm_mode = True

class Pizza(PizzaInDBBase):
    pass