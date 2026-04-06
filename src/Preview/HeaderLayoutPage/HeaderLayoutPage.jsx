import React from 'react';
import { ClassicLayout, CollapsibleLayout, DrawerLayout, NestedLayout } from '@/Components/Layouts/Layouts';
import LayoutPreviewGroup from './LayoutPreviewGroup';
import classicLayoutCode from '@/Components/Layouts/ClassicLayout.jsx?raw';
import collapsibleLayoutCode from '@/Components/Layouts/CollapsibleLayout.jsx?raw';
import drawerLayoutCode from '@/Components/Layouts/DrawerLayout.jsx?raw';
import nestedLayoutCode from '@/Components/Layouts/NestedLayout.jsx?raw';

const AppLayoutPage = ({ isDark, onToggleTheme }) => {
  const sharedProps = { isDark, onToggleTheme, user: { name: 'Alex Johnson', email: 'alex@example.com', avatar: null } };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-4">App Layouts</h1>

      <LayoutPreviewGroup
        label="Classic — Fixed sidebar + header variants"
        description="Fixed sidebar with grouped nav items. Swap the header: minimal title, full breadcrumb + search, or tabbed main routes."
        code={classicLayoutCode}
        codeFileLabel="ClassicLayout.jsx (+ LayoutShared.jsx for nav data)"
        previews={[
          {
            key: 'classic-minimal',
            label: 'Minimal header',
            description: 'Title-only header next to the sidebar.',
            node: <ClassicLayout headerVariant="minimal" {...sharedProps} />,
          },
          {
            key: 'classic-full',
            label: 'Full header (breadcrumb + search)',
            description: 'Breadcrumb for the current page, search, notifications and user menu.',
            node: <ClassicLayout headerVariant="full" {...sharedProps} />,
          },
          {
            key: 'classic-tabs',
            label: 'Tabs header',
            description: 'Top tabs for Main routes (Dashboard, Inbox, …). The sidebar keeps other groups (e.g. Manage) so navigation is not duplicated.',
            node: <ClassicLayout headerVariant="tabs" {...sharedProps} />,
          },
        ]}
      />

      <LayoutPreviewGroup
        label="Collapsible — Sidebar icon rail"
        description="Sidebar expands to full width or collapses to a narrow icon rail. Use the chevron on the sidebar edge to toggle."
        code={collapsibleLayoutCode}
        codeFileLabel="CollapsibleLayout.jsx"
        previews={[
          {
            key: 'collapsible-collapsed-full',
            label: 'Icon rail (collapsed) + full header',
            description: 'Starts collapsed to icons; expand to see labels.',
            node: <CollapsibleLayout headerVariant="full" defaultCollapsed={true} {...sharedProps} />,
          },
          {
            key: 'collapsible-expanded-minimal',
            label: 'Expanded + minimal header',
            description: 'Starts expanded; collapse to shrink to icons.',
            node: <CollapsibleLayout headerVariant="minimal" defaultCollapsed={false} {...sharedProps} />,
          },
        ]}
      />

      <LayoutPreviewGroup
        label="Drawer — Overlay sidebar"
        description="No persistent sidebar — a control opens a full overlay drawer. Suited to compact or mobile-first layouts."
        code={drawerLayoutCode}
        codeFileLabel="DrawerLayout.jsx"
        previews={[
          {
            key: 'drawer-minimal',
            label: 'Minimal header',
            description: 'Hamburger slides in the nav over the content.',
            node: <DrawerLayout headerVariant="minimal" {...sharedProps} />,
          },
          {
            key: 'drawer-full',
            label: 'Full header',
            description: 'Same drawer with breadcrumbs, search, and user menu.',
            node: <DrawerLayout headerVariant="full" {...sharedProps} />,
          },
        ]}
      />

      <LayoutPreviewGroup
        label="Nested nav — Multi-level sidebar"
        description="Parents expand to show child routes. The tabs variant uses workspace tabs with a sub-nav row for nested sections (e.g. Reports → Weekly / Monthly)."
        code={nestedLayoutCode}
        codeFileLabel="NestedLayout.jsx"
        previews={[
          {
            key: 'nested-full',
            label: 'Full header',
            description: 'Collapsible parent → child groups in the sidebar.',
            node: <NestedLayout headerVariant="full" {...sharedProps} />,
          },
          {
            key: 'nested-tabs',
            label: 'Tabs header',
            description: 'Main routes as tabs; nested pages get a compact sub-nav under the header.',
            node: <NestedLayout headerVariant="tabs" {...sharedProps} />,
          },
        ]}
      />
    </div>
  );
};

export default AppLayoutPage;
