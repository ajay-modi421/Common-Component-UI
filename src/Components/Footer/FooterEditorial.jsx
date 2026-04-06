import React, { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Separator } from '@/Components/ui/separator';

/**
 * Editorial footer: contact block, menu, posts, newsletter + socials.
 * Uses shadcn Input, Button, Label, Separator.
 */
const FooterEditorial = ({
  contactLines = [],
  menuLinks = [],
  recentPosts = [],
  newsletter = { placeholder: 'Your email address', buttonLabel: 'Sign up' },
  socials = [],
  brandTitle = 'Editorial',
  copyright = '',
  credit = null,
  onNewsletterSubmit,
}) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNewsletterSubmit?.(email);
    setEmail('');
  };

  return (
    <footer className="bg-card text-card-foreground border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-foreground">
              Contact
            </h3>
            <div className="flex flex-col gap-1.5 text-sm leading-relaxed text-muted-foreground">
              {contactLines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>

          <nav aria-label="Menu">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-foreground">Menu</h3>
            <ul className="flex flex-col gap-2">
              {menuLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Recent posts">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-foreground">
              Recent posts
            </h3>
            <ul className="flex flex-col gap-2">
              {recentPosts.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-foreground">
              Newsletter
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <div className="flex-1 space-y-1.5">
                <Label htmlFor="footer-newsletter-email" className="sr-only">
                  Email
                </Label>
                <Input
                  id="footer-newsletter-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder={newsletter.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-ring/30"
                />
              </div>
              <Button
                type="submit"
                className="h-10 shrink-0 rounded-md bg-primary px-5 text-xs font-semibold uppercase tracking-wide text-primary-foreground hover:bg-primary/90"
              >
                {newsletter.buttonLabel}
              </Button>
            </form>
            {socials.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
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

        <Separator className="my-12 bg-border" />

        <div className="text-center">
          <p className="text-base font-semibold text-foreground">{brandTitle}</p>
          {copyright && <p className="mt-2 text-xs text-muted-foreground">{copyright}</p>}
          {credit}
        </div>
      </div>
    </footer>
  );
};

export default FooterEditorial;
