from fastapi import APIRouter, HTTPException
from mongo_db_script import users_collection, desks_collection


router = APIRouter()


@router.get("/{username}/get_user_data")
async def get_user_data(username: str):
    pass


# Получение досок пользователя
@router.get("/{username}/get_user_desks")
async def get_user_desks(username: str):
    query = {"owner": username}
    result = list(desks_collection.find(query))
    return result


# Эндпоинты для задач
@router.post("/{username}/{desk}/{column}/tasks/create")
async def post_task(username: str, desk: str, column: str, task_description: str):
    pass


@router.put("/{username}/{desk}/{column}/tasks/{task_id}/move/{move_to}")
async def move_task(username: str, desk: str, column: str, move_to: str, task_id: str):
    pass


@router.put("/{username}/{desk}/{column}/tasks/{task_id}/edit_description")
async def edit_task_description(username: str, desk: str, column: str, task_id: str, new_description: str):
    pass


@router.put("/{username}/{desk}/{column}/tasks/{task_id}/edit_color")
async def edit_task_color(username: str, desk: str, column: str, task_id: str, new_color: str):
    pass


@router.delete("/{username}/{desk}/{column}/tasks/{task_id}/delete")
async def delete_task(username: str, desk: str, column: str, task_id: str):
    pass


# Эндпоинты для колонок
@router.post("/{username}/{desk}/columns/create")
async def post_column(username: str, desk: str, column_name: str):
    pass


@router.put("/{username}/{desk}/columns/{column_name}/edit_name")
async def edit_column_name(username: str, desk: str, column: str, new_name: str):
    pass


@router.put("/{username}/{desk}/columns/{column_name}/edit_color")
async def edit_column_color(username: str, desk: str, column: str):
    pass


@router.delete("/{username}/{desk}/columns/{column_name}/delete")
async def delete_column():
    pass
