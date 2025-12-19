# Contains business logic (validation, processing, rules)
# Does NOT know about HTTP — only works with Python data

from database.queries.queries_user import (
    db_get_all
    , db_get_one
    , db_create
    # , db_update
    # , db_delete
)

def service_get_all():
    return db_get_all()

def service_get_one(user_id):
    return db_get_one(user_id)

def service_create(data):
    return db_create(data)

# def service_update(user_id, data):
#     return db_update(user_id, data)

# def service_delete(user_id):
#     return db_delete(user_id)

