import React, { useState } from 'react';

// TODO: Connect to backend auth API

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
    onLogin?.({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-bg dark:bg-dark px-4 py-12 font-sans">
      <div className="w-full max-w-md bg-card dark:bg-slate-800 rounded-2xl shadow-soft-lg dark:shadow-none border border-border dark:border-slate-700 p-8 sm:p-10">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary tracking-wide">TechLearn</h1>
          <p className="mt-1 text-sm text-muted dark:text-slate-400">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Email */}
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-dark dark:text-slate-200 mb-1.5">
              Email address
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-border dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 text-sm text-dark dark:text-slate-100 placeholder:text-muted/50 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors duration-200"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-dark dark:text-slate-200 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-border dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 pr-11 text-sm text-dark dark:text-slate-100 placeholder:text-muted/50 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors duration-200"
              />
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted dark:text-slate-400 hover:text-dark dark:hover:text-slate-200 transition-colors duration-150"
              >
                {showPassword ? (
                  /* Eye-off icon */
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  /* Eye icon */
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178a1.01 1.01 0 0 1 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-border dark:border-slate-600 text-primary focus:ring-primary/40 accent-primary cursor-pointer"
              />
              <span className="text-sm text-muted dark:text-slate-400">Remember me</span>
            </label>
            {/* TODO: Connect forgot password flow */}
            <a
              href="#forgot-password"
              className="text-sm font-medium text-primary hover:text-primary-hover transition-colors duration-150"
            >
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            aria-label="Sign in"
            className="w-full rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold py-2.5 text-sm transition-all duration-200 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Sign in
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-border dark:bg-slate-600" />
          <span className="text-xs font-medium text-muted dark:text-slate-500 uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-border dark:bg-slate-600" />
        </div>

        {/* Google Login Button */}
        {/* TODO: Connect Google OAuth */}
        <button
          type="button"
          aria-label="Sign in with Google"
          className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-border dark:border-slate-600 bg-white dark:bg-slate-700 py-2.5 text-sm font-medium text-dark dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-600 transition-all duration-200 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62Z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        {/* Sign up link */}
        {/* TODO: Connect to sign up page route */}
        <p className="text-center text-sm text-muted dark:text-slate-400 mt-6">
          Don&apos;t have an account?{' '}
          <a
            href="#signup"
            className="font-semibold text-primary hover:text-primary-hover transition-colors duration-150"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
