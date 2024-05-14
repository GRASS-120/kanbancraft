# ФАЙЛ С ПРИМЕРАМИ ФУНКЦИЙ PyMongo
from mongo_db_script import users_collection


# Вставка в коллекцию Users одного документа
test_user = dict(_id=0, email="kan@ban.craft", password="kanbancraft")
users_collection.insert_one(test_user)


# Вставка в коллекцию Users нескольких документов
test_users = [dict(_id=1, email="kanban@craft.com", password="kanbancraft"),
              dict(_id=2, email="kanban@craft.com", password="kAnbAncrAft")]
users_collection.insert_many(test_users)


# Обновление значений одного документа в коллекции
# Модификатор $set означает присвоение значения
current = {"email": "kan@ban.craft"}
new_data = {"$set": {"password": "KanBanCraft"}}
users_collection.update_one(current, new_data)


# Чтение документов из коллекции без фильтра
result = users_collection.find()
for value in result:
    print(value)


print("")


# Чтение документов из коллекции с фильтром
query = {"email": "kan@ban.craft"}
result = users_collection.find(filter=query)
for value in result:
    print(value)


# Удаление одного документа из коллекции
query = {"_id": 0}
users_collection.delete_one(filter=query)


# Удаление нескольких документов из коллекции
query = {"email": "kanban@craft.com"}
users_collection.delete_many(filter=query)
