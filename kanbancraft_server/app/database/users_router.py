from database.routers import router, users_collection
from pymongo.errors import DuplicateKeyError, BulkWriteError
from fastapi import HTTPException


# идентифкатор костыльного пользователя: 6643c745a39ed4bae55787da
# users_collection.insert_one(dict(username="username", password="password"))
