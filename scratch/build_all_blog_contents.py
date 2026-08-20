import json

with open("scratch/all_subpages_text.json", "r", encoding="utf-8") as f:
    data = json.load(f)

blog_slugs = [
    ("exploring-the-intersection-of-multimedia-and-social-media", 4, "SOCIAL MEDIA", "Exploring the Intersection of Multimedia and Social Media"),
    ("why-should-i-opt-for-prism-multimedia-to-boost-my-career-here-are-top-10-reasons", 5, "COMPANY", "Why should I opt for PRISM MULTIMEDIA to boost my career? Top 10 Reasons"),
    ("motion-graphics-in-user-interface-ui-design", 6, "UI DESIGN", "Motion Graphics in User Interface (UI) Design"),
    ("top-10-creative-skill-to-learn-in-2023", 7, "DESIGN", "Top 10 Creative Skills to Learn for a High-Growth Career"),
    ("is-multimedia-a-good-career-choice-in-2023", 8, "CAREER", "Is Multimedia a Good Career Choice? Complete Industry Insights"),
    ("top-10-qualities-of-graphic-designer-what-makes-you-a-good-designer", 9, "DESIGN", "Top 10 Qualities of a Successful Graphic Designer"),
    ("graphic-designing-expectations-vs-reality", 10, "INSIGHTS", "Graphic Designing — Expectations Vs. Reality"),
    ("mastering-portfolio-creation-design", 11, "PORTFOLIO", "Mastering the Art of Portfolio Creation in the Design Industry"),
    ("evolution-motion-graphics", 12, "MOTION GRAPHICS", "The Evolution of Motion Graphics: From Cinema to Digital Media")
]

ignore_phrases = {
    "Skip to content", "Home", "Courses", "About Us", "Blog", "Menu", "Student Works", 
    "Alumini Success", "Placements", "Why Choose Us", "News", "Contact Us", "Prism Multimedia",
    "HELLO WE ARE PRISM MUTIMEDIA", "HELLO WE ARE PRISM MULTIMEDIA"
}

all_blogs = {}

for slug, post_id, cat, title in blog_slugs:
    url = f"https://beta.prismmultimedia.com/{slug}/"
    lines = data.get(url, [])
    
    body_paragraphs = []
    capture = False
    for line in lines:
        l = line.strip()
        if not l or l in ignore_phrases or l.endswith("– Prism Multimedia") or l.endswith("— Prism Multimedia") or "Prism Multimedia" in l and len(l) < 30:
            continue
        if l.startswith("Posted on") or l.startswith("superadmin") or "Leave a comment" in l:
            capture = True
            continue
        if capture:
            if "News Letter" in l or "All About Prism" in l or "Follow us on" in l or "copyright" in l:
                break
            body_paragraphs.append(l)
            
    # If capture was not triggered by superadmin tag, capture all non-ignored lines
    if not body_paragraphs:
        for line in lines:
            l = line.strip()
            if not l or l in ignore_phrases or "Prism Multimedia" in l and len(l) < 35:
                continue
            if "News Letter" in l or "All About Prism" in l or "Follow us on" in l:
                break
            body_paragraphs.append(l)

    all_blogs[post_id] = {
        "id": post_id,
        "cat": cat,
        "title": title,
        "slug": slug,
        "paragraphs": body_paragraphs
    }

with open("scratch/formatted_blogs_output.json", "w", encoding="utf-8") as f:
    json.dump(all_blogs, f, indent=2, ensure_ascii=False)

print("Refined blog outputs saved")
for pid, info in all_blogs.items():
    print(f"ID {pid} ({info['cat']}): {len(info['paragraphs'])} paragraphs extracted")
