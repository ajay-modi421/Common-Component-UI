import React, { useState, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/Components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Components/ui/table';

// ─── Sort Icon ────────────────────────────────────────────────────────────────
const SortIcon = ({ direction }) => {
  if (!direction) return <ChevronsUpDown size={13} className="text-muted-foreground/50" />;
  return direction === 'asc'
    ? <ChevronUp size={13} className="text-primary" />
    : <ChevronDown size={13} className="text-primary" />;
};

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * DataTable — reusable, fully dynamic table component.
 *
 * Props:
 * @param {Array}    columns        - Column definitions (see below)
 * @param {Array}    data           - Array of row objects
 * @param {string}  [title]         - Optional table heading
 * @param {string}  [description]   - Optional subheading
 * @param {boolean} [searchable]    - Show global search bar (default: true)
 * @param {boolean} [sortable]      - Enable column sorting (default: true)
 * @param {boolean} [pagination]    - Enable pagination (default: true)
 * @param {number}  [pageSize]      - Rows per page (default: 5)
 * @param {boolean} [striped]       - Alternate row shading (default: false)
 * @param {string}  [emptyMessage]  - Message when no rows match
 * @param {Function}[onRowClick]    - Callback when a row is clicked: (row) => void
 *
 * Column definition shape:
 * {
 *   key: string,           — matches the key in data objects
 *   label: string,         — column header label
 *   sortable?: boolean,    — override sortable prop per column
 *   width?: string,        — e.g. '120px' or '20%'
 *   align?: 'left' | 'center' | 'right',
 *   render?: (value, row) => ReactNode   — custom cell renderer
 * }
 */
const DataTable = ({
  columns = [],
  data = [],
  title,
  description,
  searchable = true,
  sortable = true,
  pagination = true,
  pageSize = 5,
  striped = false,
  emptyMessage = 'No results found.',
  onRowClick,
}) => {
  const [search, setSearch]           = useState('');
  const [sortKey, setSortKey]         = useState(null);
  const [sortDir, setSortDir]         = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);

  // ── Search ─────────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter(row =>
      columns.some(col => {
        const val = row[col.key];
        return val != null && String(val).toLowerCase().includes(q);
      })
    );
  }, [data, search, columns]);

  // ── Sort ───────────────────────────────────────────────────────────────────
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      if (av == null) return 1;
      if (bv == null) return -1;
      const cmp = typeof av === 'number' && typeof bv === 'number'
        ? av - bv
        : String(av).localeCompare(String(bv));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  // ── Pagination ─────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage   = Math.min(currentPage, totalPages);
  const paginated  = pagination
    ? sorted.slice((safePage - 1) * pageSize, safePage * pageSize)
    : sorted;

  const handleSort = (col) => {
    if (!sortable || col.sortable === false) return;
    if (sortKey === col.key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(col.key);
      setSortDir('asc');
    }
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const alignClass = (align) =>
    align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';

  // ── Page numbers with ellipsis ─────────────────────────────────────────────
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(p => p === 1 || p === totalPages || Math.abs(p - safePage) <= 1)
    .reduce((acc, p, idx, arr) => {
      if (idx > 0 && p - arr[idx - 1] > 1) acc.push('…');
      acc.push(p);
      return acc;
    }, []);

  return (
    <Card className="w-full shadow-sm">

      {/* ── Card Header ── */}
      {(title || description || searchable) && (
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0 pb-4 px-6">
          <div>
            {title && <CardTitle className="text-base">{title}</CardTitle>}
            {description && <CardDescription className="mt-0.5">{description}</CardDescription>}
          </div>
          {searchable && (
            <div className="relative w-full sm:w-56">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                placeholder="Search…"
                value={search}
                onChange={handleSearch}
                className="pl-8 h-8 text-sm"
              />
            </div>
          )}
        </CardHeader>
      )}

      {/* ── Table ── */}
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map(col => {
                  const isSortable = sortable && col.sortable !== false;
                  return (
                    <TableHead
                      key={col.key}
                      style={{ width: col.width }}
                      onClick={() => isSortable && handleSort(col)}
                      className={`
                        ${alignClass(col.align)}
                        ${isSortable ? 'cursor-pointer select-none hover:text-foreground transition-colors' : ''}
                      `}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        {col.label}
                        {isSortable && <SortIcon direction={sortKey === col.key ? sortDir : null} />}
                      </span>
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="py-10 text-center text-muted-foreground">
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((row, rowIdx) => (
                  <TableRow
                    key={rowIdx}
                    onClick={() => onRowClick?.(row)}
                    className={`
                      ${striped && rowIdx % 2 !== 0 ? 'bg-muted/30' : ''}
                      ${onRowClick ? 'cursor-pointer' : ''}
                    `}
                  >
                    {columns.map(col => (
                      <TableCell
                        key={col.key}
                        className={alignClass(col.align)}
                      >
                        {col.render
                          ? col.render(row[col.key], row)
                          : row[col.key] ?? '—'}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* ── Pagination ── */}
        {pagination && totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border text-sm text-muted-foreground">
            <span>
              {sorted.length === 0
                ? '0'
                : `${(safePage - 1) * pageSize + 1}–${Math.min(safePage * pageSize, sorted.length)}`
              } of {sorted.length}
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={safePage === 1}
              >
                ‹
              </Button>
              {pageNumbers.map((p, i) =>
                p === '…' ? (
                  <span key={`ellipsis-${i}`} className="px-1">…</span>
                ) : (
                  <Button
                    key={p}
                    variant={safePage === p ? 'default' : 'outline'}
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setCurrentPage(p)}
                  >
                    {p}
                  </Button>
                )
              )}
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
              >
                ›
              </Button>
            </div>
          </div>
        )}
      </CardContent>

    </Card>
  );
};

export default DataTable;