import React, { useState } from 'react';
import ProfileSettings from '@/Components/Profile/ProfileSettings';
import AuthPreviewWrapper from '../AuthPages/AuthPreviewWrapper';
import profileSettingsCode from '@/Components/Profile/ProfileSettings.jsx?raw';

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
    <AuthPreviewWrapper
      title="Profile Settings"
      description="Full settings page with profile info, password change, notification preferences, privacy controls, and danger zone."
      code={profileSettingsCode}
    >
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
    </AuthPreviewWrapper>
  );
};

export default ProfileSettingsPage;