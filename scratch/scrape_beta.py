import urllib.request
from bs4 import BeautifulSoup
import json

url = "https://beta.prismmultimedia.com/"
req = urllib.request.Request(
    url, 
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
)

try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    soup = BeautifulSoup(html, 'html.parser')
    
    # Extract nav links, titles, headers, section texts
    print("=== PAGE TITLE ===")
    print(soup.title.string if soup.title else "No title")
    
    print("\n=== HEADINGS ===")
    for h in soup.find_all(['h1', 'h2', 'h3', 'h4']):
        print(f"{h.name}: {h.get_text(strip=True)}")
        
    print("\n=== NAV LINKS ===")
    for a in soup.find_all('a', href=True):
        text = a.get_text(strip=True)
        if text:
            print(f"{text} -> {a['href']}")

    # Save clean text output
    with open("scratch/beta_home.txt", "w", encoding="utf-8") as f:
        f.write(soup.get_text(separator="\n", strip=True))

    print("\nSaved full page text to scratch/beta_home.txt")

except Exception as e:
    print(f"Error fetching: {e}")
