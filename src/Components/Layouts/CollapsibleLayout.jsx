import React, { useState } from 'react';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { MinimalHeader, FullHeader, TabsHeader } from '../Headers/Header';
import {
  DEFAULT_NAV,
  PageContent,
  Logo,
  breadcrumbLabelFromGrouped,
  mainTabItemsFromGroupedNav,
  mainTabIdSet,
  sidebarGroupedNavForHeaderVariant,
} from './LayoutShared';

export const CollapsibleLayout = ({
  nav = DEFAULT_NAV,
  headerVariant = 'full',
  onToggleTheme,
  isDark = false,
  user,
  defaultActive = 'dashboard',
  defaultCollapsed = false,
}) => {
  const [active, setActive] = useState(defaultActive);
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const sidebarNav = sidebarGroupedNavForHeaderVariant(nav, headerVariant);
  const mainIds = mainTabIdSet(nav);

  const Header = headerVariant === 'full' ? FullHeader
    : headerVariant === 'tabs' ? TabsHeader
    : MinimalHeader;

  const headerProps = headerVariant === 'full'
    ? { breadcrumbs: [breadcrumbLabelFromGrouped(nav, active)], onToggleTheme, isDark, user }
    : headerVariant === 'tabs'
      ? {
          tabs: mainTabItemsFromGroupedNav(nav),
          activeTabId: mainIds.has(active) ? active : null,
          onTabChange: setActive,
          onToggleTheme,
          isDark,
          user,
        }
      : { title: nav.flatMap(g => g.items).find(i => i.id === active)?.label || 'Dashboard', onToggleTheme, isDark, user };

  return (
    <div className="flex h-full bg-background text-foreground overflow-hidden rounded-xl border border-border">
      <aside
        className="shrink-0 border-r border-border flex flex-col bg-background transition-all duration-300"
        style={{ width: collapsed ? 56 : 220 }}
      >
        <div className={`h-14 flex items-center border-b border-border transition-all duration-300 ${collapsed ? 'justify-center px-0' : 'justify-between px-4'}`}>
          {!collapsed && <Logo />}
          <button
            onClick={() => setCollapsed(p => !p)}
            className="flex items-center justify-center w-7 h-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {collapsed ? <ChevronsRight size={15} /> : <ChevronsLeft size={15} />}
          </button>
        </div>

        <nav className={`flex-1 overflow-y-auto py-3 flex flex-col gap-1 ${collapsed ? 'px-1.5 items-center' : 'px-2'}`}>
          {sidebarNav.flatMap(g => g.items).map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              title={collapsed ? label : undefined}
              className={`relative flex items-center gap-2.5 rounded-md text-sm transition-colors
                ${collapsed ? 'w-9 h-9 justify-center' : 'w-full px-2 py-1.5'}
                ${active === id
                  ? 'bg-blue-500/10 text-blue-500 font-medium'
                  : 'text-foreground hover:bg-muted'
                }`}
            >
              <Icon size={15} className={`shrink-0 ${active === id ? 'text-blue-500' : 'text-muted-foreground'}`} />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left whitespace-nowrap">{label}</span>
                  {badge && <span className="text-[10px] font-bold bg-blue-500 text-white rounded-full px-1.5 py-0.5">{badge}</span>}
                </>
              )}
              {collapsed && badge && (
                <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-blue-500 text-white text-[8px] font-bold flex items-center justify-center">{badge}</span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <Header {...headerProps} />
        <main className="flex-1 overflow-y-auto bg-muted/20">
          <PageContent active={active} />
        </main>
      </div>
    </div>
  );
};

export default CollapsibleLayout;
