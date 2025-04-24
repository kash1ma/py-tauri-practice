from pydantic import BaseModel, EmailStr, Field

class UserBase (BaseModel):
    email: EmailStr
    phone: str
    username: str
    role: str

class UserCreate (UserBase):
    password: str

class UserRead (UserBase):
    id: int

    class Config:
        orm_mode = True

class User(UserRead):
    pass