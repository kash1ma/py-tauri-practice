from pydantic import BaseModel, ConfigDict, Field

class PizzaIngredientBase(BaseModel):
    pizza_id: int
    ingredient_id: int
    quantity: int

class PizzaIngredientCreate(PizzaIngredientBase):
    pass

class PizzaIngredientRead(PizzaIngredientBase):
    pass