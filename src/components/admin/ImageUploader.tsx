"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export interface VehicleImage {
  url: string;
  thumbnailUrl?: string;
  alt: string;
  width?: number;
  height?: number;
}

interface ImageUploaderProps {
  images: VehicleImage[];
  onChange: (images: VehicleImage[]) => void;
  vehicleSlug: string;
  vehicleName: string;
}

export function ImageUploader({
  images,
  onChange,
  vehicleSlug,
  vehicleName,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const validFiles = Array.from(files).filter((f) =>
        ["image/jpeg", "image/png", "image/webp", "image/avif"].includes(f.type)
      );

      if (!validFiles.length) return;

      setUploading(true);

      try {
        const formData = new FormData();
        validFiles.forEach((file) => formData.append("files", file));
        formData.append("vehicleSlug", vehicleSlug);
        formData.append("vehicleName", vehicleName);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Upload failed");
        }

        const data = await res.json();
        const newImages: VehicleImage[] = data.images.map((img: any) => ({
          url: img.url,
          thumbnailUrl: img.thumbnailUrl,
          alt: img.alt,
          width: img.width,
          height: img.height,
        }));

        onChange([...images, ...newImages]);
      } catch (err: any) {
        alert(err.message || "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [images, onChange, vehicleSlug, vehicleName]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);

      // If it's a reorder drop (dragging existing image)
      if (dragIndex !== null && dragOverIndex !== null && dragIndex !== dragOverIndex) {
        const updated = [...images];
        const [moved] = updated.splice(dragIndex, 1);
        updated.splice(dragOverIndex, 0, moved);
        onChange(updated);
        setDragIndex(null);
        setDragOverIndex(null);
        return;
      }

      // File upload drop
      if (e.dataTransfer.files.length) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [dragIndex, dragOverIndex, images, onChange, handleFiles]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (dragIndex === null) {
      setDragOver(true);
    }
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return;
    const updated = [...images];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    onChange(updated);
  };

  const updateAlt = (index: number, alt: string) => {
    const updated = [...images];
    updated[index] = { ...updated[index], alt };
    onChange(updated);
  };

  // Handle adding external URL
  const [urlInput, setUrlInput] = useState("");
  const addUrl = () => {
    if (!urlInput.trim()) return;
    const newImage: VehicleImage = {
      url: urlInput.trim(),
      alt: `${vehicleName} - image ${images.length + 1}`,
    };
    onChange([...images, newImage]);
    setUrlInput("");
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={() => setDragOver(false)}
        className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-all cursor-pointer ${
          dragOver
            ? "border-[#fbdd2f] bg-[#fbdd2f]/5"
            : "border-white/20 hover:border-white/40"
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />

        <div className="flex flex-col items-center gap-3">
          <div className="rounded-full bg-white/5 p-4">
            <svg
              className="h-8 w-8 text-white/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-white/70">
              {uploading ? "Optimizing & uploading..." : "Drop images here or click to browse"}
            </p>
            <p className="mt-1 text-xs text-white/40">
              JPG, PNG, WebP, AVIF up to 10MB. Auto-optimized to WebP.
            </p>
          </div>
        </div>

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/60 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#fbdd2f] border-t-transparent" />
              <span className="text-sm text-[#fbdd2f]">Optimizing images...</span>
            </div>
          </div>
        )}
      </div>

      {/* External URL input */}
      <div className="flex gap-2">
        <input
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
          placeholder="Or paste an image URL..."
          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#fbdd2f]/50"
        />
        <Button
          type="button"
          onClick={addUrl}
          variant="outline"
          className="border-white/10 text-white/60 hover:border-white/20 text-sm"
        >
          Add URL
        </Button>
      </div>

      {/* Image Grid with Reordering */}
      {images.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-white/60">
              {images.length} image{images.length !== 1 ? "s" : ""} — Drag to reorder.
              First image is the hero.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {images.map((img, index) => (
              <div
                key={`${img.url}-${index}`}
                draggable
                onDragStart={(e) => {
                  setDragIndex(index);
                  e.dataTransfer.effectAllowed = "move";
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverIndex(index);
                }}
                onDragEnd={() => {
                  if (dragIndex !== null && dragOverIndex !== null && dragIndex !== dragOverIndex) {
                    const updated = [...images];
                    const [moved] = updated.splice(dragIndex, 1);
                    updated.splice(dragOverIndex, 0, moved);
                    onChange(updated);
                  }
                  setDragIndex(null);
                  setDragOverIndex(null);
                }}
                className={`group relative rounded-lg border transition-all cursor-grab active:cursor-grabbing ${
                  index === 0
                    ? "border-[#fbdd2f]/50 ring-1 ring-[#fbdd2f]/20"
                    : "border-white/10"
                } ${
                  dragOverIndex === index && dragIndex !== null
                    ? "border-[#fbdd2f] scale-[1.02]"
                    : ""
                } ${dragIndex === index ? "opacity-40" : ""}`}
              >
                {/* Hero badge */}
                {index === 0 && (
                  <div className="absolute left-2 top-2 z-10 rounded bg-[#fbdd2f] px-2 py-0.5 text-[10px] font-bold uppercase text-black">
                    Hero
                  </div>
                )}

                {/* Order number */}
                <div className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-[10px] font-bold text-white">
                  {index + 1}
                </div>

                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg bg-zinc-900">
                  <Image
                    src={img.thumbnailUrl || img.url}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between gap-1 p-2">
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => moveImage(index, index - 1)}
                      disabled={index === 0}
                      className="rounded p-1 text-white/40 hover:bg-white/10 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
                      title="Move left"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => moveImage(index, index + 1)}
                      disabled={index === images.length - 1}
                      className="rounded p-1 text-white/40 hover:bg-white/10 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
                      title="Move right"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>

                  {/* Drag handle */}
                  <svg className="h-4 w-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="rounded p-1 text-red-400/60 hover:bg-red-500/10 hover:text-red-400"
                    title="Remove image"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Editable Alt Text */}
                <div className="border-t border-white/5 px-2 pb-2">
                  <input
                    type="text"
                    value={img.alt}
                    onChange={(e) => updateAlt(index, e.target.value)}
                    placeholder="Alt text for SEO..."
                    className="w-full bg-transparent text-[11px] text-white/40 outline-none placeholder:text-white/20 focus:text-white/70"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
