import urllib.request
import re
import html

url = "https://beta.prismmultimedia.com/"
req = urllib.request.Request(
    url, 
    headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
    }
)

try:
    with urllib.request.urlopen(req) as response:
        content = response.read().decode('utf-8')
        
    # Strip script and style tags
    clean_html = re.sub(r'<script[^>]*>.*?</script>', '', content, flags=re.DOTALL)
    clean_html = re.sub(r'<style[^>]*>.*?</style>', '', clean_html, flags=re.DOTALL)
    
    # Extract headings
    headings = re.findall(r'<(h[1-6])[^>]*>(.*?)</\1>', clean_html, flags=re.DOTALL | re.IGNORECASE)
    print("=== HEADINGS FOUND ON BETA.PRISMMULTIMEDIA.COM ===")
    for htag, text in headings:
        t = re.sub(r'<[^>]+>', '', text).strip()
        t = html.unescape(t)
        if t:
            print(f"[{htag.upper()}]: {t}")

    # Extract all text blocks
    text_blocks = re.sub(r'<[^>]+>', '\n', clean_html)
    lines = [html.unescape(line.strip()) for line in text_blocks.split('\n') if line.strip()]
    
    with open("scratch/beta_site_text.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print("\nSuccessfully saved full text extract to scratch/beta_site_text.txt")

except Exception as e:
    print(f"Error fetching URL: {e}")
