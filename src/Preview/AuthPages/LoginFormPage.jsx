import React, { useState } from 'react';
import LoginForm from '@/Components/auth/LoginForm/LoginForm';

// ─── Preview section wrapper ──────────────────────────────────────────────────
const Section = ({ label, children }) => (
  <div className="mb-8">
    <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
      {label}
    </p>
    {children}
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const LoginFormPage = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleSubmit = () => {
    setServerError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setServerError('Invalid email or password. Please try again.');
    }, 1500);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-1">Login Form</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Card-centered login with email/password + social logins, full validation and error states.
      </p>

      <Section label="Default">
        <LoginForm
          onSubmit={handleSubmit}
          onGoogleLogin={() => alert('Google')}
          onGithubLogin={() => alert('GitHub')}
          onForgotPassword={() => alert('Forgot password')}
          onSignup={() => alert('Sign up')}
          isLoading={loading}
          serverError={serverError}
        />
      </Section>

      <Section label="With Logo & Custom Title">
        <LoginForm
          onSubmit={() => {}}
          onGoogleLogin={() => {}}
          onGithubLogin={() => {}}
          appName="Acme Corp"
          description="Sign in to your Acme account"
          logoUrl="https://api.dicebear.com/7.x/initials/svg?seed=AC&backgroundColor=111827&fontSize=40"
        />
      </Section>

      <Section label="Loading State">
        <LoginForm
          onSubmit={() => {}}
          onGoogleLogin={() => {}}
          onGithubLogin={() => {}}
          isLoading={true}
        />
      </Section>

      <Section label="Server Error">
        <LoginForm
          onSubmit={() => {}}
          onGoogleLogin={() => {}}
          onGithubLogin={() => {}}
          serverError="Invalid email or password. Please try again."
        />
      </Section>
    </div>
  );
};

export default LoginFormPage;