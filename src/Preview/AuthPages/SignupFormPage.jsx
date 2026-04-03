import React, { useState } from 'react';
import SignupForm from '@/Components/auth/SignupForm/Signup';
import AuthPreviewWrapper from './AuthPreviewWrapper';
import signupFormCode from '@/Components/auth/SignupForm/Signup.jsx?raw';

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
const SignupFormPage = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleSubmit = () => {
    setServerError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setServerError('An account with this email already exists.');
    }, 1500);
  };

  return (
    <AuthPreviewWrapper
      title="Signup Form"
      description="Card-centered signup with name, email, password strength indicator, confirm password, and social sign-up."
      code={signupFormCode}
    >
      <Section label="Default">
        <SignupForm
          onSubmit={handleSubmit}
          onGoogleSignup={() => alert('Google')}
          onGithubSignup={() => alert('GitHub')}
          onLogin={() => alert('Login')}
          isLoading={loading}
          serverError={serverError}
        />
      </Section>

      <Section label="With Logo & Custom Title">
        <SignupForm
          onSubmit={() => {}}
          onGoogleSignup={() => {}}
          onGithubSignup={() => {}}
          appName="Join Acme Corp"
          description="Create your Acme account to get started"
          logoUrl="https://api.dicebear.com/7.x/initials/svg?seed=AC&backgroundColor=111827&fontSize=40"
        />
      </Section>

      <Section label="Loading State">
        <SignupForm
          onSubmit={() => {}}
          onGoogleSignup={() => {}}
          onGithubSignup={() => {}}
          isLoading={true}
        />
      </Section>

      <Section label="Server Error">
        <SignupForm
          onSubmit={() => {}}
          onGoogleSignup={() => {}}
          onGithubSignup={() => {}}
          serverError="An account with this email already exists."
        />
      </Section>

    </AuthPreviewWrapper>
  );
};

export default SignupFormPage;