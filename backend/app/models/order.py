from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey, DateTime, create_engine
from sqlalchemy.orm import relationship, declarative_base, sessionmaker
from datetime import datetime
from app.db.base import Base

class Order(Base):
    __tablename__ = 'order'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    status = Column(String, nullable=False)
    payment_method = Column(String, nullable=False)

    user = relationship('User', back_populates='orders')
    items = relationship('OrderItem', back_populates='order')
    delivery = relationship('Delivery', uselist=False, back_populates='order')
