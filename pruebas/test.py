# conectar_puertos.py
import socket
import time


target = "192.168.1.24"
ports = [22, 80, 443, 3389, 8080, 1514]


for p in ports:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(2)
    try:
        s.connect((target, p))
        print(f"Conectado a {target}:{p}")
        s.close()
    except Exception as e:
        print(f"No conectado a {target}:{p} -> {e}")
    time.sleep(0.5)