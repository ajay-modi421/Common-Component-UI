import React, { useRef, useState } from 'react';
import { Search, Bell, ChevronDown, X, Menu } from 'lucide-react';

/**
 * AppHeaderFull — Full-featured header with logo, inline nav,
 * search bar, notification bell, and user chip.
 *
 * Props:
 *  - logo              {node}    Logo element rendered before title.
 *  - title             {string}  Brand name shown next to logo.
 *  - nav               {Array}   [{ label, id, onClick? }]
 *  - activeNavId       {string}  Controlled active nav id.
 *  - onNavChange       {fn}      Called with id on nav click.
 *  - searchPlaceholder {string}  Input placeholder. Default 'Search…'.
 *  - onSearch          {fn}      Called with query string on change.
 *  - searchValue       {string}  Controlled search value (optional).
 *  - notificationCount {number}  Badge count on bell. 0 hides badge.
 *  - onNotificationClick {fn}    Called when bell is clicked.
 *  - user              {object}  { name, subtitle, avatar }
 *  - onUserClick       {fn}      Called when user chip is clicked.
 *  - onMobileMenuToggle {fn}     Shows hamburger when provided.
 *  - sticky            {bool}    Stick to top. Default true.
 *  - border            {bool}    Bottom border. Default true.
 *  - className         {string}  Extra classes on root element.
 */
const AppHeaderFull = ({
  logo,
  title,
  nav = [],
  activeNavId,
  onNavChange,
  searchPlaceholder = 'Search…',
  onSearch,
  searchValue,
  notificationCount = 0,
  onNotificationClick,
  user,
  onUserClick,
  onMobileMenuToggle,
  sticky = true,
  border = true,
  className = '',
}) => {
  const [internalQuery, setInternalQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const inputRef = useRef(null);

  const query = searchValue !== undefined ? searchValue : internalQuery;

  const handleSearchChange = (e) => {
    const val = e.target.value;
    if (searchValue === undefined) setInternalQuery(val);
    onSearch?.(val);
  };

  const clearSearch = () => {
    if (searchValue === undefined) setInternalQuery('');
    onSearch?.('');
    inputRef.current?.focus();
  };

  return (
    <header
      className={[
        'h-14 w-full flex items-center gap-4 px-4 bg-background text-foreground',
        border ? 'border-b border-border' : '',
        sticky ? 'sticky top-0 z-40' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Mobile hamburger */}
      {onMobileMenuToggle && (
        <button
          type="button"
          onClick={onMobileMenuToggle}
          className="shrink-0 md:hidden p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Toggle menu"
        >
          <Menu size={18} />
        </button>
      )}

      {/* Logo + Title */}
      <div className="flex items-center gap-2.5 shrink-0">
        {logo && <span className="shrink-0">{logo}</span>}
        {title && (
          <span className="text-sm font-semibold tracking-wide truncate hidden sm:block">
            {title}
          </span>
        )}
      </div>

      {/* Inline nav */}
      {nav.length > 0 && (
        <nav className="hidden md:flex items-center gap-0.5 shrink-0">
          {nav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                item.onClick?.();
                onNavChange?.(item.id);
              }}
              className={[
                'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                activeNavId === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted',
              ].join(' ')}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}

      <div className="flex-1" />

      {/* Search */}
      <div
        className={[
          'flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all text-sm',
          'bg-muted/50 w-48 sm:w-56 md:w-64',
          searchFocused
            ? 'border-primary ring-1 ring-primary/30 bg-background'
            : 'border-border hover:border-muted-foreground/40',
        ].join(' ')}
      >
        <Search size={14} className="shrink-0 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleSearchChange}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          placeholder={searchPlaceholder}
          className="flex-1 bg-transparent outline-none placeholder-muted-foreground text-foreground text-xs min-w-0"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Notification bell */}
      <button
        type="button"
        onClick={onNotificationClick}
        className="relative shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        aria-label="Notifications"
      >
        <Bell size={17} />
        {notificationCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[0.6rem] font-bold leading-none">
            {notificationCount > 99 ? '99+' : notificationCount}
          </span>
        )}
      </button>

      {/* User chip */}
      {user && (
        <button
          type="button"
          onClick={onUserClick}
          className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted transition-colors shrink-0 group"
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-border shrink-0"
            />
          ) : (
            <span className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold shrink-0 ring-1 ring-border">
              {(user.name ?? '?')[0].toUpperCase()}
            </span>
          )}
          <div className="hidden sm:flex flex-col items-start leading-tight">
            <span className="text-xs font-medium text-foreground truncate max-w-[100px]">
              {user.name}
            </span>
            {user.subtitle && (
              <span className="text-[0.65rem] text-muted-foreground truncate max-w-[100px]">
                {user.subtitle}
              </span>
            )}
          </div>
          <ChevronDown
            size={13}
            className="text-muted-foreground group-hover:text-foreground transition-colors hidden sm:block"
          />
        </button>
      )}
    </header>
  );
};

export default AppHeaderFull;