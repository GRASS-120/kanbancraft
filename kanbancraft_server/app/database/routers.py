from fastapi import APIRouter


router = APIRouter()


# Эндпоинты для задач
@router.post("/profile/tasks")
def post_task():
    pass


@router.put("")
def move_task():
    pass


@router.put("")
def edit_task():
    pass


@router.delete("")
def delete_task():
    pass


# Эндпоинты для колонок
@router.post("/profile/columns")
def post_column():
    pass


@router.put("")
def move_column():
    pass


@router.put("")
def edit_column():
    pass


@router.delete("")
def delete_column():
    pass
