from sqlalchemy import Column, Integer, String, Text
from app.db.base import Base

class Pizza(Base):
    __tablename__ = "pizza"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    price_cents = Column(Integer, nullable=False)
