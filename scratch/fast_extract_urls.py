import urllib.request
import re
from urllib.parse import urljoin, urlparse

start_url = "https://beta.prismmultimedia.com/"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

req = urllib.request.Request(start_url, headers=headers)
try:
    with urllib.request.urlopen(req, timeout=5) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        
    links = re.findall(r'href=["\'](.*?)["\']', html)
    internal_urls = set()
    for l in links:
        full = urljoin(start_url, l)
        parsed = urlparse(full)
        if parsed.netloc == "beta.prismmultimedia.com":
            clean = f"{parsed.scheme}://{parsed.netloc}{parsed.path}"
            internal_urls.add(clean)
            
    print(f"Found {len(internal_urls)} internal URLs on home page:")
    for u in sorted(internal_urls):
        print(f" - {u}")
        
except Exception as e:
    print(f"Error: {e}")
