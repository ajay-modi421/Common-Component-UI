import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const widthMap = {
  xs: 'w-48',
  sm: 'w-56',
  md: 'w-64',
  lg: 'w-72',
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * LeftSidebar — fully prop-driven left navigation sidebar.
 *
 * Props:
 *  - title          {string}   Header label shown at top of sidebar.
 *  - logo           {node}     Optional logo/icon element rendered before title.
 *  - width          {'xs'|'sm'|'md'|'lg'}  Sidebar width preset. Default 'sm'.
 *  - nav            {Array}    Navigation config. Each entry is either:
 *                                { label, id, icon?, onClick? }               — flat item
 *                                { group, items: [{ label, id, icon?, onClick? }] } — group
 *  - activeId       {string}   Currently active nav item id (controlled).
 *  - onNavChange    {fn}       Called with item id when a nav item is clicked.
 *  - footer         {node}     Optional content rendered at the very bottom.
 *  - headerRight    {node}     Optional element placed at the right of the header.
 *  - collapsible    {bool}     Allow groups to collapse. Default false.
 *  - className      {string}   Extra classes on the root aside element.
 */
const LeftSidebar = ({
  title,
  logo,
  width = 'sm',
  nav = [],
  activeId,
  onNavChange,
  footer,
  headerRight,
  collapsible = false,
  className = '',
}) => {
  const [collapsed, setCollapsed] = useState({});

  const toggleGroup = (group) => {
    setCollapsed(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const handleItemClick = (item) => {
    item.onClick?.();
    onNavChange?.(item.id);
  };

  const wClass = widthMap[width] ?? widthMap.sm;

  return (
    <aside
      className={`${wClass} shrink-0 border-r border-border flex flex-col bg-background text-foreground h-full ${className}`}
    >
      {/* ── Header ── */}
      {(title || logo || headerRight) && (
        <div className="px-4 py-3.5 border-b border-border flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            {logo && <span className="shrink-0">{logo}</span>}
            {title && (
              <span className="text-sm font-semibold tracking-wide truncate">{title}</span>
            )}
          </div>
          {headerRight && <div className="shrink-0">{headerRight}</div>}
        </div>
      )}

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-1">
        {nav.map((entry, idx) => {
          if (entry.group) {
            const isCollapsed = collapsible && !!collapsed[entry.group];
            return (
              <div key={entry.group ?? idx} className="mb-1">
                {/* Group label */}
                <button
                  type="button"
                  onClick={() => collapsible && toggleGroup(entry.group)}
                  className={`w-full flex items-center justify-between px-2 py-1 mb-0.5 ${
                    collapsible ? 'hover:bg-muted rounded-md cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <p className="text-[0.67rem] font-semibold uppercase tracking-widest text-muted-foreground select-none">
                    {entry.group}
                  </p>
                  {collapsible && (
                    <span className="text-muted-foreground">
                      {isCollapsed
                        ? <ChevronRight size={12} />
                        : <ChevronDown size={12} />
                      }
                    </span>
                  )}
                </button>

                {/* Group items */}
                {!isCollapsed && (
                  <div className="flex flex-col gap-0.5">
                    {(entry.items ?? []).map(item => (
                      <NavItem
                        key={item.id}
                        item={item}
                        active={activeId === item.id}
                        onClick={() => handleItemClick(item)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // Flat item (no group)
          return (
            <NavItem
              key={entry.id ?? idx}
              item={entry}
              active={activeId === entry.id}
              onClick={() => handleItemClick(entry)}
            />
          );
        })}
      </nav>

      {/* ── Footer ── */}
      {footer && (
        <div className="shrink-0 border-t border-border px-3 py-3">
          {footer}
        </div>
      )}
    </aside>
  );
};

// ─── NavItem ──────────────────────────────────────────────────────────────────

const NavItem = ({ item, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition-colors text-left ${
      active
        ? 'bg-primary text-primary-foreground font-medium'
        : 'text-foreground hover:bg-muted'
    }`}
  >
    {item.icon && (
      <span className={`shrink-0 ${active ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
        {item.icon}
      </span>
    )}
    <span className="truncate">{item.label}</span>
    {item.badge != null && (
      <span
        className={`ml-auto text-[0.65rem] font-semibold px-1.5 py-0.5 rounded-full shrink-0 ${
          active
            ? 'bg-primary-foreground/20 text-primary-foreground'
            : 'bg-muted text-muted-foreground'
        }`}
      >
        {item.badge}
      </span>
    )}
  </button>
);

export default LeftSidebar;