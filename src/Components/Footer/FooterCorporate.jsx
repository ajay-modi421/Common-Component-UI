import React, { useState } from 'react';
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
 * Corporate grid footer + region selector + secondary links + social row.
 * Uses shadcn Button, Separator, Select.
 */
const FooterCorporate = ({
  columns = [],
  socials = [],
  midRowLinks = [],
  regionOptions = [{ value: 'us', label: 'United States' }],
  defaultRegion = 'us',
  copyright = '',
  legalLinks = [],
}) => {
  const [region, setRegion] = useState(defaultRegion);

  return (
    <footer className="bg-card text-card-foreground border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
          {columns.map(({ title, links }) => (
            <nav key={title} aria-label={title}>
              <p className="mb-4 text-sm font-semibold text-foreground">{title}</p>
              <ul className="flex flex-col gap-2.5">
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

        <Separator className="my-10 bg-border" />

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger
              size="sm"
              className="h-9 w-[160px] border-border bg-background text-xs text-foreground hover:bg-muted"
            >
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

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            {midRowLinks.length > 0 && (
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                {midRowLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {socials.length > 0 && (
              <div className="flex items-center gap-2">
                {socials.map(({ label, href, icon }) => (
                  <Button
                    key={label}
                    variant="outline"
                    size="icon-sm"
                    className="border-border bg-background text-foreground hover:bg-muted hover:text-foreground"
                    asChild
                  >
                    <a href={href} aria-label={label}>
                      {icon}
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        <div className="space-y-3">
          {copyright && <p className="text-[11px] text-muted-foreground">{copyright}</p>}
          {legalLinks.length > 0 && (
            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="transition-colors hover:text-foreground">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
};

export default FooterCorporate;
