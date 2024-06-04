from database.endpoints.users_router import router
from database.routers import projects_collection, users_collection, Project
from pymongo.errors import DuplicateKeyError, InvalidOperation, WriteError
from fastapi import HTTPException


# Эндпоинты для проектов
@router.get('/projects')
async def get_all_projects_by_nickname(nickname: str) -> list[Project]:
    result: list[Project] = []
    query = dict(nickname=nickname)

    user = users_collection.find_one(query)
    if user is None:
        raise HTTPException(status_code=404, detail="Such user does not exist")

    projects = user.get('projects')
    if projects is None:
        raise HTTPException(status_code=404, detail="This user has no projects")

    for project_id in projects:
        project = projects_collection.find_one(dict(project_id=project_id))
        if project is not None:
            result.append(project)

    return result


@router.get('/projects/{project_id}/users')
async def get_project_members(project_id):
    query = dict(project_id=project_id)

    project = projects_collection.find_one(query)
    if project is None:
        raise HTTPException(status_code=404, detail="No such projects")
    result = project.get('members')

    return result


@router.post('/projects/add')
async def add_project(nickname: str, project_name: str):
    current_user = dict(nickname=nickname)
    new_project = dict(project_id="", owner=nickname, project_name=project_name, members=[])
    check_data = dict(owner=nickname, project_name=project_name)

    user = users_collection.find_one(current_user)
    if user is None:
        raise HTTPException(status_code=404, detail="Such user does not exist")
    projects = user.get('projects')

    check_project = projects_collection.find_one(check_data)
    if check_project is not None:
        raise HTTPException(status_code=400, detail="Such project already exists")

    try:
        project_id = projects_collection.insert_one(new_project)
    except WriteError:
        raise HTTPException(status_code=404, detail="Project was not added")

    projects.append(str(project_id.inserted_id))
    new_project_data = {"$set": {"project_id": str(project_id.inserted_id)}}
    new_user_data = {"$set": {"projects": projects}}
    try:
        projects_collection.update_one(dict(_id=project_id.inserted_id), new_project_data)
        users_collection.update_one(current_user, new_user_data)
    except WriteError:
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
async def add_member_to_project(new_member_name: str, project_id: str):
    current_project = dict(project_id=project_id)
    current_user = dict(nickname=new_member_name)

    try:
        project = projects_collection.find_one(current_project)
    except InvalidOperation:
        raise HTTPException(status_code=404, detail="Project was not found")

    try:
        user = users_collection.find_one(current_user)
    except InvalidOperation:
        raise HTTPException(status_code=404, detail="User was not found")

    members = project.get("members")
    projects = user.get('projects')

    if new_member_name in members:
        raise HTTPException(status_code=400, detail="User is already invited")
    if project_id in projects:
        raise HTTPException(status_code=400, detail="User is already invited")

    members.append(new_member_name)
    projects.append(project_id)
    new_project_data = {"$set": dict(members=members)}
    new_user_data = {"$set": dict(projects=projects)}

    try:
        projects_collection.update_one(current_project, new_project_data)
        users_collection.update_one(current_user, new_user_data)
    except WriteError:
        raise HTTPException(status_code=400, detail="Member was not invited")

    return {"message": "Member was successfully added"}
