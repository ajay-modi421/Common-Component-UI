import React, { useState } from 'react';
import ProfileSettings from '@/Components/Profile/ProfileSettings';

// ─── Preview section wrapper ──────────────────────────────────────────────────
const Section = ({ label, children }) => (
  <div className="mb-10">
    <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
      {label}
    </p>
    {children}
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const ProfileSettingsPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = (type) => (data) => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
    console.log(`Save ${type}:`, data);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-1">Profile Settings</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Full settings page with profile info, password change, notification preferences, privacy controls, and danger zone.
      </p>

      <Section label="Default">
        <ProfileSettings
          onSaveProfile={handleSave('profile')}
          onSavePassword={handleSave('password')}
          onSaveNotifications={handleSave('notifications')}
          onDeleteAccount={() => alert('Delete account clicked')}
          isLoading={isLoading}
        />
      </Section>

      <Section label="Loading State">
        <ProfileSettings
          onSaveProfile={() => {}}
          onSavePassword={() => {}}
          onSaveNotifications={() => {}}
          onDeleteAccount={() => {}}
          isLoading={true}
        />
      </Section>

    </div>
  );
};

export default ProfileSettingsPage;