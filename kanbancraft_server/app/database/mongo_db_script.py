import pymongo as pm


client = pm.MongoClient('mongodb://localhost:27017/')
database = client.Kanbancraft


users_collection = database.Users
desks_collection = database.Desks
