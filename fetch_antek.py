import urllib.request
import re

url = 'https://pro-theme.com/html/antek/home.html'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    with urllib.request.urlopen(req, timeout=10) as res:
        html = res.read().decode('utf-8', errors='ignore')
        print(f"Length: {len(html)}")
        
        with open('antek_home.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print("Saved antek_home.html successfully!")
        
        # Extract CSS links
        css = re.findall(r'href="([^"]+\.css)"', html)
        print("CSS files:", css)
        
        # Extract main sections / classes
        sections = re.findall(r'<section[^>]*class="([^"]*)"', html)
        print("Sections:", sections)
except Exception as e:
    print("Error:", e)
