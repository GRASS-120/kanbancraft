from database.users_router import router
from database.routers import projects_collection
from pymongo.errors import DuplicateKeyError, BulkWriteError
from fastapi import HTTPException
from pydantic import BaseModel


class Project(BaseModel):
    _id: str
    project_id: str
    owner: str
    project_name: str


# Эндпоинты для проектов
# ID владельца временно заткнуто заранее созданным пользователем
owner = "6643c745a39ed4bae55787da"


@router.get('/projects')
async def get_all_projects(user_id: str) -> list[Project]:
    query = dict(owner=owner)
    try:
        result = list(projects_collection.find(query))
        return result
    except BulkWriteError:
        raise HTTPException(status_code=404, detail="No such users")


@router.post('/projects/add')
async def add_project(user_id: str, project_name: str):
    new_project = dict(project_id="", owner=owner, project_name=project_name)
    try:
        projects_collection.insert_one(new_project)
        result = list(projects_collection.find(new_project))[0]
        new_data = {"$set": {"project_id": str(result.get("_id"))}}
        projects_collection.update_one(new_project, new_data)
        return 201
    except BulkWriteError:
        raise HTTPException(status_code=404, detail="No such users")
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Such project already exists")


@router.patch('/projects/{project_id}/change_name')
async def update_project_name(user_id: str, project_id: str, new_project_name: str):
    current_project = dict(owner=owner, project_id=project_id)
    new_data = {"$set": dict(project_name=new_project_name)}

    try:
        projects_collection.update_one(current_project, new_data)
        return 200
    except BulkWriteError:
        raise HTTPException(status_code=400, detail="No such users or projects")
