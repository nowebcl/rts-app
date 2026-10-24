import json
import re
from collections import Counter

def slugify(text):
    text = re.sub(r'[^\w\s-]', '', text, flags=re.UNICODE).strip().lower()
    return re.sub(r'[-\s]+', '-', text)[:45]

with open('catalogo_manual/productos.json', 'r', encoding='utf-8') as f:
    raw_products = json.load(f)

formatted = []
for p in raw_products:
    name = p['nombre'].strip()
    raw_price = p['precio'].strip()
    desc = p.get('descripcion', '').strip()
    if not desc:
        desc = 'Consultar más información'

    is_sold = (
        p.get('vendida', False) or 
        'vendida' in name.lower() or 
        'vendido' in name.lower() or 
        'vendida' in raw_price.lower() or 
        'vendido' in raw_price.lower()
    )

    if is_sold:
        # Check if there is an explicit price
        m = re.search(r'([\d.,]+)\s*CLP', raw_price)
        if m:
            clean_num = m.group(1).replace('$', '').strip()
            price_display = f"${clean_num} CLP"
        else:
            price_display = "VENDIDA"
    else:
        if 'consultar' in raw_price.lower() or '123.456' in raw_price or not raw_price:
            price_display = "Consultar valor"
        else:
            price_display = raw_price
            if 'CLP' not in price_display and any(c.isdigit() for c in price_display):
                price_display = f"{price_display} CLP"

    # Category determination
    n_lower = name.lower()
    if 'tractor' in n_lower or 'tractores' in n_lower:
        category = 'tractores'
        category_name = 'Tractores'
    elif any(term in n_lower for term in ['excavadora', 'excavadoras', 'sany', 'cat', 'caterpillar', 'hitachi', 'doosan', 'hanix', 'kubota kh', 'u-20', 'rippa', 'hightop', 'ht10', 'ht15', 'me20', 'yb351']):
        category = 'excavadoras'
        category_name = 'Mini Excavadoras'
    elif 'camion' in n_lower or 'camión' in n_lower:
        category = 'camiones'
        category_name = 'Camiones'
    elif any(term in n_lower for term in ['rotovator', 'desmalezadora', 'robot', 'motor', 'motores']):
        category = 'implementos'
        category_name = 'Implementos y Motores'
    else:
        category = 'otros'
        category_name = 'Maquinaria'

    imgs = [f"/images/catalog/{f}" for f in p.get('fotos', [])]
    if not imgs:
        imgs = ["/images/excavators/rst-10.jpg"]

    pid = f"rst-{p['id']:02d}"
    slug = f"{slugify(name)}-{p['id']}"

    formatted.append({
        'id': pid,
        'numberId': p['id'],
        'name': name,
        'slug': slug,
        'category': category,
        'categoryName': category_name,
        'price': price_display,
        'isSold': is_sold,
        'description': desc,
        'image': imgs[0],
        'gallery': imgs,
        'location': 'Puerto Montt / Llanquihue, Región de Los Lagos',
        'warranty': 'Garantía y entrega con inducción' if not is_sold else 'Entregada a cliente'
    })

print(f"Total productos procesados: {len(formatted)}")
counts = Counter(p['category'] for p in formatted)
for c, cnt in counts.items():
    print(f"  - {c}: {cnt}")

with open('src/data/products.json', 'w', encoding='utf-8') as f:
    json.dump(formatted, f, indent=2, ensure_ascii=False)

# Also generate products.js for easy ES module import
js_code = f"// Catálogo de Productos Reales RST (32 Unidades)\nexport const products = {json.dumps(formatted, indent=2, ensure_ascii=False)};\n\nexport default products;\n"
with open('src/data/products.js', 'w', encoding='utf-8') as f:
    f.write(js_code)

print("src/data/products.json y src/data/products.js generados correctamente.")
