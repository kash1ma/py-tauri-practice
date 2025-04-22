from sqlalchemy import Column, Integer, String
from app.db.base import Base

class Pizza(Base):
    __tablename__ = "pizzas"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(Text)
    price = Column(Decimal)