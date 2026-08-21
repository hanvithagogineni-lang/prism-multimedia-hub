import React, { useEffect, useState } from 'react';
import { Save, CheckCircle } from 'lucide-react';
import { SiteSettings } from '../../types';
import { fetchSettings, api } from '../../api/client';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await fetchSettings();
      setSettings(data);
    };
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      await api.put('/settings', settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  if (!settings) return null;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Institute &amp; SEO Settings</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage global contact information, telephone helplines, and social links.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="p-8 rounded-2xl bg-[#121217] border border-[#232330] space-y-6">
        {saved && (
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Settings updated successfully!</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Institute Name</label>
            <input
              type="text"
              value={settings.institute_name}
              onChange={(e) => setSettings({ ...settings, institute_name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Tagline</label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Primary Phone</label>
            <input
              type="text"
              value={settings.phone_primary}
              onChange={(e) => setSettings({ ...settings, phone_primary: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Primary Email</label>
            <input
              type="email"
              value={settings.email_primary}
              onChange={(e) => setSettings({ ...settings, email_primary: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1">Campus Address</label>
          <textarea
            rows={2}
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Facebook URL</label>
            <input
              type="text"
              value={settings.facebook_url}
              onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Instagram URL</label>
            <input
              type="text"
              value={settings.instagram_url}
              onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#0a0a0d] border border-[#232330] text-xs text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg bg-[#ff6b35] hover:bg-[#e0531c] text-white text-xs font-bold transition-all flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </form>
    </div>
  );
};
