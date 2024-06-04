from fastapi import HTTPException
from pymongo.errors import InvalidOperation, WriteError, DuplicateKeyError
from database.endpoints.projects_router import router
from database.routers import boards_collection, Board


# Эндпоинты для досок
@router.get("/boards", status_code=200)
async def get_boards_by_project_id(project_id: str) -> list[Board]:
    query = dict(project_id=project_id)

    try:
        result = list(boards_collection.find(query))
    except InvalidOperation:
        raise HTTPException(status_code=404, detail="This project does not exist or does not have boards")

    return result


@router.post("/boards/add", status_code=201)
async def add_board(project_id: str, board_name: str):
    new_board = dict(board_id="", project_id=project_id, board_name=board_name)

    try:
        board_id = boards_collection.insert_one(new_board)
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Such board already exists")
    except WriteError:
        raise HTTPException(status_code=400, detail="Board was not created")

    try:
        new_data = {"$set": {"board_id": str(board_id.inserted_id)}}
        boards_collection.update_one(new_board, new_data)
    except WriteError:
        raise HTTPException(status_code=404, detail="This project does not exist")

    return {"message": "Board was successfully created"}


@router.patch("/boards/{board_id}/change_name", status_code=200)
async def update_board_name(board_id: str, new_name):
    current_board = dict(board_id=board_id)

    try:
        new_data = {"$set": dict(board_name=new_name)}
        boards_collection.update_one(current_board, new_data)
    except WriteError:
        raise HTTPException(status_code=400, detail="Board name was not updated")

    return {"message": "Board name was successfully updated"}
