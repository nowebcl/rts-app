import re

with open('antek_home.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find all comments or section headers
comments = re.findall(r'<!--\s*(.*?)\s*-->', html)
print("HTML Comments:")
for c in comments:
    if any(k in c.lower() for k in ['section', 'header', 'banner', 'slider', 'about', 'service', 'catalog', 'product', 'counter', 'footer', 'promo', 'quote']):
        print(" -", c)

# Let's inspect the sections in order
tags = re.findall(r'<(div|section|header|footer)[^>]+class="([^"]*section[^"]*|page-header[^"]*|page-footer[^"]*)"', html)
print("\nTop level sections:")
for t in tags:
    print(t)
