from sqlalchemy import Column, Integer, String, Text
from app.db.base import Base
from sqlalchemy.orm import relationship

class Pizza(Base):
    __tablename__ = "pizza"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    price_cents = Column(Integer, nullable=False)

    order_items = relationship("OrderItem", back_populates="pizza")
