from sqlalchemy import Column, Integer, String
from app.db.base import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    phone = Column(String, unique=True, index=True)
    username = Column(String)
    password_hash = Column(String)
    role = Column(String)
    
    orders = relationship("Order", back_populates="owner")

class Pizza(Base):
    __tablename__ = "pizzas"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(Text)
    price = Column(Decimal)

class Ingredient(Base):
    __tablename__ = "ingredients"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    stock_quantity = Column(Integer)

class PizzaIngredient(Base):
    __tablename__ = "pizza_ingredients"
    pizza_id = Column(Integer, ForeignKey("pizzas.id"), primary_key=True)
    ingredient_id = Column(Integer, ForeignKey("ingredients.id"), primary_key=True)
    quantity = Column(Integer)

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(TIMESTAMP, server_default=func.now())
    status = Column(String)
    payment_method = Column(String)

    owner = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order")

class OrderItem(Base):
    __tablename__ = "order_items"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    pizza_id = Column(Integer, ForeignKey("pizzas.id"))
    quantity = Column(Integer)

    order = relationship("Order", back_populates="items")
    pizza = relationship("Pizza")

class Delivery(Base):
    __tablename__ = "deliveries"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    address = Column(Text)
    delivery_type = Column(String)  # "delivery" or "pickup"
    courier_name = Column(String)
    phone = Column(String)
    dispatched_at = Column(TIMESTAMP)
    delivered_at = Column(TIMESTAMP)
    status = Column(String)  # "waiting", "on_the_way", "delivered"
