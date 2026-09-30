import React, { useState, useEffect } from 'react';

export function LoadingScreen({ fullScreen = true, text = 'Milprime' }) {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    const currentLength = displayText.length;

    if (!isDeleting && currentLength < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentLength + 1));
      }, 120);
    } else if (!isDeleting && currentLength === text.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1400);
    } else if (isDeleting && currentLength > 0) {
      timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentLength - 1));
      }, 60);
    } else if (isDeleting && currentLength === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
      }, 400);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, text]);

  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative flex items-center justify-center">
        <span className="text-2xl sm:text-3xl font-extrabold tracking-[0.25em] uppercase text-[#09090b]">
          {displayText}
        </span>
        <span className="inline-block w-[2px] h-6 bg-[#09090b] ml-1 animate-pulse" />
      </div>
      <p className="text-[11px] font-medium tracking-widest text-[#71717a] uppercase opacity-75">
        Curating Architectural Essentials
      </p>
    </div>
  );

  if (!fullScreen) {
    return (
      <div className="py-24 w-full flex items-center justify-center bg-white" aria-live="polite">
        {content}
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-xs transition-opacity duration-300"
      aria-live="polite"
      role="status"
    >
      {content}
    </div>
  );
}
