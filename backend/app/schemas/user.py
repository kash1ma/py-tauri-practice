from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email: EmailStr
    phone: str
    username: str
    role: str = "user"

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: int

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserRead):
    pass

class UserUpdate(BaseModel):
    email: EmailStr
    phone: str
    username: str
    role: str
    password: str
