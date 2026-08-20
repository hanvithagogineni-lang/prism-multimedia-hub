import json
import re

with open("scratch/formatted_blogs_output.json", "r", encoding="utf-8") as f:
    blogs_data = json.load(f)

# Convert paragraphs to clean HTML formatting
js_posts = {}

for pid_str, binfo in blogs_data.items():
    pid = int(pid_str)
    cat = binfo["cat"]
    title = binfo["title"]
    paragraphs = binfo["paragraphs"]
    
    html_parts = []
    for p in paragraphs:
        if len(p) < 80 and not p.endswith(".") and not p.endswith("?"):
            html_parts.append(f"<h3>{p}</h3>")
        else:
            html_parts.append(f"<p>{p}</p>")
            
    content_html = "\n        ".join(html_parts)
    
    js_posts[pid] = f"""    {{
      id: {pid},
      cat: '{cat}',
      title: '{title}',
      img: './blog-poster-{pid}.jpg',
      content: `
        {content_html}
      `
    }}"""

with open("scratch/generated_js_blogs.txt", "w", encoding="utf-8") as f:
    f.write(",\n".join([js_posts[i] for i in range(4, 13)]))

print("Generated JavaScript posts 4-12 saved to scratch/generated_js_blogs.txt")
