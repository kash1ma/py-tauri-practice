from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.user import User as UserModel
from app.schemas.user_schemas import UserCreate, UserUpdate
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_all_users(db: Session):
    return db.query(UserModel).all()

def get_user_by_email(db: Session, email: str):
    return db.query(UserModel).filter(UserModel.email == email).first()

def get_user_by_id(db: Session, user_id: int):
    db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

def create_user(db: Session, user: UserCreate):
    if db.query(UserModel).filter(UserModel.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    if db.query(UserModel).filter(UserModel.phone == user.phone).first():
        raise HTTPException(status_code=400, detail="Phone number already registered")

    hashed_password = pwd_context.hash(user.password)
    db_user = UserModel(
        email=user.email,
        phone=user.phone,
        username=user.username,
        role=user.role,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: int, user: UserUpdate):
    db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Проверка на уникальность email
    if db_user.email != user.email:
        if db.query(UserModel).filter(UserModel.email == user.email).first():
            raise HTTPException(status_code=400, detail="Email already registered by another user")

    # Проверка на уникальность phone
    if db_user.phone != user.phone:
        if db.query(UserModel).filter(UserModel.phone == user.phone).first():
            raise HTTPException(status_code=400, detail="Phone number already registered by another user")

    db_user.email = user.email
    db_user.phone = user.phone
    db_user.username = user.username
    db_user.role = user.role
    db_user.hashed_password = pwd_context.hash(user.password)

    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(db_user)
    db.commit()
    return {"detail": "User deleted successfully"}
