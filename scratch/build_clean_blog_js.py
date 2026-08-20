import json

with open("scratch/exact_blogs_extracted.json", "r", encoding="utf-8") as f:
    blogs_dict = json.load(f)

js_entries = []

for pid_str, binfo in blogs_dict.items():
    pid = int(pid_str)
    cat = binfo["cat"]
    title = binfo["title"].replace("'", "\\'")
    lines = binfo["body"]
    
    html_parts = []
    for line in lines:
        l = line.strip()
        if not l or l == "" or l == "...":
            continue
        # Check if heading (starts with digit like "1. ", or short title without period)
        if (len(l) < 65 and not l.endswith(".") and not l.endswith(":")) or (l[0].isdigit() and "." in l[:3]):
            html_parts.append(f"<h3>{l}</h3>")
        else:
            html_parts.append(f"<p>{l}</p>")
            
    content_html = "\n        ".join(html_parts)
    
    js_entry = f"""    {{
      id: {pid},
      cat: '{cat}',
      title: '{title}',
      img: './blog-poster-{pid}.jpg',
      content: `
        {content_html}
      `
    }}"""
    js_entries.append(js_entry)

full_js_block = ",\n".join(js_entries)

with open("scratch/formatted_js_posts_4_12.txt", "w", encoding="utf-8") as f:
    f.write(full_js_block)

print("Saved scratch/formatted_js_posts_4_12.txt")
