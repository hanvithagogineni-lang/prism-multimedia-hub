import json

with open("scratch/all_subpages_text.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for url, lines in data.items():
    if any(k in url for k in ["about-us", "why-choose-us", "placements", "alumini-success", "contact-us"]):
        print(f"\n=================== {url} ===================")
        for line in lines[:30]:
            print(line)
