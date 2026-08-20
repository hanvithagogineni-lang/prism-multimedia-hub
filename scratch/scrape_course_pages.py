import urllib.request
import re
import html
import json

urls = [
    "https://beta.prismmultimedia.com/graphic-design/",
    "https://beta.prismmultimedia.com/motion-graphics/",
    "https://beta.prismmultimedia.com/ui-design-and-development/",
    "https://beta.prismmultimedia.com/digital-marketing/",
    "https://beta.prismmultimedia.com/ux-design/",
    "https://beta.prismmultimedia.com/2d-animation/",
    "https://beta.prismmultimedia.com/3d-animation/",
    "https://beta.prismmultimedia.com/audio-video-editing/",
    "https://beta.prismmultimedia.com/vfx/",
    "https://beta.prismmultimedia.com/edp/",
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

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

course_data = {}

for u in urls:
    req = urllib.request.Request(u, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            clean_html = re.sub(r'<script[^>]*>.*?</script>', '', content, flags=re.DOTALL)
            clean_html = re.sub(r'<style[^>]*>.*?</style>', '', clean_html, flags=re.DOTALL)
            text_blocks = re.sub(r'<[^>]+>', '\n', clean_html)
            lines = [html.unescape(line.strip()) for line in text_blocks.split('\n') if line.strip()]
            course_data[u] = lines
            print(f"Scraped {u}: {len(lines)} lines")
    except Exception as e:
        print(f"Error scraping {u}: {e}")

with open("scratch/all_subpages_text.json", "w", encoding="utf-8") as f:
    json.dump(course_data, f, indent=2, ensure_ascii=False)

print("\nSaved scratch/all_subpages_text.json")
