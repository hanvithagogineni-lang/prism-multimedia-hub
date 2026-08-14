import os
from PIL import Image

uploaded_dir = r"C:\Users\honey\.gemini\antigravity\brain\7199bc43-2164-4ef6-8420-c9c552fc797c\.user_uploaded"
public_dir = r"c:\Users\honey\Downloads\prism-multimedia-hub-main\prism-multimedia-hub-main\public"

# The 4 new uploaded images for Slide 2 (Blog 5, 6, 7, 8):
img5_path = os.path.join(uploaded_dir, "media_1786698862091.png")
img6_path = os.path.join(uploaded_dir, "media_1786698874532.png")
img7_path = os.path.join(uploaded_dir, "media_1786698882514.png")
img8_path = os.path.join(uploaded_dir, "media_1786698888674.png")

def fit_to_aspect(img, target_w=1000, target_h=625):
    w, h = img.size
    target_ratio = target_w / target_h
    current_ratio = w / h

    if current_ratio > target_ratio:
        new_w = int(h * target_ratio)
        offset = (w - new_w) // 2
        cropped = img.crop((offset, 0, offset + new_w, h))
    else:
        new_h = int(w / target_ratio)
        offset = 0
        cropped = img.crop((0, offset, w, offset + new_h))

    return cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)

# Process Image 5 (Blog 5 - Why Prism Multimedia)
im5 = Image.open(img5_path).convert("RGB")
w5, h5 = im5.size
banner5 = im5.crop((0, 0, w5, int(h5 * 0.54)))
res5 = fit_to_aspect(banner5)
res5.save(os.path.join(public_dir, "blog-poster-5.jpg"), "JPEG", quality=96)
print("Saved blog-poster-5.jpg")

# Process Image 6 (Blog 6 - Motion Graphics in UI)
im6 = Image.open(img6_path).convert("RGB")
w6, h6 = im6.size
banner6 = im6.crop((0, 0, w6, int(h6 * 0.54)))
res6 = fit_to_aspect(banner6)
res6.save(os.path.join(public_dir, "blog-poster-6.jpg"), "JPEG", quality=96)
print("Saved blog-poster-6.jpg")

# Process Image 7 (Blog 7 - Top 10 Creative Skills)
im7 = Image.open(img7_path).convert("RGB")
w7, h7 = im7.size
banner7 = im7.crop((0, 0, w7, int(h7 * 0.54)))
res7 = fit_to_aspect(banner7)
res7.save(os.path.join(public_dir, "blog-poster-7.jpg"), "JPEG", quality=96)
print("Saved blog-poster-7.jpg")

# Process Image 8 (Blog 8 - Is Multimedia Good Career)
im8 = Image.open(img8_path).convert("RGB")
w8, h8 = im8.size
banner8 = im8.crop((0, 0, w8, int(h8 * 0.54)))
res8 = fit_to_aspect(banner8)
res8.save(os.path.join(public_dir, "blog-poster-8.jpg"), "JPEG", quality=96)
print("Saved blog-poster-8.jpg")
