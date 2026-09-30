import React, { useState, useEffect } from 'react';
import { UploadCloud, CheckCircle2, Loader2, X } from 'lucide-react';
import { storageService } from '../../services/storageService';
import { Button } from '../../components/common/Button';

export function ImageUploader({ currentImageUrl, onImageUploaded, productId = 'general' }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [preview, setPreview] = useState(currentImageUrl || '');
  const [customUrl, setCustomUrl] = useState('');
  const [mode, setMode] = useState('upload');

  useEffect(() => {
    setPreview(currentImageUrl || '');
  }, [currentImageUrl]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setUploadError('');
      const url = await storageService.uploadProductImage(file, productId);
      setPreview(url);
      onImageUploaded(url);
    } catch (err) {
      setUploadError(err.message || 'Storage upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleApplyUrl = (e) => {
    e.preventDefault();
    if (!customUrl.trim()) return;
    const url = customUrl.trim();
    setPreview(url);
    onImageUploaded(url);
    setCustomUrl('');
  };

  const handleRemoveImage = () => {
    setPreview('');
    onImageUploaded('');
  };

  return (
    <div className="space-y-3 text-left">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-[#71717a] uppercase tracking-wider">
          Product Image
        </label>
        <div className="flex gap-2 text-xs">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`cursor-pointer transition-colors ${mode === 'upload' ? 'text-[#09090b] font-semibold underline' : 'text-[#71717a] hover:text-[#09090b]'}`}
          >
            Upload File
          </button>
          <span className="text-[#d4d4d8]">•</span>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`cursor-pointer transition-colors ${mode === 'url' ? 'text-[#09090b] font-semibold underline' : 'text-[#71717a] hover:text-[#09090b]'}`}
          >
            Direct URL
          </button>
        </div>
      </div>

      {mode === 'upload' ? (
        <div className="relative border-2 border-dashed border-[#e4e4e7] hover:border-[#09090b] transition-colors rounded-xl p-4 text-center bg-[#fafafa]">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center justify-center gap-1.5 py-2">
            {uploading ? (
              <Loader2 className="h-6 w-6 text-black animate-spin" />
            ) : (
              <UploadCloud className="h-6 w-6 text-[#71717a]" />
            )}
            <p className="text-xs font-medium text-[#09090b]">
              {uploading ? 'Uploading to Supabase Storage...' : 'Click or drag image file here'}
            </p>
            <p className="text-[10px] text-[#a1a1aa]">Supports PNG, JPG, WEBP up to 5MB</p>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="https://images.unsplash.com/..."
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            className="flex-1 rounded-lg border border-[#e4e4e7] px-3.5 py-2 text-xs text-[#09090b] focus:outline-none focus:border-[#09090b]"
          />
          <Button type="button" size="sm" variant="secondary" onClick={handleApplyUrl}>
            Set URL
          </Button>
        </div>
      )}

      {uploadError && (
        <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs text-left">
          <p className="font-semibold text-[11px] mb-0.5">Storage Notice:</p>
          <p className="text-[11px] font-mono">{uploadError}</p>
          <p className="mt-1 text-[10px] text-[#71717a]">
            You can use the <strong>Direct URL</strong> tab above to provide an image link directly.
          </p>
        </div>
      )}

      {preview && (
        <div className="flex items-center gap-3 p-2 bg-[#f4f4f5] rounded-xl border border-[#e4e4e7]">
          <img
            src={preview}
            alt="Product Preview"
            className="h-12 w-12 rounded-lg object-cover bg-white border border-[#e4e4e7]"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[#09090b] flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              Image attached
            </p>
            <p className="text-[10px] text-[#71717a] truncate">{preview}</p>
          </div>
          <button
            type="button"
            onClick={handleRemoveImage}
            className="p-1.5 text-[#71717a] hover:text-red-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
            title="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
