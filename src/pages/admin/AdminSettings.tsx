import React, { useEffect, useState } from 'react';
import { apiRequest } from '../../api/client';
import { AdminSidebar } from '../../components/AdminSidebar';
import { Save } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    apiRequest('/settings').then((data) => setSettings(data.settings || {})).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiRequest('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify(settings)
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050508]">
      <AdminSidebar />
      <main className="flex-1 p-8 space-y-6 overflow-y-auto max-w-4xl">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Site Settings</h1>
          <p className="text-gray-400 text-xs mt-1">Configure global institute contact information, SEO, and social links</p>
        </div>

        {saved && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-3 rounded-xl text-xs font-bold">
            Settings updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-[#121217] border border-white/10 rounded-2xl p-6 space-y-4">
          {Object.entries(settings).map(([key, value]) => (
            <div key={key}>
              <label className="text-xs text-gray-300 font-semibold capitalize block mb-1">
                {key.replace(/_/g, ' ')}
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-prismOrange font-mono"
              />
            </div>
          ))}

          <button
            type="submit"
            className="flex items-center space-x-2 bg-prismOrange hover:bg-prismOrangeHover text-white text-xs font-bold px-6 py-3 rounded-xl shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>SAVE SITE SETTINGS</span>
          </button>
        </form>
      </main>
    </div>
  );
};
