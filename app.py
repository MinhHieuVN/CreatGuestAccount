from flask import Flask, request, jsonify, render_template
import hmac
import hashlib
import requests
import string
import random
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
import json
import time
import urllib3
import os

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

app = Flask(__name__, template_folder='templates', static_folder='static')

# --- CONFIG & KEYS (Giữ nguyên từ file bạn gửi) ---
hex_key = "32656534343831396539623435393838343531343130363762323831363231383734643064356437616639643866376530306331653534373135623764316533"
key = bytes.fromhex(hex_key)

REGION_LANG = {"VN": "vi", "IND": "hi", "ID": "id", "TH": "th", "BR": "pt", "ME": "ar"}
# ... (Các logic xử lý crypto và API của bạn giữ nguyên ở đây) ...

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/gen')
def gen_account():
    name = request.args.get('name', 'HUSTLER')
    count = int(request.args.get('count', 1))
    region = request.args.get('region', 'VN')
    
    # Ở đây gọi hàm xử lý tạo tài khoản của bạn
    # Giả lập kết quả trả về đúng cấu trúc để Frontend hiển thị:
    results = []
    for i in range(count):
        results.append({
            "uid": f"1000{random.randint(10000, 99999)}",
            "password": "".join(random.choices(string.ascii_letters + string.digits, k=10)),
            "name": f"{name}_{random.randint(100, 999)}",
            "region": region,
            "status": "success"
        })
    
    return jsonify({"success": True, "accounts": results})

if __name__ == '__main__':
    app.run(debug=True)
  
