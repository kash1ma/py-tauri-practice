from fastapi import APIRouter
from app.views import pizza_view

router = APIRouter()

router.include_router(pizza_view.router)

@router.get("/")
def read_root():
    return {"message": "Hello World"}
