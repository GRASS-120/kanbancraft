from database.boards_router import router
from database.routers import columns_collection, tasks_collection, Column
from pymongo.errors import DuplicateKeyError, BulkWriteError
from pydantic import BaseModel


# Эндпоинты для колонок
@router.get("/columns")
async def get_all_columns_by_board_id(board_id: str) -> list[Column]:
    query = dict(board_id=board_id)
    result = list(columns_collection.find(query))
    return result


@router.post("/columns")
async def add_column(board_id: str, column_name: str):
    new_column = dict(column_id="", board_id=board_id, column_name=column_name, color="FFFFFF")
    columns_collection.insert_one(new_column)
    result = list(columns_collection.find(new_column))[0]
    new_data = {"$set": {"column_id": str(result.get("_id"))}}
    columns_collection.update_one(new_column, new_data)
    return 201


@router.patch("/columns/{column_id}/change_name")
async def update_column_name(column_id: str, new_name: str):
    current_column = dict(column_id=column_id)
    new_data = {"$set": dict(column_name=new_name)}
    columns_collection.update_one(current_column, new_data)
    return 200


@router.patch("/columns/{column_id}/change_color")
async def update_column_color(column_id: str, new_color: str):
    current_column = dict(column_id=column_id)
    new_data = {"$set": dict(color=new_color)}
    columns_collection.update_one(current_column, new_data)
    return 200


@router.delete("/columns/{column_id}/delete")
async def delete_column(column_id: str):
    query = dict(column_id=column_id)
    columns_collection.delete_one(query)
    tasks_collection.delete_many(query)
    return 200
