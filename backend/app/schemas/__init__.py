from pydantic import BaseModel
from typing import List, Optional

class UserBase(BaseModel):
    email: str
    phone: str
    username: str
    role: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

class PizzaBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float

class Pizza(PizzaBase):
    id: int

    class Config:
        orm_mode = True