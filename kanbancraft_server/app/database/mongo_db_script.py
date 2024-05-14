from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient


class Settings(BaseSettings):
    project_name: str = "TestMicroservices"
    MONGO_HOST: str
    MONGO_PORT: str
    APP_HOST: str
    APP_PORT: int

    model_config = SettingsConfigDict(env_file="app/.env")


@lru_cache
def get_settings():
    return Settings()


@lru_cache
def mongo_url():
    settings = get_settings()
    return f"mongodb://{settings.MONGO_HOST}:{settings.MONGO_PORT}"


async def init_mongo_db():
    client = AsyncIOMotorClient(mongo_url())

    # Kanbancraft - название базы данных
    await init_beanie(database=client['Kanbancraft'], document_models=['Users, Desks'])
