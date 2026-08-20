import json

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

with open("main.js", "r", encoding="utf-8") as f:
    js = f.read()

full_text = html + js

checks = {
    "Hero Title": "Best Multimedia Training Institute",
    "Hero Subtext": "Prism Multimedia has been at the forefront of multimedia education",
    "Est Year": "Established in 1999",
    "Students Opted": "10,000+",
    "Placement Rate": "100% Successfully Placed",
    "Experience": "24+ Years",
    "Faculty": "Experienced Faculty",
    "Student Works Title": "Explore the incredible creativity of our Students",
    "Alumni 1 (Bolle Madhu)": "Bolle Madhu",
    "Alumni 2 (Venkateswara Rao)": "Venkateswara Rao",
    "Alumni 3 (Maggidi Uday)": "Maggidi Uday kiran",
    "Alumni 4 (Nikhilesh)": "Nikhilesh Mishra",
    "Alumni 5 (Yarlagadda)": "Yarlagadda Haritha",
    "Alumni 6 (Byrla)": "Byrla Anandakumar",
    "Alumni 7 (Bokkena)": "Bokkena Sriguru Sairam",
    "Alumni 8 (Srinaiah)": "Srinaiah Jinkala",
    "Testimonial (Anandakumar)": "Byrla Anandakumar",
    "Testimonial (Krishna)": "Krishna Boorugu",
    "Testimonial (Lekha)": "Mandali Chandra Lekha",
    "Testimonial (Nagesh)": "Nagesh V",
    "Corporate Training": "Human Resource is the main source of success for any corporate entity",
    "Educational Society": "Public awareness campaigns, programs and workshops aim to empower the target groups",
    "FAQ 1": "What courses does Prism Multimedia offer?",
    "FAQ 2": "Why should I choose Prism Multimedia for multimedia training?",
    "FAQ 3": "Are the courses at Prism Multimedia suitable for beginners?",
    "FAQ 4": "How can I enroll in a course at Prism Multimedia?",
    "FAQ 5": "What are the benefits of studying at Prism Multimedia?",
    "FAQ 6": "Can I find job opportunities through Prism Multimedia?",
    "FAQ 7": "How do I download the E-Brochure for Prism Multimedia?",
    "FAQ 8": "What is the duration of the multimedia courses?",
    "FAQ 9": "Are there any online options available for the courses?",
    "FAQ 10": "How can I contact Prism Multimedia for more information?",
    "InDesign 100 Shortcuts": "Master Adobe InDesign: Top 100 Essential Keyboard Shortcuts",
    "Illustrator 100 Shortcuts": "Unlock Efficiency: Top 100 Adobe Illustrator Keyboard Shortcuts",
    "Photoshop 100 Shortcuts": "Master Adobe Photoshop: Top 100 Time-Saving Shortcuts",
    "Blog 4": "Exploring the Intersection of Multimedia and Social Media",
    "Blog 5": "Why should I opt for PRISM MULTIMEDIA to boost my career",
    "Blog 6": "Motion Graphics in User Interface (UI) Design",
    "Blog 7": "Top 10 Creative Skills to Learn",
    "Blog 8": "Is Multimedia a Good Career Choice",
    "Blog 9": "Top 10 Qualities of a Successful Graphic Designer",
    "Blog 10": "Graphic Designing — Expectations Vs. Reality",
    "Blog 11": "Mastering the Art of Portfolio Creation in the Design Industry",
    "Blog 12": "The Evolution of Motion Graphics: From Cinema to Digital Media",
    "Contact Phone 1": "+91 97013 34133",
    "Contact Phone 2": "+91 91775 55040",
    "Contact Email": "info@prismmultimedia.com",
    "Working Hours": "8:00 AM – 8:00 PM",
    "Address": "Ameerpet Circle, Hyderabad"
}

print("=== COMPLETE SITE VERIFICATION REPORT ===")
passed = 0
for name, query in checks.items():
    found = query.lower() in full_text.lower()
    if found:
        passed += 1
        print(f"[OK] {name}")
    else:
        print(f"[MISSING] {name} -> '{query}'")

print(f"\nSummary: {passed}/{len(checks)} sections passed verification!")
