"use client";

import { useEffect, useState } from "react";
import { Save, CheckCircle2, Loader2 } from "lucide-react";
import { SiteSettings } from "@/lib/cms-data";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => { setSettings(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  if (loading) return <div className="flex items-center gap-2 text-gray-500 py-12"><Loader2 className="animate-spin" size={20} /> Loading...</div>;

  if (!settings) return null;

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-navy">Site Settings</h2>
          <p className="text-sm text-gray-500">Manage your website&apos;s global settings</p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
        >
          {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* General */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
        <h3 className="font-semibold text-navy border-b border-gray-100 pb-3">General</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Site Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Tagline</label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Description</label>
          <textarea
            rows={3}
            value={settings.description}
            onChange={(e) => setSettings({ ...settings, description: e.target.value })}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm resize-none"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Logo URL</label>
            <input
              type="text"
              value={settings.logo}
              onChange={(e) => setSettings({ ...settings, logo: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Favicon URL</label>
            <input
              type="text"
              value={settings.favicon}
              onChange={(e) => setSettings({ ...settings, favicon: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
        <h3 className="font-semibold text-navy border-b border-gray-100 pb-3">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Phone</label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Address</label>
          <input
            type="text"
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm"
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
        <h3 className="font-semibold text-navy border-b border-gray-100 pb-3">Social Media Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {(Object.keys(settings.socialLinks) as Array<keyof typeof settings.socialLinks>).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-navy mb-1.5 capitalize">{key}</label>
              <input
                type="url"
                value={settings.socialLinks[key] || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, [key]: e.target.value },
                  })
                }
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm"
                placeholder={`https://${key}.com/...`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
