from fastapi import APIRouter
from app.api.v1.routes import auth
from app.views import pizza_view, user_view, order_view, order_item_view

router = APIRouter()

router.include_router(auth.router, prefix="/auth", tags=["auth"])
router.include_router(pizza_view.router, tags=["pizzas"])
router.include_router(user_view.router, tags=["users"])
router.include_router(order_view.router, tags=["orders"])
router.include_router(order_item_view.router, tags=["order-items"])
