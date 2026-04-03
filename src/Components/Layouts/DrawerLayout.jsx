import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
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

export const DrawerLayout = ({
  nav = DEFAULT_NAV,
  headerVariant = 'minimal',
  onToggleTheme,
  isDark = false,
  user,
  defaultActive = 'dashboard',
}) => {
  const [active, setActive] = useState(defaultActive);
  const [open, setOpen] = useState(false);

  const handleNav = (id) => { setActive(id); setOpen(false); };

  const title = nav.flatMap(g => g.items).find(i => i.id === active)?.label || 'Dashboard';
  const sidebarNav = sidebarGroupedNavForHeaderVariant(nav, headerVariant);
  const mainIds = mainTabIdSet(nav);

  const menuButton = (
    <button
      onClick={() => setOpen(true)}
      className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
    >
      <Menu size={16} />
    </button>
  );

  const Header = headerVariant === 'full' ? FullHeader
    : headerVariant === 'tabs' ? TabsHeader
    : MinimalHeader;

  const headerProps = headerVariant === 'full'
    ? { breadcrumbs: [breadcrumbLabelFromGrouped(nav, active)], onToggleTheme, isDark, user, actions: menuButton }
    : headerVariant === 'tabs'
      ? {
          tabs: mainTabItemsFromGroupedNav(nav),
          activeTabId: mainIds.has(active) ? active : null,
          onTabChange: handleNav,
          onToggleTheme,
          isDark,
          user,
        }
      : { title, onToggleTheme, isDark, user, actions: menuButton };

  return (
    <div className="flex h-full bg-background text-foreground overflow-hidden rounded-xl border border-border relative">
      {open && (
        <div
          className="absolute inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`absolute left-0 top-0 h-full z-50 w-56 border-r border-border bg-card shadow-2xl flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="h-14 px-4 flex items-center justify-between border-b border-border">
          <Logo />
          <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
            <X size={16} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-4">
          {sidebarNav.map(({ group, items }) => (
            <div key={group}>
              <p className="text-[0.62rem] font-semibold uppercase tracking-widest text-muted-foreground px-2 mb-1">{group}</p>
              {items.map(({ id, label, icon: Icon, badge }) => (
                <button
                  key={id}
                  onClick={() => handleNav(id)}
                  className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors ${
                    active === id
                      ? 'bg-blue-500/10 text-blue-500 font-medium'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon size={15} className={active === id ? 'text-blue-500' : 'text-muted-foreground'} />
                  <span className="flex-1 text-left">{label}</span>
                  {badge && <span className="text-[10px] font-bold bg-blue-500 text-white rounded-full px-1.5 py-0.5">{badge}</span>}
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

export default DrawerLayout;
