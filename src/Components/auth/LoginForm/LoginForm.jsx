import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Card, CardContent, CardDescription,
  CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card';

// ✅ NEW: Lucide icons
import { Eye, EyeOff } from 'lucide-react';

// ─── Icons ────────────────────────────────────────────────────────────────────

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.013 17.64 11.705 17.64 9.2z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.810 1.096.810 2.220 0 1.606-.015 2.896-.015 3.286 0 .315.210.690.825.570C20.565 21.795 24 17.298 24 12c0-6.63-5.37-12-12-12"/>
  </svg>
);

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(values) {
  const errors = {};
  if (!values.email) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email address.';
  if (!values.password) errors.password = 'Password is required.';
  else if (values.password.length < 6) errors.password = 'Password must be at least 6 characters.';
  return errors;
}

// ─── Component ────────────────────────────────────────────────────────────────

const LoginForm = ({
  onSubmit,
  onGoogleLogin,
  onGithubLogin,
  onForgotPassword,
  onSignup,
  isLoading = false,
  serverError = '',
  logoUrl = null,
  appName = 'Welcome back',
  description = 'Sign in to your account to continue',
}) => {
  const [values, setValues]             = useState({ email: '', password: '' });
  const [errors, setErrors]             = useState({});
  const [touched, setTouched]           = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted]       = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (touched[name] || submitted) {
      const next = validate({ ...values, [name]: value });
      setErrors(prev => ({ ...prev, [name]: next[name] }));
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-6">
      <Card className="w-full max-w-[420px] shadow-lg">

        <CardHeader className="flex flex-col items-center text-center gap-1 pb-2">
          {logoUrl && <img src={logoUrl} alt={appName} className="w-12 h-12 object-contain mb-2" />}
          <CardTitle className="text-[1.375rem] font-bold">{appName}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 pt-4">

          {serverError && (
            <Alert variant="destructive">
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col gap-2">
            <Button type="button" variant="outline" onClick={onGoogleLogin} disabled={isLoading} className="w-full flex items-center justify-center gap-2 border border-input">
              <GoogleIcon /> Continue with Google
            </Button>
            <Button type="button" variant="outline" onClick={onGithubLogin} disabled={isLoading} className="w-full flex items-center justify-center gap-2 border border-input">
              <GitHubIcon /> Continue with GitHub
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground whitespace-nowrap">or continue with email</span>
            <Separator className="flex-1" />
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lf-email">Email</Label>
              <Input id="lf-email" name="email" type="email" placeholder="you@example.com"
                value={values.email} onChange={handleChange} onBlur={handleBlur}
                disabled={isLoading}
                className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
              />
              {errors.email && <span className="text-[0.78rem] text-destructive">{errors.email}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lf-password">Password</Label>
              <div className="relative">
                <Input
                  id="lf-password"
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
                  {/* ✅ Replaced */}
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && (
                <span className="text-[0.78rem] text-destructive">{errors.password}</span>
              )}

              {onForgotPassword && (
                <Button type="button" variant="link" onClick={onForgotPassword} className="self-end h-auto p-0 text-[0.8rem]">
                  Forgot password?
                </Button>
              )}
            </div>

            <Button type="submit" className="w-full mt-1 flex items-center gap-2" disabled={isLoading}>
              {isLoading && (
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              )}
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>

          </form>
        </CardContent>

        {onSignup && (
          <CardFooter className="flex justify-center pt-6 pb-6">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Button type="button" variant="link" onClick={onSignup} className="h-auto p-0 text-sm font-medium">
                Create account
              </Button>
            </p>
          </CardFooter>
        )}

      </Card>
    </div>
  );
};

export default LoginForm;