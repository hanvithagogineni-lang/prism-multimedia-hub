import os
from PIL import Image, ImageDraw, ImageFont

public_dir = r"c:\Users\honey\Downloads\prism-multimedia-hub-main\prism-multimedia-hub-main\public"
os.makedirs(public_dir, exist_ok=True)

posters_data = [
    {
        "filename": "blog-poster-1.jpg",
        "tag": "TOP 100 INDESIGN SHORTCUTS",
        "sub": "Master Adobe InDesign\nTop 100 Essential Keyboard Shortcuts",
        "icon": "keyboard"
    },
    {
        "filename": "blog-poster-2.jpg",
        "tag": "TOP 100 ILLUSTRATOR SHORTCUTS",
        "sub": "Top 100 Adobe Illustrator Keyboard\nShortcuts You Need to Know",
        "icon": "keyboard"
    },
    {
        "filename": "blog-poster-3.jpg",
        "tag": "TOP 100 PHOTOSHOP SHORTCUTS",
        "sub": "Master Adobe Photoshop:\nTop 100 Time-Saving Shortcuts You Need to Know",
        "icon": "keyboard"
    },
    {
        "filename": "blog-poster-4.jpg",
        "tag": "INTERSECTION OF MULTIMEDIA\nAND SOCIAL MEDIA",
        "sub": "Amplifying Reach & Digital Potential",
        "icon": "megaphone"
    },
    {
        "filename": "blog-poster-5.jpg",
        "tag": "WHY PRISM MULTIMEDIA",
        "sub": "TOP 10 REASONS TO CHOOSE\nPRISM MULTIMEDIA TO BOOST YOUR CAREER",
        "icon": "pointing"
    },
    {
        "filename": "blog-poster-6.jpg",
        "tag": "MOTION GRAPHICS\nIN UI DESIGN",
        "sub": "Transforming User Experience in UI",
        "icon": "uidesign"
    },
    {
        "filename": "blog-poster-7.jpg",
        "tag": "TOP 10 CREATIVE SKILLS\nTO LEARN IN 2023",
        "sub": "Essential Creative Capabilities",
        "icon": "skills"
    },
    {
        "filename": "blog-poster-8.jpg",
        "tag": "IS MULTIMEDIA A GOOD\nCAREER CHOICE??",
        "sub": "Exploring High Demand & Future Growth",
        "icon": "thinking"
    },
    {
        "filename": "blog-poster-9.jpg",
        "tag": "TOP 10 QUALITIES OF\nGRAPHIC DESIGNER",
        "sub": "WHAT MAKES YOU A GOOD DESIGNER",
        "icon": "designer"
    },
    {
        "filename": "blog-poster-10.jpg",
        "tag": "GRAPHIC DESIGNING",
        "sub": "EXPECTATIONS VS REALITY",
        "icon": "vs"
    },
    {
        "filename": "blog-poster-11.jpg",
        "tag": "PORTFOLIO CREATION",
        "sub": "TIPS AND STRATEGIES FOR DESIGNERS",
        "icon": "portfolio"
    },
    {
        "filename": "blog-poster-12.jpg",
        "tag": "MOTION GRAPHICS",
        "sub": "FROM CINEMA TO DIGITAL MEDIA",
        "icon": "cinema"
    }
]

