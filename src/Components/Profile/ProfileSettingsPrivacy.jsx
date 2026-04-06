import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';
import { SettingsSection } from './ProfileSettingsShared';

const ProfileSettingsPrivacy = () => (
  <SettingsSection icon={Shield} title="Privacy & Security" description="Manage your account visibility and sessions.">
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between p-3 rounded-lg border border-border">
        <div>
          <p className="text-sm font-medium text-foreground">Two-factor authentication</p>
          <p className="text-xs text-muted-foreground mt-0.5">Add an extra layer of security to your account.</p>
        </div>
        <Badge variant="outline" className="text-xs text-muted-foreground">Not enabled</Badge>
      </div>
      <div className="flex items-center justify-between p-3 rounded-lg border border-border">
        <div>
          <p className="text-sm font-medium text-foreground">Active sessions</p>
          <p className="text-xs text-muted-foreground mt-0.5">1 active session on this device.</p>
        </div>
        <Button variant="outline" size="sm" className="text-xs h-8">View all</Button>
      </div>
      <div className="flex items-center justify-between p-3 rounded-lg border border-border">
        <div>
          <p className="text-sm font-medium text-foreground">Profile visibility</p>
          <p className="text-xs text-muted-foreground mt-0.5">Your profile is currently public.</p>
        </div>
        <Button variant="outline" size="sm" className="text-xs h-8">Change</Button>
      </div>
    </div>
  </SettingsSection>
);

export default ProfileSettingsPrivacy;
