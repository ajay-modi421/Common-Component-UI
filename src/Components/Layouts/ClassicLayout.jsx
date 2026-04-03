import React, { useState } from 'react';
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

export const ClassicLayout = ({
  nav = DEFAULT_NAV,
  headerVariant = 'minimal',
  sidebarWidth = 220,
  onToggleTheme,
  isDark = false,
  user,
  defaultActive = 'dashboard',
}) => {
  const [active, setActive] = useState(defaultActive);
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
      <aside style={{ width: sidebarWidth }} className="shrink-0 border-r border-border flex flex-col bg-background">
        <div className="h-14 px-4 flex items-center border-b border-border">
          <Logo />
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-4">
          {sidebarNav.map(({ group, items }) => (
            <div key={group}>
              <p className="text-[0.62rem] font-semibold uppercase tracking-widest text-muted-foreground px-2 mb-1">{group}</p>
              {items.map(({ id, label, icon: Icon, badge }) => (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors ${
                    active === id
                      ? 'bg-blue-500/10 text-blue-500 font-medium'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon size={15} className={active === id ? 'text-blue-500' : 'text-muted-foreground'} />
                  <span className="flex-1 text-left">{label}</span>
                  {badge && (
                    <span className="text-[10px] font-bold bg-blue-500 text-white rounded-full px-1.5 py-0.5">{badge}</span>
                  )}
                </button>
              ))}
            </div>
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

export default ClassicLayout;
