"use client";

import { useEffect, useState } from "react";
import { Save, CheckCircle2, Plus, Trash2, Pencil, X, ChevronDown, ChevronRight, Loader2 } from "lucide-react";
import { NavItem } from "@/lib/cms-data";

export default function NavigationAdminPage() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<NavItem | null>(null);

  useEffect(() => {
    fetch("/api/navigation").then(r => r.json()).then(data => { setNavItems(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    const res = await fetch("/api/navigation", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(navItems.map((n, i) => ({ ...n, order: i }))) });
    if (res.ok) { const data = await res.json(); setNavItems(data); setSaved(true); setTimeout(() => setSaved(false), 2000); }
  };

  if (loading) return <div className="flex items-center gap-2 text-gray-500 py-12"><Loader2 className="animate-spin" size={20} /> Loading...</div>;

  const addNavItem = () => {
    const item: NavItem = { id: "new-" + Date.now(), label: "New Link", href: "/" };
    setNavItems([...navItems, item]);
    setEditing(item.id);
    setEditForm(item);
  };

  const removeNavItem = (id: string) => {
    setNavItems(navItems.filter((n) => n.id !== id));
    if (editing === id) { setEditing(null); setEditForm(null); }
  };

  const startEdit = (item: NavItem) => {
    setEditing(item.id);
    setEditForm({ ...item });
  };

  const saveEdit = () => {
    if (!editForm) return;
    setNavItems(navItems.map((n) => (n.id === editForm.id ? editForm : n)));
    setEditing(null);
    setEditForm(null);
  };

  const addSubItem = (parentId: string) => {
    const subItem: NavItem = { id: "sub-" + Date.now(), label: "Sub Link", href: "/" };
    setNavItems(
      navItems.map((n) =>
        n.id === parentId
          ? { ...n, children: [...(n.children || []), subItem] }
          : n
      )
    );
  };

  const removeSubItem = (parentId: string, childId: string) => {
    setNavItems(
      navItems.map((n) =>
        n.id === parentId
          ? { ...n, children: (n.children || []).filter((c) => c.id !== childId) }
          : n
      )
    );
  };

  const updateSubItem = (parentId: string, childId: string, field: keyof NavItem, value: string) => {
    setNavItems(
      navItems.map((n) =>
        n.id === parentId
          ? {
              ...n,
              children: (n.children || []).map((c) =>
                c.id === childId ? { ...c, [field]: value } : c
              ),
            }
          : n
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-navy">Navigation</h2>
          <p className="text-sm text-gray-500">Manage main navigation menu items</p>
        </div>
        <div className="flex gap-2">
          <button onClick={addNavItem} className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all">
            <Plus size={16} /> Add Item
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
            <h3 className="font-semibold text-navy">Edit Nav Item</h3>
            <button onClick={() => { setEditing(null); setEditForm(null); }} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Label</label>
              <input type="text" value={editForm.label} onChange={(e) => setEditForm({ ...editForm, label: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">URL / Path</label>
              <input type="text" value={editForm.href} onChange={(e) => setEditForm({ ...editForm, href: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={saveEdit} className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"><CheckCircle2 size={14} /> Apply</button>
            <button onClick={() => { setEditing(null); setEditForm(null); }} className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-all">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {navItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="flex items-center gap-3 p-4 group">
              <div className="text-gray-300">
                {item.children && item.children.length > 0 ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
              <div className="flex-1">
                <span className="font-medium text-navy text-sm">{item.label}</span>
                <span className="text-gray-400 text-xs ml-2">{item.href}</span>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => addSubItem(item.id)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-navy transition-all text-xs" title="Add sub-item">
                  <Plus size={14} />
                </button>
                <button onClick={() => startEdit(item)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-navy transition-all"><Pencil size={14} /></button>
                <button onClick={() => removeNavItem(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all"><Trash2 size={14} /></button>
              </div>
            </div>

            {item.children && item.children.length > 0 && (
              <div className="border-t border-gray-50 bg-gray-50/50 px-4 py-2 space-y-1">
                {item.children.map((child) => (
                  <div key={child.id} className="flex items-center gap-3 pl-6 py-1.5 group/child">
                    <span className="text-gray-400 text-xs">└</span>
                    <input
                      type="text"
                      value={child.label}
                      onChange={(e) => updateSubItem(item.id, child.id, "label", e.target.value)}
                      className="text-sm text-navy bg-transparent border-none outline-none flex-1 min-w-0"
                    />
                    <input
                      type="text"
                      value={child.href}
                      onChange={(e) => updateSubItem(item.id, child.id, "href", e.target.value)}
                      className="text-xs text-gray-400 bg-transparent border-none outline-none w-40"
                    />
                    <button
                      onClick={() => removeSubItem(item.id, child.id)}
                      className="p-1 rounded hover:bg-red-50 text-gray-300 hover:text-red-500 transition-all opacity-0 group-hover/child:opacity-100"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
