import re

with open('antek_main.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Inspect fonts used
font_families = set(re.findall(r'font-family:\s*([^;]+);', css))
print("Font families in Antek:", font_families)

# Inspect primary colors used in Antek
colors = set(re.findall(r'#(?:[0-9a-fA-F]{3}){1,2}\b', css))
# Filter to most common hex codes
from collections import Counter
all_hex = re.findall(r'#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b', css)
counts = Counter(all_hex).most_common(15)
print("Top colors in Antek CSS:")
for c, cnt in counts:
    print(f" {c}: {cnt}")

# Let's inspect buttons styling
btn_rules = re.findall(r'(\.uk-button[^{]*\{[^}]*\})', css)
print(f"\nButton rules found: {len(btn_rules)}")
for b in btn_rules[:5]:
    print(b)
