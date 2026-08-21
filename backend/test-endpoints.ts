import axios from 'axios';

async function testApi() {
  try {
    console.log('Testing /api/health...');
    const health = await axios.get('http://localhost:5000/api/health');
    console.log('Health Response:', health.data);

    console.log('\nTesting /api/courses...');
    const courses = await axios.get('http://localhost:5000/api/courses');
    console.log(`Courses Count: ${courses.data.length}`);

    console.log('\nTesting /api/auth/login...');
    const login = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@prismmultimedia.com',
      password: 'Admin@123456',
    });
    console.log('Login Success! Token generated:', login.data.token ? 'YES' : 'NO');
    console.log('User Role:', login.data.user.role);

    const token = login.data.token;
    console.log('\nTesting /api/admin/dashboard with Token...');
    const dashboard = await axios.get('http://localhost:5000/api/admin/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Dashboard Metrics:', dashboard.data.metrics);

    console.log('\nTesting /api/search?q=photoshop...');
    const search = await axios.get('http://localhost:5000/api/search?q=photoshop');
    console.log(`Search Results: ${search.data.courses.length} courses, ${search.data.blogs.length} blogs`);

    console.log('\nTesting /api/registrations POST...');
    const reg = await axios.post('http://localhost:5000/api/registrations', {
      name: 'Priya Sharma',
      father_name: 'V. K. Sharma',
      gender: 'Female',
      education: 'B.Tech',
      email: 'priya.sharma@example.com',
      phone: '+91 98765 00000',
      course_id: 'pgdim',
      address1: 'Madhapur Metro Pillar 12',
      city: 'Hyderabad',
      state: 'Telangana',
      country: 'India',
    });
    console.log('Registration submission status:', reg.status, reg.data.message);

    console.log('\n✨ ALL BACKEND REST API TESTS PASSED SUCCESSFULLY! ✨');
  } catch (err: any) {
    console.error('API Test Error:', err.response?.data || err.message);
  }
}

testApi();
