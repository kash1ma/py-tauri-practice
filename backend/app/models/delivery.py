from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.db.base import Base

class Delivery(Base):
    __tablename__ = 'delivery'

    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey('order.id'), nullable=False)
    address = Column(Text, nullable=False)
    delivery_type = Column(String, nullable=False)
    courier_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    dispatched_at = Column(DateTime)
    delivered_at = Column(DateTime)
    status = Column(String, nullable=False)

    order = relationship("Order", back_populates="delivery")
