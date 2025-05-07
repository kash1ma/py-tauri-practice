from fastapi import APIRouter
from app.views import pizza_view, user_view, order_view, order_item_view

router = APIRouter()

router.include_router(pizza_view.router)
router.include_router(user_view.router)
router.include_router(order_view.router)
router.include_router(order_item_view.router)

@router.get("/")
def read_root():
    return {"message": "Hello World"}
