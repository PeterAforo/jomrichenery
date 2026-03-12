"use client";

import { useEffect, useState } from "react";
import { Save, CheckCircle2, Plus, Trash2, Pencil, X, Loader2 } from "lucide-react";
import { Stat } from "@/lib/cms-data";

export default function StatsAdminPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Stat | null>(null);

  useEffect(() => {
    fetch("/api/stats").then(r => r.json()).then(data => { setStats(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    const res = await fetch("/api/stats", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(stats.map((s, i) => ({ ...s, order: i }))) });
    if (res.ok) { const data = await res.json(); setStats(data); setSaved(true); setTimeout(() => setSaved(false), 2000); }
  };

  if (loading) return <div className="flex items-center gap-2 text-gray-500 py-12"><Loader2 className="animate-spin" size={20} /> Loading...</div>;

  const addStat = () => {
    const item: Stat = { id: "new-" + Date.now(), value: "0", label: "New Stat", suffix: "+" };
    setStats([...stats, item]);
    setEditing(item.id);
    setEditForm(item);
  };

  const removeStat = (id: string) => {
    setStats(stats.filter((s) => s.id !== id));
    if (editing === id) { setEditing(null); setEditForm(null); }
  };

  const startEdit = (item: Stat) => {
    setEditing(item.id);
    setEditForm({ ...item });
  };

  const saveEdit = () => {
    if (!editForm) return;
    setStats(stats.map((s) => (s.id === editForm.id ? editForm : s)));
    setEditing(null);
    setEditForm(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-navy">Statistics</h2>
          <p className="text-sm text-gray-500">Manage counter statistics</p>
        </div>
        <div className="flex gap-2">
          <button onClick={addStat} className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all">
            <Plus size={16} /> Add Stat
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
            <h3 className="font-semibold text-navy">Edit Stat</h3>
            <button onClick={() => { setEditing(null); setEditForm(null); }} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Value</label>
              <input type="text" value={editForm.value} onChange={(e) => setEditForm({ ...editForm, value: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Label</label>
              <input type="text" value={editForm.label} onChange={(e) => setEditForm({ ...editForm, label: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Suffix</label>
              <input type="text" value={editForm.suffix || ""} onChange={(e) => setEditForm({ ...editForm, suffix: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm" placeholder="e.g. +, %, K" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={saveEdit} className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"><CheckCircle2 size={14} /> Apply</button>
            <button onClick={() => { setEditing(null); setEditForm(null); }} className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-all">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:border-orange/20 transition-all group text-center">
            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity mb-2">
              <button onClick={() => startEdit(stat)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-navy transition-all"><Pencil size={14} /></button>
              <button onClick={() => removeStat(stat.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all"><Trash2 size={14} /></button>
            </div>
            <div className="text-3xl font-bold text-orange">{stat.value}{stat.suffix}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
