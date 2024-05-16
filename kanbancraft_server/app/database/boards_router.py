from database.projects_router import router
from database.routers import boards_collection, Board
# from pymongo.errors import DuplicateKeyError, BulkWriteError
from pydantic import BaseModel


# Эндпоинты для досок
@router.get("/boards")
async def get_boards_by_project_id(project_id: str) -> list[Board]:
    query = dict(project_id=project_id)
    result = list(boards_collection.find(query))
    return result


@router.post("/boards/add")
async def add_board(project_id: str, board_name: str):
    new_board = dict(board_id="", project_id=project_id, board_name=board_name)
    boards_collection.insert_one(new_board)
    result = list(boards_collection.find(new_board))[0]
    new_data = {"$set": {"board_id": str(result.get("_id"))}}
    boards_collection.update_one(new_board, new_data)
    return 201


@router.patch("/boards/{board_id}/change_name")
async def update_board_name(board_id: str, new_name):
    current_board = dict(board_id=board_id)
    new_data = {"$set": dict(board_name=new_name)}
    boards_collection.update_one(current_board, new_data)
    return 200
