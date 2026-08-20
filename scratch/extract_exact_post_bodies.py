import json

with open("scratch/all_subpages_text.json", "r", encoding="utf-8") as f:
    data = json.load(f)

urls = [
    ("https://beta.prismmultimedia.com/exploring-the-intersection-of-multimedia-and-social-media/", 4, "SOCIAL MEDIA", "Exploring the Intersection of Multimedia and Social Media"),
    ("https://beta.prismmultimedia.com/why-should-i-opt-for-prism-multimedia-to-boost-my-career-here-are-top-10-reasons/", 5, "COMPANY", "Why should I opt for PRISM MULTIMEDIA to boost my career? Top 10 Reasons"),
    ("https://beta.prismmultimedia.com/motion-graphics-in-user-interface-ui-design/", 6, "UI DESIGN", "Motion Graphics in User Interface (UI) Design"),
    ("https://beta.prismmultimedia.com/top-10-creative-skill-to-learn-in-2023/", 7, "DESIGN", "Top 10 Creative Skills to Learn for a High-Growth Career"),
    ("https://beta.prismmultimedia.com/is-multimedia-a-good-career-choice-in-2023/", 8, "CAREER", "Is Multimedia a Good Career Choice? Complete Industry Insights"),
    ("https://beta.prismmultimedia.com/top-10-qualities-of-graphic-designer-what-makes-you-a-good-designer/", 9, "DESIGN", "Top 10 Qualities of a Successful Graphic Designer"),
    ("https://beta.prismmultimedia.com/graphic-designing-expectations-vs-reality/", 10, "INSIGHTS", "Graphic Designing — Expectations Vs. Reality"),
    ("https://beta.prismmultimedia.com/mastering-portfolio-creation-design/", 11, "PORTFOLIO", "Mastering the Art of Portfolio Creation in the Design Industry"),
    ("https://beta.prismmultimedia.com/evolution-motion-graphics/", 12, "MOTION GRAPHICS", "The Evolution of Motion Graphics: From Cinema to Digital Media")
]

extracted_blogs = {}

for u, pid, cat, title in urls:
    lines = data.get(u, [])
    # Find start line after title (usually line 16 or 17) and end line before "HELLO WE ARE PRISM" or "News Letter"
    start_idx = -1
    end_idx = -1
    
    for idx, l in enumerate(lines):
        if idx > 10 and ("The Significance" in l or "Choosing" in l or "Motion graphics" in l or "As digital" in l or "In today" in l or "Graphic design" in l or "Recent years" in l or "Building" in l or "Motion graphics have" in l or "Multimedia" in l):
            if start_idx == -1:
                start_idx = idx
        if start_idx != -1 and ("HELLO WE ARE PRISM" in l or "News Letter" in l or "Keyboard Shortcuts" in l or "All About Prism" in l):
            end_idx = idx
            break
            
    if start_idx != -1:
        if end_idx == -1:
            end_idx = len(lines)
        body = lines[start_idx:end_idx]
    else:
        body = lines[16:35]
        
    extracted_blogs[pid] = {
        "id": pid,
        "cat": cat,
        "title": title,
        "body": body
    }

with open("scratch/exact_blogs_extracted.json", "w", encoding="utf-8") as f:
    json.dump(extracted_blogs, f, indent=2, ensure_ascii=False)

for pid, info in extracted_blogs.items():
    print(f"\nID {pid} ({info['cat']}): {len(info['body'])} lines extracted")
    for bline in info['body'][:3]:
        print(f"  - {bline[:100]}")
