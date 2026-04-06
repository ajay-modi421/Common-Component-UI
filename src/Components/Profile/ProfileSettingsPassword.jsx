import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, Save, CheckCircle } from 'lucide-react';
import { SettingsSection, PasswordInput } from './ProfileSettingsShared';

const ProfileSettingsPassword = ({
  onSavePassword,
  isLoading = false,
}) => {
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
  const [pwSaved, setPwSaved] = useState(false);
  const [pwError, setPwError] = useState('');

  const handleSavePassword = () => {
    setPwError('');
    setPwSaved(false);
    if (!passwords.current) return setPwError('Current password is required.');
    if (passwords.next.length < 8) return setPwError('New password must be at least 8 characters.');
    if (passwords.next !== passwords.confirm) return setPwError('Passwords do not match.');
    onSavePassword?.(passwords);
    setTimeout(() => {
      setPwSaved(true);
      setPasswords({ current: '', next: '', confirm: '' });
    }, 800);
  };

  return (
    <SettingsSection icon={Lock} title="Password" description="Change your account password.">
      <PasswordInput id="ps-pw-current" label="Current password" placeholder="••••••••" value={passwords.current} onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))} />
      <PasswordInput id="ps-pw-next" label="New password" placeholder="••••••••" value={passwords.next} onChange={e => setPasswords(p => ({ ...p, next: e.target.value }))} />
      <PasswordInput id="ps-pw-confirm" label="Confirm new password" placeholder="••••••••" value={passwords.confirm} onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))} />

      {pwError && (
        <Alert variant="destructive">
          <AlertDescription>{pwError}</AlertDescription>
        </Alert>
      )}
      {pwSaved && (
        <Alert className="border-green-500/30 bg-green-500/10">
          <CheckCircle size={14} className="text-green-500" />
          <AlertDescription className="text-green-600 dark:text-green-400 ml-2">Password updated successfully.</AlertDescription>
        </Alert>
      )}
      <div className="flex justify-end">
        <Button onClick={handleSavePassword} disabled={isLoading} className="gap-2">
          <Save size={14} /> Update password
        </Button>
      </div>
    </SettingsSection>
  );
};

export default ProfileSettingsPassword;
