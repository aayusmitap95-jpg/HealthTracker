from datetime import datetime
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

from controllers.user import (
    # create_user_details,
    get_all_users,
    # get_user_details,
    # update_user_details,
    # delete_user_details
)

# from core.static import serve_static
from core.responses import send_404
from core.middleware import add_cors_headers


class HealthRouter(BaseHTTPRequestHandler):

    # OPTIONS (CORS)
    def do_OPTIONS(self):
        self.send_response(200)
        add_cors_headers(self)
        self.end_headers()

    # READ (GET) 
    def do_GET(self):
        path = urlparse(self.path).path
        print("PATH:", path)  # DEBUG

        # if path == "/api/user/details":
        #     return get_user_details(self)
       
        
    # GET ALL USERS
        if path == "/api/users":
           return get_all_users(self)

    

        return send_404(self)

      

    #  CREATE (POST
    # def do_POST(self):
    #     if self.path == "/api/user/details":
    #         return create_user_details(self)

    #     return send_404(self)

    # # UPDATE (PUT) 
    # def do_PUT(self):
    #     if self.path == "/api/user/details":
    #         return update_user_details(self)

    #     return send_404(self)

    # #  DELETE 
    # def do_DELETE(self):
    #     if self.path == "/api/user/details":
    #         return delete_user_details(self)

    #     return send_404(self)

    # LOGGER 
    def log_message(self, format, *args):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] [Server] {format % args}")
