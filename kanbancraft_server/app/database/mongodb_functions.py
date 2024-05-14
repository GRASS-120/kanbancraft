# ФАЙЛ С ПРИМЕРАМИ ФУНКЦИЙ PyMongo
from mongo_db_script import client, database, users_collection, desks_collection

# Вставка в коллекцию Users
test_user = dict(_id=2, email="kanban@craft.com", password="kanbancraft")
users_collection.insert_one(test_user)


query = {"email": "kan@ban.craft"}
result = users_collection.find(filter=query)
for value in result:
    print(value)


result = users_collection.find()
for value in result:
    print(value)
