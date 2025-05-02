from sqlalchemy import Column, Integer, String, Float, Text
from app.db.base import Base

class Pizza(Base):
    __tablename__ = 'pizza'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    price = Column(Float, nullable=False)
