import React from 'react';
import {
  LayoutDashboard, FileText, Users, BarChart2, Settings, Inbox,
  Shield, Palette, Database, Globe,
} from 'lucide-react';

// ─── Shared nav items ─────────────────────────────────────────────────────────
export const DEFAULT_NAV = [
  {
    group: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'inbox', label: 'Inbox', icon: Inbox, badge: 4 },
      { id: 'reports', label: 'Reports', icon: FileText },
      { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    ],
  },
  {
    group: 'Manage',
    items: [
      { id: 'users', label: 'Users', icon: Users },
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
      { id: 'reports-weekly', label: 'Weekly', icon: FileText },
      { id: 'reports-monthly', label: 'Monthly', icon: FileText },
      { id: 'reports-annual', label: 'Annual', icon: FileText },
    ],
  },
  {
    id: 'team', label: 'Team', icon: Users,
    children: [
      { id: 'team-members', label: 'Members', icon: Users },
      { id: 'team-permissions', label: 'Permissions', icon: Shield },
    ],
  },
  {
    id: 'settings', label: 'Settings', icon: Settings,
    children: [
      { id: 'settings-general', label: 'General', icon: Settings },
      { id: 'settings-appearance', label: 'Appearance', icon: Palette },
      { id: 'settings-data', label: 'Data', icon: Database },
      { id: 'settings-integrations', label: 'Integrations', icon: Globe },
    ],
  },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
];

function formatRouteFallback(activeId) {
  return activeId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export function breadcrumbLabelFromGrouped(nav, activeId) {
  const item = nav.flatMap(g => g.items).find(i => i.id === activeId);
  return item?.label ?? formatRouteFallback(activeId);
}

export function mainTabItemsFromGroupedNav(nav) {
  const main = nav.find(g => g.group === 'Main');
  return (main?.items ?? []).map(({ id, label, icon }) => ({ id, label, icon }));
}

export function mainTabIdSet(nav) {
  return new Set(mainTabItemsFromGroupedNav(nav).map(t => t.id));
}

export function sidebarGroupedNavForHeaderVariant(nav, headerVariant) {
  if (headerVariant !== 'tabs') return nav;
  const ids = mainTabIdSet(nav);
  return nav
    .map(g => ({ ...g, items: g.items.filter(i => !ids.has(i.id)) }))
    .filter(g => g.items.length > 0);
}

export function findNestedTreeLabel(tree, activeId) {
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

export function nestedTopLevelOwner(tree, activeId) {
  for (const item of tree) {
    if (item.id === activeId) return item;
    if (item.children?.some(c => c.id === activeId)) return item;
  }
  return tree[0];
}

export function nestedTabsFromTree(tree) {
  return tree.map(({ id, label, icon }) => ({ id, label, icon }));
}

export const PageContent = ({ active }) => (
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

export const Logo = ({ collapsed = false }) => (
  <div className="flex items-center gap-2.5 overflow-hidden">
    <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
      <span className="text-white text-xs font-bold">U</span>
    </div>
    {!collapsed && <span className="text-sm font-semibold text-foreground whitespace-nowrap">UI Library</span>}
  </div>
);
