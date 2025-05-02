from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey, DateTime, create_engine
from sqlalchemy.orm import relationship, declarative_base, sessionmaker
from app.db.base import Base

class Pizza(Base):
    __tablename__ = 'pizza'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    price = Column(Float, nullable=False)
