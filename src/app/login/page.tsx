"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "../../lib/supabaseClient";
import AuthLayout from "../components/AuthLayout";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [oauthLoading, setOauthLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await supabase.auth.signInWithPassword({ email, password });
      if (res.error) {
        setError(res.error.message);
      } else {
        // on success redirect to dashboard
        router.push("/dashboard");
      }
    } catch {
      setError("Sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setOauthLoading(true);
    try {
      // Redirects the user to Google's OAuth flow managed by Supabase
      await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/dashboard` } });
    } catch (err: any) {
      setError(err?.message || 'Google sign-in failed');
      setOauthLoading(false);
    }
  }

  return (
    <AuthLayout 
      title="Welcome back"
      subtitle="Sign in to your account to continue"
    >
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              type="email"
              name="email"
              required
              className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 shadow-sm placeholder:text-slate-400 focus:border-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-600 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              type="password"
              name="password"
              required
              className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 shadow-sm placeholder:text-slate-400 focus:border-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-600 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>

        {error && (
          <div className="text-sm text-red-600 text-center">
            {error}
          </div>
        )}

        <div className="mt-6">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={oauthLoading}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50"
          >
            {oauthLoading ? (
              'Redirecting...'
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.5 544.3" className="h-4 w-4" aria-hidden>
                  <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272v95.4h147.1c-6.3 34-25 62.9-53.4 82v68.2h86.2c50.4-46.4 80.6-115 80.6-195.2z"/>
                  <path fill="#34A853" d="M272 544.3c72.9 0 134.2-24.2 178.9-66.1l-86.2-68.2c-24 16.1-54.8 25.6-92.7 25.6-71.3 0-131.8-48.1-153.6-112.6H30.3v70.6C74.9 490.4 166.5 544.3 272 544.3z"/>
                  <path fill="#FBBC05" d="M118.4 324.5c-10.5-31.1-10.5-64.4 0-95.5V158.3H30.3c-39 77.9-39 169.9 0 247.8l88.1-81.6z"/>
                  <path fill="#EA4335" d="M272 107.7c39.7-.6 77.9 14.1 106.8 40.9l80-80C408.3 23.5 343 0 272 0 166.5 0 74.9 53.9 30.3 134.3l88.1 70.6C140.2 155.8 200.7 107.7 272 107.7z"/>
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>
        </div>

        <div className="text-sm text-center">
          <span className="text-slate-600">Don&apos;t have an account?</span>{" "}
          <Link href="/register" className="font-semibold text-sky-600 hover:text-sky-500">
            Register here
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
