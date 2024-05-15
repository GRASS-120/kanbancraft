from fastapi import FastAPI
import uvicorn
from database.tasks_router import router


application = FastAPI(title="Kanbancraft")
application.include_router(router)


@application.get("/")
def greetings():
    return """Наш невероятный проект Канбан Крафт!"""


def start():
    uvicorn.run(app="main:application", reload=True)


if __name__ == "__main__":
    start()
