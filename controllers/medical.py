from core.responses import send_json, send_404
from core.request import parse_json_body
from services.medical_service import (
    medical_get_all,
    medical_get_one,
    medical_create,
    medical_update,
    medical_delete,
)
def get_all_medical_records(handler):
    return send_json(handler, 200, medical_get_all())

def get_medical_record(handler, record_id):
    record = medical_get_one(record_id)
    return send_json(handler, 200, record) if record else send_404(handler)
def create_medical_record(handler):
    data = parse_json_body(handler)
    new_record = medical_create(data)
    return send_json(handler, 201, new_record)
def update_medical_record(handler, record_id):
    data = parse_json_body(handler)
    updated = medical_update(record_id, data)
    return send_json(handler, 200, updated) if updated else send_404(handler)

def delete_medical_record(handler, record_id):
    deleted = medical_delete(record_id)
    return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)    