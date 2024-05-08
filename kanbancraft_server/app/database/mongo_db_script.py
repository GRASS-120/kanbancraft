import pymongo as pm

# Создаём клиент
client = pm.MongoClient('localhost', 27017)

# Подключаемся к базе данных
database = client['Kanbancraft']

# Обновляем коллекции базы данных
kanbancraft_collections = database['Users']
