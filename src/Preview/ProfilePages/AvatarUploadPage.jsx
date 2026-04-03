import React from 'react';
import {
  ClickAvatarUpload,
  DragDropAvatarUpload,
  ModalAvatarUpload,
} from '@/Components/Profile/AvatarUpload';

// ─── Preview section wrapper ──────────────────────────────────────────────────
const Section = ({ label, description, children }) => (
  <div className="mb-12">
    <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
      {label}
    </p>
    {description && (
      <p className="text-xs text-muted-foreground mb-5">{description}</p>
    )}
    <div className="mt-4">{children}</div>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const AvatarUploadPage = () => {
  const handleSave = (variant) => (url) => {
    console.log(`[${variant}] Avatar saved:`, url);
  };

  const handleRemove = (variant) => () => {
    console.log(`[${variant}] Avatar removed`);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-1">Avatar Upload</h1>
      <p className="text-sm text-muted-foreground mb-10">
        Three independently exportable avatar upload components — each with image
        preview, crop &amp; zoom controls, rotation, upload progress, and remove support.
      </p>

      <Section
        label="Click to Upload"
        description="Hover the avatar to reveal the change button. Supports crop, zoom, and rotation after selection."
      >
        <div className="flex items-start">
          <ClickAvatarUpload
            name="Alex Johnson"
            onSave={handleSave('click')}
            onRemove={handleRemove('click')}
            size={96}
          />
        </div>
      </Section>

      <Section
        label="Drag & Drop"
        description="Drop an image onto the zone or click to browse. Transitions into a crop editor on file selection."
      >
        <div className="flex items-start">
          <DragDropAvatarUpload
            name="Alex Johnson"
            onSave={handleSave('dragdrop')}
            onRemove={handleRemove('dragdrop')}
          />
        </div>
      </Section>

      <Section
        label="Modal / Dialog"
        description="Click the avatar or button to open a focused dialog with drag-and-drop, crop, zoom, and rotation."
      >
        <div className="flex items-start">
          <ModalAvatarUpload
            name="Alex Johnson"
            onSave={handleSave('modal')}
            onRemove={handleRemove('modal')}
            triggerSize={80}
          />
        </div>
      </Section>
    </div>
  );
};

export default AvatarUploadPage;