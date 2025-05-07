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

    # первые 10 секунд будет статус "обрабатывается"
    # потом "заказ готовиться" в течение 15 минут
    # потом "курьер в пути" в течение 15 минут
    # потом "доставлено"
    status = Column(String)