import re

with open('antek_home.html', 'r', encoding='utf-8') as f:
    html = f.read()

def print_block(label, pattern):
    m = re.search(pattern, html, re.DOTALL)
    if m:
        print(f"=== {label} ===")
        print(m.group(0)[:1500])
        print("...\n")

print_block("page-header-bottom", r'<div class="page-header-bottom">.*?</div>\s*</div>\s*</div>')
print_block("section-category", r'<div class="section-category">.*?</div>\s*</div>\s*</div>')
print_block("section-about", r'<div class="section-about">.*?</div>\s*</div>\s*</div>')
print_block("section-why-choose-us", r'<div class="section-why-choose-us">.*?</div>\s*</div>\s*</div>')
print_block("page-footer", r'<footer class="page-footer">.*?</footer>')
