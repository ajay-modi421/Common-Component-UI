import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, X, Upload, ZoomIn, ZoomOut, RotateCw, Trash2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ACCEPTED = 'image/jpeg,image/png,image/gif,image/webp';
const MAX_MB = 2;

const GRADIENTS = [
  'from-blue-500 to-indigo-600',
  'from-violet-500 to-purple-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-teal-600',
];

function getGradient(name = '') {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return GRADIENTS[Math.abs(h) % GRADIENTS.length];
}

function getInitials(name = '') {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';
}

function validateFile(file) {
  if (!file.type.startsWith('image/')) return 'Only image files are allowed.';
  if (file.size > MAX_MB * 1024 * 1024) return `File must be under ${MAX_MB}MB.`;
  return null;
}

function useUploadProgress() {
  const [progress, setProgress] = useState(null);

  const startUpload = useCallback((onDone) => {
    setProgress(0);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 18 + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        setProgress(100);
        setTimeout(() => { setProgress(null); onDone?.(); }, 600);
      } else {
        setProgress(Math.round(p));
      }
    }, 120);
  }, []);

  return { progress, startUpload };
}

const CropPreview = ({ src, zoom, offsetX, offsetY, onDragStart, rotation, size = 120 }) => {
  const canvasRef = useRef();

  useEffect(() => {
    if (!src || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.translate(size / 2, size / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      const scale = zoom;
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.drawImage(img, -w / 2 + offsetX, -h / 2 + offsetY, w, h);
      ctx.restore();
    };
    img.src = src;
  }, [src, zoom, offsetX, offsetY, rotation, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      onMouseDown={onDragStart}
      onTouchStart={onDragStart}
      className="rounded-full cursor-move ring-2 ring-border shadow-lg"
      style={{ width: size, height: size }}
    />
  );
};

const CropControls = ({ zoom, setZoom, rotation, setRotation, onRemove, onConfirm, progress }) => (
  <div className="flex flex-col gap-3 w-full">
    <div className="flex items-center gap-2">
      <ZoomOut size={13} className="text-muted-foreground shrink-0" />
      <input
        type="range" min={0.5} max={3} step={0.01}
        value={zoom}
        onChange={e => setZoom(parseFloat(e.target.value))}
        className="flex-1 accent-blue-500 h-1.5 rounded cursor-pointer"
      />
      <ZoomIn size={13} className="text-muted-foreground shrink-0" />
    </div>
    <div className="flex items-center gap-2">
      <RotateCw size={13} className="text-muted-foreground shrink-0" />
      <input
        type="range" min={-180} max={180} step={1}
        value={rotation}
        onChange={e => setRotation(parseFloat(e.target.value))}
        className="flex-1 accent-blue-500 h-1.5 rounded cursor-pointer"
      />
      <span className="text-xs text-muted-foreground w-9 text-right">{rotation}°</span>
    </div>

    {progress !== null && (
      <div className="w-full">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Uploading…</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    )}

    <div className="flex gap-2">
      <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive" onClick={onRemove}>
        <Trash2 size={13} /> Remove
      </Button>
      <Button size="sm" className="gap-1.5 flex-1 bg-blue-500 hover:bg-blue-600 text-white" onClick={onConfirm} disabled={progress !== null}>
        <Check size={13} /> {progress !== null ? `${progress}%` : 'Save avatar'}
      </Button>
    </div>
  </div>
);

function useCropState(rawSrc) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (rawSrc) { setZoom(1); setRotation(0); setOffsetX(0); setOffsetY(0); }
  }, [rawSrc]);

  const onDragStart = useCallback((e) => {
    dragging.current = true;
    const pt = e.touches ? e.touches[0] : e;
    last.current = { x: pt.clientX, y: pt.clientY };

    const move = (ev) => {
      if (!dragging.current) return;
      const p = ev.touches ? ev.touches[0] : ev;
      setOffsetX(x => x + (p.clientX - last.current.x));
      setOffsetY(y => y + (p.clientY - last.current.y));
      last.current = { x: p.clientX, y: p.clientY };
    };
    const up = () => { dragging.current = false; };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', move);
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', up);
    };
  }, []);

  return { zoom, setZoom, rotation, setRotation, offsetX, offsetY, onDragStart };
}

