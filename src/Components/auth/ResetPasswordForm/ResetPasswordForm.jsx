import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Card, CardContent, CardDescription,
  CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card';

// ─── Icons ────────────────────────────────────────────────────────────────────

const EyeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

// ─── Password Strength ────────────────────────────────────────────────────────

function getPasswordStrength(password) {
  if (!password) return { score: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: 'Weak', color: 'bg-destructive' };
  if (score <= 2) return { score, label: 'Fair', color: 'bg-orange-400' };
  if (score <= 3) return { score, label: 'Good', color: 'bg-yellow-400' };
  return { score, label: 'Strong', color: 'bg-green-500' };
}

const PasswordStrengthBar = ({ password }) => {
  const { score, label, color } = getPasswordStrength(password);
  if (!password) return null;
  return (
    <div className="flex flex-col gap-1 mt-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              score >= i ? color : 'bg-muted'
            }`}
          />
        ))}
      </div>
      <span className="text-[0.72rem] text-muted-foreground">{label} password</span>
    </div>
  );
};

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(values) {
  const errors = {};
  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = 'Password must contain at least one uppercase letter.';
  } else if (!/[0-9]/.test(values.password)) {
    errors.password = 'Password must contain at least one number.';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }
  return errors;
}

// ─── Success State ────────────────────────────────────────────────────────────

const SuccessView = ({ onBackToLogin }) => (
  <div className="flex items-center justify-center min-h-screen bg-background p-6">
    <Card className="w-full max-w-[420px] shadow-lg">
      <CardHeader className="flex flex-col items-center text-center gap-2 pb-2 pt-8">
        <div className="text-primary mb-1">
          <CheckCircleIcon />
        </div>
        <CardTitle className="text-[1.375rem] font-bold">Password reset!</CardTitle>
        <CardDescription className="text-center leading-relaxed">
          Your password has been successfully updated. You can now sign in with your new password.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-center pt-4 pb-6">
        {onBackToLogin && (
          <Button
            type="button"
            className="w-full max-w-[200px]"
            onClick={onBackToLogin}
          >
            Back to login
          </Button>
        )}
      </CardFooter>
    </Card>
  </div>
);

// ─── Invalid / Expired Token State ───────────────────────────────────────────

const InvalidTokenView = ({ onRequestNewLink }) => (
  <div className="flex items-center justify-center min-h-screen bg-background p-6">
    <Card className="w-full max-w-[420px] shadow-lg">
      <CardHeader className="flex flex-col items-center text-center gap-2 pb-2 pt-8">
        <div className="text-destructive mb-1">
          <ShieldIcon />
        </div>
        <CardTitle className="text-[1.375rem] font-bold">Link expired</CardTitle>
        <CardDescription className="text-center leading-relaxed">
          This password reset link is invalid or has expired. Reset links are only valid for 15 minutes.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-center pt-4 pb-6">
        {onRequestNewLink && (
          <Button
            type="button"
            className="w-full max-w-[200px]"
            onClick={onRequestNewLink}
          >
            Request new link
          </Button>
        )}
      </CardFooter>
    </Card>
  </div>
);

// ─── Component ────────────────────────────────────────────────────────────────

const ResetPasswordForm = ({
  onSubmit,
  onBackToLogin,
  onRequestNewLink,
  isLoading = false,
  serverError = '',
  isSuccess = false,       // pass true to show success state
  isTokenInvalid = false,  // pass true to show expired link state
  logoUrl = null,
  appName = 'Set new password',
  description = 'Your new password must be different from your previous password.',
}) => {
  const [values, setValues]           = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors]           = useState({});
  const [touched, setTouched]         = useState({});
  const [showPassword, setShowPassword]   = useState(false);
  const [showConfirm, setShowConfirm]     = useState(false);
  const [submitted, setSubmitted]         = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name] || submitted) {
      const errs = validate(next);
      setErrors(prev => ({ ...prev, [name]: errs[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validate(values)[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(values);
    setErrors(errs);
    if (!Object.keys(errs).length) onSubmit?.(values);
  };

  // ── Conditional states ──
  if (isTokenInvalid) {
    return <InvalidTokenView onRequestNewLink={onRequestNewLink} />;
  }

  if (isSuccess) {
    return <SuccessView onBackToLogin={onBackToLogin} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-6">
      <Card className="w-full max-w-[420px] shadow-lg">

        {/* Header */}
        <CardHeader className="flex flex-col items-center text-center gap-2 pb-2 pt-8">
          {logoUrl
            ? <img src={logoUrl} alt={appName} className="w-12 h-12 object-contain mb-1" />
            : <div className="text-muted-foreground mb-1"><ShieldIcon /></div>
          }
          <CardTitle className="text-[1.375rem] font-bold">{appName}</CardTitle>
          <CardDescription className="leading-relaxed">{description}</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 pt-4">

          {/* Server error */}
          {serverError && (
            <Alert variant="destructive">
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">

            {/* New Password */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="rp-password">New password</Label>
              <div className="relative">
                <Input
                  id="rp-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLoading}
                  className={`pr-10 ${errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              <PasswordStrengthBar password={values.password} />
              {errors.password && (
                <span className="text-[0.78rem] text-destructive">{errors.password}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="rp-confirmPassword">Confirm new password</Label>
              <div className="relative">
                <Input
                  id="rp-confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLoading}
                  className={`pr-10 ${errors.confirmPassword ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-[0.78rem] text-destructive">{errors.confirmPassword}</span>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full mt-1 flex items-center gap-2"
              disabled={isLoading}
            >
              {isLoading && (
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              )}
              {isLoading ? 'Resetting...' : 'Reset password'}
            </Button>

          </form>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex justify-center pt-2 pb-6">
          {onBackToLogin && (
            <Button
              type="button"
              variant="ghost"
              onClick={onBackToLogin}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeftIcon /> Back to login
            </Button>
          )}
        </CardFooter>

      </Card>
    </div>
  );
};

export default ResetPasswordForm;