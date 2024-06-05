from database.routers import (users_collection,
                              projects_collection,
                              boards_collection,
                              columns_collection,
                              tasks_collection)


def drop():
    users_collection.drop()
    projects_collection.drop()
    boards_collection.drop()
    columns_collection.drop()
    tasks_collection.drop()


if __name__ == "__main__":
    drop()
    print("base dropped")
