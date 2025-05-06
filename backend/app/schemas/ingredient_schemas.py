from pydantic import BaseModel
from typing import Optional

class IngredientBase(BaseModel):
    name: str

class IngredientCreate(IngredientBase):
    stock_quantity: int

class IngredientUpdate(BaseModel):
    name: Optional[str] = None
    stock_quantity: Optional[int] = None

class IngredientRead(IngredientBase):
    id: int
    stock_quantity: int

    class Config:
        orm_mode = True
