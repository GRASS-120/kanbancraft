from fastapi import APIRouter
import pymongo as pm

client = pm.MongoClient('mongodb://localhost:27017/')
database = client.Kanbancraft
users_collection = database.Users
projects_collection = database.Projects
boards_collection = database.Boards
columns_collection = database.Columns
tasks_collection = database.Tasks


router = APIRouter()
