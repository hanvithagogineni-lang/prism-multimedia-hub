import os
from PIL import Image

uploaded_dir = r"C:\Users\honey\.gemini\antigravity\brain\7199bc43-2164-4ef6-8420-c9c552fc797c\.user_uploaded"
public_dir = r"c:\Users\honey\Downloads\prism-multimedia-hub-main\prism-multimedia-hub-main\public"

# The 4 full user-uploaded images:
img1_path = os.path.join(uploaded_dir, "media_1786697719618.jpg")
img2_path = os.path.join(uploaded_dir, "media_1786697719625.jpg")
img3_path = os.path.join(uploaded_dir, "media_1786697768928.png")
img4_path = os.path.join(uploaded_dir, "media_1786697775370.jpg")

def fit_to_aspect(img, target_w=1000, target_h=625):
    # Resize preserving full photo visibility
    w, h = img.size
    target_ratio = target_w / target_h
    current_ratio = w / h

    if current_ratio > target_ratio:
        # Too wide, crop sides
        new_w = int(h * target_ratio)
        offset = (w - new_w) // 2
        cropped = img.crop((offset, 0, offset + new_w, h))
    else:
        # Too tall, crop top/bottom gracefully
        new_h = int(w / target_ratio)
        offset = 0
        cropped = img.crop((0, offset, w, offset + new_h))

    return cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)

# Process Image 1
im1 = Image.open(img1_path).convert("RGB")
res1 = fit_to_aspect(im1)
res1.save(os.path.join(public_dir, "blog-poster-1.jpg"), "JPEG", quality=96)
print("Fitted blog-poster-1.jpg")

# Process Image 2 (Illustrator card photo)
# Image 2 in user upload is media_1786697719625.jpg
im2 = Image.open(img2_path).convert("RGB")
# If im2 is full card screenshot with white bottom text, crop the monitor photo part (top 68%)
w2, h2 = im2.size
monitor_photo2 = im2.crop((0, 0, w2, int(h2 * 0.68)))
res2 = fit_to_aspect(monitor_photo2)
res2.save(os.path.join(public_dir, "blog-poster-2.jpg"), "JPEG", quality=96)
print("Fitted blog-poster-2.jpg")

# Process Image 3 (Photoshop card photo)
im3 = Image.open(img3_path).convert("RGB")
w3, h3 = im3.size
monitor_photo3 = im3.crop((0, 0, w3, int(h3 * 0.54)))
res3 = fit_to_aspect(monitor_photo3)
res3.save(os.path.join(public_dir, "blog-poster-3.jpg"), "JPEG", quality=96)
print("Fitted blog-poster-3.jpg")

# Process Image 4 (Social Media card photo)
im4 = Image.open(img4_path).convert("RGB")
w4, h4 = im4.size
photo4 = im4.crop((0, 0, w4, int(h4 * 0.54)))
res4 = fit_to_aspect(photo4)
res4.save(os.path.join(public_dir, "blog-poster-4.jpg"), "JPEG", quality=96)
print("Fitted blog-poster-4.jpg")
