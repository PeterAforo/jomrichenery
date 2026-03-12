"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Pencil,
  Eye,
  FileText,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Loader2 } from "lucide-react";
import { Page } from "@/lib/cms-data";

export default function PagesAdminPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");

  const loadPages = async () => {
    const data = await fetch("/api/pages").then(r => r.json());
    setPages(data);
    setLoading(false);
  };

  useEffect(() => { loadPages(); }, []);

  const handleCreate = async () => {
    if (!newTitle || !newSlug) return;
    const slug = newSlug.startsWith("/") ? newSlug : "/" + newSlug;
    await fetch("/api/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, slug, description: "", blocks: [], isPublished: false }),
    });
    await loadPages();
    setShowNew(false);
    setNewTitle("");
    setNewSlug("");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this page? This cannot be undone.")) return;
    await fetch(`/api/pages/${id}`, { method: "DELETE" });
    await loadPages();
  };

  const togglePublish = async (page: Page) => {
    await fetch(`/api/pages/${page.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...page, isPublished: !page.isPublished }),
    });
    await loadPages();
  };

  if (loading) return <div className="flex items-center gap-2 text-gray-500 py-12"><Loader2 className="animate-spin" size={20} /> Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-navy">Page Builder</h2>
          <p className="text-sm text-gray-500">
            Create and manage pages with drag-and-drop blocks
          </p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
        >
          <Plus size={16} />
          New Page
        </button>
      </div>

      {/* New Page Form */}
      {showNew && (
        <div className="bg-white rounded-xl border-2 border-orange/20 p-6 space-y-4">
          <h3 className="font-semibold text-navy">Create New Page</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">
                Page Title
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => {
                  setNewTitle(e.target.value);
                  setNewSlug(
                    "/" +
                      e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/-$/, "")
                  );
                }}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm"
                placeholder="e.g. About Us"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">
                URL Slug
              </label>
              <input
                type="text"
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm"
                placeholder="/about-us"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
            >
              <Plus size={14} />
              Create Page
            </button>
            <button
              onClick={() => {
                setShowNew(false);
                setNewTitle("");
                setNewSlug("");
              }}
              className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Pages List */}
      <div className="space-y-3">
        {pages.map((page) => (
          <div
            key={page.id}
            className="bg-white rounded-xl border border-gray-100 p-5 hover:border-orange/20 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <FileText size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-navy">{page.title}</h3>
                    {page.isPublished ? (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] rounded-full font-medium">
                        Published
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[10px] rounded-full font-medium">
                        Draft
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                    <span>{page.slug}</span>
                    <span>·</span>
                    <span>{page.blocks.length} blocks</span>
                    <span>·</span>
                    <span>
                      Updated{" "}
                      {new Date(page.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => togglePublish(page)}
                  className={`p-2 rounded-lg transition-all text-sm ${
                    page.isPublished
                      ? "hover:bg-yellow-50 text-green-500 hover:text-yellow-600"
                      : "hover:bg-green-50 text-gray-400 hover:text-green-500"
                  }`}
                  title={page.isPublished ? "Unpublish" : "Publish"}
                >
                  {page.isPublished ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <XCircle size={16} />
                  )}
                </button>
                <Link
                  href={`/admin/pages/${page.id}`}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-navy transition-all"
                  title="Edit with Page Builder"
                >
                  <Pencil size={16} />
                </Link>
                <Link
                  href={page.slug}
                  target="_blank"
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-navy transition-all"
                  title="View Page"
                >
                  <Eye size={16} />
                </Link>
                <button
                  onClick={() => handleDelete(page.id)}
                  className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {pages.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <FileText size={40} className="text-gray-300 mx-auto mb-3" />
            <h3 className="font-semibold text-navy mb-1">No pages yet</h3>
            <p className="text-sm text-gray-400">
              Create your first page to get started with the page builder.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
