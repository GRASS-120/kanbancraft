from beanie import Document


class User(Document):
    id: int
    username: str
    password: str


class Task:
    color: str
    text: str


class Column:
    name: str
    color: str
    tasks = list[Task]


class Desk(Document):
    owner: int
    name: str
    columns = list[Column]
