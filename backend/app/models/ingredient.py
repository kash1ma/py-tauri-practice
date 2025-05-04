from sqlalchemy import Column, Integer, String
from app.db.base import Base

class Ingredient(Base):
    __tablename__ = "ingredients"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    stock_quantity = Column(Integer)