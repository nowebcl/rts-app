import urllib.request
import ssl
import json

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# 1. Login
url = 'https://bd.rstimportaciones.cl/api/collections/_superusers/auth-with-password'
data = json.dumps({'identity': 'admin@rst.cl', 'password': 'Rst#2026!Pass'}).encode('utf-8')
req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
with urllib.request.urlopen(req, context=ctx) as resp:
    token = json.loads(resp.read().decode('utf-8'))['token']

print("Token obtenido con éxito.")

# 2. Get collections
req = urllib.request.Request('https://bd.rstimportaciones.cl/api/collections', headers={
    'Authorization': f'Bearer {token}'
})
with urllib.request.urlopen(req, context=ctx) as resp:
    cols = json.loads(resp.read().decode('utf-8'))
    print("Colecciones existentes:")
    for c in cols.get('items', []):
        print(" -", c.get('name'), "| Tipo:", c.get('type'))
