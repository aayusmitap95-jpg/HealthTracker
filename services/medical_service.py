from database.queries.queries_medical import (
    db_get_all,
    db_get_one,
    db_create,
    db_update,
    db_delete
)

def service_get_all():
    return db_get_all()

def service_get_one(medical_id):
    return db_get_one(medical_id)

def service_create(data):
    return db_create(data)

def service_update(medical_id, data):
    return db_update(medical_id, data)

def service_delete(medical_id):
    return db_delete(medical_id)
