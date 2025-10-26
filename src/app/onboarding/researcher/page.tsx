"use client";
import { useState } from "react";
import supabase from "@/lib/supabaseClient";
import type { Tables, UserRole } from "@/types/schema";
type ProfileInsert = Tables["users"]["Insert"];

export default function ResearcherOnboarding() {
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [interests, setInterests] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const userRes = await supabase.auth.getUser();
      const user = userRes.data?.user;
      if (!user) {
        setError("No authenticated user found. Please sign in first.");
        setLoading(false);
        return;
      }

      if (!consent) {
        setError("You must consent to data access for research to continue.");
        setLoading(false);
        return;
      }

      const payload: ProfileInsert = {
        id: user.id,
        email: user.email ?? undefined,
        full_name: name,
        institution,
        contact: phone || undefined,
        role: "researcher" as UserRole,
        // store interests in a free-text field for now
        metadata: { interests },
        updated_at: new Date().toISOString(),
      } as any;

      const { error: upsertErr } = await supabase.from("users").upsert(payload as any);
      if (upsertErr) {
        setError(upsertErr.message);
      } else {
        setMessage("Researcher profile saved. Thank you — we'll follow up with access details.");
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
        <h2>Researcher Onboarding</h2>
        <p>Tell us about your research focus and institution so we can enable dataset access.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>Full name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Institution / Lab</label>
          <input value={institution} onChange={(e) => setInstitution(e.target.value)} />

          <label>Research interests (brief)</label>
          <textarea value={interests} onChange={(e) => setInterests(e.target.value as string)} />

          <label className="flex items-center gap-2 mt-2">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <span className="text-sm">I consent to provide anonymized data samples for approved research projects.</span>
          </label>

          <div className="actions">
            <button
              className="hh-btn hh-btn-secondary"
              type="button"
              onClick={() => {
                setName("");
                setInstitution("");
                setInterests("");
                setConsent(false);
              }}
            >
              Reset
            </button>
            <button className="hh-btn hh-btn-primary" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Request Access"}
            </button>
          </div>
        </form>

        {error && <div style={{ color: "#b00020", marginTop: 8 }}>{error}</div>}
        {message && <div style={{ color: "#064e3b", marginTop: 8 }}>{message}</div>}
      </div>
    </div>
  );
}
