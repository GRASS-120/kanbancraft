from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from database.routers import create_database_indexes
from database.tasks_router import router


application = FastAPI(title="Kanbancraft")
application.include_router(router)


application.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешить все источники
    allow_credentials=True,
    allow_methods=["*"],  # Разрешить все методы (GET, POST, PUT, DELETE и т.д.)
    allow_headers=["*"],  # Разрешить все заголовки
)


@application.get("/")
def greetings():
    return """Наш невероятный проект Канбан Крафт!"""


def start():
    create_database_indexes()
    uvicorn.run(app="main:application", reload=True)


if __name__ == "__main__":
    start()
