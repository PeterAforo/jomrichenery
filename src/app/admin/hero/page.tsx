"use client";

import { useEffect, useState } from "react";
import {
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  GripVertical,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { HeroSlide } from "@/lib/cms-data";

export default function HeroSlidesPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/hero-slides")
      .then((r) => r.json())
      .then((data) => {
        setSlides(data);
        if (data.length > 0) setActiveSlide(data[0].id);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    const res = await fetch("/api/hero-slides", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slides.map((s, i) => ({ ...s, order: i }))),
    });
    if (res.ok) {
      const data = await res.json();
      setSlides(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const addSlide = () => {
    const newSlide: HeroSlide = {
      id: "new-" + Date.now(),
      title: "New Slide",
      subtitle: "Subtitle",
      description: "Description text here",
      image: "/images/3.jpeg",
      ctaText: "Learn More",
      ctaLink: "/",
    };
    setSlides([...slides, newSlide]);
    setActiveSlide(newSlide.id);
  };

  if (loading) return <div className="flex items-center gap-2 text-gray-500 py-12"><Loader2 className="animate-spin" size={20} /> Loading...</div>;

  const removeSlide = (id: string) => {
    if (slides.length <= 1) return;
    const newSlides = slides.filter((s) => s.id !== id);
    setSlides(newSlides);
    if (activeSlide === id) setActiveSlide(newSlides[0]?.id || null);
  };

  const updateSlide = (id: string, field: keyof HeroSlide, value: string) => {
    setSlides(slides.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const currentSlide = slides.find((s) => s.id === activeSlide);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-navy">Hero Slides</h2>
          <p className="text-sm text-gray-500">Manage homepage hero banner slides</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={addSlide}
            className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
          >
            <Plus size={16} />
            Add Slide
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Slide List */}
        <div className="space-y-2">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              onClick={() => setActiveSlide(slide.id)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                activeSlide === slide.id
                  ? "bg-orange/10 border border-orange/20"
                  : "bg-white border border-gray-100 hover:border-gray-200"
              }`}
            >
              <GripVertical size={14} className="text-gray-300" />
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                <ImageIcon size={16} className="text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-navy truncate">
                  {slide.title}
                </div>
                <div className="text-xs text-gray-400">Slide {index + 1}</div>
              </div>
              {slides.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSlide(slide.id);
                  }}
                  className="text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Slide Editor */}
        {currentSlide && (
          <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 p-6 space-y-5">
            <h3 className="font-semibold text-navy border-b border-gray-100 pb-3">
              Edit Slide
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Title</label>
                <input
                  type="text"
                  value={currentSlide.title}
                  onChange={(e) => updateSlide(currentSlide.id, "title", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Subtitle</label>
                <input
                  type="text"
                  value={currentSlide.subtitle}
                  onChange={(e) => updateSlide(currentSlide.id, "subtitle", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Description</label>
              <textarea
                rows={3}
                value={currentSlide.description}
                onChange={(e) => updateSlide(currentSlide.id, "description", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Background Image URL</label>
              <input
                type="text"
                value={currentSlide.image}
                onChange={(e) => updateSlide(currentSlide.id, "image", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">CTA Button Text</label>
                <input
                  type="text"
                  value={currentSlide.ctaText}
                  onChange={(e) => updateSlide(currentSlide.id, "ctaText", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">CTA Button Link</label>
                <input
                  type="text"
                  value={currentSlide.ctaLink}
                  onChange={(e) => updateSlide(currentSlide.id, "ctaLink", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Secondary CTA Text</label>
                <input
                  type="text"
                  value={currentSlide.secondaryCtaText || ""}
                  onChange={(e) => updateSlide(currentSlide.id, "secondaryCtaText", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Secondary CTA Link</label>
                <input
                  type="text"
                  value={currentSlide.secondaryCtaLink || ""}
                  onChange={(e) => updateSlide(currentSlide.id, "secondaryCtaLink", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
