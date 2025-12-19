from datetime import datetime
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse

# USER controllers
from controllers.user import (
    get_all_users,
    get_user,
    create_user,
    update_user,
    delete_user
)

# ACTIVITY controllers
from controllers.activity import (
    get_all_activities,
    get_activity,
    create_activity,
    update_activity,
#     delete_activity
 )

from core.middleware import add_cors_headers
from core.responses import send_404


class Router(BaseHTTPRequestHandler):

    # CORS
    def do_OPTIONS(self):
        self.send_response(200)
        add_cors_headers(self)
        self.end_headers()

    # READ
    def do_GET(self):
        parsed = urlparse(self.path)

        # ---------- USER ROUTES ----------
        if parsed.path == "/users":
            return get_all_users(self)

        elif parsed.path.startswith("/users/"):
            try:
                user_id = int(parsed.path.split("/")[-1])
                return get_user(self, user_id)
            except ValueError:
                return send_404(self)

        # ---------- ACTIVITY ROUTES ----------
        elif parsed.path == "/activities":
            return get_all_activities(self)

        elif parsed.path.startswith("/activities/"):
            try:
                activity_id = int(parsed.path.split("/")[-1])
                return get_activity(self, activity_id)
            except ValueError:
                return send_404(self)

        return send_404(self)

    # CREATE
    def do_POST(self):

        # USER
        if self.path == "/users":
            return create_user(self)

        # ACTIVITY
        elif self.path == "/activities":
            return create_activity(self)

        return send_404(self)

    # UPDATE
    def do_PUT(self):

        # USER
        if self.path.startswith("/users/"):
            user_id = int(self.path.split("/")[-1])
            return update_user(self, user_id)

       # ACTIVITY
        elif self.path.startswith("/activities/"):
            activity_id = int(self.path.split("/")[-1])
            return update_activity(self, activity_id)

        return send_404(self)

    # DELETE
    def do_DELETE(self):

        # USER
        if self.path.startswith("/users/"):
            return delete_user(self)

        # ACTIVITY
        # elif self.path.startswith("/activities/"):
        #     return delete_activity(self)

        # return send_404(self)

    # LOGGER
    def log_message(self, format, *args):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] [Server] {format % args}")


