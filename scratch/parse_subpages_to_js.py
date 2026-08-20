import json
import re

with open("scratch/all_subpages_text.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for url, lines in data.items():
    title = url.split("/")[-2]
    # Filter header/footer noise
    content_lines = []
    capture = False
    for line in lines:
        if "Home" in line and "Courses" in line:
            continue
        if "PRISM MULTIMEDIA" in line or "New Batch Starts" in line or "Register Now" in line:
            continue
        if "All About Prism" in line or "Follow us on" in line or "copyright" in line:
            break
        content_lines.append(line)
        
    print(f"\n--- {title} ---")
    print("\n".join(content_lines[:15]))
