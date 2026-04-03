import React, { useState } from 'react';
import ResetPasswordForm from '@/Components/auth/ResetPasswordForm/ResetPasswordForm';
import AuthPreviewWrapper from './AuthPreviewWrapper';
import resetPasswordCode from '@/Components/auth/ResetPasswordForm/ResetPasswordForm.jsx?raw';

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
const ResetPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = () => {
    setServerError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setServerError('');
    setLoading(false);
  };

  return (
    <AuthPreviewWrapper
      title="Reset Password"
      description="Two-field form to set a new password with strength indicator, confirm match, success and expired-link states."
      code={resetPasswordCode}
    >
      <Section label="Default">
        <ResetPasswordForm
          onSubmit={handleSubmit}
          onBackToLogin={handleReset}
          isLoading={loading}
          serverError={serverError}
          isSuccess={isSuccess}
        />
      </Section>

      <Section label="With Logo & Custom Title">
        <ResetPasswordForm
          onSubmit={() => {}}
          onBackToLogin={() => {}}
          appName="Create new password"
          description="Almost there! Set a strong new password for your Acme account."
          logoUrl="https://api.dicebear.com/7.x/initials/svg?seed=AC&backgroundColor=111827&fontSize=40"
        />
      </Section>

      <Section label="Loading State">
        <ResetPasswordForm
          onSubmit={() => {}}
          onBackToLogin={() => {}}
          isLoading={true}
        />
      </Section>

      <Section label="Server Error">
        <ResetPasswordForm
          onSubmit={() => {}}
          onBackToLogin={() => {}}
          serverError="Something went wrong. Please try again."
        />
      </Section>

      <Section label="Success State">
        <ResetPasswordForm
          onSubmit={() => {}}
          onBackToLogin={() => {}}
          isSuccess={true}
        />
      </Section>

      <Section label="Expired / Invalid Token">
        <ResetPasswordForm
          onSubmit={() => {}}
          onBackToLogin={() => {}}
          onRequestNewLink={() => alert('Redirect to Forgot Password')}
          isTokenInvalid={true}
        />
      </Section>

    </AuthPreviewWrapper>
  );
};

export default ResetPasswordPage;