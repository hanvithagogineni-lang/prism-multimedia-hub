import os
from PIL import Image

uploaded_dir = r"C:\Users\honey\.gemini\antigravity\brain\7199bc43-2164-4ef6-8420-c9c552fc797c\.user_uploaded"
public_dir = r"c:\Users\honey\Downloads\prism-multimedia-hub-main\prism-multimedia-hub-main\public"

# The 4 images to process:
# Image 1 (InDesign): media_1786697719618.jpg
# Image 2 (Illustrator card): media_1786697719625.jpg
# Image 3 (Photoshop card): media_1786697768928.png
# Image 4 (Social Media card): media_1786697775370.jpg

img1_path = os.path.join(uploaded_dir, "media_1786697719618.jpg")
img2_path = os.path.join(uploaded_dir, "media_1786697719625.jpg")
img3_path = os.path.join(uploaded_dir, "media_1786697768928.png")
img4_path = os.path.join(uploaded_dir, "media_1786697775370.jpg")

# Load Image 1
im1 = Image.open(img1_path)
print("Image 1 size:", im1.size)
# Image 1 is full photo (1024 x 683 approx). Save directly as blog-poster-1.jpg
im1.convert("RGB").save(os.path.join(public_dir, "blog-poster-1.jpg"), "JPEG", quality=95)
print("Saved blog-poster-1.jpg")

# Load Image 2 (Illustrator card)
im2 = Image.open(img2_path)
print("Image 2 size:", im2.size)
# If Image 2 contains the top banner portion (or the full card), let's crop top 60% if it's the full card, or save banner.
# Let's inspect im2 dimensions:
w2, h2 = im2.size
# In Image 2, top 60% is the computer monitor banner photo!
banner2 = im2.crop((0, 0, w2, int(h2 * 0.62)))
banner2.convert("RGB").save(os.path.join(public_dir, "blog-poster-2.jpg"), "JPEG", quality=95)
print("Saved blog-poster-2.jpg")

# Load Image 3 (Photoshop card)
im3 = Image.open(img3_path)
print("Image 3 size:", im3.size)
w3, h3 = im3.size
# Top 55% is the Photoshop monitor banner photo!
banner3 = im3.crop((0, 0, w3, int(h3 * 0.55)))
banner3.convert("RGB").save(os.path.join(public_dir, "blog-poster-3.jpg"), "JPEG", quality=95)
print("Saved blog-poster-3.jpg")

# Load Image 4 (Social Media card)
im4 = Image.open(img4_path)
print("Image 4 size:", im4.size)
w4, h4 = im4.size
# Top 55% is the Social media blocks banner photo!
banner4 = im4.crop((0, 0, w4, int(h4 * 0.55)))
banner4.convert("RGB").save(os.path.join(public_dir, "blog-poster-4.jpg"), "JPEG", quality=95)
print("Saved blog-poster-4.jpg")
