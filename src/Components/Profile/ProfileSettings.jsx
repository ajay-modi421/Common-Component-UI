import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Mail,
  Lock,
  Bell,
  Shield,
  Trash2,
  Camera,
  MapPin,
  Link as LinkIcon,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

const Twitter = ({ size = 16, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.05 9.05 0 01-2.88 1.1A4.52 4.52 0 0016 0c-2.5 0-4.5 2.1-4.5 4.68 0 .37.04.73.12 1.08A12.94 12.94 0 013 1.64a4.57 4.57 0 00-.61 2.35c0 1.62.8 3.05 2 3.89a4.48 4.48 0 01-2-.56v.06c0 2.27 1.6 4.17 3.75 4.6a4.52 4.52 0 01-2 .08 4.51 4.51 0 004.21 3.23A9.05 9.05 0 012 19.54 12.82 12.82 0 007 21c8.27 0 12.79-7.03 12.79-13.13 0-.2 0-.39-.01-.58A9.22 9.22 0 0023 3z" />
  </svg>
);

const Github = ({ size = 16, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.262.793-.583 0-.288-.01-1.05-.015-2.06-3.338.724-4.042-1.61-4.042-1.61-.546-1.392-1.333-1.762-1.333-1.762-1.09-.745.083-.729.083-.729 1.205.086 1.84 1.242 1.84 1.242 1.07 1.84 2.807 1.308 3.492.998.108-.775.418-1.308.762-1.608-2.665-.305-5.466-1.336-5.466-5.938 0-1.31.467-2.38 1.235-3.22-.124-.304-.535-1.523.117-3.176 0 0 1.008-.32 3.3 1.23a11.41 11.41 0 016 0c2.29-1.55 3.296-1.23 3.296-1.23.653 1.653.243 2.872.12 3.176.77.84 1.232 1.91 1.232 3.22 0 4.61-2.807 5.63-5.48 5.928.43.37.823 1.102.823 2.222 0 1.606-.015 2.903-.015 3.296 0 .324.192.7.8.58C20.565 21.795 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const Linkedin = ({ size = 16, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
    <path d="M4.98 3.5a2.5 2.5 0 11-.001 5.001A2.5 2.5 0 014.98 3.5zM2.5 9h5v12h-5V9zm7 0h4.8v1.71h.07c.67-1.27 2.3-2.61 4.73-2.61 5.06 0 6 3.33 6 7.66V21h-5v-6.17c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.61-2.38 3.28V21h-5V9z" />
  </svg>
);

const GRADIENTS = [
  'from-blue-500 to-indigo-600',
  'from-violet-500 to-purple-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-teal-600',
  'from-cyan-500 to-sky-600',
  'from-fuchsia-500 to-pink-600',
  'from-lime-500 to-green-600',
];

function getGradient(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

const SettingsSection = ({ icon: Icon, title, description, children }) => (
  <Card className="shadow-sm">
    <CardHeader className="pb-3">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
          <Icon size={16} />
        </div>
        <div>
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
          {description && <CardDescription className="text-xs mt-0.5">{description}</CardDescription>}
        </div>
      </div>
    </CardHeader>
    <Separator />
    <CardContent className="pt-5 flex flex-col gap-4">
      {children}
    </CardContent>
  </Card>
);

// ── Fixed Toggle: explicit dark/light colors instead of opacity hacks ──────────
const ToggleRow = ({ label, description, checked, onChange }) => (
  <div className="flex items-center justify-between gap-4">
    <div className="flex-1">
      <p className="text-sm font-medium text-foreground">{label}</p>
      {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`
        relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        ${checked
          ? 'bg-blue-500'
          : 'bg-zinc-300 dark:bg-zinc-600'
        }
      `}
    >
      <span
        className={`
          absolute top-0.5 left-0.5
          w-5 h-5 rounded-full shadow-md
          transition-transform duration-200
          bg-white dark:bg-zinc-100          /* ← always bright thumb */
          ${checked ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
  </div>
);

const PasswordInput = ({ id, label, placeholder, value, onChange, disabled }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setShow(p => !p)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
    </div>
  );
};

const ProfileSettings = ({
  onSaveProfile,
  onSavePassword,
  onSaveNotifications,
  onDeleteAccount,
  isLoading = false,
  initialProfile = {
    name: 'Alex Johnson',
    username: 'alexjohnson',
    email: 'alex@example.com',
    role: 'Full Stack Developer',
    bio: 'Building products that people love. Open source contributor & coffee enthusiast.',
    location: 'San Francisco, CA',
    website: 'https://alexjohnson.dev',
    twitter: 'alexjohnson',
    github: 'alexjohnson',
    linkedin: '',
  },
  initialNotifications = {
    emailMarketing: false,
    emailSecurity: true,
    emailUpdates: true,
    pushAll: false,
    pushMentions: true,
  },
}) => {
  const [profile, setProfile]             = useState(initialProfile);
  const [passwords, setPasswords]         = useState({ current: '', next: '', confirm: '' });
  const [notifications, setNotifications] = useState(initialNotifications);
  const [avatarUrl, setAvatarUrl]         = useState(null);
  const [profileSaved, setProfileSaved]   = useState(false);
  const [pwSaved, setPwSaved]             = useState(false);
  const [pwError, setPwError]             = useState('');
  const fileInputRef = useRef();

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setAvatarUrl(URL.createObjectURL(file));
  };

  const handleSaveProfile = () => {
    setProfileSaved(false);
    onSaveProfile?.(profile);
    setTimeout(() => setProfileSaved(true), 800);
  };

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
    <div className="flex flex-col gap-5 max-w-[640px] w-full">

      {/* ── Profile Info ── */}
      <SettingsSection icon={User} title="Profile Information" description="Update your public profile details.">

        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-full overflow-hidden flex items-center justify-center font-semibold text-xl text-white bg-gradient-to-br ring-2 ring-border ${getGradient(profile.name)}`}>
            {avatarUrl
              ? <img src={avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
              : profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
            }
          </div>
          <div className="flex flex-col gap-1">
            <Button type="button" variant="outline" size="sm" className="gap-2 w-fit" onClick={() => fileInputRef.current?.click()}>
              <Camera size={14} /> Change photo
            </Button>
            <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </div>
        </div>

        <Separator />

        {/* Name + Username */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ps-name">Full Name</Label>
            <Input id="ps-name" name="name" value={profile.name} onChange={handleProfileChange} placeholder="Your name" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ps-username">Username</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
              <Input id="ps-username" name="username" value={profile.username} onChange={handleProfileChange} className="pl-7" placeholder="username" />
            </div>
          </div>
        </div>

        {/* Email + Role */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ps-email">Email</Label>
            <Input id="ps-email" name="email" type="email" value={profile.email} onChange={handleProfileChange} placeholder="you@example.com" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ps-role">Role / Title</Label>
            <Input id="ps-role" name="role" value={profile.role} onChange={handleProfileChange} placeholder="e.g. Designer" />
          </div>
        </div>

        {/* ── Bio — fixed for dark/light mode ── */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ps-bio">Bio</Label>
          <textarea
            id="ps-bio"
            name="bio"
            value={profile.bio}
            onChange={handleProfileChange}
            rows={3}
            placeholder="Tell people a little about yourself..."
            className="
              flex w-full rounded-md border border-input
              bg-background text-foreground
              dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700
              dark:placeholder:text-zinc-500
              px-3 py-2 text-sm
              ring-offset-background
              placeholder:text-muted-foreground
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
              resize-none
              transition-colors
            "
          />
          <p className="text-xs text-muted-foreground text-right">{profile.bio.length}/160</p>
        </div>

        {/* Location + Website */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ps-location" className="flex items-center gap-1.5"><MapPin size={12} /> Location</Label>
            <Input id="ps-location" name="location" value={profile.location} onChange={handleProfileChange} placeholder="City, Country" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ps-website" className="flex items-center gap-1.5"><LinkIcon size={12} /> Website</Label>
            <Input id="ps-website" name="website" value={profile.website} onChange={handleProfileChange} placeholder="https://yoursite.com" />
          </div>
        </div>

        {/* Socials */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ps-twitter" className="flex items-center gap-1.5"><Twitter size={12} /> Twitter</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
              <Input id="ps-twitter" name="twitter" value={profile.twitter} onChange={handleProfileChange} className="pl-7" placeholder="handle" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ps-github" className="flex items-center gap-1.5"><Github size={12} /> GitHub</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
              <Input id="ps-github" name="github" value={profile.github} onChange={handleProfileChange} className="pl-7" placeholder="handle" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ps-linkedin" className="flex items-center gap-1.5"><Linkedin size={12} /> LinkedIn</Label>
            <Input id="ps-linkedin" name="linkedin" value={profile.linkedin} onChange={handleProfileChange} placeholder="profile URL" />
          </div>
        </div>

        {profileSaved && (
          <Alert className="border-green-500/30 bg-green-500/10">
            <CheckCircle size={14} className="text-green-500" />
            <AlertDescription className="text-green-600 dark:text-green-400 ml-2">Profile saved successfully.</AlertDescription>
          </Alert>
        )}
        <div className="flex justify-end">
          <Button onClick={handleSaveProfile} disabled={isLoading} className="gap-2">
            <Save size={14} /> Save profile
          </Button>
        </div>
      </SettingsSection>

      {/* ── Password ── */}
      <SettingsSection icon={Lock} title="Password" description="Change your account password.">
        <PasswordInput id="ps-pw-current" label="Current password" placeholder="••••••••" value={passwords.current} onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))} />
        <PasswordInput id="ps-pw-next"    label="New password"     placeholder="••••••••" value={passwords.next}    onChange={e => setPasswords(p => ({ ...p, next: e.target.value }))} />
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

      {/* ── Notifications ── */}
      <SettingsSection icon={Bell} title="Notifications" description="Choose what updates you want to receive.">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Email</p>
          <ToggleRow label="Marketing emails" description="News, updates, and promotions." checked={notifications.emailMarketing} onChange={v => setNotifications(p => ({ ...p, emailMarketing: v }))} />
          <ToggleRow label="Security alerts"  description="Sign-ins and account changes."  checked={notifications.emailSecurity}  onChange={v => setNotifications(p => ({ ...p, emailSecurity: v }))} />
          <ToggleRow label="Product updates"  description="New features and improvements." checked={notifications.emailUpdates}   onChange={v => setNotifications(p => ({ ...p, emailUpdates: v }))} />
          <Separator />
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Push</p>
          <ToggleRow label="All notifications" description="Enable all push notifications."  checked={notifications.pushAll}      onChange={v => setNotifications(p => ({ ...p, pushAll: v }))} />
          <ToggleRow label="Mentions only"     description="Only when someone mentions you." checked={notifications.pushMentions} onChange={v => setNotifications(p => ({ ...p, pushMentions: v }))} />
        </div>
        <div className="flex justify-end">
          <Button onClick={() => onSaveNotifications?.(notifications)} disabled={isLoading} className="gap-2">
            <Save size={14} /> Save preferences
          </Button>
        </div>
      </SettingsSection>

      {/* ── Privacy & Security ── */}
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

      {/* ── Danger Zone ── */}
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

    </div>
  );
};

export default ProfileSettings;