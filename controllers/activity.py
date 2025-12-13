from core.responses import send_json, send_404
from core.request import parse_json_body
from services.activity_service import (
    activity_get_all,
    activity_get_one,
    activity_create,
    activity_update,
    activity_delete,
)

def get_all_activities(handler):
    return send_json(handler, 200, activity_get_all())
def get_activity(handler, activity_id):
    activity = activity_get_one(activity_id)
    return send_json(handler, 200, activity) if activity else send_404(handler)

def create_activity(handler):
    data = parse_json_body(handler)
    new_activity = activity_create(data)
    return send_json(handler, 201, new_activity)
def update_activity(handler, activity_id):
    data = activity_update(activity_id, data)
    return send_json(handler, 200, updated) if updated else send_404(handler)

def delete_activity(handler, activity_id):
    deleted = activity_delete(activit_id)
    return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)
