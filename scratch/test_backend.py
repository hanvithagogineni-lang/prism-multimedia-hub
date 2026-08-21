import urllib.request
import json

def test_api(url, name):
    try:
        req = urllib.request.urlopen(url)
        data = json.loads(req.read().decode('utf-8'))
        print(f"[OK] {name}: Status {req.status}, Success={data.get('success', True)}")
        return data
    except Exception as e:
        print(f"[FAIL] {name}: {e}")
        return None

print("=== BACKEND HEALTH & ENDPOINT CHECKS ===")
test_api("http://localhost:5000/api/health", "Health Endpoint")
courses = test_api("http://localhost:5000/api/courses", "Get Courses API")
if courses and 'data' in courses:
    print(f"Total Courses returned from DB: {len(courses['data'])}")

settings = test_api("http://localhost:5000/api/settings", "Get Settings API")
if settings and 'data' in settings:
    print(f"Institute Name in DB: {settings['data'].get('institute_name')}")
