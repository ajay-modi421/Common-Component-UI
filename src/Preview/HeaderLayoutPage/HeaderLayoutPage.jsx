import React from 'react';
import { ClassicLayout, CollapsibleLayout, DrawerLayout, NestedLayout } from '@/Components/Layouts/Layouts';
import LayoutPreviewSection from './LayoutPreviewSection';
import classicLayoutCode from '@/Components/Layouts/ClassicLayout.jsx?raw';
import collapsibleLayoutCode from '@/Components/Layouts/CollapsibleLayout.jsx?raw';
import drawerLayoutCode from '@/Components/Layouts/DrawerLayout.jsx?raw';
import nestedLayoutCode from '@/Components/Layouts/NestedLayout.jsx?raw';

const AppLayoutPage = ({ isDark, onToggleTheme }) => {
  const sharedProps = { isDark, onToggleTheme, user: { name: 'Alex Johnson', email: 'alex@example.com', avatar: null } };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-4">App Layouts</h1>

      <LayoutPreviewSection
        label="Classic — Sidebar + Minimal Header"
        description="Fixed sidebar with grouped nav items and a minimal title-only header."
        code={classicLayoutCode}
        codeFileLabel="ClassicLayout.jsx (+ LayoutShared.jsx for nav data)"
      >
        <ClassicLayout headerVariant="minimal" {...sharedProps} />
      </LayoutPreviewSection>

      <LayoutPreviewSection
        label="Classic — Sidebar + Full Header (breadcrumb + search)"
        description="Same fixed sidebar paired with the full header: one breadcrumb for the current page, search, notifications and user menu."
        code={classicLayoutCode}
        codeFileLabel="ClassicLayout.jsx"
      >
        <ClassicLayout headerVariant="full" {...sharedProps} />
      </LayoutPreviewSection>

      <LayoutPreviewSection
        label="Classic — Sidebar + Tabs Header"
        description="Top tabs list the Main routes (Dashboard, Inbox, …). The sidebar keeps only other groups (e.g. Manage) so navigation is not duplicated."
        code={classicLayoutCode}
        codeFileLabel="ClassicLayout.jsx"
      >
        <ClassicLayout headerVariant="tabs" {...sharedProps} />
      </LayoutPreviewSection>

      <LayoutPreviewSection
        label="Collapsible — Icon Rail (collapsed) + Full Header"
        description="Sidebar collapses to a narrow icon rail. Click the arrow to expand or collapse."
        code={collapsibleLayoutCode}
        codeFileLabel="CollapsibleLayout.jsx"
      >
        <CollapsibleLayout headerVariant="full" defaultCollapsed={true} {...sharedProps} />
      </LayoutPreviewSection>

      <LayoutPreviewSection
        label="Collapsible — Expanded + Minimal Header"
        description="Same collapsible sidebar, starting expanded. Toggle it to shrink to icons."
        code={collapsibleLayoutCode}
        codeFileLabel="CollapsibleLayout.jsx"
      >
        <CollapsibleLayout headerVariant="minimal" defaultCollapsed={false} {...sharedProps} />
      </LayoutPreviewSection>

      <LayoutPreviewSection
        label="Drawer — Overlay Sidebar + Minimal Header"
        description="No persistent sidebar — a hamburger button slides in a full overlay drawer. Great for compact or mobile-first layouts."
        code={drawerLayoutCode}
        codeFileLabel="DrawerLayout.jsx"
      >
        <DrawerLayout headerVariant="minimal" {...sharedProps} />
      </LayoutPreviewSection>

      <LayoutPreviewSection
        label="Drawer — Overlay Sidebar + Full Header"
        description="Drawer layout with the full header including breadcrumbs and search."
        code={drawerLayoutCode}
        codeFileLabel="DrawerLayout.jsx"
      >
        <DrawerLayout headerVariant="full" {...sharedProps} />
      </LayoutPreviewSection>

      <LayoutPreviewSection
        label="Nested Nav — Multi-level Sidebar + Full Header"
        description="Sidebar with collapsible parent → child navigation groups. Click any parent item to expand its children."
        code={nestedLayoutCode}
        codeFileLabel="NestedLayout.jsx"
      >
        <NestedLayout headerVariant="full" {...sharedProps} />
      </LayoutPreviewSection>

      <LayoutPreviewSection
        label="Nested Nav — Multi-level Sidebar + Tabs Header"
        description="Top-level routes are workspace tabs only — no left sidebar. Sections with sub-pages show a compact sub-nav row under the header (e.g. Reports → Weekly / Monthly)."
        code={nestedLayoutCode}
        codeFileLabel="NestedLayout.jsx"
      >
        <NestedLayout headerVariant="tabs" {...sharedProps} />
      </LayoutPreviewSection>
    </div>
  );
};

export default AppLayoutPage;
