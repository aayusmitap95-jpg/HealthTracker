from core.responses import send_json, send_404
from core.request import parse_json_body
from services.medical_service import (
    service_get_all,
    service_get_one,
    service_create,
    service_update,
    service_delete
)

def get_all_medical(handler):
    return send_json(handler, 200, service_get_all())

def get_medical(handler, medical_id):
    medical = service_get_one(medical_id)
    return send_json(handler, 200, medical) if medical else send_404(handler)

def create_medical(handler):
    data = parse_json_body(handler)
    new_medical = service_create(data)
    return send_json(handler, 201, new_medical)

def update_medical(handler, medical_id):
    data = parse_json_body(handler)
    updated = service_update(medical_id, data)
    return send_json(handler, 200, updated) if updated else send_404(handler)

def delete_medical(handler, medical_id):
    service_delete(medical_id)
    return send_json(handler, 200, {"message": "Medical record deleted"})
