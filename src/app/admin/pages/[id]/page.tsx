"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  ArrowLeft,
  Type,
  Image as ImageIcon,
  LayoutGrid,
  BarChart3,
  MessageSquare,
  Megaphone,
  Users,
  Handshake,
  MapPin,
  Mail,
  Film,
  HelpCircle,
  Columns,
  SlidersHorizontal,
  GripVertical,
  Settings2,
  X,
} from "lucide-react";
import { Loader2 } from "lucide-react";
import { Page, PageBlock } from "@/lib/cms-data";

const BLOCK_TYPES = [
  { type: "hero", label: "Hero Banner", icon: SlidersHorizontal, description: "Full-width hero section with background image" },
  { type: "text", label: "Text Block", icon: Type, description: "Rich text content block" },
  { type: "image", label: "Image", icon: ImageIcon, description: "Single image with optional caption" },
  { type: "services", label: "Services Grid", icon: LayoutGrid, description: "Display services in a grid layout" },
  { type: "stats", label: "Statistics", icon: BarChart3, description: "Animated counter statistics" },
  { type: "testimonials", label: "Testimonials", icon: MessageSquare, description: "Customer testimonial carousel" },
  { type: "cta", label: "Call to Action", icon: Megaphone, description: "CTA section with buttons" },
  { type: "team", label: "Team Members", icon: Users, description: "Team member cards grid" },
  { type: "partners", label: "Partners", icon: Handshake, description: "Partner logos section" },
  { type: "stations", label: "Stations", icon: MapPin, description: "Station locations grid" },
  { type: "contact-form", label: "Contact Form", icon: Mail, description: "Contact form with fields" },
  { type: "video", label: "Video Embed", icon: Film, description: "YouTube or Vimeo video embed" },
  { type: "faq", label: "FAQ", icon: HelpCircle, description: "Frequently asked questions accordion" },
  { type: "two-column", label: "Two Column", icon: Columns, description: "Two-column layout with text and image" },
  { type: "gallery", label: "Image Gallery", icon: ImageIcon, description: "Multi-image gallery grid" },
] as const;

