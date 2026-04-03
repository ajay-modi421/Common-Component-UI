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

import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(values) {
  const errors = {};
  if (!values.email) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = 'Enter a valid email address.';
  return errors;
}

// ─── Success State ────────────────────────────────────────────────────────────

const SuccessView = ({ email, onBackToLogin, onResend }) => (
  <div className="flex items-center justify-center min-h-screen bg-background p-6">
    <Card className="w-full max-w-[420px] shadow-lg">
      <CardHeader className="flex flex-col items-center text-center gap-2 pb-2 pt-8">
        <div className="text-primary mb-1">
          <CheckCircle width={40} height={40} />
        </div>
        <CardTitle className="text-[1.375rem] font-bold">Check your email</CardTitle>
        <CardDescription className="text-center leading-relaxed">
          We sent a password reset link to{' '}
          <span className="font-medium text-foreground">{email}</span>.
          It may take a few minutes to arrive.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 pt-4 pb-2">
        <p className="text-xs text-center text-muted-foreground">
          Didn't receive it? Check your spam folder or{' '}
          <button
            type="button"
            onClick={onResend}
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            resend the email
          </button>.
        </p>
      </CardContent>

      <CardFooter className="flex justify-center pt-2 pb-6">
        {onBackToLogin && (
          <Button
            type="button"
            variant="ghost"
            onClick={onBackToLogin}
            className="flex items-center gap-2 text-sm"
          >
            <ArrowLeft width={15} height={15} /> Back to login
          </Button>
        )}
      </CardFooter>
    </Card>
  </div>
);

// ─── Component ────────────────────────────────────────────────────────────────

const ForgotPasswordForm = ({
  onSubmit,
  onBackToLogin,
  isLoading = false,
  serverError = '',
  successEmail = '',
  logoUrl = null,
  appName = 'Forgot password?',
  description = 'Enter your email and we\'ll send you a reset link.',
}) => {
  const [values, setValues]   = useState({ email: '' });
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

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

  if (successEmail) {
    return (
      <SuccessView
        email={successEmail}
        onBackToLogin={onBackToLogin}
        onResend={() => onSubmit?.({ email: successEmail })}
      />
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-6">
      <Card className="w-full max-w-[420px] shadow-lg">

        <CardHeader className="flex flex-col items-center text-center gap-2 pb-2 pt-8">
          {logoUrl
            ? <img src={logoUrl} alt={appName} className="w-12 h-12 object-contain mb-1" />
            : <div className="text-muted-foreground mb-1"><Mail width={40} height={40} /></div>
          }
          <CardTitle className="text-[1.375rem] font-bold">{appName}</CardTitle>
          <CardDescription className="leading-relaxed">{description}</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 pt-4">

          {serverError && (
            <Alert variant="destructive">
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="fp-email">Email address</Label>
              <Input
                id="fp-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
              />
              {errors.email && (
                <span className="text-[0.78rem] text-destructive">{errors.email}</span>
              )}
            </div>

            <Button
              type="submit"
              className="w-full mt-1 flex items-center gap-2"
              disabled={isLoading}
            >
              {isLoading && (
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              )}
              {isLoading ? 'Sending...' : 'Send reset link'}
            </Button>

          </form>
        </CardContent>

        <CardFooter className="flex justify-center pt-2 pb-6">
          {onBackToLogin && (
            <Button
              type="button"
              variant="ghost"
              onClick={onBackToLogin}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft width={15} height={15} /> Back to login
            </Button>
          )}
        </CardFooter>

      </Card>
    </div>
  );
};

export default ForgotPasswordForm;