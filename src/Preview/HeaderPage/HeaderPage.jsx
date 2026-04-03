import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

import AppHeaderFull   from '@/Components/Header/AppHeaderFull';
import AppHeaderMinimal from '@/Components/Header/AppHeaderMinimal';
import AppHeaderAction  from '@/Components/Header/AppHeaderAction';
import HeaderPreviewSection from './HeaderPreviewSection';

import appHeaderFullCode    from '@/Components/Header/AppHeaderFull.jsx?raw';
import appHeaderMinimalCode from '@/Components/Header/AppHeaderMinimal.jsx?raw';
import appHeaderActionCode  from '@/Components/Header/AppHeaderAction.jsx?raw';

// ─── Shared demo data ──────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: 'Dashboard', id: 'dashboard' },
  { label: 'Analytics', id: 'analytics' },
  { label: 'Reports',   id: 'reports'   },
  { label: 'Settings',  id: 'settings'  },
];

const LogoMark = () => (
  <span className="w-7 h-7 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm select-none">
    U
  </span>
);

// ─── Page ──────────────────────────────────────────────────────────────────────

const HeaderPage = () => {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-1">Header</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Fully dynamic app headers — each variant is a separate component with its own props.
      </p>

      {/* ── 1. Full featured ── */}
      <HeaderPreviewSection label="App Header — Full Featured" code={appHeaderFullCode}>
        <div className="bg-muted/30">
          <AppHeaderFull
            logo={<LogoMark />}
            title="UI Library"
            nav={NAV_ITEMS}
            activeNavId={activeNav}
            onNavChange={setActiveNav}
            searchPlaceholder="Search components…"
            onSearch={setSearchQuery}
            notificationCount={4}
            user={{ name: 'Jane Cooper', subtitle: 'Admin' }}
            sticky={false}
          />
          <div className="flex items-center justify-center h-40 text-sm text-muted-foreground gap-6">
            <span>
              Active nav: <span className="font-medium text-foreground">{activeNav}</span>
            </span>
            {searchQuery && (
              <span>
                Search: <span className="font-medium text-foreground">"{searchQuery}"</span>
              </span>
            )}
          </div>
        </div>
      </HeaderPreviewSection>

      {/* ── 2. Minimal ── */}
      <HeaderPreviewSection label="App Header — Minimal" code={appHeaderMinimalCode}>
        <div className="bg-muted/30">
          <AppHeaderMinimal
            logo={<LogoMark />}
            title="UI Library"
            searchPlaceholder="Quick search…"
            user={{ name: 'Jane Cooper', subtitle: 'Designer' }}
            sticky={false}
          />
          <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
            Logo · Search · User — nothing else.
          </div>
        </div>
      </HeaderPreviewSection>

      {/* ── 3. Search + Action ── */}
      <HeaderPreviewSection label="App Header — Search + Action" code={appHeaderActionCode}>
        <div className="bg-muted/30">
          <AppHeaderAction
            logo={<LogoMark />}
            title="UI Library"
            searchPlaceholder="Search…"
            actions={
              <Button size="sm" className="gap-1.5 h-8 text-xs">
                <Plus size={13} /> New item
              </Button>
            }
            sticky={false}
          />
          <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
            Logo · Search · Custom CTA button.
          </div>
        </div>
      </HeaderPreviewSection>
    </div>
  );
};

export default HeaderPage;