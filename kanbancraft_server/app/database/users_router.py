from pydantic import BaseModel
from database.routers import router, users_collection, User
from pymongo.errors import DuplicateKeyError, BulkWriteError
from fastapi import HTTPException,, Depends
from fastapi.security import HTTPBasic, HTTPBasicCredentials

security = HTTPBasic()


# идентификатор "костыльного" пользователя: 6643c745a39ed4bae55787da
# модель пользователя с пояснениями лежит в routers


# результат поиска пользователя в базе выдаётся в виде итератора
# поэтому для получения списка пользователей нужно сначала итератор превратить с "список" из одного элемента
@router.get("/users/nickname={nickname}")
def get_user_by_nickname(nickname: str) -> User:
    query = dict(nickname=nickname)
    result = list(users_collection.find(query))[0]
    return result


@router.get("/users/all")
def get_all_users() -> list[User]:
    result = list(users_collection.find())
    return result

@router.post("/users/register")
def register_user(credentials: HTTPBasicCredentials = Depends(security)):
    new_user = dict(nickname=credentials.username, password=credentials.password)
    user_in_db = users_collection.find_one({"nickname": credentials.username})
    if user_in_db:
        raise HTTPException(status_code=400, detail="Nickname already registered")
    users_collection.insert_one(new_user)
    return {"username": credentials.username, "password": credentials.password}


@router.get("/users/login")
def login_user(credentials: HTTPBasicCredentials = Depends(security)):
    user = users_collection.find_one({"nickname": credentials.username})
    if not user or user["password"] != credentials.password:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    return {"message": "Login successful"}


@router.patch("/users/{nickname}/change_password")
def change_password(nickname: str, old_password: str, new_password: str):
    current_user = dict(nickname=nickname)
    new_data = {"$set": dict(password=new_password)}

    result = list(users_collection.find(current_user))[0]
    if result.get("password") == old_password:
        users_collection.update_one(current_user, new_data)
        return 201
    else:
        return 404
