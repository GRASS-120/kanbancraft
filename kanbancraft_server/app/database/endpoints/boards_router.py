from fastapi import HTTPException
from pymongo.errors import InvalidOperation, WriteError, DuplicateKeyError
from database.endpoints.projects_router import router
from database.routers import projects_collection, boards_collection, Board


# Эндпоинты для досок
@router.get("/boards", status_code=200)
async def get_boards_by_project_id(project_id: str) -> list[Board]:
    query = dict(project_id=project_id)

    project = list(projects_collection.find(dict(project_id=project_id)))
    if project is None:
        raise HTTPException(status_code=404, detail="This project does not exist")

    result = list(boards_collection.find(query))

    return result


@router.post("/boards/add", status_code=201)
async def add_board(project_id: str, board_name: str):
    new_board = dict(board_id="", project_id=project_id, board_name=board_name)

    project = list(projects_collection.find(dict(project_id=project_id)))
    if project is None:
        raise HTTPException(status_code=404, detail="This project does not exist")

    try:
        board_id = boards_collection.insert_one(new_board)
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Such board already exists")
    except WriteError:
        raise HTTPException(status_code=400, detail="Board was not created")

    new_data = {"$set": {"board_id": str(board_id.inserted_id)}}
    try:
        boards_collection.update_one(new_board, new_data)
    except WriteError:
        boards_collection.delete_one({"board_id": str(board_id.inserted_id)})
        raise HTTPException(status_code=404, detail="Board ID writing error")

    return {"message": "Board was successfully created"}


@router.patch("/boards/{board_id}/change_name", status_code=200)
async def update_board_name(board_id: str, new_name):
    current_board = dict(board_id=board_id)

    board = list(boards_collection.find(dict(board_id=board_id)))
    if board is None:
        raise HTTPException(status_code=404, detail="This board does not exist")

    new_data = {"$set": dict(board_name=new_name)}
    try:
        boards_collection.update_one(current_board, new_data)
    except WriteError:
        raise HTTPException(status_code=400, detail="Board name was not updated")

    return {"message": "Board name was successfully updated"}
