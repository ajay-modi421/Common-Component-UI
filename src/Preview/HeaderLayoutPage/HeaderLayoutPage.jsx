import React from 'react';
import { ClassicLayout, CollapsibleLayout, DrawerLayout, NestedLayout } from '@/Components/Layouts/Layouts';

// ─── Section wrapper ──────────────────────────────────────────────────────────
const Section = ({ label, description, children }) => (
  <div className="mb-14">
    <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
      {label}
    </p>
    {description && (
      <p className="text-xs text-muted-foreground mb-5">{description}</p>
    )}
    <div className="mt-4 rounded-xl overflow-hidden border border-border" style={{ height: 480 }}>
      {children}
    </div>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const AppLayoutPage = ({ isDark, onToggleTheme }) => {
  const sharedProps = { isDark, onToggleTheme, user: { name: 'Alex Johnson', email: 'alex@example.com', avatar: null } };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-4">App Layouts</h1>

      <Section 
        label="Classic — Sidebar + Minimal Header"
        description="Fixed sidebar with grouped nav items and a minimal title-only header."
      >
        <ClassicLayout headerVariant="minimal" {...sharedProps} />
      </Section>

      <Section
        label="Classic — Sidebar + Full Header (breadcrumb + search)"
        description="Same fixed sidebar paired with the full header: one breadcrumb for the current page, search, notifications and user menu."
      >
        <ClassicLayout headerVariant="full" {...sharedProps} />
      </Section>

      <Section
        label="Classic — Sidebar + Tabs Header"
        description="Top tabs list the Main routes (Dashboard, Inbox, …). The sidebar keeps only other groups (e.g. Manage) so navigation is not duplicated."
      >
        <ClassicLayout headerVariant="tabs" {...sharedProps} />
      </Section>

      <Section
        label="Collapsible — Icon Rail (collapsed) + Full Header"
        description="Sidebar collapses to a narrow icon rail. Click the arrow to expand or collapse."
      >
        <CollapsibleLayout headerVariant="full" defaultCollapsed={true} {...sharedProps} />
      </Section>

      <Section
        label="Collapsible — Expanded + Minimal Header"
        description="Same collapsible sidebar, starting expanded. Toggle it to shrink to icons."
      >
        <CollapsibleLayout headerVariant="minimal" defaultCollapsed={false} {...sharedProps} />
      </Section>

      <Section
        label="Drawer — Overlay Sidebar + Minimal Header"
        description="No persistent sidebar — a hamburger button slides in a full overlay drawer. Great for compact or mobile-first layouts."
      >
        <DrawerLayout headerVariant="minimal" {...sharedProps} />
      </Section>

      <Section
        label="Drawer — Overlay Sidebar + Full Header"
        description="Drawer layout with the full header including breadcrumbs and search."
      >
        <DrawerLayout headerVariant="full" {...sharedProps} />
      </Section>

      <Section
        label="Nested Nav — Multi-level Sidebar + Full Header"
        description="Sidebar with collapsible parent → child navigation groups. Click any parent item to expand its children."
      >
        <NestedLayout headerVariant="full" {...sharedProps} />
      </Section>

      <Section
        label="Nested Nav — Multi-level Sidebar + Tabs Header"
        description="Top-level routes are workspace tabs only — no left sidebar. Sections with sub-pages show a compact sub-nav row under the header (e.g. Reports → Weekly / Monthly)."
      >
        <NestedLayout headerVariant="tabs" {...sharedProps} />
      </Section>
    </div>
  );
};

export default AppLayoutPage;