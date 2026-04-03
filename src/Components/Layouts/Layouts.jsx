import React, { useState } from 'react';
import {
  LayoutDashboard, FileText, Users, BarChart2, Settings, Inbox,
  ChevronDown, ChevronRight, Menu, X, PanelLeftClose, PanelLeftOpen,
  Folder, FolderOpen, Bell, Shield, Palette, Database, Globe,
  ChevronsLeft, ChevronsRight,
} from 'lucide-react';
import { MinimalHeader, FullHeader, TabsHeader } from '../Headers/Header';

// ─── Shared nav items ─────────────────────────────────────────────────────────
export const DEFAULT_NAV = [
  {
    group: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'inbox',     label: 'Inbox',     icon: Inbox, badge: 4 },
      { id: 'reports',   label: 'Reports',   icon: FileText },
      { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    ],
  },
  {
    group: 'Manage',
    items: [
      { id: 'users',    label: 'Users',    icon: Users },
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
  },
];

export const NESTED_NAV = [
  {
    id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard,
  },
  {
    id: 'reports', label: 'Reports', icon: FileText,
    children: [
      { id: 'reports-weekly',   label: 'Weekly',   icon: FileText },
      { id: 'reports-monthly',  label: 'Monthly',  icon: FileText },
      { id: 'reports-annual',   label: 'Annual',   icon: FileText },
    ],
  },
  {
    id: 'team', label: 'Team', icon: Users,
    children: [
      { id: 'team-members',     label: 'Members',     icon: Users },
      { id: 'team-permissions', label: 'Permissions', icon: Shield },
    ],
  },
  {
    id: 'settings', label: 'Settings', icon: Settings,
    children: [
      { id: 'settings-general',    label: 'General',    icon: Settings },
      { id: 'settings-appearance', label: 'Appearance', icon: Palette },
      { id: 'settings-data',       label: 'Data',       icon: Database },
      { id: 'settings-integrations', label: 'Integrations', icon: Globe },
    ],
  },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
];

// ─── Nav helpers (breadcrumb, tabs vs sidebar) ────────────────────────────────

function formatRouteFallback(activeId) {
  return activeId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

/** Breadcrumb label for flat grouped nav */
function breadcrumbLabelFromGrouped(nav, activeId) {
  const item = nav.flatMap(g => g.items).find(i => i.id === activeId);
  return item?.label ?? formatRouteFallback(activeId);
}

/** Tabs = routes in the "Main" group — same items are removed from the sidebar when using the tabs header */
function mainTabItemsFromGroupedNav(nav) {
  const main = nav.find(g => g.group === 'Main');
  return (main?.items ?? []).map(({ id, label, icon }) => ({ id, label, icon }));
}

function mainTabIdSet(nav) {
  return new Set(mainTabItemsFromGroupedNav(nav).map(t => t.id));
}

function sidebarGroupedNavForHeaderVariant(nav, headerVariant) {
  if (headerVariant !== 'tabs') return nav;
  const ids = mainTabIdSet(nav);
  return nav
    .map(g => ({ ...g, items: g.items.filter(i => !ids.has(i.id)) }))
    .filter(g => g.items.length > 0);
}

function findNestedTreeLabel(tree, activeId) {
  const walk = (nodes) => {
    for (const n of nodes) {
      if (n.id === activeId) return n.label;
      if (n.children) {
        const v = walk(n.children);
        if (v) return v;
      }
    }
    return null;
  };
  return walk(tree) ?? formatRouteFallback(activeId);
}

/** Top-level nav item that owns the current route (parent if active is a child id) */
function nestedTopLevelOwner(tree, activeId) {
  for (const item of tree) {
    if (item.id === activeId) return item;
    if (item.children?.some(c => c.id === activeId)) return item;
  }
  return tree[0];
}

function nestedTabsFromTree(tree) {
  return tree.map(({ id, label, icon }) => ({ id, label, icon }));
}

// ─── Placeholder page content ─────────────────────────────────────────────────
const PageContent = ({ active }) => (
  <div className="p-8">
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-foreground capitalize">{active?.replace(/-/g, ' ') || 'Dashboard'}</h2>
      <p className="text-sm text-muted-foreground mt-1">This is the {active} page content.</p>
    </div>
    <div className="grid grid-cols-3 gap-4">
      {['Total Users', 'Revenue', 'Active Sessions'].map((label, i) => (
        <div key={label} className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{['12,430', '$84.2k', '1,293'][i]}</p>
          <p className="text-xs text-emerald-500 mt-1">↑ {['+12%', '+8.1%', '+3.4%'][i]} this week</p>
        </div>
      ))}
    </div>
    <div className="mt-4 rounded-xl border border-border bg-card p-4 h-48 flex items-center justify-center text-muted-foreground text-sm">
      Chart / table content goes here
    </div>
  </div>
);

// ─── Logo mark ────────────────────────────────────────────────────────────────
const Logo = ({ collapsed = false }) => (
  <div className="flex items-center gap-2.5 overflow-hidden">
    <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
      <span className="text-white text-xs font-bold">U</span>
    </div>
    {!collapsed && <span className="text-sm font-semibold text-foreground whitespace-nowrap">UI Library</span>}
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// 1. CLASSIC LAYOUT — fixed sidebar + top header
// ═══════════════════════════════════════════════════════════════════════════════
export const ClassicLayout = ({
  nav = DEFAULT_NAV,
  headerVariant = 'minimal', // 'minimal' | 'full' | 'tabs'
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
      {/* Sidebar */}
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

      {/* Right side */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header {...headerProps} />
        <main className="flex-1 overflow-y-auto bg-muted/20">
          <PageContent active={active} />
        </main>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. COLLAPSIBLE LAYOUT — sidebar collapses to icon rail
// ═══════════════════════════════════════════════════════════════════════════════
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
      {/* Sidebar */}
      <aside
        className="shrink-0 border-r border-border flex flex-col bg-background transition-all duration-300"
        style={{ width: collapsed ? 56 : 220 }}
      >
        {/* Logo + toggle */}
        <div className={`h-14 flex items-center border-b border-border transition-all duration-300 ${collapsed ? 'justify-center px-0' : 'justify-between px-4'}`}>
          {!collapsed && <Logo />}
          <button
            onClick={() => setCollapsed(p => !p)}
            className={`flex items-center justify-center w-7 h-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors ${collapsed ? '' : ''}`}
          >
            {collapsed ? <ChevronsRight size={15} /> : <ChevronsLeft size={15} />}
          </button>
        </div>

        {/* Nav */}
        <nav className={`flex-1 overflow-y-auto py-3 flex flex-col gap-1 ${collapsed ? 'px-1.5 items-center' : 'px-2'}`}>
          {sidebarNav.flatMap(g => g.items).map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-2.5 rounded-md text-sm transition-colors
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

      {/* Right side */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header {...headerProps} />
        <main className="flex-1 overflow-y-auto bg-muted/20">
          <PageContent active={active} />
        </main>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. DRAWER LAYOUT — floating overlay sidebar (mobile/drawer style)
// ═══════════════════════════════════════════════════════════════════════════════
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
      {/* Backdrop */}
      {open && (
        <div
          className="absolute inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
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

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header {...headerProps} />
        <main className="flex-1 overflow-y-auto bg-muted/20">
          <PageContent active={active} />
        </main>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. NESTED NAV LAYOUT — multi-level collapsible sidebar
// ═══════════════════════════════════════════════════════════════════════════════
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

export default { ClassicLayout, CollapsibleLayout, DrawerLayout, NestedLayout };