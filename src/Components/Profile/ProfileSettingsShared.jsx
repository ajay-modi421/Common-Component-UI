import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff } from 'lucide-react';

export const Twitter = ({ size = 16, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.05 9.05 0 01-2.88 1.1A4.52 4.52 0 0016 0c-2.5 0-4.5 2.1-4.5 4.68 0 .37.04.73.12 1.08A12.94 12.94 0 013 1.64a4.57 4.57 0 00-.61 2.35c0 1.62.8 3.05 2 3.89a4.48 4.48 0 01-2-.56v.06c0 2.27 1.6 4.17 3.75 4.6a4.52 4.52 0 01-2 .08 4.51 4.51 0 004.21 3.23A9.05 9.05 0 012 19.54 12.82 12.82 0 007 21c8.27 0 12.79-7.03 12.79-13.13 0-.2 0-.39-.01-.58A9.22 9.22 0 0023 3z" />
  </svg>
);

export const Github = ({ size = 16, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.262.793-.583 0-.288-.01-1.05-.015-2.06-3.338.724-4.042-1.61-4.042-1.61-.546-1.392-1.333-1.762-1.333-1.762-1.09-.745.083-.729.083-.729 1.205.086 1.84 1.242 1.84 1.242 1.07 1.84 2.807 1.308 3.492.998.108-.775.418-1.308.762-1.608-2.665-.305-5.466-1.336-5.466-5.938 0-1.31.467-2.38 1.235-3.22-.124-.304-.535-1.523.117-3.176 0 0 1.008-.32 3.3 1.23a11.41 11.41 0 016 0c2.29-1.55 3.296-1.23 3.296-1.23.653 1.653.243 2.872.12 3.176.77.84 1.232 1.91 1.232 3.22 0 4.61-2.807 5.63-5.48 5.928.43.37.823 1.102.823 2.222 0 1.606-.015 2.903-.015 3.296 0 .324.192.7.8.58C20.565 21.795 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export const Linkedin = ({ size = 16, className }) => (
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

export function getGradient(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

export const SettingsSection = ({ icon: Icon, title, description, children }) => (
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

export const ToggleRow = ({ label, description, checked, onChange }) => (
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
          bg-white dark:bg-zinc-100
          ${checked ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
  </div>
);

export const PasswordInput = ({ id, label, placeholder, value, onChange, disabled }) => {
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
