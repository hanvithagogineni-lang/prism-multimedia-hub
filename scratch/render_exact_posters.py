import os
from PIL import Image, ImageDraw, ImageFont

public_dir = r"c:\Users\honey\Downloads\prism-multimedia-hub-main\prism-multimedia-hub-main\public"
os.makedirs(public_dir, exist_ok=True)

def render_exact_poster(filename, title_text, sub_text1, sub_text2, poster_type):
    w, h = 1000, 625  # 16:10 aspect ratio
    bg_color = "#f58220" # Exact Prism Orange
    img = Image.new("RGB", (w, h), color=bg_color)
    draw = ImageDraw.Draw(img)

    # Subtle curved background accents on top right & bottom left
    draw.ellipse([w - 200, -80, w + 200, 320], fill="#f7933b")
    draw.ellipse([-150, h - 250, 250, h + 150], fill="#e07216")

    # Font configurations
    try:
        font_main = ImageFont.truetype("impact.ttf", 52)
        font_sub1 = ImageFont.truetype("arialbd.ttf", 26)
        font_sub2 = ImageFont.truetype("arialbd.ttf", 22)
        font_prism = ImageFont.truetype("arialbd.ttf", 20)
    except:
        font_main = ImageFont.load_default()
        font_sub1 = font_main
        font_sub2 = font_main
        font_prism = font_main

    # 1. TOP TEXT AREA (Matching exact wording from beta.prismmultimedia.com)
    y_cursor = 45

    if poster_type in ["indesign", "illustrator", "photoshop"]:
        # Bold Main Header
        draw.text((w // 2, y_cursor), title_text, fill="#ffffff", font=font_main, anchor="mt", align="center")
        y_cursor += 65
        if sub_text1:
            draw.text((w // 2, y_cursor), sub_text1, fill="#ffffff", font=font_sub1, anchor="mt", align="center")
            y_cursor += 32
        if sub_text2:
            draw.text((w // 2, y_cursor), sub_text2, fill="#ffffff", font=font_sub2, anchor="mt", align="center")

        # Bottom Container: Large White Card with Keyboard & Hands
        card_x1, card_y1 = 80, 185
        card_x2, card_y2 = w - 80, h - 35
        draw.rounded_rectangle([card_x1, card_y1, card_x2, card_y2], radius=20, fill="#ffffff")

        # Keyboard Mockup
        kbd_w, kbd_h = 680, 260
        kbd_x1 = (w - kbd_w) // 2
        kbd_y1 = card_y1 + 35
        kbd_x2 = kbd_x1 + kbd_w
        kbd_y2 = kbd_y1 + kbd_h
        draw.rounded_rectangle([kbd_x1, kbd_y1, kbd_x2, kbd_y2], radius=16, fill="#f1f5f9", outline="#cbd5e1", width=3)

        # 4 Rows of Keys
        rows, cols = 4, 14
        kw = (kbd_w - 40) // cols
        kh = (kbd_h - 30) // rows
        for r in range(rows):
            for c in range(cols):
                kx = kbd_x1 + 18 + (c * (kw + 2))
                ky = kbd_y1 + 14 + (r * (kh + 2))
                draw.rounded_rectangle([kx, ky, kx + kw, ky + kh], radius=4, fill="#e2e8f0", outline="#94a3b8", width=1)

        # Two pink hands typing at bottom
        cx = w // 2
        draw.ellipse([cx - 150, kbd_y2 - 25, cx - 50, kbd_y2 + 75], fill="#fbcfe8", outline="#f472b6", width=3)
        draw.ellipse([cx + 50, kbd_y2 - 25, cx + 150, kbd_y2 + 75], fill="#fbcfe8", outline="#f472b6", width=3)

    elif poster_type == "social":
        # Intersection of Multimedia and Social Media
        draw.text((w // 2, 35), "INTERSECTION OF", fill="#ffffff", font=font_main, anchor="mt")
        draw.text((w // 2, 90), "MULTIMEDIA AND", fill="#ffffff", font=font_main, anchor="mt")
        draw.text((w // 2, 145), "SOCIAL MEDIA", fill="#ffffff", font=font_main, anchor="mt")

        # White Container
        card_x1, card_y1 = 80, 215
        card_x2, card_y2 = w - 80, h - 35
        draw.rounded_rectangle([card_x1, card_y1, card_x2, card_y2], radius=20, fill="#ffffff")

        cx = w // 2
        cy = (card_y1 + card_y2) // 2
        # Megaphone
        draw.ellipse([cx + 120, cy - 60, cx + 220, cy + 60], fill="#3b82f6")
        draw.text((cx + 170, cy), "📢", fill="#ffffff", font=font_main, anchor="mm")

        # Reaction Pills at bottom
        reactions = ["❤️ 999", "👍", "😍", "🔥", "🎉"]
        for i, rx in enumerate(reactions):
            rx_x = card_x1 + 40 + (i * 160)
            draw.rounded_rectangle([rx_x, card_y2 - 75, rx_x + 130, card_y2 - 30], radius=18, fill="#fee2e2", outline="#fca5a5", width=2)
            draw.text((rx_x + 65, card_y2 - 52), rx, fill="#991b1b", font=font_sub1, anchor="mm")

    elif poster_type == "why_prism":
        # Prism Logo circle badge
        draw.ellipse([w // 2 - 40, 20, w // 2 + 40, 100], fill="#ffffff")
        draw.polygon([(w // 2, 35), (w // 2 + 25, 80), (w // 2 - 25, 80)], fill="#ea580c")
        draw.text((w // 2, 90), "PRISM", fill="#ea580c", font=font_prism, anchor="mt")

        draw.text((w // 2, 115), "WHY", fill="#ffffff", font=font_main, anchor="mt")
        draw.text((w // 2, 165), "PRISM MULTIMEDIA", fill="#ffffff", font=font_main, anchor="mt")

        # White Container
        card_x1, card_y1 = 80, 230
        card_x2, card_y2 = w - 80, h - 35
        draw.rounded_rectangle([card_x1, card_y1, card_x2, card_y2], radius=20, fill="#ffffff")

        # Person pointing + Prism Pyramid
        cx = w // 2
        cy = (card_y1 + card_y2) // 2
        draw.ellipse([cx - 200, cy - 50, cx - 90, cy + 60], fill="#fed7aa")
        draw.polygon([(cx + 100, cy - 70), (cx + 200, cy + 50), (cx, cy + 50)], fill="#ea580c")
        draw.text((cx + 100, cy + 10), "PRISM", fill="#ffffff", font=font_main, anchor="mm")

    elif poster_type == "motion_ui":
        draw.ellipse([w // 2 - 40, 15, w // 2 + 40, 95], fill="#ffffff")
        draw.polygon([(w // 2, 30), (w // 2 + 25, 75), (w // 2 - 25, 75)], fill="#ea580c")

        draw.text((w // 2, 105), "MOTION GRAPHICS", fill="#ffffff", font=font_main, anchor="mt")
        draw.text((w // 2, 160), "IN UI DESIGN", fill="#ffffff", font=font_main, anchor="mt")

        # White Container
        card_x1, card_y1 = 80, 220
        card_x2, card_y2 = w - 80, h - 35
        draw.rounded_rectangle([card_x1, card_y1, card_x2, card_y2], radius=20, fill="#ffffff")

        cx = w // 2
        cy = (card_y1 + card_y2) // 2
        # UI Dark Card with Search bar & magnifying glass
        draw.rounded_rectangle([cx - 220, cy - 65, cx + 220, cy + 65], radius=16, fill="#0f172a")
        draw.rectangle([cx - 180, cy - 40, cx - 20, cy - 15], fill="#38bdf8")
        draw.rectangle([cx - 180, cy + 5, cx + 160, cy + 20], fill="#334155")
        draw.text((cx, cy + 40), "SEARCH / UI", fill="#38bdf8", font=font_sub2, anchor="mm")

    elif poster_type == "creative_skills":
        draw.text((w // 2, 35), "TOP 10", fill="#ffffff", font=font_main, anchor="mt")
        draw.text((w // 2, 90), "CREATIVE SKILLS", fill="#ffffff", font=font_main, anchor="mt")
        draw.text((w // 2, 145), "TO LEARN IN 2023", fill="#ffffff", font=font_main, anchor="mt")

        # White Container
        card_x1, card_y1 = 80, 215
        card_x2, card_y2 = w - 80, h - 35
        draw.rounded_rectangle([card_x1, card_y1, card_x2, card_y2], radius=20, fill="#ffffff")

        cx = w // 2
        cy = (card_y1 + card_y2) // 2
        draw.ellipse([cx - 75, cy - 75, cx + 75, cy + 75], fill="#dcfce7", outline="#22c55e", width=5)
        draw.ellipse([cx - 45, cy - 45, cx + 45, cy + 45], fill="#22c55e")
        draw.text((cx, cy), "🎯", fill="#ffffff", font=font_main, anchor="mm")

    elif poster_type == "career_choice":
        draw.text((w // 2, 35), "IS MULTIMEDIA", fill="#ffffff", font=font_main, anchor="mt")
        draw.text((w // 2, 90), "A GOOD CAREER", fill="#ffffff", font=font_main, anchor="mt")
        draw.text((w // 2, 145), "CHOICE??", fill="#ffffff", font=font_main, anchor="mt")

        # White Container
        card_x1, card_y1 = 80, 215
        card_x2, card_y2 = w - 80, h - 35
        draw.rounded_rectangle([card_x1, card_y1, card_x2, card_y2], radius=20, fill="#ffffff")

        cx = w // 2
        cy = (card_y1 + card_y2) // 2
        draw.ellipse([cx - 160, cy - 65, cx - 40, cy + 55], fill="#fef08a")
        draw.text((cx - 100, cy - 5), "🤔", fill="#ffffff", font=font_main, anchor="mm")
        draw.text((cx + 100, cy), "CAREER??", fill="#ea580c", font=font_main, anchor="mm")

    elif poster_type == "designer_qualities":
        draw.text((w // 2, 45), "TOP 10 QUALITIES OF", fill="#ffffff", font=font_main, anchor="mt")
        draw.text((w // 2, 100), "GRAPHIC DESIGNER", fill="#ffffff", font=font_main, anchor="mt")
        draw.text((w // 2, 155), "WHAT MAKES YOU A GOOD DESIGNER", fill="#fff7ed", font=font_sub2, anchor="mt")

        # White Container
        card_x1, card_y1 = 80, 215
        card_x2, card_y2 = w - 80, h - 35
        draw.rounded_rectangle([card_x1, card_y1, card_x2, card_y2], radius=20, fill="#ffffff")

        cx = w // 2
        cy = (card_y1 + card_y2) // 2
        draw.rounded_rectangle([cx - 240, cy - 60, cx + 240, cy + 60], radius=14, fill="#e2e8f0")
        draw.rectangle([cx - 220, cy - 45, cx + 220, cy + 45], fill="#1e293b")
        draw.text((cx, cy), "🎨 GRAPHIC DESIGN", fill="#f58220", font=font_sub1, anchor="mm")

    elif poster_type == "expectations_reality":
        draw.text((w // 2, 45), "GRAPHIC DESIGNING", fill="#ffffff", font=font_main, anchor="mt")
        draw.text((w // 2, 105), "EXPECTATIONS VS REALITY", fill="#ffffff", font=font_main, anchor="mt")

        # White Container
        card_x1, card_y1 = 80, 185
        card_x2, card_y2 = w - 80, h - 35
        draw.rounded_rectangle([card_x1, card_y1, card_x2, card_y2], radius=20, fill="#ffffff")

        cx = w // 2
        cy = (card_y1 + card_y2) // 2
        draw.rounded_rectangle([card_x1 + 40, card_y1 + 35, cx - 20, card_y2 - 35], radius=14, fill="#dbeafe", outline="#3b82f6", width=2)
        draw.text((card_x1 + 40 + (cx - 20 - card_x1 - 40)//2, cy), "EXPECTATIONS", fill="#1e40af", font=font_sub1, anchor="mm")

        draw.rounded_rectangle([cx + 20, card_y1 + 35, card_x2 - 40, card_y2 - 35], radius=14, fill="#fee2e2", outline="#ef4444", width=2)
        draw.text((cx + 20 + (card_x2 - 40 - cx - 20)//2, cy), "REALITY", fill="#991b1b", font=font_sub1, anchor="mm")

    elif poster_type == "portfolio":
        draw.text((w // 2, 45), "Portfolio Creation", fill="#ffffff", font=font_main, anchor="mt")
        draw.text((w // 2, 110), "TIPS AND STRATEGIES", fill="#fff7ed", font=font_sub1, anchor="mt")

        # White Container
        card_x1, card_y1 = 80, 175
        card_x2, card_y2 = w - 80, h - 35
        draw.rounded_rectangle([card_x1, card_y1, card_x2, card_y2], radius=20, fill="#ffffff")

        cx = w // 2
        cy = (card_y1 + card_y2) // 2
        draw.rectangle([cx - 180, cy - 30, cx - 70, card_y2 - 50], fill="#38bdf8")
        draw.rectangle([cx - 50, cy - 90, cx + 50, card_y2 - 50], fill="#818cf8")
        draw.rectangle([cx + 70, cy - 60, cx + 180, card_y2 - 50], fill="#c084fc")
        draw.text((cx, card_y2 - 25), "PORTFOLIO", fill="#0f172a", font=font_sub2, anchor="mm")

    elif poster_type == "cinema":
        draw.text((w // 2, 45), "Motion Graphics", fill="#ffffff", font=font_main, anchor="mt")
        draw.text((w // 2, 110), "FROM CINEMA TO DIGITAL MEDIA", fill="#fff7ed", font=font_sub1, anchor="mt")

        # White Container
        card_x1, card_y1 = 80, 175
        card_x2, card_y2 = w - 80, h - 35
        draw.rounded_rectangle([card_x1, card_y1, card_x2, card_y2], radius=20, fill="#ffffff")

        cx = w // 2
        cy = (card_y1 + card_y2) // 2
        draw.rounded_rectangle([cx - 200, cy - 60, cx + 200, cy + 60], radius=18, fill="#0f172a")
        draw.polygon([(cx - 30, cy - 45), (cx - 30, cy + 45), (cx + 50, cy)], fill="#f58220")
        draw.text((cx, card_y2 - 25), "CINEMA TO DIGITAL", fill="#ffffff", font=font_sub2, anchor="mm")

    output_path = os.path.join(public_dir, filename)
    img.save(output_path, "JPEG", quality=95)
    print(f"Generated EXACT {output_path}")

# Poster Configuration Array matching beta.prismmultimedia.com 100%
posters = [
    ("blog-poster-1.jpg", "Top 100 InDesign Shortcuts", "Master Adobe InDesign", "Top 100 Essential Keyboard Shortcuts", "indesign"),
    ("blog-poster-2.jpg", "Top 100 Illustrator Shortcuts", "Top 100 Adobe Illustrator Keyboard", "Shortcuts You Need to Know", "illustrator"),
    ("blog-poster-3.jpg", "Top 100 Photoshop Shortcuts", "Master Adobe Photoshop:", "Top 100 Time-Saving Shortcuts You Need to Know", "photoshop"),
    ("blog-poster-4.jpg", "INTERSECTION OF MULTIMEDIA AND SOCIAL MEDIA", "", "", "social"),
    ("blog-poster-5.jpg", "WHY PRISM MULTIMEDIA", "", "", "why_prism"),
    ("blog-poster-6.jpg", "MOTION GRAPHICS IN UI DESIGN", "", "", "motion_ui"),
    ("blog-poster-7.jpg", "TOP 10 CREATIVE SKILLS TO LEARN IN 2023", "", "", "creative_skills"),
    ("blog-poster-8.jpg", "IS MULTIMEDIA A GOOD CAREER CHOICE??", "", "", "career_choice"),
    ("blog-poster-9.jpg", "TOP 10 QUALITIES OF GRAPHIC DESIGNER", "", "", "designer_qualities"),
    ("blog-poster-10.jpg", "GRAPHIC DESIGNING EXPECTATIONS VS REALITY", "", "", "expectations_reality"),
    ("blog-poster-11.jpg", "Portfolio Creation TIPS AND STRATEGIES", "", "", "portfolio"),
    ("blog-poster-12.jpg", "Motion Graphics FROM CINEMA TO DIGITAL MEDIA", "", "", "cinema"),
]

for filename, t1, s1, s2, ptype in posters:
    render_exact_poster(filename, t1, s1, s2, ptype)
