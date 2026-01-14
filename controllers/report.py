# controllers/report.py
from core.responses import send_json
from services.report_service import service_get_health_report

def get_health_report(handler):
    data = service_get_health_report()
    return send_json(handler, 200, data)
