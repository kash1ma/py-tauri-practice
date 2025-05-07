from sqlalchemy import TIMESTAMP, Column, ForeignKey, Integer, String, Text
from app.db.base import Base

class Delivery(Base):
    __tablename__ = "deliverie"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    address = Column(Text, nullable=False)
    courier_name = Column(String)
    phone = Column(String)
    dispatched_at = Column(TIMESTAMP)
    delivered_at = Column(TIMESTAMP)
    status = Column(String)