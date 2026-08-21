import urllib.request
import json

def post_json(url, data_dict):
    req = urllib.request.Request(
        url,
        data=json.dumps(data_dict).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    res = urllib.request.urlopen(req)
    return json.loads(res.read().decode('utf-8'))

def get_json(url, token=None):
    headers = {}
    if token:
        headers['Authorization'] = f'Bearer {token}'
    req = urllib.request.Request(url, headers=headers)
    res = urllib.request.urlopen(req)
    return json.loads(res.read().decode('utf-8'))

print("=== FULL-STACK END-TO-END FLOW VERIFICATION ===")

# 1. Submit Student Registration
reg_data = {
    "name": "Test Student Rahul",
    "father_name": "Srinivas Rao",
    "gender": "Male",
    "education": "B.Tech Computer Science",
    "email": "rahul.test@example.com",
    "phone": "+91 98765 43210",
    "course_id": "graphic-design",
    "address1": "Ameerpet Road, Block 4",
    "city": "Hyderabad",
    "state": "Telangana",
    "country": "India"
}
reg_res = post_json("http://localhost:5000/api/registrations", reg_data)
print(f"[OK] Registration Submission: {reg_res.get('message')}")

# 2. Login as Admin
login_res = post_json("http://localhost:5000/api/auth/login", {
    "email": "admin@prismmultimedia.com",
    "password": "Admin@123456"
})
token = login_res.get('token')
print(f"[OK] Admin Login Success! JWT Token generated for: {login_res.get('user', {}).get('name')}")

# 3. Retrieve Dashboard Stats via Admin JWT
dash_res = get_json("http://localhost:5000/api/admin/dashboard", token)
stats = dash_res.get('data', {}).get('stats', {})
print(f"[OK] Admin Dashboard Stats: Total Courses={stats.get('totalCourses')}, Total Students={stats.get('totalStudents')}")

# 4. Fetch All Registrations in DB via Admin Token
regs_res = get_json("http://localhost:5000/api/registrations", token)
print(f"[OK] Registrations in DB: {len(regs_res.get('data', []))}")
latest_student = regs_res.get('data', [])[0]
print(f"     Latest Student in DB: {latest_student.get('name')} | Course: {latest_student.get('course', {}).get('title')} | Status: {latest_student.get('status')}")
