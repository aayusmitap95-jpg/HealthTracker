# # controllers/activity.py
# from core.request import parse_json_body
# from core.responses import send_json, send_404
# from services.activity_service import (
#     service_activity_create,
#     service_activity_get_all,
#     service_activity_get_one,
#     service_activity_update,
#     service_activity_delete
# )

# def get_all_activities(handler):
#     return send_json(handler, 200, service_activity_get_all())

# def get_activity(handler, activity_id):
#     activity = service_activity_get_one(activity_id)
#     return send_json(handler, 200, activity) if activity else send_404(handler)

# def create_activity(handler):
#     data = parse_json_body(handler)
#     new_activity = service_activity_create(data)
#     return send_json(handler, 201, new_activity)

# def update_activity(handler, activity_id):
#     data = parse_json_body(handler)
#     updated = service_activity_update(activity_id, data)
#     return send_json(handler, 200, updated) if updated else send_404(handler)

# def delete_activity(handler, activity_id):
#     deleted = service_activity_delete(activity_id)
#     return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)

