from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey, DateTime, create_engine
from sqlalchemy.orm import relationship, declarative_base, sessionmaker
from app.db.base import Base

class PizzaIngredient(Base):
    __tablename__ = 'pizza_ingredient'

    pizza_id = Column(Integer, ForeignKey('pizza.id'), primary_key=True)
    ingredient_id = Column(Integer, ForeignKey('ingredient.id'), primary_key=True)
    quantity = Column(Integer, nullable=False)
