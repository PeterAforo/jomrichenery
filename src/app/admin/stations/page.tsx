"use client";

import { useEffect, useState } from "react";
import {
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  Pencil,
  X,
  MapPin,
  Loader2,
} from "lucide-react";
import { Station } from "@/lib/cms-data";

export default function StationsAdminPage() {
  const [stations, setStations] = useState<Station[]>([]);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Station | null>(null);

  useEffect(() => {
    fetch("/api/stations").then(r => r.json()).then(data => { setStations(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    const res = await fetch("/api/stations", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(stations.map((s, i) => ({ ...s, order: i }))) });
    if (res.ok) { const data = await res.json(); setStations(data); setSaved(true); setTimeout(() => setSaved(false), 2000); }
  };

  if (loading) return <div className="flex items-center gap-2 text-gray-500 py-12"><Loader2 className="animate-spin" size={20} /> Loading...</div>;

  const addStation = () => {
    const newStation: Station = {
      id: "new-" + Date.now(),
      name: "New Station",
      address: "Address",
      city: "City",
      region: "Greater Accra",
      services: ["Petrol", "Diesel"],
      hours: "24/7",
      phone: "+233 00 000 0000",
    };
    setStations([...stations, newStation]);
    setEditing(newStation.id);
    setEditForm(newStation);
  };

  const removeStation = (id: string) => {
    setStations(stations.filter((s) => s.id !== id));
    if (editing === id) {
      setEditing(null);
      setEditForm(null);
    }
  };

  const startEdit = (station: Station) => {
    setEditing(station.id);
    setEditForm({ ...station });
  };

  const saveEdit = () => {
    if (!editForm) return;
    setStations(stations.map((s) => (s.id === editForm.id ? editForm : s)));
    setEditing(null);
    setEditForm(null);
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditForm(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-navy">Stations</h2>
          <p className="text-sm text-gray-500">Manage fuel station locations</p>
        </div>
        <div className="flex gap-2">
          <button onClick={addStation} className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all">
            <Plus size={16} /> Add Station
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
            <h3 className="font-semibold text-navy">Edit Station</h3>
            <button onClick={cancelEdit} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Station Name</label>
              <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">City</label>
              <input type="text" value={editForm.city} onChange={(e) => setEditForm({ ...editForm, city: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Address</label>
              <input type="text" value={editForm.address} onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Region</label>
              <input type="text" value={editForm.region} onChange={(e) => setEditForm({ ...editForm, region: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Phone</label>
              <input type="text" value={editForm.phone || ""} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Hours</label>
              <input type="text" value={editForm.hours} onChange={(e) => setEditForm({ ...editForm, hours: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Services (comma-separated)</label>
            <input type="text" value={editForm.services.join(", ")} onChange={(e) => setEditForm({ ...editForm, services: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm" />
          </div>
          <div className="flex gap-2">
            <button onClick={saveEdit} className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
              <CheckCircle2 size={14} /> Apply
            </button>
            <button onClick={cancelEdit} className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-all">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stations.map((station) => (
          <div key={station.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:border-orange/20 transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-500"><MapPin size={18} /></div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => startEdit(station)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-navy transition-all"><Pencil size={14} /></button>
                <button onClick={() => removeStation(station.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all"><Trash2 size={14} /></button>
              </div>
            </div>
            <h3 className="font-semibold text-navy text-sm mb-1">{station.name}</h3>
            <p className="text-gray-400 text-xs mb-2">{station.address}, {station.city}</p>
            <div className="flex flex-wrap gap-1">
              {station.services.slice(0, 3).map((s, i) => (
                <span key={i} className="px-2 py-0.5 bg-gray-50 text-gray-500 text-[10px] rounded-full">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
