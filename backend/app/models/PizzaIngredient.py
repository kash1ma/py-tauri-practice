from sqlalchemy import Column, Integer, String
from app.db.base import Base

class PizzaIngredient(Base):
    __tablename__ = "pizza_ingredients"
    pizza_id = Column(Integer, ForeignKey("pizzas.id"), primary_key=True)
    ingredient_id = Column(Integer, ForeignKey("ingredients.id"), primary_key=True)
    quantity = Column(Integer)