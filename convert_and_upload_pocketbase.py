import os
import sys
import json
import ssl
import urllib.request
import mimetypes
from PIL import Image

# Forzar codificación UTF-8
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

PB_URL = 'https://bd.rstimportaciones.cl'
ADMIN_EMAIL = 'admin@rst.cl'
ADMIN_PASS = 'Rst#2026!Pass'

# 1. Obtener Token de Superuser
print("🔐 Autenticando en PocketBase con admin@rst.cl...")
auth_url = f"{PB_URL}/api/collections/_superusers/auth-with-password"
auth_data = json.dumps({'identity': ADMIN_EMAIL, 'password': ADMIN_PASS}).encode('utf-8')
req = urllib.request.Request(auth_url, data=auth_data, headers={'Content-Type': 'application/json'})

with urllib.request.urlopen(req, context=ctx) as resp:
    auth_resp = json.loads(resp.read().decode('utf-8'))
    TOKEN = auth_resp['token']

print("✅ Autenticado exitosamente como Superuser.")

# 2. Comprobar / Crear Colección 'productos'
print("\n📦 Verificando colección 'productos'...")
list_col_req = urllib.request.Request(f"{PB_URL}/api/collections", headers={'Authorization': f'Bearer {TOKEN}'})
with urllib.request.urlopen(list_col_req, context=ctx) as resp:
    cols = json.loads(resp.read().decode('utf-8'))
    prod_col = next((c for c in cols.get('items', []) if c['name'] == 'productos'), None)

if not prod_col:
    print("🛠️ Creando colección 'productos' con reglas de seguridad estrictas...")
    new_col_data = {
        "name": "productos",
        "type": "base",
        # Reglas públicas seguras: solo lectura pública. Creación/edición/borrado protegido para superusuarios
        "listRule": "",
        "viewRule": "",
        "createRule": "@request.auth.collectionName = '_superusers'",
        "updateRule": "@request.auth.collectionName = '_superusers'",
        "deleteRule": "@request.auth.collectionName = '_superusers'",
        "fields": [
            {
                "name": "name",
                "type": "text",
                "required": True,
                "presentable": True
            },
            {
                "name": "slug",
                "type": "text",
                "required": False
            },
            {
                "name": "numberId",
                "type": "number",
                "required": False
            },
            {
                "name": "category",
                "type": "text",
                "required": False
            },
            {
                "name": "categoryName",
                "type": "text",
                "required": False
            },
            {
                "name": "price",
                "type": "text",
                "required": False
            },
            {
                "name": "isSold",
                "type": "bool",
                "required": False
            },
            {
                "name": "description",
                "type": "text",
                "required": False
            },
            {
                "name": "location",
                "type": "text",
                "required": False
            },
            {
                "name": "warranty",
                "type": "text",
                "required": False
            },
            {
                "name": "imagenes",
                "type": "file",
                "required": False,
                "maxSelect": 15,
                "maxSize": 10485760, # 10 MB
                "mimeTypes": ["image/webp", "image/jpeg", "image/png", "image/gif"]
            }
        ]
    }

    create_req = urllib.request.Request(
        f"{PB_URL}/api/collections",
        data=json.dumps(new_col_data).encode('utf-8'),
        headers={'Content-Type': 'application/json', 'Authorization': f'Bearer {TOKEN}'}
    )
    with urllib.request.urlopen(create_req, context=ctx) as resp:
        prod_col = json.loads(resp.read().decode('utf-8'))
    print("✅ Colección 'productos' creada exitosamente con seguridad activa.")
else:
    print("ℹ️ La colección 'productos' ya existe.")

# 3. Convertir Imágenes a formato WebP comprimido
print("\n🖼️ Convirtiendo y comprimiendo todas las imágenes a formato WebP...")
source_img_dir = os.path.abspath('public/images/catalog')
webp_img_dir = os.path.abspath('public/images/catalog_webp')
os.makedirs(webp_img_dir, exist_ok=True)

webp_mapping = {}

for filename in os.listdir(source_img_dir):
    src_path = os.path.join(source_img_dir, filename)
    if not os.path.isfile(src_path):
        continue

    name_without_ext, _ = os.path.splitext(filename)
    webp_filename = f"{name_without_ext}.webp"
    dest_path = os.path.join(webp_img_dir, webp_filename)

    try:
        with Image.open(src_path) as im:
            # Convertir a RGB si es necesario (ej: RGBA de PNG o paleta)
            if im.mode in ("RGBA", "P"):
                im = im.convert("RGB")
            # Redimensionar si es excesivamente grande para web
            max_size = 1600
            if im.width > max_size or im.height > max_size:
                im.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
            # Guardar en WebP con compresión de alta calidad
            im.save(dest_path, "WEBP", quality=82, method=6)

        orig_kb = os.path.getsize(src_path) / 1024
        webp_kb = os.path.getsize(dest_path) / 1024
        reduction = (1 - webp_kb / orig_kb) * 100
        print(f"  • {filename} ({orig_kb:.1f} KB) ➔ {webp_filename} ({webp_kb:.1f} KB) [-{reduction:.1f}%]")
        webp_mapping[filename] = dest_path
    except Exception as e:
        print(f"  ⚠️ Error convirtiendo {filename}: {e}")

