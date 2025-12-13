from core.responses import send_json, send_404
from core.request import parse_json_body
from services.user_service import (
    service_get_all_users,
    service_get_user,
    service_create_user,
    service_update_user,
    service_delete_user,
)

def get_all_users(handler):
    return send_json(handler, 200, service_get_all_users())

def get_user(handler, user_id)
    user = service_get_user(user_id)
    return send_json(handler, 200, user) if user else send_404(handler)
def create_user(handler):
    data = parse_json_body(handler)
    new_user = service_create_user(data)
    return send_json(handler, 201, new_user)
def update_user(handler, user_id):
    data = parse_json_body(handler)
    updated = service_update_user(user_id, data)
    return send_json(handler, 200, updated) if updated else send_404(handler)
def delete_user(handler, user_id):
    deleted = service_delete_user(user_id)
    return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)