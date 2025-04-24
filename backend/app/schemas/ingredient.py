from pydantic import BaseModel

class IngredientBase(BaseModel):
    name: str
    stock_quantity: int

class IngredientCreate(IngredientBase):
    pass

class IngredientRead(IngredientBase):
    name: srt