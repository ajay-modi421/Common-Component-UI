import React, { useState } from 'react';
import AppDialog from '@/Components/DialogBox/Dialog';
import { Button } from '@/Components/ui/button';
import DialogPreviewSection from './DialogPreviewSection';
import dialogDefaultCode from '@/Components/DialogBox/DialogDefault.jsx?raw';
import dialogFormCode from '@/Components/DialogBox/DialogForm.jsx?raw';
import dialogAlertCode from '@/Components/DialogBox/DialogAlert.jsx?raw';
import dialogScrollableCode from '@/Components/DialogBox/DialogScrollable.jsx?raw';

// ─── Section wrapper ──────────────────────────────────────────────────────────
const Section = ({ label, children }) => (
  <div className="mb-10">
    <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
      {label}
    </p>
    <div className="flex flex-wrap gap-3">
      {children}
    </div>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const AppDialogPage = () => {

  // ── Variant 1: Default info dialog ────────────────────────────────────────
  const [infoOpen, setInfoOpen] = useState(false);

  // ── Variant 2: Form dialog ────────────────────────────────────────────────
  const [formOpen, setFormOpen]     = useState(false);
  const [formValues, setFormValues] = useState({ name: '', email: '', bio: '' });
  const [saving, setSaving]         = useState(false);

  const handleFormChange = ({ name, value }) =>
    setFormValues(prev => ({ ...prev, [name]: value }));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setFormOpen(false);
    }, 1500);
  };

  // ── Variant 3: Alert / confirm dialog ─────────────────────────────────────
  const [alertOpen, setAlertOpen] = useState(false);

  // ── Variant 4: Scrollable dialog ──────────────────────────────────────────
  const [scrollOpen, setScrollOpen] = useState(false);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-1">Dialog</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Fully dynamic dialog — variant, size, fields, actions and body content are all prop-driven.
      </p>

      {/* ── Variant 1: Default info ── */}
      <DialogPreviewSection label="Default — Info Dialog" code={dialogDefaultCode}>
        <Button onClick={() => setInfoOpen(true)}>Open Info Dialog</Button>
        <AppDialog
          open={infoOpen}
          onOpenChange={setInfoOpen}
          title="What's new in v2.0"
          description="Here's a summary of the latest updates and improvements."
          size="md"
          actions={[
            {
              label: 'Got it',
              variant: 'default',
              onClick: () => setInfoOpen(false),
            },
          ]}
        >
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li>Redesigned dashboard with new widgets</li>
            <li>Improved dark mode support across all components</li>
            <li>New data table with sorting, filtering and pagination</li>
            <li>Performance improvements and bug fixes</li>
          </ul>
        </AppDialog>
      </DialogPreviewSection>

      {/* ── Variant 2: Form dialog ── */}
      <DialogPreviewSection label="Form — Edit Profile" code={dialogFormCode}>
        <Button onClick={() => setFormOpen(true)}>Open Form Dialog</Button>
        <AppDialog
          open={formOpen}
          onOpenChange={setFormOpen}
          title="Edit Profile"
          description="Update your personal information below."
          variant="form"
          size="md"
          fields={[
            { name: 'name',  label: 'Full Name', type: 'text',     placeholder: 'John Doe',          required: true },
            { name: 'email', label: 'Email',     type: 'email',    placeholder: 'john@example.com',  required: true },
            { name: 'bio',   label: 'Bio',       type: 'textarea', placeholder: 'Tell us about you…' },
          ]}
          formValues={formValues}
          onFormChange={handleFormChange}
          actions={[
            {
              label: 'Cancel',
              variant: 'outline',
              onClick: () => setFormOpen(false),
            },
            {
              label: 'Save Changes',
              variant: 'default',
              onClick: handleSave,
              loading: saving,
            },
          ]}
        />
      </DialogPreviewSection>

      {/* ── Variant 3: Alert / destructive confirm ── */}
      <DialogPreviewSection label="Alert — Confirm Delete" code={dialogAlertCode}>
        <Button variant="destructive" onClick={() => setAlertOpen(true)}>
          Delete Account
        </Button>
        <AppDialog
          open={alertOpen}
          onOpenChange={setAlertOpen}
          variant="alert"
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete your account and remove all your data from our servers."
          actions={[
            {
              label: 'Cancel',
              role: 'cancel',
              onClick: () => setAlertOpen(false),
            },
            {
              label: 'Yes, delete account',
              role: 'confirm',
              variant: 'destructive',
              onClick: () => setAlertOpen(false),
            },
          ]}
        />
      </DialogPreviewSection>

      {/* ── Variant 4: Scrollable ── */}
      <DialogPreviewSection label="Scrollable — Terms & Conditions" code={dialogScrollableCode}>
        <Button variant="outline" onClick={() => setScrollOpen(true)}>
          View Terms
        </Button>
        <AppDialog
          open={scrollOpen}
          onOpenChange={setScrollOpen}
          title="Terms & Conditions"
          description="Please read the following carefully before proceeding."
          variant="scrollable"
          size="md"
          actions={[
            {
              label: 'Decline',
              variant: 'outline',
              onClick: () => setScrollOpen(false),
            },
            {
              label: 'Accept',
              variant: 'default',
              onClick: () => setScrollOpen(false),
            },
          ]}
        >
          {[...Array(8)].map((_, i) => (
            <p key={i} className="text-sm text-muted-foreground mb-4">
              {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          ))}
        </AppDialog>
      </DialogPreviewSection>

    </div>
  );
};

export default AppDialogPage;