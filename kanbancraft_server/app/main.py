from fastapi import FastAPI
import uvicorn
from database.routers import router


app = FastAPI(title="Kanbancraft")
app.include_router(router)


@app.get("/")
def greetings():
    return """Наш невероятный проект Канбан Крафт!"""


def start():
    uvicorn.run(app="app.main:app", host="0.0.0.0", port=8000, reload=True)


if __name__ == "__main__":
    start()
