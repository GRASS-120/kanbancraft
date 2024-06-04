from fastapi import HTTPException
from pymongo.errors import InvalidOperation, WriteError, DuplicateKeyError, CollectionInvalid
from database.endpoints.boards_router import router
from database.routers import columns_collection, tasks_collection, Column


# Эндпоинты для колонок
@router.get("/columns", status_code=200)
async def get_all_columns_by_board_id(board_id: str) -> list[Column]:
    query = dict(board_id=board_id)

    try:
        result = list(columns_collection.find(query))
    except InvalidOperation:
        raise HTTPException(status_code=404, detail="This board does not exist or does not have columns")

    return result


@router.post("/columns", status_code=201)
async def add_column(board_id: str, column_name: str):
    new_column = dict(column_id="", board_id=board_id, column_name=column_name, color="FFFFFF")

    try:
        column_id = columns_collection.insert_one(new_column)
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Such column already exists")
    except WriteError:
        raise HTTPException(status_code=400, detail="Column was not created")

    try:
        new_data = {"$set": {"column_id": str(column_id.inserted_id)}}
        columns_collection.update_one(new_column, new_data)
    except WriteError:
        raise HTTPException(status_code=400, detail="Column ID writing error")

    return 201


@router.patch("/columns/{column_id}/change_name", status_code=200)
async def update_column_name(column_id: str, new_name: str):
    current_column = dict(column_id=column_id)
    new_data = {"$set": dict(column_name=new_name)}

    try:
        columns_collection.update_one(current_column, new_data)
    except WriteError:
        raise HTTPException(status_code=400, detail="Column name was not updated")

    return {"message": "Column name was successfully updated"}


@router.patch("/columns/{column_id}/change_color", status_code=200)
async def update_column_color(column_id: str, new_color: str):
    current_column = dict(column_id=column_id)
    new_data = {"$set": dict(color=new_color)}

    try:
        columns_collection.update_one(current_column, new_data)
    except WriteError:
        raise HTTPException(status_code=400, detail="Column color was not updated")

    return {"message": "Column color was successfully updated"}


@router.delete("/columns/{column_id}/delete", status_code=200)
async def delete_column(column_id: str):
    query = dict(column_id=column_id)

    try:
        columns_collection.delete_one(query)
    except CollectionInvalid:
        raise HTTPException(status_code=404, detail="Collection invalid")

    try:
        tasks_collection.delete_many(query)
    except CollectionInvalid:
        raise HTTPException(status_code=404, detail="Collection invalid")

    return {"message": "Column was successfully deleted"}
