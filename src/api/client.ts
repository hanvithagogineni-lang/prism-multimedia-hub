const API_BASE = '/api';

export async function apiRequest<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('prism_admin_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>)
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'API Request failed');
  }
  return data;
}
