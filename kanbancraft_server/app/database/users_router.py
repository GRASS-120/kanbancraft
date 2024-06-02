from pymongo.errors import *
from database.routers import router, users_collection, User
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBasic, HTTPBasicCredentials


security = HTTPBasic()


# идентификатор "костыльного" пользователя: 6643c745a39ed4bae55787da
# модель пользователя с пояснениями лежит в routers


# результат поиска пользователя в базе выдаётся в виде итератора
# поэтому для получения списка пользователей нужно сначала итератор превратить с "список" из одного элемента
@router.get("/users/nickname={nickname}")
async def get_user_by_nickname(nickname: str) -> User:
    try:
        query = dict(nickname=nickname)
        result = list(users_collection.find(query))[0]
        if result is None:
            raise HTTPException(status_code=404, detail="User not found")
    except CollectionInvalid:
        raise HTTPException(status_code=404, detail="Collection not found")
    return result


@router.get("/users/all")
async def get_all_users() -> list[User]:
    try:
        result = list(users_collection.find())
        if len(result) == 0:
            raise HTTPException(status_code=404, detail="Users not found")
    except CollectionInvalid:
        raise HTTPException(status_code=404, detail="Collection not found")
    return result


@router.post("/users/register")
async def register_user(credentials: HTTPBasicCredentials = Depends(security)):
    new_user = dict(nickname=credentials.username, password=credentials.password)

    try:
        user_in_db = users_collection.find_one({"nickname": credentials.username})
    except CollectionInvalid:
        raise HTTPException(status_code=404, detail="Collection invalid")

    if user_in_db:
        raise HTTPException(status_code=400, detail="Nickname already registered")
    users_collection.insert_one(new_user)

    return {"username": credentials.username, "password": credentials.password}


@router.get("/users/login")
async def login_user(credentials: HTTPBasicCredentials = Depends(security)):
    try:
        user = users_collection.find_one({"nickname": credentials.username})
    except CollectionInvalid:
        raise HTTPException(status_code=404, detail="Collection invalid")

    if not user or user["password"] != credentials.password:
        raise HTTPException(status_code=400, detail="Invalid username or password")

    return {"message": "Login successful"}


@router.patch("/users/{nickname}/change_password", status_code=200)
async def change_password(new_password: str, credentials: HTTPBasicCredentials = Depends(security)):
    current_user = dict(nickname=credentials.username)
    new_data = {"$set": dict(password=new_password)}

    try:
        user = list(users_collection.find(current_user))[0]
    except CollectionInvalid:
        raise HTTPException(status_code=404, detail="Collection invalid")

    if not user or user["password"] != credentials.password:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    else:
        users_collection.update_one(current_user, new_data)

    return {"message": "Password changed successfully"}
