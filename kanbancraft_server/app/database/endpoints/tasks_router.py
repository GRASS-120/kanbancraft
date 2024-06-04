from fastapi import HTTPException
from pymongo.errors import CollectionInvalid, WriteError

from database.endpoints.columns_router import router
from database.routers import tasks_collection, Task


# Эндпоинты для задач
@router.get("/tasks")
async def get_tasks_by_column_id(column_id: str) -> list[Task]:
    query = dict(column_id=column_id)
    try:
        result = list(tasks_collection.find(query))
    except CollectionInvalid:
        raise HTTPException(status_code=404, detail="Collection invalid")

    return result


@router.post("/tasks/add")
async def post_task(column_id: str, description: str):
    new_task = dict(task_id="", column_id=column_id, description=description)

    try:
        task_id = tasks_collection.insert_one(new_task)
    except WriteError:
        raise HTTPException(status_code=400, detail="Task was not created")

    new_data = {"$set": {"task_id": str(task_id.inserted_id)}}
    try:
        tasks_collection.update_one(new_task, new_data)
    except WriteError:
        raise HTTPException(status_code=400, detail="Task ID write error")

    return {"message": "Task was successfully created"}


@router.patch("/tasks/{task_id}/move_to/{new_column_id}")
async def move_task(task_id: str, new_column_id: str):
    current_task = dict(task_id=task_id)
    new_data = {"$set": dict(column_id=new_column_id)}

    try:
        tasks_collection.update_one(current_task, new_data)
    except WriteError:
        raise HTTPException(status_code=400, detail="Task moving error")

    return {"message": "Task was successfully moved"}


@router.patch("/tasks/{task_id}/change_description")
async def edit_task_description(task_id: str, new_description):
    current_task = dict(task_id=task_id)
    new_data = {"$set": dict(description=new_description)}

    try:
        tasks_collection.update_one(current_task, new_data)
    except WriteError:
        raise HTTPException(status_code=400, detail="Task description editing error")

    return {"message": "Task description was successfully edited"}


@router.delete("/tasks/{task_id}/delete")
async def delete_task(task_id: str):
    query = dict(task_id=task_id)

    try:
        tasks_collection.delete_one(query)
    except WriteError:
        raise HTTPException(status_code=400, detail="Task deleting error")

    return {"message": "Task was successfully deleted"}
