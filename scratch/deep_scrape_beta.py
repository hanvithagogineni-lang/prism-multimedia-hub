import urllib.request
import re
import html

urls = [
    "https://beta.prismmultimedia.com/",
    "https://beta.prismmultimedia.com/top-100-adobe-indesign-keyboard-shortcuts/",
    "https://beta.prismmultimedia.com/top-100-adobe-illustrator-keyboard-shortcuts/",
    "https://beta.prismmultimedia.com/top-100-adobe-photoshop-keyboard-shortcuts/"
]

all_text = {}

for url in urls:
    req = urllib.request.Request(
        url, 
        headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
    )
    try:
        with urllib.request.urlopen(req) as resp:
            content = resp.read().decode('utf-8')
            clean_html = re.sub(r'<script[^>]*>.*?</script>', '', content, flags=re.DOTALL)
            clean_html = re.sub(r'<style[^>]*>.*?</style>', '', clean_html, flags=re.DOTALL)
            text_blocks = re.sub(r'<[^>]+>', '\n', clean_html)
            lines = [html.unescape(line.strip()) for line in text_blocks.split('\n') if line.strip()]
            all_text[url] = lines
            print(f"Scraped {url} ({len(lines)} lines)")
    except Exception as e:
        print(f"Error reading {url}: {e}")

with open("scratch/full_beta_extract.json", "w", encoding="utf-8") as f:
    import json
    json.dump(all_text, f, indent=2, ensure_ascii=False)

print("Saved scratch/full_beta_extract.json")
