import re

with open('antek_home.html', 'r', encoding='utf-8') as f:
    html = f.read()

def show_section(name, max_lines=40):
    match = re.search(r'(<div[^>]*class="[^"]*' + name + r'[^"]*"[^>]*>.*?)(?:<div class="section-|<footer)', html, re.DOTALL)
    if match:
        snippet = match.group(1)[:2500]
        print(f"=== {name} ===")
        print(snippet[:1200])
        print("...\n")
    else:
        print(f"=== {name} NOT FOUND ===")

show_section('page-header')
show_section('section-slideshow')
show_section('section-find')
show_section('section-category')
show_section('section-stats')
show_section('section-about')
show_section('section-steps')
show_section('section-cta')
show_section('section-equipment')
