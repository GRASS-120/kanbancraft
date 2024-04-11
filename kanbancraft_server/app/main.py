from typing import Union
from fastapi import FastAPI
import uvicorn

app = FastAPI()

def start():
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)