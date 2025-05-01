from fastapi import FastAPI
from app.api.v1.routes import router as api_router
from app.api.v1.routes.auth import router as auth_router

app = FastAPI()

app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(api_router)
