"use client";
import { useState } from "react";
import supabase from "../../lib/supabaseClient";
import type { Tables, UserRole } from "../../types/schema";
type ProfileInsert = Tables["users"]["Insert"];

export default function OnboardingPage() {
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("patient");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    if (!supabase) {
      setError(
        "Supabase client not configured. Set NEXT_PUBLIC_SUPABASE_* env vars."
      );
      setLoading(false);
      return;
    }

    try {
      const userRes = await supabase.auth.getUser();
      const user = userRes.data?.user;
      if (!user) {
        setError("No authenticated user found. Please sign in first.");
        return;
      }

      // upsert profile record (requires a `profiles` table in Supabase)
      const payload = {
        id: user.id,
        email: user.email ?? undefined,
        full_name: name,
        institution,
        contact: phone || undefined,
        role: role as UserRole,
        updated_at: new Date().toISOString(),
      };

      const { error: upsertErr } = await supabase
        .from("users")
        // supabase client typings in this project are loose; use any here to satisfy overloads
        .upsert(payload as any);
      if (upsertErr) {
        setError(upsertErr.message);
      } else {
        setMessage("Profile saved successfully.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to save profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container form-page">
      <div className="form-container">
        <h2>Complete your profile</h2>
        <p>
          Tell us a bit about yourself so we can personalize your experience.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>Full name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Institution (optional)</label>
          <input
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
          />

          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="institution">School / Company</option>
            <option value="admin">Admin</option>
          </select>

          <div className="actions">
            <button
              className="hh-btn hh-btn-secondary"
              type="button"
              onClick={() => {
                setName("");
                setInstitution("");
                setRole("patient");
              }}
            >
              Reset
            </button>
            <button
              className="hh-btn hh-btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>

        {error && <div style={{ color: "#b00020", marginTop: 8 }}>{error}</div>}
        {message && (
          <div style={{ color: "#064e3b", marginTop: 8 }}>{message}</div>
        )}
      </div>
    </div>
  );
}
