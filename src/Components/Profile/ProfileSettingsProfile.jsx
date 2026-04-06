import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, Camera, MapPin, Link as LinkIcon, Save, CheckCircle } from 'lucide-react';
import {
  Twitter,
  Github,
  Linkedin,
  getGradient,
  SettingsSection,
} from './ProfileSettingsShared';

const ProfileSettingsProfile = ({
  onSaveProfile,
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
}) => {
  const [profile, setProfile] = useState(initialProfile);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [profileSaved, setProfileSaved] = useState(false);
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

  return (
    <SettingsSection icon={User} title="Profile Information" description="Update your public profile details.">

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
  );
};

export default ProfileSettingsProfile;
