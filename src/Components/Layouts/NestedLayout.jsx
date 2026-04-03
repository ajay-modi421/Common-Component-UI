import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { MinimalHeader, FullHeader, TabsHeader } from '../Headers/Header';
import {
  NESTED_NAV,
  PageContent,
  Logo,
  findNestedTreeLabel,
  nestedTopLevelOwner,
  nestedTabsFromTree,
} from './LayoutShared';

const NestedNavItem = ({ item, active, onSelect, depth = 0 }) => {
  const hasChildren = item.children?.length > 0;
  const isActive = active === item.id || item.children?.some(c => c.id === active);
  const [expanded, setExpanded] = useState(isActive);
  const Icon = item.icon;

  return (
    <div>
      <button
        onClick={() => {
          if (hasChildren) { setExpanded(p => !p); }
          else { onSelect(item.id); }
        }}
        className={`w-full flex items-center gap-2 rounded-md text-sm transition-colors
          ${depth > 0 ? 'pl-7 pr-2 py-1' : 'px-2 py-1.5'}
          ${active === item.id
            ? 'bg-blue-500/10 text-blue-500 font-medium'
            : isActive && hasChildren
              ? 'text-foreground font-medium'
              : 'text-foreground hover:bg-muted'
          }`}
      >
        {Icon && <Icon size={14} className={`shrink-0 ${active === item.id ? 'text-blue-500' : 'text-muted-foreground'}`} />}
        <span className="flex-1 text-left">{item.label}</span>
        {hasChildren && (
          <ChevronDown
            size={13}
            className={`text-muted-foreground transition-transform duration-200 ${expanded ? 'rotate-0' : '-rotate-90'}`}
          />
        )}
      </button>

      {hasChildren && expanded && (
        <div className="mt-0.5 flex flex-col gap-0.5">
          {item.children.map(child => (
            <NestedNavItem key={child.id} item={child} active={active} onSelect={onSelect} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const NestedLayout = ({
  nav = NESTED_NAV,
  headerVariant = 'full',
  onToggleTheme,
  isDark = false,
  user,
  defaultActive = 'dashboard',
  sidebarWidth = 230,
}) => {
  const [active, setActive] = useState(defaultActive);
  const topOwner = nestedTopLevelOwner(nav, active);
  const nestedTabs = nestedTabsFromTree(nav);

  const handleNestedTab = (id) => {
    const item = nav.find(i => i.id === id);
    if (item?.children?.length) setActive(item.children[0].id);
    else setActive(id);
  };

  const Header = headerVariant === 'full' ? FullHeader
    : headerVariant === 'tabs' ? TabsHeader
    : MinimalHeader;

  const headerProps = headerVariant === 'full'
    ? { breadcrumbs: [findNestedTreeLabel(nav, active)], onToggleTheme, isDark, user }
    : headerVariant === 'tabs'
      ? {
          tabs: nestedTabs,
          activeTabId: topOwner.id,
          onTabChange: handleNestedTab,
          onToggleTheme,
          isDark,
          user,
        }
      : { title: findNestedTreeLabel(nav, active), onToggleTheme, isDark, user };

  const childLinks = topOwner.children ?? [];

  return (
    <div className="flex h-full bg-background text-foreground overflow-hidden rounded-xl border border-border">
      {headerVariant !== 'tabs' && (
        <aside style={{ width: sidebarWidth }} className="shrink-0 border-r border-border flex flex-col bg-background">
          <div className="h-14 px-4 flex items-center border-b border-border">
            <Logo />
          </div>
          <nav className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-1">
            {nav.map(item => (
              <NestedNavItem key={item.id} item={item} active={active} onSelect={setActive} />
            ))}
          </nav>
        </aside>
      )}

      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <Header {...headerProps} />
        {headerVariant === 'tabs' && childLinks.length > 0 && (
          <nav
            className="shrink-0 flex items-center gap-1 px-4 py-2 border-b border-border bg-background overflow-x-auto"
            aria-label={`${topOwner.label} sub-pages`}
          >
            {childLinks.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
                  active === id
                    ? 'bg-blue-500/15 text-blue-500'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/80'
                }`}
              >
                {Icon && <Icon size={13} className={active === id ? 'text-blue-500' : 'text-muted-foreground'} />}
                {label}
              </button>
            ))}
          </nav>
        )}
        <main className="flex-1 overflow-y-auto bg-muted/20 min-h-0">
          <PageContent active={active} />
        </main>
      </div>
    </div>
  );
};

export default NestedLayout;
