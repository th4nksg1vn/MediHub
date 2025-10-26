"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import supabase from "@/lib/supabaseClient";

export default function VerifyClient() {
  const params = useSearchParams();
  const email = params.get("email") || "";
  const role = params.get("role") || "";
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function resend() {
    if (!email) {
      setError("No email provided");
      return;
    }
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      setMessage("Verification link sent — check your inbox.");
    } catch (err: any) {
      setError(err?.message || "Failed to send verification link");
    } finally {
      setLoading(false);
    }
  }

  function continueToOnboarding() {
    if (!role) {
      router.push("/dashboard");
    } else {
      router.push(`/onboarding/${encodeURIComponent(role)}`);
    }
  }

  return (
    <div className="container form-page">
      <div className="form-container">
        <h2>Verify your email</h2>
        <p>
          We sent a verification link to <strong>{email || "your email"}</strong>. Click the link in your inbox to verify your account.
        </p>

        <div className="mt-6 space-y-4">
          <button
            onClick={resend}
            disabled={loading}
            className="hh-btn hh-btn-primary"
          >
            {loading ? "Sending..." : "Resend verification link"}
          </button>

          <button
            onClick={continueToOnboarding}
            className="hh-btn hh-btn-secondary"
          >
            Continue to onboarding
          </button>
        </div>

        {message && <div className="text-green-600 mt-4">{message}</div>}
        {error && <div className="text-red-600 mt-4">{error}</div>}
      </div>
    </div>
  );
}
