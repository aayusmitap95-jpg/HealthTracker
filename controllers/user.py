# Handlers are responsible for dealing with HTTP details (headers, body, methods)
import json
from core.responses import send_json, send_404
from core.request import parse_json_body
from services.user_service import (
    service_get_all
    , service_get_one
    , service_create
    , service_update
    , service_delete
)

def get_all_users(handler):
    return send_json(handler, 200, service_get_all())

def get_user(handler, user_id):
    user = service_get_one(user_id)
    return send_json(handler, 200, user) if user else send_404(handler)

def create_user(handler):
    data = parse_json_body(handler)
    new_user = service_create(data)
    return send_json(handler, 201, new_user)

def update_user(handler, user_id):
    data = parse_json_body(handler)
    updated = service_update(user_id, data)
    return send_json(handler, 200, updated) if updated else send_404(handler)


def delete_user(handler):
    user_id = int(handler.path.split("/")[-1])
    service_delete(user_id)
    return send_json(handler, 200, {"message": "User deleted"})