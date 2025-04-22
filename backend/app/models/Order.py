from sqlalchemy import Column, Integer, String
from app.db.base import Base

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(TIMESTAMP, server_default=func.now())
    status = Column(String)
    payment_method = Column(String)

    owner = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order")