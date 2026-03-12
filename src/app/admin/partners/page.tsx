"use client";

import { useEffect, useState } from "react";
import { Save, CheckCircle2, Plus, Trash2, Pencil, X, Loader2 } from "lucide-react";
import { Partner } from "@/lib/cms-data";

export default function PartnersAdminPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partner | null>(null);

  useEffect(() => {
    fetch("/api/partners").then(r => r.json()).then(data => { setPartners(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    const res = await fetch("/api/partners", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(partners.map((p, i) => ({ ...p, order: i }))) });
    if (res.ok) { const data = await res.json(); setPartners(data); setSaved(true); setTimeout(() => setSaved(false), 2000); }
  };

  if (loading) return <div className="flex items-center gap-2 text-gray-500 py-12"><Loader2 className="animate-spin" size={20} /> Loading...</div>;

  const addPartner = () => {
    const item: Partner = { id: "new-" + Date.now(), name: "New Partner", logo: "" };
    setPartners([...partners, item]);
    setEditing(item.id);
    setEditForm(item);
  };

  const removePartner = (id: string) => {
    setPartners(partners.filter((p) => p.id !== id));
    if (editing === id) { setEditing(null); setEditForm(null); }
  };

  const startEdit = (item: Partner) => {
    setEditing(item.id);
    setEditForm({ ...item });
  };

  const saveEdit = () => {
    if (!editForm) return;
    setPartners(partners.map((p) => (p.id === editForm.id ? editForm : p)));
    setEditing(null);
    setEditForm(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-navy">Partners</h2>
          <p className="text-sm text-gray-500">Manage industry partners</p>
        </div>
        <div className="flex gap-2">
          <button onClick={addPartner} className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all">
            <Plus size={16} /> Add Partner
          </button>
          <button onClick={handleSave} className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all">
            {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
            {saved ? "Saved!" : "Save"}
          </button>
        </div>
      </div>

      {editing && editForm && (
        <div className="bg-white rounded-xl border-2 border-orange/20 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-navy">Edit Partner</h3>
            <button onClick={() => { setEditing(null); setEditForm(null); }} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Partner Name</label>
              <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Logo URL</label>
              <input type="text" value={editForm.logo} onChange={(e) => setEditForm({ ...editForm, logo: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm" placeholder="/images/partners/logo.svg" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={saveEdit} className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"><CheckCircle2 size={14} /> Apply</button>
            <button onClick={() => { setEditing(null); setEditForm(null); }} className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-all">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {partners.map((partner) => (
          <div key={partner.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:border-orange/20 transition-all group text-center">
            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity mb-2">
              <button onClick={() => startEdit(partner)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-navy transition-all"><Pencil size={14} /></button>
              <button onClick={() => removePartner(partner.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all"><Trash2 size={14} /></button>
            </div>
            <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto flex items-center justify-center text-navy font-bold text-xl mb-3">
              {partner.name.charAt(0)}
            </div>
            <div className="text-sm font-medium text-navy">{partner.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
