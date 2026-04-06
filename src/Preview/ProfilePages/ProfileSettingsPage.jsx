import React, { useState } from 'react';
import ProfileSettingsProfile from '@/Components/Profile/ProfileSettingsProfile';
import ProfileSettingsPassword from '@/Components/Profile/ProfileSettingsPassword';
import ProfileSettingsNotifications from '@/Components/Profile/ProfileSettingsNotifications';
import ProfileSettingsPrivacy from '@/Components/Profile/ProfileSettingsPrivacy';
import ProfileSettingsDanger from '@/Components/Profile/ProfileSettingsDanger';
import DialogPreviewSection from '../DialogBoxPage/DialogPreviewSection';
import profileSettingsProfileCode from '@/Components/Profile/ProfileSettingsProfile.jsx?raw';
import profileSettingsPasswordCode from '@/Components/Profile/ProfileSettingsPassword.jsx?raw';
import profileSettingsNotificationsCode from '@/Components/Profile/ProfileSettingsNotifications.jsx?raw';
import profileSettingsPrivacyCode from '@/Components/Profile/ProfileSettingsPrivacy.jsx?raw';
import profileSettingsDangerCode from '@/Components/Profile/ProfileSettingsDanger.jsx?raw';

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
        Modular account settings — each section has its own UI and code view.
      </p>

      <DialogPreviewSection label="Profile — Information" code={profileSettingsProfileCode}>
        <div className="w-full max-w-[640px]">
          <ProfileSettingsProfile
            onSaveProfile={handleSave('profile')}
            isLoading={isLoading}
          />
        </div>
      </DialogPreviewSection>

      <DialogPreviewSection label="Password — Change password" code={profileSettingsPasswordCode}>
        <div className="w-full max-w-[640px]">
          <ProfileSettingsPassword
            onSavePassword={handleSave('password')}
            isLoading={isLoading}
          />
        </div>
      </DialogPreviewSection>

      <DialogPreviewSection label="Notifications — Email & push" code={profileSettingsNotificationsCode}>
        <div className="w-full max-w-[640px]">
          <ProfileSettingsNotifications
            onSaveNotifications={handleSave('notifications')}
            isLoading={isLoading}
          />
        </div>
      </DialogPreviewSection>

      <DialogPreviewSection label="Privacy — Security & visibility" code={profileSettingsPrivacyCode}>
        <div className="w-full max-w-[640px]">
          <ProfileSettingsPrivacy />
        </div>
      </DialogPreviewSection>

      <DialogPreviewSection label="Danger zone — Delete account" code={profileSettingsDangerCode}>
        <div className="w-full max-w-[640px]">
          <ProfileSettingsDanger onDeleteAccount={() => alert('Delete account clicked')} />
        </div>
      </DialogPreviewSection>
    </div>
  );
};

export default ProfileSettingsPage;
