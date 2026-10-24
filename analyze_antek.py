import urllib.request
import re

# Fetch main.css
css_url = 'https://pro-theme.com/html/antek/assets/css/main.css'
req = urllib.request.Request(css_url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=10) as res:
        css = res.read().decode('utf-8', errors='ignore')
        with open('antek_main.css', 'w', encoding='utf-8') as f:
            f.write(css)
        print("Saved antek_main.css (size:", len(css), ")")
except Exception as e:
    print("Error fetching css:", e)

# Analyze HTML structure
with open('antek_home.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's inspect major tags and classes inside <body>
body_match = re.search(r'<body[^>]*>(.*?)</body>', html, re.DOTALL)
if body_match:
    body = body_match.group(1)
    # Find all main elements or divs with class
    blocks = re.findall(r'<div[^>]*class="([^"]*(?:header|slider|banner|promo|service|catalog|product|about|counter|work|team|testim|blog|footer)[^"]*)"', body, re.IGNORECASE)
    print("Prominent container classes:", set(blocks[:30]))
