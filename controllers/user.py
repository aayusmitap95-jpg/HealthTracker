from core.request import parse_json_body
from core.responses import send_json, send_404
from services.user_service import (
    # service_user_create,
    service_user_get_all,
#     service_user_get_one,
#     service_user_update,
#     service_user_delete
# )

def get_all_users(handler):
    return send_json(handler, 200, service_user_get_all())

# def get_user_details(handler, user_id):
#     user = service_user_get_one(user_id)
#     return send_json(handler, 200, user) if user else send_404(handler)

# def create_user_details(handler):
#     data = parse_json_body(handler)
#     new_user = service_user_create(data)
#     return send_json(handler, 201, new_user)

# def update_user_details(handler, user_id):
#     data = parse_json_body(handler)
#     updated = service_user_update(user_id, data)
#     return send_json(handler, 200, updated) if updated else send_404(handler)

# def delete_user_details(handler, user_id):
#     deleted = service_user_delete(user_id)
#     return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)
