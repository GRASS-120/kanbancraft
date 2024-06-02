from database.users_router import router
from database.routers import projects_collection, Project
from pymongo.errors import DuplicateKeyError, InvalidOperation, WriteError
from fastapi import HTTPException


# Эндпоинты для проектов
# ID владельца временно заткнуто заранее созданным пользователем


@router.get('/projects')
async def get_all_projects_by_nickname(nickname: str) -> list[Project]:
    query = dict(owner=nickname)

    try:
        result = list(projects_collection.find(query))
    except InvalidOperation:
        raise HTTPException(status_code=404, detail="This user has no projects")

    return result


@router.get('/projects/{project_id}/users')
async def get_project_members(project_id):
    query = dict(project_id=project_id)

    try:
        result = list(projects_collection.find(query).get('members'))
    except InvalidOperation:
        raise HTTPException(status_code=404, detail="No members in this project")

    return result


@router.post('/projects/add')
async def add_project(nickname: str, project_name: str):
    new_project = dict(project_id="", owner=nickname, project_name=project_name, members=[])

    try:
        project_id = projects_collection.insert_one(new_project)
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Such project already exists")
    except WriteError:
        raise HTTPException(status_code=404, detail="Project was not added")

    try:
        new_data = {"$set": {"project_id": str(project_id.inserted_id)}}
        projects_collection.update_one(new_project, new_data)
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Project ID write error")

    return {"message": "Project was successfully created"}


@router.patch('/projects/{project_id}/change_name')
async def update_project_name(nickname: str, project_id: str, new_project_name: str):
    current_project = dict(owner=nickname, project_id=project_id)
    new_data = {"$set": dict(project_name=new_project_name)}

    try:
        projects_collection.update_one(current_project, new_data)
    except WriteError:
        raise HTTPException(status_code=400, detail="Project name was not updated")

    return {"message": "Project name was successfully updated"}


@router.patch('/projects/{project_id}/invite_member')
async def add_member_to_project(new_member_id: str, project_id: str):
    try:
        current_project = dict(project_id=project_id)
        temp = list(projects_collection.find(current_project))[0]
    except InvalidOperation:
        raise HTTPException(status_code=404, detail="Project was no found")

    members = temp.get("members")
    if new_member_id in members:
        raise HTTPException(status_code=400, detail="User is already invited")
    members.append(new_member_id)
    try:
        new_data = {"$set": dict(members=members)}
        projects_collection.update_one(current_project, new_data)
    except WriteError:
        raise HTTPException(status_code=400, detail="Member was not invited")

    return {"message": "Member was successfully added"}
