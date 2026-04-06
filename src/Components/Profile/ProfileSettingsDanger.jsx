import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { SettingsSection } from './ProfileSettingsShared';

const ProfileSettingsDanger = ({ onDeleteAccount }) => (
  <SettingsSection icon={Trash2} title="Danger Zone" description="Irreversible account actions.">
    <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/40 bg-destructive/5">
      <div>
        <p className="text-sm font-medium text-foreground">Delete account</p>
        <p className="text-xs text-muted-foreground mt-0.5">Permanently delete your account and all data. This cannot be undone.</p>
      </div>
      <Button variant="destructive" size="sm" className="gap-2 shrink-0 ml-4" onClick={onDeleteAccount}>
        <Trash2 size={13} /> Delete
      </Button>
    </div>
  </SettingsSection>
);

export default ProfileSettingsDanger;
