from datetime import datetime
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse

from controllers.auth import (
    login_user, 
    register_user, 
    update_user, 
    delete_user
)    
from controllers.user import (
    save_user_details,
    get_user_details,
    update_user_details,
    delete_user_details
)
from controllers.activity import (
    add_activity_record,
    get_activity_records,
    update_activity_record,
    delete_activity_record
)
from controllers.medical import (
    add_medical_record,
    get_medical_records,
    update_medical_record,
    delete_medical_record

)

from core.static import serve_static
from core.responses import send_404
from core.middleware import add_cors_headers

#main router class
class HealthRouter(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_responses(200)
        add_cors_headers(self)
        self.end_headers()
#READ (GET)
def do_GET(self):
    path = urlparse(self.path).path
    if handle_ui_routes(self, path):
        return
    if path == "/api/auth/user":
        return get_user_details(self)
    if path == "/api/user/details":
        return get_user_details(self)
    if path == "/api/activity":
        return get_activity_records(self)
    if path == "/api/medical":
        return get_medical_records(self)
    
    return send_404(self)

#CREATE (POST)
def do_POST(self):
    if self.path == "/api/auth/login":
        return login_user(self)
    if self.path == "/api/auth/register":
        return register_user(self)
    if self.path == "/api/user/details":
        return save_user_details(self)
    if self.path == "/api/activity":
        return add_activity_record(self)
    if self.path == "/api/medical":
        return add_medical_record(self)
    
    return send_404(self)

#UPDATE (PUT)
def do_PUT(self):
    path = self.path

    if path == "/api/auth/update":
        return update_user(self)
    if path == "/api/user/details":
        return update_user_details(self)
    if path.startswith("/api/ativity/"):
        record_id = int(path.split("/")[-1])
        return update_activity_record(self, record_id)
    if path.startswith("/api/medical/"):
        record_id = int(path.split("/")[-1])
        return update_medical_record(self, record_id)

    return send_404(self)    