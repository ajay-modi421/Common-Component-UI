import React from 'react';
import ProfileSettingsProfile from './ProfileSettingsProfile';
import ProfileSettingsPassword from './ProfileSettingsPassword';
import ProfileSettingsNotifications from './ProfileSettingsNotifications';
import ProfileSettingsPrivacy from './ProfileSettingsPrivacy';
import ProfileSettingsDanger from './ProfileSettingsDanger';

const ProfileSettings = ({
  onSaveProfile,
  onSavePassword,
  onSaveNotifications,
  onDeleteAccount,
  isLoading = false,
  initialProfile,
  initialNotifications,
}) => (
  <div className="flex flex-col gap-5 max-w-[640px] w-full">
    <ProfileSettingsProfile
      onSaveProfile={onSaveProfile}
      isLoading={isLoading}
      initialProfile={initialProfile}
    />
    <ProfileSettingsPassword
      onSavePassword={onSavePassword}
      isLoading={isLoading}
    />
    <ProfileSettingsNotifications
      onSaveNotifications={onSaveNotifications}
      isLoading={isLoading}
      initialNotifications={initialNotifications}
    />
    <ProfileSettingsPrivacy />
    <ProfileSettingsDanger onDeleteAccount={onDeleteAccount} />
  </div>
);

export default ProfileSettings;
