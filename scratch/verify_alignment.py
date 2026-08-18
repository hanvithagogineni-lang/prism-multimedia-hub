import json

with open("scratch/full_beta_extract.json", "r", encoding="utf-8") as f:
    data = json.load(f)

with open("index.html", "r", encoding="utf-8") as f:
    index_html = f.read()

with open("main.js", "r", encoding="utf-8") as f:
    main_js = f.read()

all_code = index_html + main_js

key_phrases = [
    "Prism Multimedia has been at the forefront of multimedia education",
    "Explore the incredible creativity of our",
    "Human Resource is the main source of success for any corporate entity",
    "Public awareness campaigns, programs and workshops aim to empower the target groups",
    "Prism Multimedia is an enterprise run by experienced professionals",
    "10,000+",
    "100% Successfully Placed",
    "Bolle Madhu",
    "Venkateswara Rao",
    "Maggidi Uday kiran",
    "Nikhilesh Mishra",
    "Yarlagadda Haritha",
    "Byrla Anandakumar",
    "Bokkena Sriguru Sairam",
    "Srinaiah Jinkala",
    "We’re here to help you out"
]

print("=== CHECKING KEY SECTIONS IN OUR CODEBASE ===")
for phrase in key_phrases:
    found = phrase.lower() in all_code.lower()
    status = "OK" if found else "MISSING"
    print(f"[{status}] '{phrase}'")
