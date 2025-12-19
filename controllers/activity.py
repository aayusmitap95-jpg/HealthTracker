from core.responses import send_json, send_404
from core.request import parse_json_body
from services.activity_service import (
    service_get_all, 
    service_get_one,
    service_create,
    service_update, 
    # service_delete
)

def get_all_activities(handler):
    return send_json(handler, 200, service_get_all())

def get_activity(handler, activity_id):
    activity = service_get_one(activity_id)
    return send_json(handler, 200, activity) if activity else send_404(handler)

def create_activity(handler):
    data = parse_json_body(handler)
    return send_json(handler, 201, service_create(data))

def update_activity(handler, activity_id):
    data = parse_json_body(handler)
    updated = service_update(activity_id, data)
    return send_json(handler, 200, updated) if updated else send_404(handler)

# def delete_activity(handler, activity_id):
#     service_delete(activity_id)
#     return send_json(handler, 200, {"message": "Activity deleted"})
