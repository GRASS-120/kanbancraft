from datetime import date
from pymongo.errors import DuplicateKeyError
from database.routers import (users_collection,
                              projects_collection,
                              boards_collection,
                              columns_collection,
                              tasks_collection)


def add_test_data():
    """Данный скрипт добавляет по двадцать записей в каждую коллекцию.
    Получается у каждого пользователя есть один проект с одной доской,
    на которой расположена одна колонка с единственной задачей"""

    owners_ids: list[str] = []
    projects_ids: list[str] = []
    boards_ids: list[str] = []
    columns_ids: list[str] = []

    # добавление тестовых проектов
    test_projects = [{"project_id": "", "owner": f"test_user_{i}", "project_name": f"test_project_{i}", "members": [f"test_user_{i}"]} for i in range(20)]
    try:
        result = projects_collection.insert_many(test_projects)
        projects_ids = [str(x) for x in result.inserted_ids]
        for i in range(3):
            new_data = {"$set": {"project_id": projects_ids[i]}}
            projects_collection.update_one(test_projects[i], new_data)
        print(f"Added project examples")
    except DuplicateKeyError:
        print("Project examples are already added")

    # добавление тестовых пользователей
    test_users = [{"nickname": f"test_user_{i}", "password": f"test_password_{i}", "projects": [projects_ids[i]]} for i in range(20)]
    try:
        result = users_collection.insert_many(test_users)
        owners_ids = [str(x) for x in result.inserted_ids]
        print(f"Added user examples")
    except DuplicateKeyError:
        print("User examples are already added")

    # добавление тестовых досок
    test_boards = [{"board_id": "", "project_id": f"{projects_ids[i]}", "board_name": f"test_project_{i}"} for i in range(20)]
    try:
        result = boards_collection.insert_many(test_boards)
        boards_ids = [str(x) for x in result.inserted_ids]
        for i in range(3):
            new_data = {"$set": {"board_id": boards_ids[i]}}
            boards_collection.update_one(test_boards[i], new_data)
        print(f"Added board examples")
    except DuplicateKeyError:
        print("Board examples are already added")

    # добавление тестовых колонок
    test_columns = [{"column_id": "", "board_id": f"{boards_ids[i]}", "column_name": f"test_column_{i}", "color": "FFFFFF"} for i in range(20)]
    try:
        result = columns_collection.insert_many(test_columns)
        columns_ids = [str(x) for x in result.inserted_ids]
        for i in range(3):
            new_data = {"$set": {"column_id": columns_ids[i]}}
            columns_collection.update_one(test_columns[i], new_data)
        print(f"Added column examples")
    except DuplicateKeyError:
        print("Column examples are already added")

    # добавление тестовых задач
    test_tasks = [{"task_id": "", "column_id": f"{columns_ids[i]}", "description": f"that is a placeholder for task {i}"} for i in range(20)]
    try:
        result = tasks_collection.insert_many(test_tasks)
        tasks_ids = [str(x) for x in result.inserted_ids]
        for i in range(3):
            new_data = {"$set": {"task_id": tasks_ids[i]}}
            tasks_collection.update_one(test_tasks[i], new_data)
        print(f"Added task examples")
    except DuplicateKeyError:
        print("Task examples are already added")


if __name__ == "__main__":
    add_test_data()
