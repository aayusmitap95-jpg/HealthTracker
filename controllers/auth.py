# # controllers/auth.py
# from core.request import parse_json_body
# from core.responses import send_json, send_404
# from services.auth_service import (
#     service_register,
#     service_login,
#     service_update_user,
#     service_delete_user
# )

# def register_user(handler):
#     data = parse_json_body(handler)
#     new_user = service_register(data)
#     return send_json(handler, 201, new_user)

# def login_user(handler):
#     data = parse_json_body(handler)
#     user = service_login(data)
#     return send_json(handler, 200, user) if user else send_404(handler)

# def update_user(handler, user_id):
#     data = parse_json_body(handler)
#     updated = service_update_user(user_id, data)
#     return send_json(handler, 200, updated) if updated else send_404(handler)

# def delete_user(handler, user_id):
#     deleted = service_delete_user(user_id)
#     return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)
