from sqlalchemy import Column, Integer, String
from app.db.base import Base

class Delivery(Base):
    __tablename__ = "deliveries"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    address = Column(Text)
    delivery_type = Column(String)
    courier_name = Column(String)
    phone = Column(String)
    dispatched_at = Column(TIMESTAMP)
    delivered_at = Column(TIMESTAMP)
    status = Column(String)