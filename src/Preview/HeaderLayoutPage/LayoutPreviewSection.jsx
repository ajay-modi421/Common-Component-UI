import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';

const PREVIEW_PX = 480;

function copyToClipboard(text) {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve, reject) => {
    try {
      const el = document.createElement('textarea');
      el.value = text;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(el);
      ok ? resolve() : reject(new Error('Copy failed'));
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Toggle is ABOVE the preview frame so the 480px slot stays a single `h-full` chain
 * for layouts that use `h-full` on their root (see HeaderLayoutPage preview).
 */
const LayoutPreviewSection = ({ label, description, code, codeFileLabel, children }) => {
  const [mode, setMode] = useState('ui');
  const [copied, setCopied] = useState(false);

  const cleanedCode = useMemo(() => {
    if (typeof code !== 'string') return '';
    return code.replace(/\r\n/g, '\n').trimEnd() + '\n';
  }, [code]);

  const handleCopy = async () => {
    await copyToClipboard(cleanedCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="mb-14">
      <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
        {label}
      </p>
      {description && (
        <p className="text-xs text-muted-foreground mb-3">{description}</p>
      )}

      <div className="mt-4 flex items-center justify-end gap-2">
        <div className="inline-flex rounded-md border border-border bg-background overflow-hidden">
          <button
            type="button"
            onClick={() => setMode('ui')}
            className={[
              'px-3 py-1.5 text-xs font-medium transition-colors',
              mode === 'ui'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted text-foreground',
            ].join(' ')}
          >
            UI
          </button>
          <button
            type="button"
            onClick={() => setMode('code')}
            className={[
              'px-3 py-1.5 text-xs font-medium transition-colors border-l border-border',
              mode === 'code'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted text-foreground',
            ].join(' ')}
          >
            Code
          </button>
        </div>
        {mode === 'code' ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={!cleanedCode}
            className="h-8"
          >
            {copied ? 'Copied' : 'Copy'}
          </Button>
        ) : null}
      </div>

      {codeFileLabel && mode === 'code' ? (
        <p className="text-[0.65rem] text-muted-foreground mt-2 text-right">{codeFileLabel}</p>
      ) : null}

      <div
        className="mt-2 rounded-xl overflow-hidden border border-border bg-background"
        style={{ height: PREVIEW_PX }}
      >
        {mode === 'ui' ? (
          <div className="h-full w-full min-h-0">
            {children}
          </div>
        ) : (
          <pre className="h-full m-0 overflow-auto text-xs leading-relaxed p-4 bg-background">
            <code>{cleanedCode}</code>
          </pre>
        )}
      </div>
    </div>
  );
};

export default LayoutPreviewSection;
