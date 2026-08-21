import json

with open("scratch/remaining_subpages_text.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for url in ["https://beta.prismmultimedia.com/privacy-policies/", "https://beta.prismmultimedia.com/student-terms-and-conditions/"]:
    lines = data.get(url, [])
    print(f"\n=================== {url} ===================")
    for line in lines[15:60]:
        print(line)
