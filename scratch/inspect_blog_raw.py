import json

with open("scratch/all_subpages_text.json", "r", encoding="utf-8") as f:
    data = json.load(f)

url = "https://beta.prismmultimedia.com/exploring-the-intersection-of-multimedia-and-social-media/"
lines = data.get(url, [])

print(f"Total lines for {url}: {len(lines)}")
for idx, line in enumerate(lines[:50]):
    print(f"{idx}: {line}")
