import React, { useState, useRef, useEffect } from 'react';
import {
  Search, Bell, Sun, Moon, ChevronRight, Settings, LogOut,
  User, HelpCircle, LayoutDashboard, FileText, Users, BarChart2,
  Inbox, X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── Shared avatar helper ─────────────────────────────────────────────────────
const GRADIENTS = [
  'from-blue-500 to-indigo-600',
  'from-violet-500 to-purple-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-teal-600',
];
function getGradient(name = '') {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return GRADIENTS[Math.abs(h) % GRADIENTS.length];
}
function getInitials(name = '') {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';
}

// ─── User dropdown (shared) ───────────────────────────────────────────────────
const UserDropdown = ({ name, email, avatar, onToggleTheme, isDark }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(p => !p)}
        className="flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {avatar
          ? <img src={avatar} alt={name} className="w-8 h-8 rounded-full object-cover ring-2 ring-border" />
          : (
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white bg-gradient-to-br ring-2 ring-border ${getGradient(name)}`}>
              {getInitials(name)}
            </div>
          )
        }
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-52 rounded-xl border border-border bg-card shadow-xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-medium text-foreground truncate">{name}</p>
            <p className="text-xs text-muted-foreground truncate">{email}</p>
          </div>
          <div className="py-1">
            {[
              { icon: User, label: 'Profile' },
              { icon: Settings, label: 'Settings' },
              { icon: HelpCircle, label: 'Help' },
            ].map(({ icon: Icon, label }) => (
              <button key={label} className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                <Icon size={14} className="text-muted-foreground" /> {label}
              </button>
            ))}
          </div>
          <div className="border-t border-border py-1">
            <button
              onClick={onToggleTheme}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
            >
              {isDark ? <Sun size={14} className="text-muted-foreground" /> : <Moon size={14} className="text-muted-foreground" />}
              {isDark ? 'Light mode' : 'Dark mode'}
            </button>
            <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors">
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Notification bell ────────────────────────────────────────────────────────
const NotifBell = ({ count = 3 }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const notifs = [
    { title: 'New comment on your post', time: '2m ago' },
    { title: 'You have a new follower', time: '1h ago' },
    { title: 'Your report is ready', time: '3h ago' },
  ].slice(0, count);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(p => !p)}
        className="relative w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        <Bell size={16} />
        {count > 0 && (
          <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-blue-500 text-white text-[9px] font-bold flex items-center justify-center">
            {count}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-10 w-72 rounded-xl border border-border bg-card shadow-xl z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <p className="text-sm font-semibold text-foreground">Notifications</p>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground"><X size={14} /></button>
          </div>
          {notifs.map((n, i) => (
            <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-muted transition-colors border-b border-border last:border-0 cursor-pointer">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
              <div>
                <p className="text-xs text-foreground">{n.title}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{n.time}</p>
              </div>
            </div>
          ))}
          <div className="px-4 py-2.5 text-center">
            <button className="text-xs text-blue-500 hover:underline">View all notifications</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// 1. MINIMAL HEADER — just title + actions
// ═══════════════════════════════════════════════════════════════════════════════
export const MinimalHeader = ({
  title = 'Dashboard',
  onToggleTheme,
  isDark = false,
  user = { name: 'Alex Johnson', email: 'alex@example.com', avatar: null },
  actions,
}) => (
  <header className="h-14 px-5 flex items-center justify-between border-b border-border bg-background shrink-0">
    <h1 className="text-sm font-semibold text-foreground">{title}</h1>
    <div className="flex items-center gap-2">
      {actions}
      <button
        onClick={onToggleTheme}
        className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        {isDark ? <Sun size={15} /> : <Moon size={15} />}
      </button>
      <NotifBell count={3} />
      <UserDropdown {...user} onToggleTheme={onToggleTheme} isDark={isDark} />
    </div>
  </header>
);

// ═══════════════════════════════════════════════════════════════════════════════
// 2. FULL HEADER — breadcrumb + search + user avatar
// ═══════════════════════════════════════════════════════════════════════════════
export const FullHeader = ({
  breadcrumbs = ['Home', 'Settings'],
  onToggleTheme,
  isDark = false,
  user = { name: 'Alex Johnson', email: 'alex@example.com', avatar: null },
  onSearch,
}) => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  return (
    <header className="h-14 px-5 flex items-center gap-4 border-b border-border bg-background shrink-0">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 shrink-0">
        {breadcrumbs.map((crumb, i) => (
          <React.Fragment key={i}>
            {i > 0 && <ChevronRight size={13} className="text-muted-foreground" />}
            <span className={`text-sm ${i === breadcrumbs.length - 1 ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground cursor-pointer transition-colors'}`}>
              {crumb}
            </span>
          </React.Fragment>
        ))}
      </nav>

      {/* Search */}
      <div className={`flex items-center gap-2 flex-1 max-w-xs rounded-lg border px-3 py-1.5 transition-all duration-200 ${focused ? 'border-blue-500 bg-background' : 'border-border bg-muted/50'}`}>
        <Search size={13} className="text-muted-foreground shrink-0" />
        <input
          value={query}
          onChange={e => { setQuery(e.target.value); onSearch?.(e.target.value); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search…"
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none min-w-0"
        />
        {query && (
          <button onClick={() => setQuery('')} className="text-muted-foreground hover:text-foreground">
            <X size={12} />
          </button>
        )}
      </div>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={onToggleTheme}
          className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
        <NotifBell count={3} />
        <UserDropdown {...user} onToggleTheme={onToggleTheme} isDark={isDark} />
      </div>
    </header>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. TABS HEADER — tabs-based navigation
// ═══════════════════════════════════════════════════════════════════════════════
export const TabsHeader = ({
  tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'inbox', label: 'Inbox', icon: Inbox },
  ],
  /** When set, highlights the matching tab; `null` = no tab (e.g. secondary nav route). Omit for internal-only demos. */
  activeTabId,
  defaultTab,
  onTabChange,
  onToggleTheme,
  isDark = false,
  user = { name: 'Alex Johnson', email: 'alex@example.com', avatar: null },
  title = 'Workspace',
}) => {
  const isControlled = activeTabId !== undefined;
  const [internal, setInternal] = useState(defaultTab ?? tabs[0]?.id);
  const selected = isControlled
    ? (activeTabId != null && tabs.some(t => t.id === activeTabId) ? activeTabId : null)
    : internal;

  const handleTab = (id) => {
    if (!isControlled) setInternal(id);
    onTabChange?.(id);
  };

  return (
    <header className="border-b border-border bg-background shrink-0">
      {/* Top bar */}
      <div className="h-12 px-5 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <NotifBell count={2} />
          <UserDropdown {...user} onToggleTheme={onToggleTheme} isDark={isDark} />
        </div>
      </div>
      {/* Tabs row */}
      <div className="flex items-end gap-1 px-4 overflow-x-auto scrollbar-none">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => handleTab(id)}
            className={`
              flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-t-md border-b-2 transition-all whitespace-nowrap
              ${selected === id
                ? 'border-blue-500 text-blue-500 bg-blue-500/5'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }
            `}
          >
            {Icon && <Icon size={13} />}
            {label}
          </button>
        ))}
      </div>
    </header>
  );
};

export default { MinimalHeader, FullHeader, TabsHeader };