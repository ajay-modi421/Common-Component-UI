import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Bell, Save } from 'lucide-react';
import { SettingsSection, ToggleRow } from './ProfileSettingsShared';

const ProfileSettingsNotifications = ({
  onSaveNotifications,
  isLoading = false,
  initialNotifications = {
    emailMarketing: false,
    emailSecurity: true,
    emailUpdates: true,
    pushAll: false,
    pushMentions: true,
  },
}) => {
  const [notifications, setNotifications] = useState(initialNotifications);

  return (
    <SettingsSection icon={Bell} title="Notifications" description="Choose what updates you want to receive.">
      <div className="flex flex-col gap-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Email</p>
        <ToggleRow label="Marketing emails" description="News, updates, and promotions." checked={notifications.emailMarketing} onChange={v => setNotifications(p => ({ ...p, emailMarketing: v }))} />
        <ToggleRow label="Security alerts" description="Sign-ins and account changes." checked={notifications.emailSecurity} onChange={v => setNotifications(p => ({ ...p, emailSecurity: v }))} />
        <ToggleRow label="Product updates" description="New features and improvements." checked={notifications.emailUpdates} onChange={v => setNotifications(p => ({ ...p, emailUpdates: v }))} />
        <Separator />
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Push</p>
        <ToggleRow label="All notifications" description="Enable all push notifications." checked={notifications.pushAll} onChange={v => setNotifications(p => ({ ...p, pushAll: v }))} />
        <ToggleRow label="Mentions only" description="Only when someone mentions you." checked={notifications.pushMentions} onChange={v => setNotifications(p => ({ ...p, pushMentions: v }))} />
      </div>
      <div className="flex justify-end">
        <Button onClick={() => onSaveNotifications?.(notifications)} disabled={isLoading} className="gap-2">
          <Save size={14} /> Save preferences
        </Button>
      </div>
    </SettingsSection>
  );
};

export default ProfileSettingsNotifications;
