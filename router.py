#router.py
from datetime import datetime
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse

from core.static import serve_static
from core.middleware import add_cors_headers
from core.responses import send_404
from controllers.report import get_health_report

# -------- USER controllers --------
from controllers.user import (
    get_all_users,
    get_user,
    create_user,
    update_user,
    delete_user
)

# -------- ACTIVITY controllers --------
from controllers.activity import (
    get_all_activities,
    get_activity,
    create_activity,
    update_activity,
    delete_activity
)

# -------- MEDICAL controllers --------
from controllers.medical import (
    get_all_medical,
    get_medical,
    create_medical,
    update_medical,
    delete_medical
)

# -------- FRONTEND SPA ROUTES --------
FRONTEND_ROUTES = {
    "/", "/home",
    "/users",
    "/activities",
    "/medical",
    "/reports"
}

class Router(BaseHTTPRequestHandler):

    # ---------------- CORS ----------------
    def do_OPTIONS(self):
        self.send_response(200)
        add_cors_headers(self)
        self.end_headers()

    # ---------------- GET ----------------
    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == "/favicon.ico":
            return send_404(self)
    # ---------- REPORT (JOIN API) ----------
        if path == "/api/report":
            return get_health_report(self)

        # # ===== FRONTEND (SPA) =====
        # if not path.startswith("/api") and "." not in path:
        #     return serve_static(self, "frontend/pages/index.html")


        # if path.startswith("/frontend/"):
        #     return serve_static(self, path.lstrip("/"))

        # ===== USERS API =====
        if path == "/api/users":
            return get_all_users(self)

        if path.startswith("/api/users/"):
            try:
                return get_user(self, int(path.split("/")[-1]))
            except ValueError:
                return send_404(self)

        # ===== ACTIVITY API =====
        if path == "/api/activities":
            return get_all_activities(self)

        if path.startswith("/api/activities/"):
            try:
                return get_activity(self, int(path.split("/")[-1]))
            except ValueError:
                return send_404(self)

        # ===== MEDICAL API =====
        if path == "/api/medical":
            return get_all_medical(self)

        if path.startswith("/api/medical/"):
            try:
                return get_medical(self, int(path.split("/")[-1]))
            except ValueError:
                return send_404(self)
            
                # # ===== FRONTEND (SPA) =====
        if not path.startswith("/api") and "." not in path:
            return serve_static(self, "frontend/pages/index.html")


        if path.startswith("/frontend/"):
            return serve_static(self, path.lstrip("/"))
        return send_404(self)

        
    # ---------------- POST ----------------
    def do_POST(self):

        if self.path == "/api/users":
            return create_user(self)

        if self.path == "/api/activities":
            return create_activity(self)

        if self.path == "/api/medical":
            return create_medical(self)

        return send_404(self)

    # ---------------- PUT ----------------
    def do_PUT(self):

        if self.path.startswith("/api/users/"):
            try:
                user_id = int(self.path.split("/")[-1])
                return update_user(self, user_id)
            except ValueError:
                return send_404(self)

        if self.path.startswith("/api/activities/"):
            try:
                activity_id = int(self.path.split("/")[-1])
                return update_activity(self, activity_id)
            except ValueError:
                return send_404(self)

        if self.path.startswith("/api/medical/"):
            try:
                medical_id = int(self.path.split("/")[-1])
                return update_medical(self, medical_id)
            except ValueError:
                return send_404(self)

        return send_404(self)

    # ---------------- DELETE ----------------
    def do_DELETE(self):

        if self.path.startswith("/api/users/"):
            try:
                user_id = int(self.path.split("/")[-1])
                return delete_user(self, user_id)
            except ValueError:
                return send_404(self)

        if self.path.startswith("/api/activities/"):
            try:
                activity_id = int(self.path.split("/")[-1])
                return delete_activity(self, activity_id)
            except ValueError:
                return send_404(self)

        if self.path.startswith("/api/medical/"):
            try:
                medical_id = int(self.path.split("/")[-1])
                return delete_medical(self, medical_id)
            except ValueError:
                return send_404(self)

        return send_404(self)

    # ---------------- LOGGER ----------------
    def log_message(self, format, *args):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] [Server] {format % args}")