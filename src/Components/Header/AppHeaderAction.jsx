import React, { useRef, useState } from 'react';
import { Search, X } from 'lucide-react';

/**
 * AppHeaderAction — Header with logo, search bar, and a custom
 * actions slot (e.g. a CTA button). No nav links, no bell, no user.
 *
 * Props:
 *  - logo              {node}    Logo element rendered before title.
 *  - title             {string}  Brand name shown next to logo.
 *  - searchPlaceholder {string}  Input placeholder. Default 'Search…'.
 *  - onSearch          {fn}      Called with query string on change.
 *  - searchValue       {string}  Controlled search value (optional).
 *  - actions           {node}    Slot for custom action buttons (right side).
 *  - sticky            {bool}    Stick to top. Default true.
 *  - border            {bool}    Bottom border. Default true.
 *  - className         {string}  Extra classes on root element.
 */
const AppHeaderAction = ({
  logo,
  title,
  searchPlaceholder = 'Search…',
  onSearch,
  searchValue,
  actions,
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
      {/* Logo + Title */}
      <div className="flex items-center gap-2.5 shrink-0">
        {logo && <span className="shrink-0">{logo}</span>}
        {title && (
          <span className="text-sm font-semibold tracking-wide truncate">
            {title}
          </span>
        )}
      </div>

      <div className="flex-1" />

      {/* Search */}
      <div
        className={[
          'flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all',
          'bg-muted/50 w-48 sm:w-56 md:w-72',
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

      {/* Custom actions slot */}
      {actions && (
        <div className="flex items-center gap-2 shrink-0">
          {actions}
        </div>
      )}
    </header>
  );
};

export default AppHeaderAction;