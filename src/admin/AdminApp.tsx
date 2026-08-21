import React, { useState, useEffect } from 'react';

// API Base URL
const API_URL = 'http://localhost:5000/api';

export const AdminApp: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('prism_admin_token'));
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'courses' | 'registrations' | 'leads' | 'settings'>('dashboard');

  // Form states
  const [email, setEmail] = useState('admin@prismmultimedia.com');
  const [password, setPassword] = useState('Admin@123456');
  const [loginError, setLoginError] = useState('');

  // Data states
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      fetchDashboard();
      fetchCourses();
      fetchRegistrations();
      fetchSettings();
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('prism_admin_token', data.token);
        setToken(data.token);
        setUser(data.user);
      } else {
        setLoginError(data.message || 'Login failed');
      }
    } catch (err) {
      setLoginError('Could not connect to backend server on port 5000');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('prism_admin_token');
    setToken(null);
    setUser(null);
  };

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setDashboardData(data.data);
    } catch (e) {}
  };

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API_URL}/courses`);
      const data = await res.json();
      if (data.success) setCourses(data.data);
    } catch (e) {}
  };

  const fetchRegistrations = async () => {
    try {
      const res = await fetch(`${API_URL}/registrations`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setRegistrations(data.data);
    } catch (e) {}
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/settings`);
      const data = await res.json();
      if (data.success) setSettings(data.data);
    } catch (e) {}
  };

  // If not logged in, render Login View
  if (!token) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#090a0f',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}>
        <div style={{
          background: '#12141d',
          padding: '2.5rem',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.1)',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ color: '#ff6600', margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>PRISM ADMIN</h1>
            <p style={{ color: '#888', marginTop: '0.5rem', fontSize: '0.9rem' }}>Full-Stack Content Management Portal</p>
          </div>

          {loginError && (
            <div style={{ background: 'rgba(255,0,0,0.15)', color: '#ff4d4d', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#aaa', marginBottom: '0.4rem' }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', padding: '0.8rem', background: '#090a0f', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                required
              />
            </div>
            <div style={{ marginBottom: '1.8rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#aaa', marginBottom: '0.4rem' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ width: '100%', padding: '0.8rem', background: '#090a0f', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                required
              />
            </div>
            <button
              type="submit"
              style={{ width: '100%', padding: '0.9rem', background: '#ff6600', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}
            >
              Sign In to Admin CMS
            </button>
          </form>
          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem', color: '#666' }}>
            Default Creds: admin@prismmultimedia.com / Admin@123456
          </div>
        </div>
      </div>
    );
  }

  // Admin Portal Layout
  return (
    <div style={{ minHeight: '100vh', background: '#090a0f', color: '#e0e0e0', display: 'flex', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', background: '#10121a', borderRight: '1px solid #222', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ff6600', marginBottom: '2.5rem', letterSpacing: '1px' }}>
            PRISM CMS
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { id: 'dashboard', label: '📊 Dashboard' },
              { id: 'courses', label: '📚 Courses Manager' },
              { id: 'registrations', label: '🎓 Registrations' },
              { id: 'leads', label: '💼 Corporate Leads' },
              { id: 'settings', label: '⚙️ Site Settings' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                style={{
                  textAlign: 'left',
                  padding: '0.8rem 1rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === item.id ? '#ff6600' : 'transparent',
                  color: activeTab === item.id ? '#fff' : '#aaa',
                  fontWeight: activeTab === item.id ? 700 : 500,
                  cursor: 'pointer'
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          style={{ padding: '0.8rem', background: '#222', border: 'none', borderRadius: '8px', color: '#ff4d4d', cursor: 'pointer', fontWeight: 600 }}
        >
          🚪 Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2.5rem', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.8rem', color: '#fff' }}>
              {activeTab === 'dashboard' && 'Executive Dashboard'}
              {activeTab === 'courses' && 'Course Catalog Management'}
              {activeTab === 'registrations' && 'Student Registrations'}
              {activeTab === 'leads' && 'Corporate & Franchise Enquiries'}
              {activeTab === 'settings' && 'Site Settings & Information'}
            </h1>
            <p style={{ color: '#777', margin: '0.3rem 0 0 0', fontSize: '0.9rem' }}>Connected to PostgreSQL / Prisma API on Port 5000</p>
          </div>
          <div style={{ background: '#181b26', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.85rem', color: '#4caf50', border: '1px solid #222' }}>
            ● System Online
          </div>
        </header>

        {/* Dashboard View */}
        {activeTab === 'dashboard' && dashboardData && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {[
                { title: 'Total Courses', value: dashboardData.stats.totalCourses, color: '#ff6600' },
                { title: 'Total Students', value: dashboardData.stats.totalStudents, color: '#2196f3' },
                { title: 'New Registrations', value: dashboardData.stats.newRegistrations, color: '#4caf50' },
                { title: 'Pending Enquiries', value: dashboardData.stats.pendingEnquiries, color: '#e91e63' }
              ].map((card, i) => (
                <div key={i} style={{ background: '#12141d', padding: '1.5rem', borderRadius: '12px', border: '1px solid #222' }}>
                  <div style={{ color: '#888', fontSize: '0.85rem' }}>{card.title}</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: card.color, marginTop: '0.5rem' }}>{card.value}</div>
                </div>
              ))}
            </div>

            <div style={{ background: '#12141d', padding: '1.5rem', borderRadius: '12px', border: '1px solid #222' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#fff' }}>Recent Student Submissions</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #222', color: '#888' }}>
                    <th style={{ padding: '0.8rem' }}>Name</th>
                    <th style={{ padding: '0.8rem' }}>Email</th>
                    <th style={{ padding: '0.8rem' }}>Phone</th>
                    <th style={{ padding: '0.8rem' }}>Course</th>
                    <th style={{ padding: '0.8rem' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recentRegistrations.map((reg: any) => (
                    <tr key={reg.id} style={{ borderBottom: '1px solid #1a1d29' }}>
                      <td style={{ padding: '0.8rem', color: '#fff' }}>{reg.name}</td>
                      <td style={{ padding: '0.8rem' }}>{reg.email}</td>
                      <td style={{ padding: '0.8rem' }}>{reg.phone}</td>
                      <td style={{ padding: '0.8rem', color: '#ff6600' }}>{reg.course?.title || 'General'}</td>
                      <td style={{ padding: '0.8rem' }}>
                        <span style={{ background: 'rgba(76, 175, 80, 0.2)', color: '#4caf50', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem' }}>
                          {reg.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {dashboardData.recentRegistrations.length === 0 && (
                    <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No student registrations submitted yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Courses View */}
        {activeTab === 'courses' && (
          <div style={{ background: '#12141d', padding: '1.5rem', borderRadius: '12px', border: '1px solid #222' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, color: '#fff' }}>Active Courses ({courses.length})</h3>
              <button style={{ padding: '0.5rem 1rem', background: '#ff6600', border: 'none', borderRadius: '6px', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>+ Add Course</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {courses.map((course: any) => (
                <div key={course.id} style={{ background: '#090a0f', padding: '1.2rem', borderRadius: '8px', border: '1px solid #222' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#ff6600' }}>{course.title}</h4>
                  <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.8rem' }}>Duration: {course.duration} | {course.certification}</div>
                  <p style={{ fontSize: '0.85rem', color: '#ccc', margin: '0 0 1rem 0' }}>{course.short_description}</p>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{ padding: '0.3rem 0.8rem', background: '#222', border: 'none', borderRadius: '4px', color: '#fff', fontSize: '0.8rem', cursor: 'pointer' }}>Edit</button>
                    <button style={{ padding: '0.3rem 0.8rem', background: 'rgba(255,0,0,0.2)', border: 'none', borderRadius: '4px', color: '#ff4d4d', fontSize: '0.8rem', cursor: 'pointer' }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Registrations View */}
        {activeTab === 'registrations' && (
          <div style={{ background: '#12141d', padding: '1.5rem', borderRadius: '12px', border: '1px solid #222' }}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: '#fff' }}>All Student Registrations</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #222', color: '#888' }}>
                  <th style={{ padding: '0.8rem' }}>Name</th>
                  <th style={{ padding: '0.8rem' }}>Contact</th>
                  <th style={{ padding: '0.8rem' }}>Location</th>
                  <th style={{ padding: '0.8rem' }}>Course</th>
                  <th style={{ padding: '0.8rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg: any) => (
                  <tr key={reg.id} style={{ borderBottom: '1px solid #1a1d29' }}>
                    <td style={{ padding: '0.8rem', color: '#fff' }}>{reg.name}</td>
                    <td style={{ padding: '0.8rem' }}>{reg.email}<br/><span style={{ fontSize: '0.8rem', color: '#888' }}>{reg.phone}</span></td>
                    <td style={{ padding: '0.8rem' }}>{reg.city}, {reg.state}</td>
                    <td style={{ padding: '0.8rem', color: '#ff6600' }}>{reg.course?.title || 'General'}</td>
                    <td style={{ padding: '0.8rem' }}>
                      <select
                        value={reg.status}
                        onChange={() => {}}
                        style={{ background: '#090a0f', color: '#4caf50', border: '1px solid #333', borderRadius: '4px', padding: '0.3rem' }}
                      >
                        <option>New</option>
                        <option>Contacted</option>
                        <option>Converted</option>
                        <option>Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {registrations.length === 0 && (
                  <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No student registrations recorded yet. Submit the form on live site to test database flow.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Site Settings View */}
        {activeTab === 'settings' && (
          <div style={{ background: '#12141d', padding: '1.5rem', borderRadius: '12px', border: '1px solid #222', maxWidth: '600px' }}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: '#fff' }}>Global Site Settings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: '#aaa' }}>Institute Name</label>
                <input type="text" value={settings.institute_name || 'Prism Multimedia'} readOnly style={{ width: '100%', padding: '0.7rem', background: '#090a0f', border: '1px solid #333', borderRadius: '6px', color: '#fff', marginTop: '0.3rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', color: '#aaa' }}>Primary Phone</label>
                <input type="text" value={settings.phone_primary || '+91 97013 34133'} readOnly style={{ width: '100%', padding: '0.7rem', background: '#090a0f', border: '1px solid #333', borderRadius: '6px', color: '#fff', marginTop: '0.3rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', color: '#aaa' }}>Primary Email</label>
                <input type="text" value={settings.email || 'info@prismmultimedia.com'} readOnly style={{ width: '100%', padding: '0.7rem', background: '#090a0f', border: '1px solid #333', borderRadius: '6px', color: '#fff', marginTop: '0.3rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', color: '#aaa' }}>Address</label>
                <input type="text" value={settings.address || 'Ameerpet Circle, Hyderabad'} readOnly style={{ width: '100%', padding: '0.7rem', background: '#090a0f', border: '1px solid #333', borderRadius: '6px', color: '#fff', marginTop: '0.3rem' }} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
