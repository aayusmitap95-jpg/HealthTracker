# # controllers/medical.py
# from core.request import parse_json_body
# from core.responses import send_json, send_404
# from services.medical_service import (
#     service_medical_create,
#     service_medical_get_all,
#     service_medical_get_one,
#     service_medical_update,
#     service_medical_delete
# )

# def get_all_medical(handler):
#     return send_json(handler, 200, service_medical_get_all())

# def get_medical(handler, record_id):
#     record = service_medical_get_one(record_id)
#     return send_json(handler, 200, record) if record else send_404(handler)

# def create_medical(handler):
#     data = parse_json_body(handler)
#     new_record = service_medical_create(data)
#     return send_json(handler, 201, new_record)

# def update_medical(handler, record_id):
#     data = parse_json_body(handler)
#     updated = service_medical_update(record_id, data)
#     return send_json(handler, 200, updated) if updated else send_404(handler)

# def delete_medical(handler, record_id):
#     deleted = service_medical_delete(record_id)
#     return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)
