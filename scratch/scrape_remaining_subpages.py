import urllib.request
import re
import html
import json

urls = [
    "https://beta.prismmultimedia.com/about-us/",
    "https://beta.prismmultimedia.com/why-choose-us/",
    "https://beta.prismmultimedia.com/placements/",
    "https://beta.prismmultimedia.com/alumini-success/",
    "https://beta.prismmultimedia.com/contact-us/",
    "https://beta.prismmultimedia.com/student-works/",
    "https://beta.prismmultimedia.com/alumni-register/",
    "https://beta.prismmultimedia.com/privacy-policies/",
    "https://beta.prismmultimedia.com/student-terms-and-conditions/"
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

rem_data = {}

for u in urls:
    req = urllib.request.Request(u, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            clean_html = re.sub(r'<script[^>]*>.*?</script>', '', content, flags=re.DOTALL)
            clean_html = re.sub(r'<style[^>]*>.*?</style>', '', clean_html, flags=re.DOTALL)
            text_blocks = re.sub(r'<[^>]+>', '\n', clean_html)
            lines = [html.unescape(line.strip()) for line in text_blocks.split('\n') if line.strip()]
            rem_data[u] = lines
            print(f"Scraped {u}: {len(lines)} lines")
    except Exception as e:
        print(f"Error scraping {u}: {e}")

with open("scratch/remaining_subpages_text.json", "w", encoding="utf-8") as f:
    json.dump(rem_data, f, indent=2, ensure_ascii=False)

print("\nSaved scratch/remaining_subpages_text.json")
