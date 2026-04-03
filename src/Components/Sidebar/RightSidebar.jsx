import React from 'react';
import { X } from 'lucide-react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const widthMap = {
  xs: 'w-48',
  sm: 'w-56',
  md: 'w-64',
  lg: 'w-72',
  xl: 'w-80',
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * RightSidebar — fully prop-driven right panel / detail sidebar.
 *
 * Props:
 *  - title         {string}  Header label.
 *  - description   {string}  Optional subtitle shown below the title.
 *  - width         {'xs'|'sm'|'md'|'lg'|'xl'}  Width preset. Default 'md'.
 *  - onClose       {fn}      If provided, renders an × button in the header.
 *  - headerLeft    {node}    Optional element placed at the left of the header (e.g. back arrow).
 *  - headerRight   {node}    Extra controls in the header (overrides close btn if both provided).
 *  - sections      {Array}   Content sections rendered in the body.
 *                              Each: { label?, content: node }
 *  - footer        {node}    Sticky content at the bottom.
 *  - className     {string}  Extra classes on the root aside.
 *  - children      {node}    Rendered inside the body when sections is empty.
 */
const RightSidebar = ({
  title,
  description,
  width = 'md',
  onClose,
  headerLeft,
  headerRight,
  sections = [],
  footer,
  className = '',
  children,
}) => {
  const wClass = widthMap[width] ?? widthMap.md;

  return (
    <aside
      className={`${wClass} shrink-0 border-l border-border flex flex-col bg-background text-foreground h-full ${className}`}
    >
      {/* ── Header ── */}
      {(title || description || onClose || headerLeft || headerRight) && (
        <div className="px-4 py-3.5 border-b border-border shrink-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              {headerLeft && <span className="shrink-0">{headerLeft}</span>}
              {title && (
                <span className="text-sm font-semibold tracking-wide truncate">{title}</span>
              )}
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {headerRight}
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close sidebar"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {description && (
            <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{description}</p>
          )}
        </div>
      )}

      {/* ── Body ── */}
      <div className="flex-1 overflow-y-auto py-3 px-3 flex flex-col gap-4">
        {sections.length > 0
          ? sections.map((section, idx) => (
              <RightSidebarSection key={idx} label={section.label}>
                {section.content}
              </RightSidebarSection>
            ))
          : children
        }
      </div>

      {/* ── Footer ── */}
      {footer && (
        <div className="shrink-0 border-t border-border px-3 py-3">
          {footer}
        </div>
      )}
    </aside>
  );
};

// ─── Section ─────────────────────────────────────────────────────────────────

const RightSidebarSection = ({ label, children }) => (
  <div>
    {label && (
      <p className="text-[0.67rem] font-semibold uppercase tracking-widest text-muted-foreground mb-2 px-0.5">
        {label}
      </p>
    )}
    <div>{children}</div>
  </div>
);

export { RightSidebarSection };
export default RightSidebar;