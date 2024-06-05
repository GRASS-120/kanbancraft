from database.endpoints.users_router import router
from database.routers import projects_collection, users_collection, Project, boards_collection, columns_collection, \
    tasks_collection
from pymongo.errors import DuplicateKeyError, InvalidOperation, WriteError, CollectionInvalid
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
    new_project = dict(project_id="", owner=nickname, project_name=project_name, members=[nickname])
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


@router.delete("/projects/{project_id}/delete", status_code=200)
async def delete_project(project_id: str):
    boards_ids = []
    columns_ids = []
    project_query = dict(project_id=project_id)

    project = projects_collection.find_one(dict(project_id=project_id))
    if project is None:
        raise HTTPException(status_code=404, detail="This project does not exist")

    user_query = dict(nickname=project.get('owner'))
    user = users_collection.find_one(user_query)
    if user is None:
        raise HTTPException(status_code=404, detail="This project's owner does not exist")

    user_projects = user.get('projects')
    user_projects.remove(project_id)
    new_user_data = {"$set": dict(projects=user_projects)}
    try:
        users_collection.update_one(user_query, new_user_data)
    except WriteError:
        raise HTTPException(status_code=404, detail="User projects data update error")

    boards = list(boards_collection.find(project_query))
    if (boards is not None) and (boards != []):
        boards_ids = [x.get('board_id') for x in boards]

    for board_id in boards_ids:
        board_query = dict(board_id=board_id)
        columns = list(columns_collection.find(board_query))
        if (columns is not None) and (columns != []):
            for x in columns:
                columns_ids.append(x['column_id'])

    try:
        projects_collection.delete_one(project_query)
    except CollectionInvalid:
        raise HTTPException(status_code=404, detail="Projects collection invalid")

    try:
        boards_collection.delete_many(project_query)
    except CollectionInvalid:
        raise HTTPException(status_code=404, detail="Boards collection invalid")

    try:
        for board_id in boards_ids:
            columns_query = dict(board_id=board_id)
            columns_collection.delete_many(columns_query)
    except CollectionInvalid:
        raise HTTPException(status_code=404, detail="Tasks collection invalid")

    try:
        for column_id in columns_ids:
            print(column_id)
            tasks_query = dict(column_id=column_id)
            tasks_collection.delete_many(tasks_query)
    except CollectionInvalid:
        raise HTTPException(status_code=404, detail="Tasks collection invalid")

    return {"message": "Project was successfully deleted"}
