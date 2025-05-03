from sqlalchemy import (
    Column,
    Integer,
    String,
)
from app.db.base import Base


class Ingredient(Base):
    __tablename__ = "ingredient"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    stock_quantity = Column(Integer, nullable=False)
