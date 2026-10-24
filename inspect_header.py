with open('antek_home.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
m = re.search(r'<div class="page-header-bottom">.*?</div>\s*</div>\s*</header>', html, re.DOTALL)
if m:
    print(m.group(0))
else:
    # find where page-header-bottom starts
    pos = html.find('page-header-bottom')
    print(html[pos-50:pos+1500])
