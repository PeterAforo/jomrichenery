"use client";

import { useEffect, useState } from "react";
import {
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  Pencil,
  X,
  Loader2,
} from "lucide-react";
import { Service } from "@/lib/cms-data";

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Service | null>(null);

  useEffect(() => {
    fetch("/api/services").then(r => r.json()).then(data => { setServices(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    const res = await fetch("/api/services", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(services.map((s, i) => ({ ...s, order: i }))) });
    if (res.ok) { const data = await res.json(); setServices(data); setSaved(true); setTimeout(() => setSaved(false), 2000); }
  };

  if (loading) return <div className="flex items-center gap-2 text-gray-500 py-12"><Loader2 className="animate-spin" size={20} /> Loading...</div>;

  const addService = () => {
    const newService: Service = {
      id: "new-" + Date.now(),
      title: "New Service",
      description: "Service description",
      icon: "Fuel",
      features: ["Feature 1"],
    };
    setServices([...services, newService]);
    setEditing(newService.id);
    setEditForm(newService);
  };

  const removeService = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
    if (editing === id) {
      setEditing(null);
      setEditForm(null);
    }
  };

  const startEdit = (service: Service) => {
    setEditing(service.id);
    setEditForm({ ...service });
  };

  const saveEdit = () => {
    if (!editForm) return;
    setServices(services.map((s) => (s.id === editForm.id ? editForm : s)));
    setEditing(null);
    setEditForm(null);
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditForm(null);
  };

  const iconOptions = ["Fuel", "Droplets", "Flame", "Truck", "Store", "BarChart3"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-navy">Services</h2>
          <p className="text-sm text-gray-500">Manage services displayed on the website</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={addService}
            className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
          >
            <Plus size={16} />
            Add Service
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
          >
            {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
            {saved ? "Saved!" : "Save"}
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && editForm && (
        <div className="bg-white rounded-xl border-2 border-orange/20 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-navy">Edit Service</h3>
            <button onClick={cancelEdit} className="text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Title</label>
              <input
                type="text"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Icon</label>
              <select
                value={editForm.icon}
                onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm bg-white"
              >
                {iconOptions.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Description</label>
            <textarea
              rows={3}
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">
              Features (one per line)
            </label>
            <textarea
              rows={4}
              value={(editForm.features || []).join("\n")}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  features: e.target.value.split("\n").filter((f) => f.trim()),
                })
              }
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm resize-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={saveEdit}
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
            >
              <CheckCircle2 size={14} />
              Apply
            </button>
            <button
              onClick={cancelEdit}
              className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl border border-gray-100 p-5 hover:border-orange/20 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center text-orange text-sm font-bold">
                {service.icon.charAt(0)}
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => startEdit(service)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-navy transition-all"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => removeService(service.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <h3 className="font-semibold text-navy mb-1">{service.title}</h3>
            <p className="text-gray-500 text-xs line-clamp-2">{service.description}</p>
            {service.features && (
              <div className="mt-3 flex flex-wrap gap-1">
                {service.features.slice(0, 3).map((f, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-gray-50 text-gray-500 text-[10px] rounded-full"
                  >
                    {f}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
