from fastapi import HTTPException
from pymongo.errors import InvalidOperation, WriteError, DuplicateKeyError, CollectionInvalid
from database.endpoints.boards_router import router
from database.routers import columns_collection, tasks_collection, Column, boards_collection


# Эндпоинты для колонок
@router.get("/columns", status_code=200)
async def get_all_columns_by_board_id(board_id: str) -> list[Column]:
    query = dict(board_id=board_id)

    board = list(boards_collection.find(dict(board_id=board_id)))
    if board is None:
        raise HTTPException(status_code=404, detail="This board does not exist")

    result = list(columns_collection.find(query))

    return result


@router.post("/columns/add", status_code=201)
async def add_column(board_id: str, column_name: str):
    new_column = dict(column_id="", board_id=board_id, column_name=column_name, color="FFFFFF")

    board = list(boards_collection.find(dict(board_id=board_id)))
    if board is None:
        raise HTTPException(status_code=404, detail="This board does not exist")

    try:
        column_id = columns_collection.insert_one(new_column)
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Such column already exists")
    except WriteError:
        raise HTTPException(status_code=400, detail="Column was not created")

    new_data = {"$set": {"column_id": str(column_id.inserted_id)}}
    try:
        columns_collection.update_one(new_column, new_data)
    except WriteError:
        columns_collection.delete_one({"column_id": str(column_id.inserted_id)})
        raise HTTPException(status_code=400, detail="Column ID writing error")

    return 201


@router.patch("/columns/{column_id}/change_name", status_code=200)
async def update_column_name(column_id: str, new_name: str):
    current_column = dict(column_id=column_id)
    new_data = {"$set": dict(column_name=new_name)}

    column = list(columns_collection.find(dict(column_id=column_id)))
    if column is None:
        raise HTTPException(status_code=404, detail="This column does not exist")

    try:
        columns_collection.update_one(current_column, new_data)
    except WriteError:
        raise HTTPException(status_code=400, detail="Column name was not updated")

    return {"message": "Column name was successfully updated"}


@router.patch("/columns/{column_id}/change_color", status_code=200)
async def update_column_color(column_id: str, new_color: str):
    current_column = dict(column_id=column_id)
    new_data = {"$set": dict(color=new_color)}

    column = list(columns_collection.find(dict(column_id=column_id)))
    if column is None:
        raise HTTPException(status_code=404, detail="This column does not exist")

    try:
        columns_collection.update_one(current_column, new_data)
    except WriteError:
        raise HTTPException(status_code=400, detail="Column color was not updated")

    return {"message": "Column color was successfully updated"}


@router.delete("/columns/{column_id}/delete", status_code=200)
async def delete_column(column_id: str):
    query = dict(column_id=column_id)

    column = list(columns_collection.find(dict(column_id=column_id)))
    if column is None:
        raise HTTPException(status_code=404, detail="This column does not exist")

    try:
        columns_collection.delete_one(query)
    except CollectionInvalid:
        raise HTTPException(status_code=404, detail="Columns collection invalid")

    try:
        tasks_collection.delete_many(query)
    except CollectionInvalid:
        raise HTTPException(status_code=404, detail="Tasks collection invalid")

    return {"message": "Column was successfully deleted"}
