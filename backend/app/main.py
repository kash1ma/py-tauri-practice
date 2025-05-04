from fastapi import FastAPI
from app.api.v1.routes import router as api_router
from app.api.v1.routes import auth

app = FastAPI()
app.include_router(api_router)
app.include_router(auth.router, prefix="/auth", tags=["auth"])
