from datetime import datetime
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse

from controllers.user import get_all_users, get_user, create_user
from core.middleware import add_cors_headers
from core.responses import send_404


class Router(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        self.send_response(200)
        add_cors_headers(self)
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)

        if parsed.path == "/users":
            return get_all_users(self)

        elif parsed.path.startswith("/users/"):
            try:
                user_id = int(parsed.path.split("/")[-1])
                return get_user(self, user_id)
            except ValueError:
                return send_404(self)

        return send_404(self)
    def do_POST(self):
        if self.path == '/users':
            create_user(self)
        else:
            send_404(self)


    # def do_PUT(self):
    #     if self.path.startswith('/users/'):
    #         user_id = self.path.split('/')[-1]
    #         update_user(self, int(user_id))
    #     else:
    #         send_404(self)
    def log_message(self, format, *args):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] [Server] {format % args}")
