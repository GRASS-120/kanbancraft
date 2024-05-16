from database.columns_router import router
from database.routers import tasks_collection, Task
from pymongo.errors import DuplicateKeyError, BulkWriteError
from pydantic import BaseModel


# Эндпоинты для задач
@router.get("/tasks")
async def get_tasks_by_column_id(column_id: str) -> list[Task]:
    query = dict(column_id=column_id)
    result = list(tasks_collection.find(query))
    return result


@router.post("/tasks/add")
async def post_task(column_id: str, description: str):
    new_task = dict(task_id="", column_id=column_id, description=description)
    tasks_collection.insert_one(new_task)
    result = list(tasks_collection.find(new_task))[0]
    new_data = {"$set": {"task_id": str(result.get("_id"))}}
    tasks_collection.update_one(new_task, new_data)
    return 201


@router.patch("/tasks/{task_id}/move_to/{new_column}")
async def move_task(task_id: str, new_column_id: str):
    current_task = dict(task_id=task_id)
    new_data = {"$set": dict(column_id=new_column_id)}
    tasks_collection.update_one(current_task, new_data)
    return 200


@router.patch("/tasks/{task_id}/change_description")
async def edit_task_description(task_id: str, new_description):
    current_task = dict(task_id=task_id)
    new_data = {"$set": dict(description=new_description)}
    tasks_collection.update_one(current_task, new_data)
    return 200


@router.delete("/tasks/{task_id}/delete")
async def delete_task(task_id: str):
    query = dict(task_id=task_id)
    tasks_collection.delete_one(query)
    return 200
