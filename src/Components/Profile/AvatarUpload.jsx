import React from 'react';
import ClickAvatarUpload from './AvatarUploadClick';
import DragDropAvatarUpload from './AvatarUploadDragDrop';
import ModalAvatarUpload from './AvatarUploadModal';

export { ClickAvatarUpload, DragDropAvatarUpload, ModalAvatarUpload };

export default function AvatarUploadShowcase() {
  return (
    <div className="p-8 max-w-3xl mx-auto flex flex-col gap-12">
      <div>
        <h1 className="text-xl font-bold mb-1">Avatar Upload Components</h1>
        <p className="text-sm text-muted-foreground">Three variants — all individually exportable.</p>
      </div>

      {[
        { label: 'Click to Upload', Component: ClickAvatarUpload },
        { label: 'Drag & Drop', Component: DragDropAvatarUpload },
        { label: 'Modal / Dialog', Component: ModalAvatarUpload },
      ].map(({ label, Component }) => (
        <div key={label}>
          <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground mb-5">{label}</p>
          <Component
            name="Alex Johnson"
            onSave={(url) => console.log('Saved:', url)}
            onRemove={() => console.log('Removed')}
          />
        </div>
      ))}
    </div>
  );
}