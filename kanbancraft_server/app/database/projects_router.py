from database.users_router import router
from database.routers import projects_collection, Project
from pymongo.errors import DuplicateKeyError, BulkWriteError
from fastapi import HTTPException
from pydantic import BaseModel


# Эндпоинты для проектов
# ID владельца временно заткнуто заранее созданным пользователем
owner = "username"


@router.get('/projects')
async def get_all_projects(nickname: str) -> list[Project]:
    query = dict(owner=nickname)
    try:
        result = list(projects_collection.find(query))
        return result
    except BulkWriteError:
        raise HTTPException(status_code=404, detail="No such users")


@router.post('/projects/add')
async def add_project(nickname: str, project_name: str):
    new_project = dict(project_id="", owner=nickname, project_name=project_name, members=[])
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
async def update_project_name(nickname: str, project_id: str, new_project_name: str):
    current_project = dict(owner=nickname, project_id=project_id)
    new_data = {"$set": dict(project_name=new_project_name)}

    try:
        projects_collection.update_one(current_project, new_data)
        return 200
    except BulkWriteError:
        raise HTTPException(status_code=400, detail="No such users or projects")


@router.patch('/projects/{project_id}/invite')
async def add_member_to_project(new_member_id: str, project_id: str):
    current_project = dict(project_id=project_id)
    temp = list(projects_collection.find(current_project))[0]
    members = temp.get("members")
    members.append(new_member_id)
    new_data = {"$set": dict(members=members)}
    projects_collection.update_one(current_project, new_data)
    return 201
