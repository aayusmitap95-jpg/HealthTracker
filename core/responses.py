import json
from core.middleware import add_cors_headers

def send_json(handler, status, data):
    handler.send_response(status)