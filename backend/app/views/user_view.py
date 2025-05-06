from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.controllers import user_controller
from app.schemas.user_schemas import User, UserCreate, UserUpdate

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/", response_model=list[User])
def read_users(db: Session = Depends(get_db)):
    return user_controller.get_all_users(db)

@router.get("/{user_id}", response_model=User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    return user_controller.get_user_by_id(db, user_id)

@router.post("/", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return user_controller.create_user(db, user)

@router.put("/{user_id}", response_model=User)
def update_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    return user_controller.update_user(db, user_id, user)

@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    return user_controller.delete_user(db, user_id)
