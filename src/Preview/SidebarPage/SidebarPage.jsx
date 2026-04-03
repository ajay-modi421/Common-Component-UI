import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Settings,
  Bell,
  FileText,
  BarChart2,
  LogOut,
  Info,
  Tag,
  Star,
} from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Separator } from '@/Components/ui/separator';

import LeftSidebar from '@/Components/Sidebar/LeftSidebar';
import RightSidebar from '@/Components/Sidebar/RightSidebar';
import SidebarPreviewSection from './SidebarPreviewSection';

import leftSidebarCode   from '@/Components/Sidebar/LeftSidebar.jsx?raw';
import rightSidebarCode  from '@/Components/Sidebar/RightSidebar.jsx?raw';

// ─── Demo data ────────────────────────────────────────────────────────────────

const LEFT_NAV = [
  {
    group: 'Main',
    items: [
      { label: 'Dashboard',  id: 'dashboard',  icon: <LayoutDashboard size={15} /> },
      { label: 'Analytics',  id: 'analytics',  icon: <BarChart2 size={15} />, badge: 'New' },
      { label: 'Reports',    id: 'reports',    icon: <FileText size={15} /> },
    ],
  },
  {
    group: 'Manage',
    items: [
      { label: 'Users',      id: 'users',      icon: <Users size={15} />, badge: 3 },
      { label: 'Billing',    id: 'billing',    icon: <Tag size={15} /> },
      { label: 'Favourites', id: 'favourites', icon: <Star size={15} /> },
    ],
  },
  {
    group: 'System',
    items: [
      { label: 'Settings',    id: 'settings',    icon: <Settings size={15} /> },
      { label: 'Notifications', id: 'notif',    icon: <Bell size={15} />, badge: 5 },
    ],
  },
];

const RIGHT_SECTIONS = [
  {
    label: 'Details',
    content: (
      <div className="flex flex-col gap-2 text-sm">
        {[
          { key: 'Status',   value: 'Active' },
          { key: 'Role',     value: 'Admin' },
          { key: 'Joined',   value: 'Jan 2024' },
          { key: 'Plan',     value: 'Pro' },
        ].map(({ key, value }) => (
          <div key={key} className="flex items-center justify-between py-1">
            <span className="text-muted-foreground text-xs">{key}</span>
            <span className="font-medium text-xs">{value}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    label: 'Activity',
    content: (
      <div className="flex flex-col gap-2">
        {[
          'Updated profile photo',
          'Changed password',
          'Added payment method',
          'Invited 2 members',
        ].map((event, i) => (
          <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            {event}
          </div>
        ))}
      </div>
    ),
  },
  {
    label: 'Actions',
    content: (
      <div className="flex flex-col gap-2">
        <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-xs">
          <Info size={13} /> View full profile
        </Button>
        <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-xs text-destructive hover:text-destructive">
          <LogOut size={13} /> Revoke access
        </Button>
      </div>
    ),
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const SidebarPage = () => {
  const [leftActive, setLeftActive] = useState('dashboard');

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-1">Sidebar</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Fully dynamic sidebars — nav groups, badges, icons, collapsible groups, sections and
        footers are all prop-driven.
      </p>

      {/* ── Left Sidebar ── */}
      <SidebarPreviewSection label="Left Sidebar — Navigation" code={leftSidebarCode}>
        <div className="flex h-[420px] bg-muted/30">
          <LeftSidebar
            title="UI Library"
            width="sm"
            nav={LEFT_NAV}
            activeId={leftActive}
            onNavChange={setLeftActive}
            collapsible
            footer={
              <button
                type="button"
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <LogOut size={15} />
                Sign out
              </button>
            }
          />
          {/* Placeholder content area */}
          <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
            Active page: <span className="ml-1 font-medium text-foreground">{leftActive}</span>
          </div>
        </div>
      </SidebarPreviewSection>

      {/* ── Right Sidebar ── */}
      <SidebarPreviewSection label="Right Sidebar — Detail Panel" code={rightSidebarCode}>
        <div className="flex h-[420px] bg-muted/30">
          {/* Placeholder content area */}
          <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
            Main content area
          </div>
          <RightSidebar
            title="User Details"
            description="Selected: Jane Cooper"
            width="md"
            sections={RIGHT_SECTIONS}
            footer={
              <Button size="sm" className="w-full">
                Save changes
              </Button>
            }
          />
        </div>
      </SidebarPreviewSection>
    </div>
  );
};

export default SidebarPage;