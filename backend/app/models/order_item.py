from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey, DateTime, create_engine
from sqlalchemy.orm import relationship, declarative_base, sessionmaker
from app.db.base import Base

class OrderItem(Base):
    __tablename__ = 'order_item'

    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey('order.id'), nullable=False)
    pizza_id = Column(Integer, ForeignKey('pizza.id'), nullable=False)
    quantity = Column(Integer, nullable=False)

    order = relationship("Order", back_populates="items")
    pizza = relationship("Pizza")
