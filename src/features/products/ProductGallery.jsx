import React, { useState } from 'react';

export function ProductGallery({ images = [], name = 'Product' }) {
  const imageList = Array.isArray(images) && images.length > 0
    ? images
    : ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1000&q=80'];

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="space-y-4">
      {/* Primary Display Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#f4f4f5] border border-[#e4e4e7]">
        <img
          src={imageList[selectedIndex] || imageList[0]}
          alt={name}
          className="h-full w-full object-cover object-center transition-all duration-300"
        />
        {imageList.length > 1 && (
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-full font-medium">
            {selectedIndex + 1} / {imageList.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {imageList.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {imageList.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all cursor-pointer bg-[#f4f4f5] ${
                selectedIndex === idx
                  ? 'border-black ring-2 ring-black/10'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${name} thumbnail ${idx + 1}`}
                className="h-full w-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
