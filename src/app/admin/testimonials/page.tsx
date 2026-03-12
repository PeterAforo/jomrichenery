"use client";

import { useEffect, useState } from "react";
import { Save, CheckCircle2, Plus, Trash2, Pencil, X, Star, Loader2 } from "lucide-react";
import { Testimonial } from "@/lib/cms-data";

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Testimonial | null>(null);

  useEffect(() => {
    fetch("/api/testimonials").then(r => r.json()).then(data => { setTestimonials(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    const res = await fetch("/api/testimonials", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(testimonials.map((t, i) => ({ ...t, order: i }))) });
    if (res.ok) { const data = await res.json(); setTestimonials(data); setSaved(true); setTimeout(() => setSaved(false), 2000); }
  };

  if (loading) return <div className="flex items-center gap-2 text-gray-500 py-12"><Loader2 className="animate-spin" size={20} /> Loading...</div>;

  const addTestimonial = () => {
    const item: Testimonial = {
      id: "new-" + Date.now(),
      name: "New Client",
      role: "Role",
      company: "Company",
      quote: "Testimonial quote here...",
      rating: 5,
    };
    setTestimonials([...testimonials, item]);
    setEditing(item.id);
    setEditForm(item);
  };

  const removeItem = (id: string) => {
    setTestimonials(testimonials.filter((t) => t.id !== id));
    if (editing === id) { setEditing(null); setEditForm(null); }
  };

  const startEdit = (item: Testimonial) => {
    setEditing(item.id);
    setEditForm({ ...item });
  };

  const saveEdit = () => {
    if (!editForm) return;
    setTestimonials(testimonials.map((t) => (t.id === editForm.id ? editForm : t)));
    setEditing(null);
    setEditForm(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-navy">Testimonials</h2>
          <p className="text-sm text-gray-500">Manage client testimonials</p>
        </div>
        <div className="flex gap-2">
          <button onClick={addTestimonial} className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all">
            <Plus size={16} /> Add
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
            <h3 className="font-semibold text-navy">Edit Testimonial</h3>
            <button onClick={() => { setEditing(null); setEditForm(null); }} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Name</label>
              <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Role</label>
              <input type="text" value={editForm.role} onChange={(e) => setEditForm({ ...editForm, role: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Company</label>
              <input type="text" value={editForm.company} onChange={(e) => setEditForm({ ...editForm, company: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Quote</label>
            <textarea rows={3} value={editForm.quote} onChange={(e) => setEditForm({ ...editForm, quote: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Rating (1-5)</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((r) => (
                <button key={r} onClick={() => setEditForm({ ...editForm, rating: r })} className="p-1">
                  <Star size={20} className={r <= editForm.rating ? "text-orange fill-orange" : "text-gray-300"} />
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={saveEdit} className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
              <CheckCircle2 size={14} /> Apply
            </button>
            <button onClick={() => { setEditing(null); setEditForm(null); }} className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-all">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:border-orange/20 transition-all group">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange to-amber flex items-center justify-center text-white font-bold">{t.name.charAt(0)}</div>
                <div>
                  <div className="font-semibold text-navy text-sm">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.role}, {t.company}</div>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => startEdit(t)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-navy transition-all"><Pencil size={14} /></button>
                <button onClick={() => removeItem(t.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all"><Trash2 size={14} /></button>
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-3 line-clamp-2">&ldquo;{t.quote}&rdquo;</p>
            <div className="flex gap-0.5 mt-2">
              {[...Array(t.rating)].map((_, i) => <Star key={i} size={12} className="text-orange fill-orange" />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
