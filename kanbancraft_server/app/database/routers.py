from fastapi import APIRouter
import pymongo as pm
from pydantic import BaseModel
from pymongo import IndexModel, ASCENDING, DESCENDING

router = APIRouter()


client = pm.MongoClient('mongodb://localhost:27017/')
database = client.Kanbancraft


users_collection = database.Users
projects_collection = database.Projects
boards_collection = database.Boards
columns_collection = database.Columns
tasks_collection = database.Tasks


class User(BaseModel):
    _id: str  # этот параметр использует база данных как уникальный ключ, к нему доступа при выполнении запроса нет
    nickname: str  # в базе данных ключом будет выступать этот параметр, никнеймы будут уникальны
    password: str  # если будешь делать шифрование пароля, вынеси его в отдельную функцию


class Project(BaseModel):
    _id: str
    project_id: str
    owner: str
    project_name: str
    members: list[str]


class Board(BaseModel):
    _id: str
    board_id: str
    project_id: str
    board_name: str


class Column(BaseModel):
    _id: str
    column_id: str
    board_id: str
    column_name: str
    color: str


class Task(BaseModel):
    _id: str
    task_id: str
    column_id: str
    description: str