const ModalAvatarUpload = ({
  name = 'User',
  currentAvatar = null,
  onSave,
  onRemove,
  triggerSize = 80,
}) => {
  const fileRef = useRef();
  const [open, setOpen] = useState(false);
  const [rawSrc, setRawSrc] = useState(null);
  const [savedSrc, setSavedSrc] = useState(currentAvatar);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const { zoom, setZoom, rotation, setRotation, offsetX, offsetY, onDragStart } = useCropState(rawSrc);
  const { progress, startUpload } = useUploadProgress();

  const loadFile = (file) => {
    if (!file) return;
    const err = validateFile(file);
    if (err) { setError(err); return; }
    setError('');
    setRawSrc(URL.createObjectURL(file));
  };

  const handleSave = () => {
    startUpload(() => {
      setSavedSrc(rawSrc);
      onSave?.(rawSrc);
      setTimeout(() => { setOpen(false); setRawSrc(null); }, 300);
    });
  };

  const handleRemove = () => {
    setRawSrc(null);
    setSavedSrc(null);
    onRemove?.();
    setOpen(false);
  };

  const handleClose = () => {
    if (progress !== null) return;
    setOpen(false);
    setRawSrc(null);
    setError('');
  };

  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={() => setOpen(true)}
          className="relative group focus-visible:outline-none"
          style={{ width: triggerSize, height: triggerSize }}
        >
          {savedSrc ? (
            <img
              src={savedSrc}
              alt={name}
              className="rounded-full object-cover w-full h-full ring-2 ring-border shadow-lg"
            />
          ) : (
            <div
              className={`rounded-full w-full h-full flex items-center justify-center font-semibold text-white bg-gradient-to-br ring-2 ring-border shadow-lg ${getGradient(name)}`}
              style={{ fontSize: triggerSize * 0.3 }}
            >
              {getInitials(name)}
            </div>
          )}
          <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-white">
            <Camera size={triggerSize * 0.2} />
            <span style={{ fontSize: triggerSize * 0.11 }} className="font-medium">Edit</span>
          </div>
        </button>

        <div className="flex flex-col items-center gap-1">
          <Button variant="outline" size="sm" className="gap-2 h-8 text-xs" onClick={() => setOpen(true)}>
            <Camera size={13} /> Change photo
          </Button>
          {savedSrc && (
            <button onClick={handleRemove} className="text-xs text-destructive hover:underline">
              Remove
            </button>
          )}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl border border-border bg-card shadow-2xl p-6 flex flex-col gap-5"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Upload Photo</h2>
                <p className="text-xs text-muted-foreground mt-0.5">JPG, PNG or GIF · Max {MAX_MB}MB</p>
              </div>
              <button
                onClick={handleClose}
                className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {rawSrc ? (
              <div className="flex flex-col items-center gap-4">
                <CropPreview
                  src={rawSrc} zoom={zoom} offsetX={offsetX} offsetY={offsetY}
                  onDragStart={onDragStart} rotation={rotation} size={140}
                />
                <p className="text-xs text-muted-foreground -mt-2">Drag to reposition</p>
                <CropControls
                  zoom={zoom} setZoom={setZoom}
                  rotation={rotation} setRotation={setRotation}
                  onRemove={handleRemove} onConfirm={handleSave}
                  progress={progress}
                />
                <button
                  onClick={() => { setRawSrc(null); setError(''); }}
                  className="text-xs text-muted-foreground hover:underline"
                >
                  ← Choose a different photo
                </button>
              </div>
            ) : (
              <div
                onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={e => { e.preventDefault(); setIsDragging(false); loadFile(e.dataTransfer.files?.[0]); }}
                onClick={() => fileRef.current?.click()}
                className={`
                  rounded-xl border-2 border-dashed cursor-pointer
                  flex flex-col items-center justify-center gap-3 py-9
                  transition-all duration-200
                  ${isDragging
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-border hover:border-blue-400 hover:bg-muted/40'
                  }
                `}
              >
                <div className={`
                  w-14 h-14 rounded-full flex items-center justify-center
                  bg-gradient-to-br ${getGradient(name)} text-white font-semibold text-lg
                  ring-2 ring-border shadow transition-transform duration-200
                  ${isDragging ? 'scale-110' : ''}
                `}>
                  {savedSrc
                    ? <img src={savedSrc} alt={name} className="w-full h-full rounded-full object-cover" />
                    : getInitials(name)
                  }
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">
                    {isDragging ? 'Drop it!' : 'Drag a photo here'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    or <span className="text-blue-500 font-medium">browse files</span>
                  </p>
                </div>
              </div>
            )}

            {error && <p className="text-xs text-destructive text-center -mt-2">{error}</p>}
            <input ref={fileRef} type="file" accept={ACCEPTED} className="hidden" onChange={e => loadFile(e.target.files?.[0])} />
          </div>
        </div>
      )}
    </>
  );
};

export default ModalAvatarUpload;

