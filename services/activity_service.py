from database.queries.queries_activity import (
    db_get_all,
     db_get_one,
    db_create, 
    db_update, 
    db_delete
)

def service_get_all():
    return db_get_all()

def service_get_one(activity_id):
    return db_get_one(activity_id)

def service_create(data):
    return db_create(data)

def service_update(activity_id, data):
    return db_update(activity_id, data)

def service_delete(activity_id):
    return db_delete(activity_id)
