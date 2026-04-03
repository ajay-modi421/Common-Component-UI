import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';

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

const PreviewCodeWrapper = ({
  title,
  description,
  code,
  defaultMode = 'ui', // 'ui' | 'code'
  children,
}) => {
  const [mode, setMode] = useState(defaultMode);
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
    <div>
      {(title || description) && (
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="min-w-0">
            {title ? <h2 className="text-base font-semibold mb-1">{title}</h2> : null}
            {description ? (
              <p className="text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>

          <div className="shrink-0 flex items-center gap-2">
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
        </div>
      )}

      <div className="mt-4">
        {mode === 'ui' ? (
          children
        ) : (
          <div className="rounded-lg border border-border bg-background overflow-hidden">
            <pre className="text-xs leading-relaxed p-4 overflow-auto max-h-[70vh]">
              <code>{cleanedCode}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewCodeWrapper;

