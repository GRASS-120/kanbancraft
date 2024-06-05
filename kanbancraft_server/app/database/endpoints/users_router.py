from pymongo.errors import *
from database.routers import router, users_collection, User
from fastapi import HTTPException


@router.get("/users/{nickname}")
async def get_user_by_nickname(nickname: str) -> User:
    query = dict(nickname=nickname)

    try:
        result = users_collection.find_one(query)
        if result is None:
            raise HTTPException(status_code=404, detail="User not found")
    except CollectionInvalid:
        raise HTTPException(status_code=404, detail="Collection not found")

    return result


@router.get("/users")
async def get_all_users() -> list[User]:
    try:
        result = list(users_collection.find())
        print(result)

        if len(result) == 0:
            raise HTTPException(status_code=404, detail="Users not found")
    except CollectionInvalid:
        raise HTTPException(status_code=404, detail="Collection not found")

    return result


@router.post("/register")
async def register_user(nickname: str, password: str):
    new_user = dict(nickname=nickname, password=password, projects=[])

    try:
        user_in_db = users_collection.find_one({"nickname": nickname})
    except CollectionInvalid:
        raise HTTPException(status_code=404, detail="Collection invalid")

    if user_in_db:
        raise HTTPException(status_code=400, detail="Nickname already registered")
    users_collection.insert_one(new_user)

    return {"username": nickname, "password": password}


@router.get("/login")
async def login_user(nickname: str, password: str):
    query = {"nickname": nickname}

    user = users_collection.find_one(query)
    if user is None:
        raise HTTPException(status_code=404, detail="Invalid username")

    if user["password"] != password:
        raise HTTPException(status_code=400, detail="Invalid password")

    return {"message": "Login successful"}


@router.patch("/users/{nickname}/change_password", status_code=200)
async def change_password(nickname: str, old_password: str, new_password: str, new_password_repeat: str):
    current_user = dict(nickname=nickname)

    if new_password != new_password_repeat:
        raise HTTPException(status_code=400, detail="New password labels do not match")
    new_data = {"$set": dict(password=new_password)}

    user = users_collection.find_one(current_user)
    if user is None:
        raise HTTPException(status_code=404, detail="Invalid username")

    if not user or user["password"] != old_password:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    else:
        users_collection.update_one(current_user, new_data)

    return {"message": "Password changed successfully"}
