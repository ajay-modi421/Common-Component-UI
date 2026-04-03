import React, { useState } from 'react';
import ForgotPasswordForm from '@/Components/auth/ForgotPasswordForm/ForgotPasswordFrom';
import AuthPreviewWrapper from './AuthPreviewWrapper';
import forgotPasswordCode from '@/Components/auth/ForgotPasswordForm/ForgotPasswordFrom.jsx?raw';

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
const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successEmail, setSuccessEmail] = useState('');

  const handleSubmit = ({ email }) => {
    setServerError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessEmail(email);
    }, 1500);
  };

  const handleReset = () => {
    setSuccessEmail('');
    setServerError('');
    setLoading(false);
  };

  return (
    <AuthPreviewWrapper
      title="Forgot Password"
      description="Single-field form to request a password reset link, with success confirmation state."
      code={forgotPasswordCode}
    >
      <Section label="Default">
        <ForgotPasswordForm
          onSubmit={handleSubmit}
          onBackToLogin={handleReset}
          isLoading={loading}
          serverError={serverError}
          successEmail={successEmail}
        />
      </Section>

      <Section label="With Logo & Custom Title">
        <ForgotPasswordForm
          onSubmit={() => {}}
          onBackToLogin={() => {}}
          appName="Reset your password"
          description="No worries! Enter your Acme email and we'll send you instructions."
          logoUrl="https://api.dicebear.com/7.x/initials/svg?seed=AC&backgroundColor=111827&fontSize=40"
        />
      </Section>

      <Section label="Loading State">
        <ForgotPasswordForm
          onSubmit={() => {}}
          onBackToLogin={() => {}}
          isLoading={true}
        />
      </Section>

      <Section label="Server Error">
        <ForgotPasswordForm
          onSubmit={() => {}}
          onBackToLogin={() => {}}
          serverError="No account found with that email address."
        />
      </Section>

      <Section label="Success State">
        <ForgotPasswordForm
          onSubmit={() => {}}
          onBackToLogin={() => {}}
          successEmail="you@example.com"
        />
      </Section>

    </AuthPreviewWrapper>
  );
};

export default ForgotPasswordPage;