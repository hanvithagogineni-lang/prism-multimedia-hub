import os
from PIL import Image, ImageDraw, ImageFont

public_dir = r"c:\Users\honey\Downloads\prism-multimedia-hub-main\prism-multimedia-hub-main\public"
os.makedirs(public_dir, exist_ok=True)

# Helper function to create rounded rectangle with smooth anti-aliased look
def draw_poster_hd(filename, title_line1, title_line2, icon_type, badge_text="PRISM MULTIMEDIA"):
    w, h = 1200, 750
    img = Image.new("RGB", (w, h), color="#f58220")
    draw = ImageDraw.Draw(img)

    # Decorative background waves/curves
    draw.ellipse([w - 300, -100, w + 300, 450], fill="#f7933b")
    draw.ellipse([-200, h - 350, 400, h + 150], fill="#e07216")

    # Top Title Text Area
    try:
        font_title1 = ImageFont.truetype("arialbd.ttf", 46)
        font_title2 = ImageFont.truetype("arialbd.ttf", 34)
        font_sub = ImageFont.truetype("arial.ttf", 26)
        font_small = ImageFont.truetype("arialbd.ttf", 22)
    except:
        font_title1 = ImageFont.load_default()
        font_title2 = font_title1
        font_sub = font_title1
        font_small = font_title1

    # Render Header Title in White
    draw.text((w // 2, 70), title_line1, fill="#ffffff", font=font_title1, anchor="mm", align="center")
    if title_line2:
        draw.text((w // 2, 130), title_line2, fill="#fff7ed", font=font_title2, anchor="mm", align="center")

    # Lower Illustration Container Card (White)
    card_x1, card_y1 = 120, 190
    card_x2, card_y2 = w - 120, h - 50
    draw.rounded_rectangle([card_x1, card_y1, card_x2, card_y2], radius=24, fill="#ffffff", outline="#fed7aa", width=4)

    cx = (card_x1 + card_x2) // 2
    cy = (card_y1 + card_y2) // 2

    # Draw topic-specific vector illustration inside the card container
    if icon_type == "indesign_kbd":
        # Draw sleek desktop keyboard mockup with hands typing
        kbd_x1, kbd_y1 = card_x1 + 100, card_y1 + 40
        kbd_x2, kbd_y2 = card_x2 - 100, card_y2 - 120
        draw.rounded_rectangle([kbd_x1, kbd_y1, kbd_x2, kbd_y2], radius=16, fill="#f8fafc", outline="#cbd5e1", width=3)
        # Grid of keys
        rows = 4
        cols = 14
        kw = (kbd_x2 - kbd_x1 - 40) // cols
        kh = (kbd_y2 - kbd_y1 - 30) // rows
        for r in range(rows):
            for c in range(cols):
                kx = kbd_x1 + 20 + (c * (kw + 2))
                ky = kbd_y1 + 15 + (r * (kh + 2))
                draw.rounded_rectangle([kx, ky, kx + kw, ky + kh], radius=4, fill="#e2e8f0", outline="#94a3b8", width=1)
        # Pink hands simulation
        draw.ellipse([cx - 180, card_y2 - 130, cx - 70, card_y2 - 20], fill="#fbcfe8", outline="#f472b6", width=2)
        draw.ellipse([cx + 70, card_y2 - 130, cx + 180, card_y2 - 20], fill="#fbcfe8", outline="#f472b6", width=2)
        draw.text((cx, card_y2 - 60), "ADOBE INDESIGN KEYBOARD SHORTCUTS", fill="#ea580c", font=font_small, anchor="mm")

    elif icon_type == "illustrator_kbd":
        # Illustrator Pen tool & vector paths mockup
        draw.ellipse([cx - 90, cy - 90, cx + 90, cy + 90], fill="#fff7ed", outline="#f58220", width=4)
        # Draw Pen tool shape
        draw.polygon([(cx, cy - 70), (cx + 40, cy + 30), (cx - 40, cy + 30)], fill="#f58220")
        draw.rectangle([cx - 15, cy + 30, cx + 15, cy + 80], fill="#0f172a")
        # Vector handles
        draw.line([(cx - 160, cy), (cx + 160, cy)], fill="#38bdf8", width=4)
        draw.ellipse([cx - 160 - 10, cy - 10, cx - 160 + 10, cy + 10], fill="#0284c7")
        draw.ellipse([cx + 160 - 10, cy - 10, cx + 160 + 10, cy + 10], fill="#0284c7")
        draw.text((cx, card_y2 - 60), "ADOBE ILLUSTRATOR VECTOR SHORTCUTS", fill="#ea580c", font=font_small, anchor="mm")

    elif icon_type == "photoshop_kbd":
        # Photoshop canvas & adjustments mockup
        draw.rounded_rectangle([cx - 260, card_y1 + 40, cx + 260, card_y2 - 80], radius=16, fill="#0f172a")
        draw.rectangle([cx - 230, card_y1 + 70, cx + 50, card_y2 - 110], fill="#1e293b")
        draw.text((cx - 90, cy - 20), "📷 PHOTO CANVAS", fill="#38bdf8", font=font_sub, anchor="mm")
        # Color sliders on right
        draw.rectangle([cx + 80, card_y1 + 70, cx + 230, card_y1 + 90], fill="#38bdf8")
        draw.rectangle([cx + 80, card_y1 + 110, cx + 230, card_y1 + 130], fill="#f43f5e")
        draw.rectangle([cx + 80, card_y1 + 150, cx + 230, card_y1 + 170], fill="#eab308")
        draw.text((cx, card_y2 - 50), "ADOBE PHOTOSHOP SPEED SHORTCUTS", fill="#ea580c", font=font_small, anchor="mm")

    elif icon_type == "social_media":
        # Megaphone + reaction icons
        draw.ellipse([cx - 80, cy - 80, cx + 80, cy + 80], fill="#3b82f6")
        draw.text((cx, cy), "📢", fill="#ffffff", font=font_title1, anchor="mm")
        reactions = ["❤️ 999", "👍 Like", "😍 Love", "🔥 Fire", "🎉 Share"]
        for i, r in enumerate(reactions):
            rx = card_x1 + 60 + (i * 180)
            draw.rounded_rectangle([rx, card_y2 - 90, rx + 140, card_y2 - 40], radius=20, fill="#fee2e2", outline="#fca5a5", width=2)
            draw.text((rx + 70, card_y2 - 65), r, fill="#991b1b", font=font_small, anchor="mm")

    elif icon_type == "why_prism":
        # Student pointing to Prism logo badge
        draw.ellipse([cx - 240, cy - 70, cx - 100, cy + 70], fill="#fed7aa")
        draw.polygon([(cx + 120, cy - 90), (cx + 240, cy + 70), (cx, cy + 70)], fill="#f58220")
        draw.text((cx + 120, cy + 20), "PRISM", fill="#ffffff", font=font_title1, anchor="mm")
        draw.text((cx, card_y2 - 50), "TOP 10 REASONS TO CHOOSE PRISM MULTIMEDIA", fill="#ea580c", font=font_small, anchor="mm")

    elif icon_type == "motion_ui":
        # Dark UI Screen mockup
        draw.rounded_rectangle([cx - 280, card_y1 + 30, cx + 280, card_y2 - 70], radius=16, fill="#0f172a")
        draw.rectangle([cx - 240, card_y1 + 60, cx - 40, card_y1 + 90], fill="#38bdf8")
        draw.rectangle([cx - 240, card_y1 + 110, cx + 200, card_y1 + 130], fill="#334155")
        draw.rectangle([cx - 240, card_y1 + 150, cx + 140, card_y1 + 170], fill="#334155")
        draw.text((cx, card_y2 - 40), "SEARCH / UI MOTION DESIGN", fill="#38bdf8", font=font_sub, anchor="mm")

    elif icon_type == "creative_skills":
        # Target / Skill circle badge
        draw.ellipse([cx - 100, cy - 100, cx + 100, cy + 100], fill="#dcfce7", outline="#22c55e", width=6)
        draw.ellipse([cx - 60, cy - 60, cx + 60, cy + 60], fill="#22c55e")
        draw.text((cx, cy), "🎯", fill="#ffffff", font=font_title1, anchor="mm")
        draw.text((cx, card_y2 - 50), "TOP 10 CREATIVE SKILLS FOR CAREERS", fill="#15803d", font=font_small, anchor="mm")

    elif icon_type == "career_choice":
        # Thinking illustration simulation
        draw.ellipse([cx - 180, cy - 80, cx - 40, cy + 60], fill="#fef08a")
        draw.text((cx - 110, cy - 10), "🤔", fill="#ffffff", font=font_title1, anchor="mm")
        draw.text((cx + 120, cy), "CAREER??", fill="#ea580c", font=font_title1, anchor="mm")

    elif icon_type == "designer_qualities":
        # Designer desk mockup
        draw.rounded_rectangle([cx - 300, card_y1 + 40, cx + 300, card_y2 - 70], radius=16, fill="#e2e8f0")
        draw.rectangle([cx - 270, card_y1 + 65, cx + 270, card_y2 - 95], fill="#1e293b")
        draw.text((cx, cy - 10), "🎨 GRAPHIC DESIGN WORKSPACE", fill="#f58220", font=font_title2, anchor="mm")

    elif icon_type == "expectations_reality":
        # Split comparison boxes
        draw.rounded_rectangle([card_x1 + 60, card_y1 + 40, cx - 30, card_y2 - 60], radius=16, fill="#dbeafe", outline="#3b82f6", width=2)
        draw.text((card_x1 + 60 + (cx - 30 - card_x1 - 60)//2, cy), "EXPECTATIONS", fill="#1e40af", font=font_title2, anchor="mm")
        draw.rounded_rectangle([cx + 30, card_y1 + 40, card_x2 - 60, card_y2 - 60], radius=16, fill="#fee2e2", outline="#ef4444", width=2)
        draw.text((cx + 30 + (card_x2 - 60 - cx - 30)//2, cy), "REALITY", fill="#991b1b", font=font_title2, anchor="mm")

    elif icon_type == "portfolio_tips":
        # 3D Bar chart columns
        draw.rectangle([cx - 200, cy - 40, cx - 80, card_y2 - 60], fill="#38bdf8")
        draw.rectangle([cx - 60, cy - 110, cx + 60, card_y2 - 60], fill="#818cf8")
        draw.rectangle([cx + 80, cy - 70, cx + 200, card_y2 - 60], fill="#c084fc")
        draw.text((cx, card_y2 - 40), "PORTFOLIO CREATION STRATEGIES", fill="#0f172a", font=font_small, anchor="mm")

    elif icon_type == "cinema_motion":
        # Dark cinema screen with play triangle
        draw.rounded_rectangle([cx - 240, card_y1 + 40, cx + 240, card_y2 - 70], radius=20, fill="#0f172a")
        draw.polygon([(cx - 40, cy - 60), (cx - 40, cy + 60), (cx + 60, cy)], fill="#f58220")
        draw.text((cx, card_y2 - 40), "CINEMA TO DIGITAL MEDIA", fill="#ffffff", font=font_small, anchor="mm")

    # Corner Prism Brand Badge
    draw.rectangle([card_x1 + 30, card_y1 + 20, card_x1 + 160, card_y1 + 50], fill="#ea580c")
    draw.text((card_x1 + 95, card_y1 + 35), badge_text, fill="#ffffff", font=font_small, anchor="mm")

    output_path = os.path.join(public_dir, filename)
    img.save(output_path, "JPEG", quality=95)
    print(f"Generated HD {output_path}")

# Generate all 12 posters
items = [
    ("blog-poster-1.jpg", "TOP 100 INDESIGN SHORTCUTS", "Master Adobe InDesign Top 100 Essential Keyboard Shortcuts", "indesign_kbd"),
    ("blog-poster-2.jpg", "TOP 100 ILLUSTRATOR SHORTCUTS", "Top 100 Adobe Illustrator Keyboard Shortcuts You Need to Know", "illustrator_kbd"),
    ("blog-poster-3.jpg", "TOP 100 PHOTOSHOP SHORTCUTS", "Master Adobe Photoshop: Top 100 Time-Saving Shortcuts You Need to Know", "photoshop_kbd"),
    ("blog-poster-4.jpg", "INTERSECTION OF MULTIMEDIA", "AND SOCIAL MEDIA", "social_media"),
    ("blog-poster-5.jpg", "WHY PRISM MULTIMEDIA", "TOP 10 REASONS TO CHOOSE PRISM MULTIMEDIA TO BOOST YOUR CAREER", "why_prism"),
    ("blog-poster-6.jpg", "MOTION GRAPHICS IN UI DESIGN", "Transforming User Interface (UI) Experience", "motion_ui"),
    ("blog-poster-7.jpg", "TOP 10 CREATIVE SKILLS", "TO LEARN IN 2023", "creative_skills"),
    ("blog-poster-8.jpg", "IS MULTIMEDIA A GOOD CAREER CHOICE??", "Exploring Demand & High Growth Potential", "career_choice"),
    ("blog-poster-9.jpg", "TOP 10 QUALITIES OF GRAPHIC DESIGNER", "WHAT MAKES YOU A GOOD DESIGNER", "designer_qualities"),
    ("blog-poster-10.jpg", "GRAPHIC DESIGNING", "EXPECTATIONS VS REALITY", "expectations_reality"),
    ("blog-poster-11.jpg", "PORTFOLIO CREATION", "TIPS AND STRATEGIES FOR DESIGNERS", "portfolio_tips"),
    ("blog-poster-12.jpg", "MOTION GRAPHICS", "FROM CINEMA TO DIGITAL MEDIA", "cinema_motion"),
]

for filename, t1, t2, itype in items:
    draw_poster_hd(filename, t1, t2, itype)
