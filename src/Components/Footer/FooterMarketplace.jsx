import React, { useRef, useState } from 'react';
import { Globe, MapPin } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Separator } from '@/Components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select';

/**
 * Marketplace-style footer (multi-column + back-to-top + localization).
 * Uses shadcn Button, Separator, Select.
 */
const FooterMarketplace = ({
  columns = [],
  brand = {},
  backToTopLabel = 'Back to top',
  languageOptions = [{ value: 'en', label: 'English' }],
  regionOptions = [{ value: 'in', label: 'India' }],
  defaultLanguage = 'en',
  defaultRegion = 'in',
}) => {
  const [language, setLanguage] = useState(defaultLanguage);
  const [region, setRegion] = useState(defaultRegion);
  const footerRef = useRef(null);

  const scrollTop = () => {
    const root = footerRef.current;
    // In the preview shell, the scrollable container is usually a parent with overflow-y-auto.
    // Find the nearest scrollable ancestor and scroll that; fall back to the window.
    let el = root?.parentElement;
    while (el) {
      const style = window.getComputedStyle(el);
      const overflowY = style.overflowY;
      const canScroll = (overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight;
      if (canScroll) {
        el.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      el = el.parentElement;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="bg-card text-card-foreground border-t border-border">
      <Button
        type="button"
        variant="ghost"
        onClick={scrollTop}
        className="h-12 w-full rounded-none border-0 bg-muted text-sm font-medium text-foreground shadow-none hover:bg-muted/80 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/30"
      >
        {backToTopLabel}
      </Button>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
          {columns.map(({ title, links }) => (
            <nav key={title} aria-label={title}>
              <p className="mb-3 text-sm font-semibold text-foreground">{title}</p>
              <ul className="flex flex-col gap-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-xs leading-snug text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <Separator className="bg-border" />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-8 sm:flex-row sm:justify-center">
        {(brand.logo || brand.name) && (
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-3">
            {brand.logo}
            {brand.name && (
              <span className="text-center text-lg font-semibold tracking-tight text-foreground sm:text-left">
                {brand.name}
              </span>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger
              size="sm"
              className="h-9 w-[150px] border-border bg-background text-xs text-foreground hover:bg-muted focus:ring-ring/20 [&_svg]:text-muted-foreground"
            >
              <Globe className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger
              size="sm"
              className="h-9 w-[130px] border-border bg-background text-xs text-foreground hover:bg-muted focus:ring-ring/20 [&_svg]:text-muted-foreground"
            >
              <MapPin className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              {regionOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </footer>
  );
};

export default FooterMarketplace;