def draw_poster(item):
    width, height = 800, 500
    img = Image.new("RGB", (width, height), color="#f58220")
    draw = ImageDraw.Draw(img)

    # Background subtle pattern/shapes
    draw.ellipse([width - 150, -50, width + 150, 250], fill="#f7933b")
    draw.ellipse([-100, height - 200, 200, height + 100], fill="#e07216")

    # White inner card/board graphic
    card_margin_x, card_margin_y = 60, 40
    card_w = width - (card_margin_x * 2)
    card_h = height - (card_margin_y * 2)
    
    # Header tag background
    draw.rectangle([60, 50, width - 60, 220], fill="#ea580c")

    # Typography
    try:
        font_title = ImageFont.truetype("arialbd.ttf", 34)
        font_sub = ImageFont.truetype("arial.ttf", 22)
        font_logo = ImageFont.truetype("arialbd.ttf", 20)
    except:
        font_title = ImageFont.load_default()
        font_sub = font_title
        font_logo = font_title

    # Draw Title Tag Text
    draw.text((width // 2, 100), item["tag"], fill="#ffffff", font=font_title, anchor="mm", align="center")
    draw.text((width // 2, 175), item["sub"], fill="#fff7ed", font=font_sub, anchor="mm", align="center")

    # Draw Graphic Illustration Box on lower half
    box_top = 240
    box_bottom = height - 40
    draw.rounded_rectangle([100, box_top, width - 100, box_bottom], radius=16, fill="#ffffff", outline="#fed7aa", width=3)

    if item["icon"] == "keyboard":
        # Draw Keyboard mockup inside box
        draw.rounded_rectangle([140, box_top + 25, width - 140, box_bottom - 25], radius=10, fill="#f8fafc", outline="#cbd5e1", width=2)
        # Key rows
        for row in range(3):
            y = box_top + 45 + (row * 35)
            for col in range(12):
                x = 160 + (col * 40)
                draw.rounded_rectangle([x, y, x + 32, y + 25], radius=4, fill="#e2e8f0", outline="#94a3b8", width=1)
        # Hands illustration simulation
        draw.ellipse([260, box_bottom - 45, 340, box_bottom + 20], fill="#fbcfe8")
        draw.ellipse([460, box_bottom - 45, 540, box_bottom + 20], fill="#fbcfe8")

    elif item["icon"] == "megaphone":
        # Megaphone / Social media icons
        draw.ellipse([370, box_top + 30, 430, box_top + 90], fill="#3b82f6")
        draw.text((400, box_top + 60), "📣", fill="#ffffff", font=font_title, anchor="mm")
        # Reaction bubbles
        reactions = ["❤️ 999", "👍", "😍", "🔥", "🎉"]
        for i, rx in enumerate(reactions):
            rx_x = 160 + (i * 105)
            draw.rounded_rectangle([rx_x, box_bottom - 60, rx_x + 85, box_bottom - 25], radius=15, fill="#fee2e2")
            draw.text((rx_x + 42, box_bottom - 42), rx, fill="#991b1b", font=font_sub, anchor="mm")

    elif item["icon"] == "pointing":
        # Person pointing to Prism logo badge
        draw.ellipse([180, box_top + 20, 300, box_top + 140], fill="#fed7aa")
        draw.polygon([(480, box_top + 30), (560, box_top + 130), (400, box_top + 130)], fill="#f58220")
        draw.text((480, box_top + 100), "PRISM", fill="#ffffff", font=font_title, anchor="mm")

    elif item["icon"] == "uidesign":
        # UI Screen mockup
        draw.rounded_rectangle([250, box_top + 20, 550, box_bottom - 20], radius=8, fill="#0f172a")
        draw.rectangle([270, box_top + 40, 370, box_top + 60], fill="#38bdf8")
        draw.rectangle([270, box_top + 75, 530, box_top + 90], fill="#334155")
        draw.rectangle([270, box_top + 105, 480, box_top + 120], fill="#334155")
        draw.text((400, box_top + 150), "SEARCH / UI", fill="#38bdf8", font=font_sub, anchor="mm")

    elif item["icon"] == "skills":
        # Target / Skill icons
        draw.ellipse([340, box_top + 20, 460, box_top + 140], fill="#dcfce7", outline="#22c55e", width=4)
        draw.ellipse([370, box_top + 50, 430, box_top + 110], fill="#22c55e")
        draw.text((400, box_top + 80), "🎯", fill="#ffffff", font=font_title, anchor="mm")

    elif item["icon"] == "thinking":
        # Thinking woman illustration simulation
        draw.ellipse([200, box_top + 20, 320, box_top + 140], fill="#fef08a")
        draw.text((260, box_top + 70), "🤔", fill="#ffffff", font=font_title, anchor="mm")
        draw.text((480, box_top + 80), "CAREER??", fill="#ea580c", font=font_title, anchor="mm")

    elif item["icon"] == "designer":
        # Desk / laptop mockup
        draw.rounded_rectangle([220, box_top + 30, 580, box_bottom - 30], radius=8, fill="#e2e8f0")
        draw.rectangle([240, box_top + 45, 560, box_bottom - 50], fill="#1e293b")
        draw.text((400, box_top + 90), "🎨 GRAPHIC DESIGN", fill="#f58220", font=font_sub, anchor="mm")

    elif item["icon"] == "vs":
        # Expectations vs Reality split screen
        draw.rectangle([160, box_top + 20, 380, box_bottom - 20], fill="#dbeafe")
        draw.text((270, box_top + 80), "EXPECTATIONS", fill="#1e40af", font=font_sub, anchor="mm")
        draw.rectangle([420, box_top + 20, 640, box_bottom - 20], fill="#fee2e2")
        draw.text((530, box_top + 80), "REALITY", fill="#991b1b", font=font_sub, anchor="mm")

    elif item["icon"] == "portfolio":
        # Portfolio charts
        draw.rectangle([200, box_top + 30, 320, box_bottom - 30], fill="#38bdf8")
        draw.rectangle([340, box_top + 10, 460, box_bottom - 30], fill="#818cf8")
        draw.rectangle([480, box_top + 50, 600, box_bottom - 30], fill="#c084fc")
        draw.text((400, box_top + 150), "PORTFOLIO", fill="#0f172a", font=font_sub, anchor="mm")

    elif item["icon"] == "cinema":
        # Motion graphics film icon
        draw.rounded_rectangle([280, box_top + 20, 520, box_bottom - 20], radius=16, fill="#0f172a")
        draw.polygon([(380, box_top + 50), (380, box_bottom - 50), (450, box_top + 90)], fill="#f58220")
        draw.text((400, box_bottom - 35), "CINEMA TO DIGITAL", fill="#ffffff", font=font_sub, anchor="mm")

    # Watermark logo at top left
    draw.rectangle([70, 60, 160, 85], fill="#ffffff")
    draw.text((115, 72), "PRISM", fill="#ea580c", font=font_logo, anchor="mm")

    output_path = os.path.join(public_dir, item["filename"])
    img.save(output_path, "JPEG", quality=92)
    print(f"Generated {output_path}")

for item in posters_data:
    draw_poster(item)
