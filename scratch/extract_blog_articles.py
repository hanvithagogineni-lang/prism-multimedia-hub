import json
import re

with open("scratch/all_subpages_text.json", "r", encoding="utf-8") as f:
    data = json.load(f)

blog_urls = [
    "https://beta.prismmultimedia.com/exploring-the-intersection-of-multimedia-and-social-media/",
    "https://beta.prismmultimedia.com/why-should-i-opt-for-prism-multimedia-to-boost-my-career-here-are-top-10-reasons/",
    "https://beta.prismmultimedia.com/motion-graphics-in-user-interface-ui-design/",
    "https://beta.prismmultimedia.com/top-10-creative-skill-to-learn-in-2023/",
    "https://beta.prismmultimedia.com/is-multimedia-a-good-career-choice-in-2023/",
    "https://beta.prismmultimedia.com/top-10-qualities-of-graphic-designer-what-makes-you-a-good-designer/",
    "https://beta.prismmultimedia.com/graphic-designing-expectations-vs-reality/",
    "https://beta.prismmultimedia.com/mastering-portfolio-creation-design/",
    "https://beta.prismmultimedia.com/evolution-motion-graphics/"
]

parsed_blogs = {}

for u in blog_urls:
    lines = data.get(u, [])
    slug = u.split("/")[-2]
    
    # Extract main text between title and sidebar/footer
    article_lines = []
    started = False
    
    for line in lines:
        if "superadmin" in line or "Posted on" in line or "Leave a comment" in line:
            started = True
            continue
        if started:
            if "News Letter" in line or "All About Prism" in line or "HEllo WE ARE PRISM" in line or "Follow us on" in line:
                break
            if line not in ["Prism Multimedia", "Home", "Courses", "About Us", "Blog", "Contact Us"]:
                article_lines.append(line)
                
    parsed_blogs[slug] = article_lines

with open("scratch/extracted_blog_bodies.json", "w", encoding="utf-8") as f:
    json.dump(parsed_blogs, f, indent=2, ensure_ascii=False)

print("Extracted blog bodies saved to scratch/extracted_blog_bodies.json")

for slug, text in parsed_blogs.items():
    print(f"\n=== {slug} ({len(text)} lines) ===")
    print("\n".join(text[:8]))
