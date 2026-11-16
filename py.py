# start_cors.py
from http.server import HTTPServer, SimpleHTTPRequestHandler
import webbrowser

PORT = 8000

class CORSHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

if __name__ == '__main__':
    server = HTTPServer(("127.0.0.1", PORT), CORSHandler)
    print(f"✅ 带跨域CORS服务已启动：http://127.0.0.1:{PORT}")
    print("打开页面：http://127.0.0.1:8000/翰墨诗库.html")
    print("⚠️ 黑窗口不要关闭！")
    webbrowser.open(f"http://127.0.0.1:{PORT}/翰墨诗库.html")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
