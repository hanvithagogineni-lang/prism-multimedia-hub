import urllib.request
import re
from urllib.parse import urljoin, urlparse

start_url = "https://beta.prismmultimedia.com/"
visited = set()
to_visit = [start_url]
all_pages = {}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
}

while to_visit:
    url = to_visit.pop(0)
    if url in visited:
        continue
    visited.add(url)
    
    print(f"Crawling ({len(visited)}): {url}")
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            all_pages[url] = content
            
            # Find internal links
            links = re.findall(r'href=["\'](.*?)["\']', content)
            for link in links:
                full_url = urljoin(url, link)
                parsed = urlparse(full_url)
                if parsed.netloc == "beta.prismmultimedia.com":
                    # clean hash / query
                    clean_url = f"{parsed.scheme}://{parsed.netloc}{parsed.path}"
                    if clean_url not in visited and clean_url not in to_visit:
                        to_visit.append(clean_url)
    except Exception as e:
        print(f"Error crawling {url}: {e}")

print(f"\nDiscovered {len(all_pages)} total pages on beta.prismmultimedia.com:")
for u in sorted(all_pages.keys()):
    print(f" - {u}")

with open("scratch/beta_all_pages_html.json", "w", encoding="utf-8") as f:
    import json
    json.dump(all_pages, f, indent=2, ensure_ascii=False)

print("\nSaved all page HTMLs to scratch/beta_all_pages_html.json")