function getDefaultBlockData(type: string): Record<string, unknown> {
  switch (type) {
    case "hero":
      return { title: "Page Title", subtitle: "Subtitle", description: "Description text", image: "/images/3.jpeg", ctaText: "Learn More", ctaLink: "/" };
    case "text":
      return { heading: "Section Heading", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", alignment: "left" };
    case "image":
      return { src: "/images/1.jpeg", alt: "Image description", caption: "", fullWidth: false };
    case "services":
      return { title: "Our Services", subtitle: "What We Offer", showAll: true };
    case "stats":
      return { title: "Our Impact in Numbers" };
    case "testimonials":
      return { title: "What Our Clients Say" };
    case "cta":
      return { title: "Ready to Get Started?", description: "Contact us today to learn more about our services.", ctaText: "Contact Us", ctaLink: "/contact", bgColor: "orange" };
    case "team":
      return { title: "Our Team", subtitle: "Meet the people behind our success" };
    case "partners":
      return { title: "Our Partners", subtitle: "Trusted industry partners" };
    case "stations":
      return { title: "Our Stations", subtitle: "Find a station near you" };
    case "contact-form":
      return { title: "Get in Touch", subtitle: "We'd love to hear from you" };
    case "video":
      return { url: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Video Title" };
    case "faq":
      return { title: "Frequently Asked Questions", items: [{ question: "Sample question?", answer: "Sample answer." }] };
    case "two-column":
      return { heading: "Two Column Section", content: "Content for the left column.", image: "/images/2.jpeg", imagePosition: "right" };
    case "gallery":
      return { title: "Gallery", images: ["/images/1.jpeg", "/images/2.jpeg", "/images/3.jpeg"] };
    default:
      return {};
  }
}

export default function PageBuilderEditor() {
  const params = useParams();
  const router = useRouter();
  const [page, setPage] = useState<Page | null>(null);
  const [saved, setSaved] = useState(false);
  const [showBlockPicker, setShowBlockPicker] = useState(false);
  const [insertIndex, setInsertIndex] = useState<number>(-1);
  const [editingBlock, setEditingBlock] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/pages/${params.id}`)
      .then(r => r.json())
      .then(data => { if (data && !data.error) setPage(data); });
  }, [params.id]);

  const handleSave = useCallback(async () => {
    if (!page) return;
    const res = await fetch(`/api/pages/${page.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(page),
    });
    if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 2000); }
  }, [page]);

  const addBlock = (type: string) => {
    if (!page) return;
    const block: PageBlock = {
      id: "blk-" + Date.now(),
      type: type as PageBlock["type"],
      data: getDefaultBlockData(type),
      order: insertIndex >= 0 ? insertIndex : page.blocks.length,
    };

    let newBlocks: PageBlock[];
    if (insertIndex >= 0) {
      newBlocks = [...page.blocks];
      newBlocks.splice(insertIndex, 0, block);
      newBlocks = newBlocks.map((b, i) => ({ ...b, order: i }));
    } else {
      newBlocks = [...page.blocks, block].map((b, i) => ({ ...b, order: i }));
    }

    setPage({ ...page, blocks: newBlocks });
    setShowBlockPicker(false);
    setInsertIndex(-1);
    setEditingBlock(block.id);
  };

  const removeBlock = (blockId: string) => {
    if (!page) return;
    const newBlocks = page.blocks
      .filter((b) => b.id !== blockId)
      .map((b, i) => ({ ...b, order: i }));
    setPage({ ...page, blocks: newBlocks });
    if (editingBlock === blockId) setEditingBlock(null);
  };

  const moveBlock = (blockId: string, direction: "up" | "down") => {
    if (!page) return;
    const idx = page.blocks.findIndex((b) => b.id === blockId);
    if (idx < 0) return;
    const newIdx = direction === "up" ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= page.blocks.length) return;

    const newBlocks = [...page.blocks];
    [newBlocks[idx], newBlocks[newIdx]] = [newBlocks[newIdx], newBlocks[idx]];
    setPage({ ...page, blocks: newBlocks.map((b, i) => ({ ...b, order: i })) });
  };

  const updateBlockData = (blockId: string, field: string, value: unknown) => {
    if (!page) return;
    setPage({
      ...page,
      blocks: page.blocks.map((b) =>
        b.id === blockId ? { ...b, data: { ...b.data, [field]: value } } : b
      ),
    });
  };

  if (!page) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Page not found</p>
        <Link href="/admin/pages" className="text-orange hover:underline text-sm mt-2 inline-block">
          ← Back to Pages
        </Link>
      </div>
    );
  }

  const blockTypeInfo = (type: string) =>
    BLOCK_TYPES.find((bt) => bt.type === type);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/pages"
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-navy transition-all"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <input
              type="text"
              value={page.title}
              onChange={(e) => setPage({ ...page, title: e.target.value })}
              className="text-xl font-bold text-navy border-none outline-none bg-transparent"
            />
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>Slug:</span>
              <input
                type="text"
                value={page.slug}
                onChange={(e) => setPage({ ...page, slug: e.target.value })}
                className="border-none outline-none bg-transparent text-gray-500"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href={page.slug}
            target="_blank"
            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
          >
            <Eye size={16} />
            Preview
          </Link>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
          >
            {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
            {saved ? "Saved!" : "Save Page"}
          </button>
        </div>
      </div>

      {/* Page Description */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <label className="block text-xs font-medium text-gray-500 mb-1">
          Page Description (SEO)
        </label>
        <input
          type="text"
          value={page.description}
          onChange={(e) => setPage({ ...page, description: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm"
          placeholder="Brief description for search engines..."
        />
      </div>

      {/* Block Builder Area */}
      <div className="space-y-3">
        {/* Add block at top */}
        <button
          onClick={() => {
            setInsertIndex(0);
            setShowBlockPicker(true);
          }}
          className="w-full py-2 border-2 border-dashed border-gray-200 hover:border-orange/30 rounded-xl text-gray-400 hover:text-orange text-sm transition-all flex items-center justify-center gap-2"
        >
          <Plus size={14} />
          Add Block Here
        </button>

        {page.blocks.map((block, index) => {
          const typeInfo = blockTypeInfo(block.type);
          const Icon = typeInfo?.icon || Type;
          const isEditing = editingBlock === block.id;

          return (
            <div key={block.id}>
              {/* Block Card */}
              <div
                className={`bg-white rounded-xl border transition-all ${
                  isEditing
                    ? "border-orange/30 shadow-md shadow-orange/5"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                {/* Block Header */}
                <div className="flex items-center gap-3 p-4">
                  <div className="text-gray-300 cursor-grab">
                    <GripVertical size={16} />
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center text-orange">
                    <Icon size={16} />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-navy">
                      {typeInfo?.label || block.type}
                    </span>
                    <span className="text-xs text-gray-400 ml-2">
                      {typeInfo?.description}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveBlock(block.id, "up")}
                      disabled={index === 0}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-navy transition-all disabled:opacity-30"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      onClick={() => moveBlock(block.id, "down")}
                      disabled={index === page.blocks.length - 1}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-navy transition-all disabled:opacity-30"
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button
                      onClick={() =>
                        setEditingBlock(isEditing ? null : block.id)
                      }
                      className={`p-1.5 rounded-lg transition-all ${
                        isEditing
                          ? "bg-orange/10 text-orange"
                          : "hover:bg-gray-100 text-gray-400 hover:text-navy"
                      }`}
                    >
                      <Settings2 size={14} />
                    </button>
                    <button
                      onClick={() => removeBlock(block.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Block Editor */}
                {isEditing && (
                  <div className="border-t border-gray-100 p-4 space-y-4 bg-gray-50/50">
                    <BlockEditor
                      block={block}
                      onUpdate={(field, value) =>
                        updateBlockData(block.id, field, value)
                      }
                    />
                  </div>
                )}
              </div>

              {/* Add block between */}
              <button
                onClick={() => {
                  setInsertIndex(index + 1);
                  setShowBlockPicker(true);
                }}
                className="w-full py-2 border-2 border-dashed border-transparent hover:border-orange/20 rounded-xl text-transparent hover:text-orange text-sm transition-all flex items-center justify-center gap-2 mt-2"
              >
                <Plus size={14} />
                Add Block Here
              </button>
            </div>
          );
        })}

        {/* Empty state */}
        {page.blocks.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-200">
            <LayoutGrid size={40} className="text-gray-300 mx-auto mb-3" />
            <h3 className="font-semibold text-navy mb-1">
              Start Building Your Page
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Add blocks to create your page layout
            </p>
            <button
              onClick={() => {
                setInsertIndex(-1);
                setShowBlockPicker(true);
              }}
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
            >
              <Plus size={16} />
              Add First Block
            </button>
          </div>
        )}
      </div>

      {/* Block Picker Modal */}
      {showBlockPicker && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-navy text-lg">Add a Block</h3>
                <p className="text-sm text-gray-400">
                  Choose a block type to add to your page
                </p>
              </div>
              <button
                onClick={() => {
                  setShowBlockPicker(false);
                  setInsertIndex(-1);
                }}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-400"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {BLOCK_TYPES.map((bt) => (
                  <button
                    key={bt.type}
                    onClick={() => addBlock(bt.type)}
                    className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-orange/30 hover:bg-orange/5 transition-all text-left group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-orange/10 group-hover:bg-orange group-hover:text-white flex items-center justify-center text-orange transition-all flex-shrink-0">
                      <bt.icon size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-navy">
                        {bt.label}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {bt.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Block Editor Component - renders form fields for each block type
function BlockEditor({
  block,
  onUpdate,
}: {
  block: PageBlock;
  onUpdate: (field: string, value: unknown) => void;
}) {
  const data = block.data;

  const textField = (label: string, field: string, multiline = false) => (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">
        {label}
      </label>
      {multiline ? (
        <textarea
          rows={3}
          value={(data[field] as string) || ""}
          onChange={(e) => onUpdate(field, e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm resize-none"
        />
      ) : (
        <input
          type="text"
          value={(data[field] as string) || ""}
          onChange={(e) => onUpdate(field, e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm"
        />
      )}
    </div>
  );

  const selectField = (
    label: string,
    field: string,
    options: { value: string; label: string }[]
  ) => (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">
        {label}
      </label>
      <select
        value={(data[field] as string) || options[0]?.value}
        onChange={(e) => onUpdate(field, e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm bg-white"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );

  switch (block.type) {
    case "hero":
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {textField("Title", "title")}
            {textField("Subtitle", "subtitle")}
          </div>
          {textField("Description", "description", true)}
          {textField("Background Image URL", "image")}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {textField("CTA Button Text", "ctaText")}
            {textField("CTA Button Link", "ctaLink")}
          </div>
        </div>
      );

    case "text":
      return (
        <div className="space-y-3">
          {textField("Heading", "heading")}
          {textField("Content", "content", true)}
          {selectField("Alignment", "alignment", [
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
          ])}
        </div>
      );

    case "image":
      return (
        <div className="space-y-3">
          {textField("Image URL", "src")}
          {textField("Alt Text", "alt")}
          {textField("Caption", "caption")}
        </div>
      );

    case "cta":
      return (
        <div className="space-y-3">
          {textField("Title", "title")}
          {textField("Description", "description", true)}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {textField("Button Text", "ctaText")}
            {textField("Button Link", "ctaLink")}
          </div>
          {selectField("Background", "bgColor", [
            { value: "orange", label: "Orange" },
            { value: "navy", label: "Navy" },
          ])}
        </div>
      );

    case "two-column":
      return (
        <div className="space-y-3">
          {textField("Heading", "heading")}
          {textField("Content", "content", true)}
          {textField("Image URL", "image")}
          {selectField("Image Position", "imagePosition", [
            { value: "left", label: "Left" },
            { value: "right", label: "Right" },
          ])}
        </div>
      );

    case "video":
      return (
        <div className="space-y-3">
          {textField("Video Title", "title")}
          {textField("Embed URL", "url")}
        </div>
      );

    case "services":
    case "stats":
    case "testimonials":
    case "team":
    case "partners":
    case "stations":
    case "contact-form":
      return (
        <div className="space-y-3">
          {textField("Section Title", "title")}
          {textField("Section Subtitle", "subtitle")}
          <p className="text-xs text-gray-400">
            This block pulls data from the CMS. Edit the actual content in the
            corresponding admin section.
          </p>
        </div>
      );

    case "faq":
      return (
        <div className="space-y-3">
          {textField("Section Title", "title")}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              FAQ Items (JSON format)
            </label>
            <textarea
              rows={6}
              value={JSON.stringify(data.items || [], null, 2)}
              onChange={(e) => {
                try {
                  onUpdate("items", JSON.parse(e.target.value));
                } catch {
                  // Invalid JSON, ignore
                }
              }}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-xs font-mono resize-none"
            />
          </div>
        </div>
      );

    case "gallery":
      return (
        <div className="space-y-3">
          {textField("Gallery Title", "title")}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Image URLs (one per line)
            </label>
            <textarea
              rows={4}
              value={((data.images as string[]) || []).join("\n")}
              onChange={(e) =>
                onUpdate(
                  "images",
                  e.target.value
                    .split("\n")
                    .filter((u: string) => u.trim())
                )
              }
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm resize-none"
            />
          </div>
        </div>
      );

    default:
      return (
        <p className="text-sm text-gray-400">
          No editor available for this block type.
        </p>
      );
  }
}
