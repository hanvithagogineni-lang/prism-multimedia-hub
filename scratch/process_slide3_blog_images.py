import os
from PIL import Image

uploaded_dir = r"C:\Users\honey\.gemini\antigravity\brain\7199bc43-2164-4ef6-8420-c9c552fc797c\.user_uploaded"
public_dir = r"c:\Users\honey\Downloads\prism-multimedia-hub-main\prism-multimedia-hub-main\public"

# The 4 new uploaded images for Slide 3 (Blog 9, 10, 11, 12):
img9_path = os.path.join(uploaded_dir, "media_1786699514877.png")
img10_path = os.path.join(uploaded_dir, "media_1786699522475.png")
img11_path = os.path.join(uploaded_dir, "media_1786699530658.png")
img12_path = os.path.join(uploaded_dir, "media_1786699537963.png")

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

# Process Image 9 (Blog 9 - Graphic Designer Qualities)
im9 = Image.open(img9_path).convert("RGB")
w9, h9 = im9.size
banner9 = im9.crop((0, 0, w9, int(h9 * 0.54))) if h9 > 700 else im9
res9 = fit_to_aspect(banner9)
res9.save(os.path.join(public_dir, "blog-poster-9.jpg"), "JPEG", quality=96)
print("Saved blog-poster-9.jpg")

# Process Image 10 (Blog 10 - Expectations vs Reality)
im10 = Image.open(img10_path).convert("RGB")
w10, h10 = im10.size
banner10 = im10.crop((0, 0, w10, int(h10 * 0.54))) if h10 > 700 else im10
res10 = fit_to_aspect(banner10)
res10.save(os.path.join(public_dir, "blog-poster-10.jpg"), "JPEG", quality=96)
print("Saved blog-poster-10.jpg")

# Process Image 11 (Blog 11 - Portfolio Creation)
im11 = Image.open(img11_path).convert("RGB")
w11, h11 = im11.size
banner11 = im11.crop((0, 0, w11, int(h11 * 0.54))) if h11 > 700 else im11
res11 = fit_to_aspect(banner11)
res11.save(os.path.join(public_dir, "blog-poster-11.jpg"), "JPEG", quality=96)
print("Saved blog-poster-11.jpg")

# Process Image 12 (Blog 12 - Motion Graphics Cinema to Digital)
im12 = Image.open(img12_path).convert("RGB")
w12, h12 = im12.size
banner12 = im12.crop((0, 0, w12, int(h12 * 0.54))) if h12 > 700 else im12
res12 = fit_to_aspect(banner12)
res12.save(os.path.join(public_dir, "blog-poster-12.jpg"), "JPEG", quality=96)
print("Saved blog-poster-12.jpg")
