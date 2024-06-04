from database.endpoints.users_router import router
from database.routers import projects_collection, users_collection, Project
from pymongo.errors import DuplicateKeyError, InvalidOperation, WriteError
from fastapi import HTTPException


# Эндпоинты для проектов
# ID владельца временно заткнуто заранее созданным пользователем


@router.get('/projects')
async def get_all_projects_by_nickname(nickname: str) -> list[Project]:
    result: list[Project] = []
    query = dict(nickname=nickname)

    try:
        user = list(users_collection.find(query))[0]
        projects = user.get('projects')
        if projects is [] or projects is None:
            raise HTTPException(status_code=404, detail="This user has no projects")
    except IndexError:
        raise HTTPException(status_code=404, detail="This user does not exist")

    for project_id in projects:
        query = dict(project_id=project_id)
        try:
            project = list(projects_collection.find(query))[0]
            result.append(project)
        except IndexError:
            pass

    return result


@router.get('/projects/{project_id}/users')
async def get_project_members(project_id):
    query = dict(project_id=project_id)

    try:
        result = list(projects_collection.find_one(query).get('members'))
    except InvalidOperation:
        raise HTTPException(status_code=404, detail="No such projects")

    return result


@router.post('/projects/add')
async def add_project(nickname: str, project_name: str):
    new_project = dict(project_id="", owner=nickname, project_name=project_name, members=[])

    try:
        project_id = projects_collection.insert_one(new_project)
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="This project already exists")
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
    current_project = dict(project_id=project_id)

    try:
        project = projects_collection.find_one(current_project)
    except InvalidOperation:
        raise HTTPException(status_code=404, detail="Project was no found")

    members = project.get("members")
    if new_member_id in members:
        raise HTTPException(status_code=400, detail="User is already invited")
    members.append(new_member_id)
    try:
        new_data = {"$set": dict(members=members)}
        projects_collection.update_one(current_project, new_data)
    except WriteError:
        raise HTTPException(status_code=400, detail="Member was not invited")

    return {"message": "Member was successfully added"}