print(f"✅ Total {len(webp_mapping)} imágenes comprimidas a WebP.")

# 4. Leer productos y subirlos a PocketBase
with open('src/data/products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

print(f"\n🚀 Subiendo {len(products)} productos a la base de datos de PocketBase...")

def build_multipart(fields, files):
    boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'
    body = bytearray()

    # Form fields
    for k, v in fields.items():
        body.extend(f'--{boundary}\r\n'.encode('utf-8'))
        body.extend(f'Content-Disposition: form-data; name="{k}"\r\n\r\n'.encode('utf-8'))
        val_str = 'true' if v is True else ('false' if v is False else str(v))
        body.extend(val_str.encode('utf-8'))
        body.extend(b'\r\n')

    # Files
    for field_name, file_path in files:
        if not os.path.exists(file_path):
            continue
        filename = os.path.basename(file_path)
        mime = 'image/webp'
        body.extend(f'--{boundary}\r\n'.encode('utf-8'))
        body.extend(f'Content-Disposition: form-data; name="{field_name}"; filename="{filename}"\r\n'.encode('utf-8'))
        body.extend(f'Content-Type: {mime}\r\n\r\n'.encode('utf-8'))
        with open(file_path, 'rb') as f:
            body.extend(f.read())
        body.extend(b'\r\n')

    body.extend(f'--{boundary}--\r\n'.encode('utf-8'))
    return bytes(body), f'multipart/form-data; boundary={boundary}'

# Obtener registros existentes para no duplicar si se ejecuta varias veces
existing_req = urllib.request.Request(f"{PB_URL}/api/collections/productos/records?perPage=100", headers={'Authorization': f'Bearer {TOKEN}'})
with urllib.request.urlopen(existing_req, context=ctx) as resp:
    existing_records = json.loads(resp.read().decode('utf-8')).get('items', [])
    existing_by_slug = {r.get('slug'): r['id'] for r in existing_records}

uploaded_count = 0
updated_count = 0

for p in products:
    fields = {
        'name': p['name'],
        'slug': p['slug'],
        'numberId': p['numberId'],
        'category': p['category'],
        'categoryName': p['categoryName'],
        'price': p['price'],
        'isSold': p['isSold'],
        'description': p['description'],
        'location': p['location'],
        'warranty': p['warranty']
    }

    # Adjuntar fotos WebP
    files_to_send = []
    for img_path in p.get('gallery', [p['image']]):
        base_name = os.path.basename(img_path)
        # Buscar el archivo .webp correspondiente
        webp_path = webp_mapping.get(base_name)
        if not webp_path:
            # Probar reemplazando extensión
            name_no_ext, _ = os.path.splitext(base_name)
            possible = os.path.join(webp_img_dir, f"{name_no_ext}.webp")
            if os.path.exists(possible):
                webp_path = possible
        if webp_path:
            files_to_send.append(('imagenes', webp_path))

    body_bytes, content_type = build_multipart(fields, files_to_send)

    rec_id = existing_by_slug.get(p['slug'])
    if rec_id:
        # Actualizar existente
        url_record = f"{PB_URL}/api/collections/productos/records/{rec_id}"
        req_rec = urllib.request.Request(
            url_record,
            data=body_bytes,
            headers={'Authorization': f'Bearer {TOKEN}', 'Content-Type': content_type},
            method='PATCH'
        )
        updated_count += 1
    else:
        # Crear nuevo
        url_record = f"{PB_URL}/api/collections/productos/records"
        req_rec = urllib.request.Request(
            url_record,
            data=body_bytes,
            headers={'Authorization': f'Bearer {TOKEN}', 'Content-Type': content_type},
            method='POST'
        )
        uploaded_count += 1

    try:
        with urllib.request.urlopen(req_rec, context=ctx) as r:
            res_data = json.loads(r.read().decode('utf-8'))
            print(f"  [✔ #{p['numberId']}] {p['name'][:35]} -> PocketBase ID: {res_data['id']}")
    except Exception as e:
        print(f"  ❌ Error subiendo #{p['numberId']}: {e}")

print(f"\n🎉 ¡Migración a PocketBase completada!")
print(f"   • Nuevos registros creados: {uploaded_count}")
print(f"   • Registros actualizados: {updated_count}")
