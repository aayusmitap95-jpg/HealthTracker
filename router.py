from datetime import datetime
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

from controllers.user import (
    # create_user_details,
    get_all_users,
    get_user_details,
    # update_user_details,
    # delete_user_details
)

# from core.static import serve_static
from core.responses import send_404
from core.middleware import add_cors_headers


class HealthRouter(BaseHTTPRequestHandler):
    
    def _set_cors(self):
        add_cors_headers(self)
    # OPTIONS (CORS)
    def do_OPTIONS(self):
        self.send_response(200)
        add_cors_headers(self)
        self.end_headers()
    def do_GET(self):
        path = urlparse(self.path).path
        query = parse_qs(urlparse(self.path).query)

        print("GET PATH:", path, "QUERY:", query)

        if path == "/api/user/details":
            # ?id=1 → get one
            if "id" in query:
                return get_user_details(self, int(query["id"][0]))

            # no id → get all
            return get_all_users(self)

        return send_404(self)

    # def do_POST(self):
    #     path = urlparse(self.path).path
    #     print("POST PATH:", path)
        
    #     if path.rstrip("/") == "/api/user/details":
    #         return create_user_details(self)
     

    #     return send_404(self)


    def log_message(self, format, *args):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] [Server] {format % args}")
