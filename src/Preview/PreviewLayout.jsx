import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import LoginFormPage from './AuthPages/LoginFormPage';
import SignupFormPage from './AuthPages/SignupFormPage';
import ForgotPasswordPage from './AuthPages/ForgotPasswordPage';
import ResetPasswordPage from './AuthPages/ResetPasswordPage';
import ProfileCardPage from './ProfilePages/ProfileCardPage';
import ProfileSettingsPage from './ProfilePages/ProfileSettingsPage';
import AvatarUploadPage from './ProfilePages/AvatarUploadPage';
import HeaderLayoutPage from './HeaderLayoutPage/HeaderLayoutPage';
import DataTablePage from './TablePages/DataTablePage';
import DialogPage from './DialogBoxPage/DialogPage';
import SidebarPage from './SidebarPage/SidebarPage';
import HeaderPage from './HeaderPage/HeaderPage';
import { toggleTheme } from '@/lib/theme';

// ─── Nav config — add new components here ────────────────────────────────────
const NAV = [
  {
    group: 'Auth',
    items: [
      { label: 'Login Form',       id: 'login-form',       component: LoginFormPage },
      { label: 'Signup Form',      id: 'signup-form',      component: SignupFormPage },
      { label: 'Forgot Password',  id: 'forgot-password',  component: ForgotPasswordPage },
      { label: 'Reset Password',   id: 'reset-password',   component: ResetPasswordPage },
    ],
  },
  {
    group: 'Profile',
    items: [
      { label: 'Profile Card',     id: 'profile-card',     component: ProfileCardPage },
      { label: 'Profile Settings', id: 'profile-settings', component: ProfileSettingsPage },
      { label: 'Avatar Upload',    id: 'avatar-upload',    component: AvatarUploadPage },
    ],
  },
  {
    group: 'Layout',
    items: [
      { label: 'Header',          id: 'header',          component: HeaderPage },
      { label: 'App Layouts',      id: 'app-layouts',      component: HeaderLayoutPage },
      { label: 'Data Table',       id: 'data-table',       component: DataTablePage },
      { label: 'Dialog Box',       id: 'dialog-box',       component: DialogPage },
      { label: 'Sidebar',          id: 'sidebar',          component: SidebarPage },
      ],
  },
];

// ─── Layout ───────────────────────────────────────────────────────────────────
const PreviewLayout = () => {
  const [active, setActive] = useState('login-form');
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  );

  const handleToggleTheme = () => {
    toggleTheme();
    setIsDark(prev => !prev);
  };

  // Find the active component — pass isDark + onToggleTheme for layout pages
  const activeItem = NAV.flatMap(g => g.items).find(i => i.id === active);
  const ActiveComponent = activeItem?.component;

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">

      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-border flex flex-col">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <span className="text-sm font-semibold tracking-wide text-foreground">UI Library</span>
          <button
            onClick={handleToggleTheme}
            className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-muted text-foreground hover:bg-muted/80 transition-colors border border-border"
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
            {isDark ? 'Light' : 'Dark'}
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-3 flex flex-col gap-4">
          {NAV.map(({ group, items }) => (
            <div key={group}>
              <p className="text-[0.68rem] font-semibold uppercase tracking-widest text-muted-foreground px-2 mb-1">
                {group}
              </p>
              {items.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  className={`w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors ${
                    active === id
                      ? 'bg-primary text-primary-foreground font-medium'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto bg-muted/30">
        {ActiveComponent && (
          <ActiveComponent
            isDark={isDark}
            onToggleTheme={handleToggleTheme}
          />
        )}
      </main>

    </div>
  );
};

export default PreviewLayout;