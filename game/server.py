#!/usr/bin/env python3
"""Enkel lokal HTTP-server som kör återvinningsspelet."""

import http.server
import socketserver
import webbrowser
import os
from pathlib import Path

PORT = 8080
os.chdir(Path(__file__).parent)


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, fmt, *args):
        pass  # tysta standard-loggning


print(f"Återvinningsspelet körs på  http://localhost:{PORT}")
print("Avsluta med Ctrl+C\n")

webbrowser.open(f"http://localhost:{PORT}")

with socketserver.TCPServer(("", PORT), QuietHandler) as httpd:
    httpd.serve_forever()
