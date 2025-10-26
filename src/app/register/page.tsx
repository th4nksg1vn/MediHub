"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../components/AuthLayout";
import supabase from "../../lib/supabaseClient";
import { useRoleStore } from "@/store/useRoleStore";
import { UserRole, OrganizationType } from "@/types/user";
import Image from "../../../public/assets/SignUpImage.png";

export default function RegisterPage() {
  const router = useRouter();
  const { signUp, isLoading, error: storeError } = useRoleStore();
  
  const [selectedRole, setSelectedRole] = useState<UserRole | undefined>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgType, setOrgType] = useState<OrganizationType | "">("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [oauthLoading, setOauthLoading] = useState(false);
  
  // Additional fields for patient registration
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [allergies, setAllergies] = useState("");
  const [phone, setPhone] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedRole) {
      setError("Please select your role");
      return;
    }

    setError(null);
    setMessage(null);

    const needsOrg = selectedRole === 'institution_admin' || selectedRole === 'company_admin';
    if (needsOrg && !orgName) {
      setError("Please enter your organization name");
      return;
    }
    if (needsOrg && !orgType) {
      setError("Please select your organization type");
      return;
    }

    try {
      await signUp({
        email,
        password,
        full_name: name,
        role: selectedRole,
        // Add patient data for individual users
        ...(selectedRole === 'individual' && {
          patient_data: {
            date_of_birth: dateOfBirth,
            gender,
            height_cm: height ? parseFloat(height) : null,
            weight_kg: weight ? parseFloat(weight) : null,
            blood_type: bloodType || null,
            allergies: allergies ? allergies.split(',').map(a => a.trim()) : [],
            contact: phone || null,
          }
        }),
        // Add organization data for admins
        ...(needsOrg && orgType && {
          organization: {
            name: orgName,
            type: orgType as OrganizationType,
          },
        }),
      });

      setMessage(
        "Success! Check your email for the confirmation link to complete your registration."
      );

      // Redirect to verification page where user can resend link and continue to onboarding
      setTimeout(() => {
        const q = new URLSearchParams({ email, role: selectedRole as string });
        router.push(`/verify?${q.toString()}`);
      }, 1200);

    } catch (err) {
      setError(storeError || "Registration failed");
    }
  }

  async function handleGoogleSignUp() {
    setOauthLoading(true);
    try {
      await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/dashboard` } });
    } catch (err: any) {
      setError(err?.message || 'Google sign-up failed');
      setOauthLoading(false);
    }
  }

  async function handleResendVerification() {
    if (!email) {
      setError('Please enter your email to resend verification');
      return;
    }
    try {
      setOauthLoading(true);
      // Use signInWithOtp to send a magic link / verification email
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) {
        setError(error.message);
      } else {
        setMessage('Verification link sent — check your inbox.');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to send verification');
    } finally {
      setOauthLoading(false);
    }
  }

  return (
    <AuthLayout 
      title="Create account"
      subtitle="Sign up to get started with Medihub"
      showRoleSelector
      selectedRole={selectedRole}
      onRoleSelect={setSelectedRole}
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Full name
          </label>
          <div className="mt-1">
            <input
              id="name"
              type="text"
              name="name"
              required
              className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 shadow-sm placeholder:text-slate-400 focus:border-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-600 sm:text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

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

        {selectedRole === 'individual' && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-slate-700">
                  Date of Birth
                </label>
                <div className="mt-1">
                  <input
                    id="dateOfBirth"
                    type="date"
                    required
                    className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-600 sm:text-sm"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-slate-700">
                  Gender
                </label>
                <div className="mt-1">
                  <select
                    id="gender"
                    required
                    className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-600 sm:text-sm"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-slate-700">
                  Height (cm)
                </label>
                <div className="mt-1">
                  <input
                    id="height"
                    type="number"
                    className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-600 sm:text-sm"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="e.g., 170"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-slate-700">
                  Weight (kg)
                </label>
                <div className="mt-1">
                  <input
                    id="weight"
                    type="number"
                    className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-600 sm:text-sm"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g., 70"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="bloodType" className="block text-sm font-medium text-slate-700">
                Blood Type
              </label>
              <div className="mt-1">
                <select
                  id="bloodType"
                  className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-600 sm:text-sm"
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                >
                  <option value="">Select blood type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="allergies" className="block text-sm font-medium text-slate-700">
                Allergies
              </label>
              <div className="mt-1">
                <input
                  id="allergies"
                  type="text"
                  className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-600 sm:text-sm"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  placeholder="e.g., Peanuts, Penicillin (comma separated)"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                Phone number
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 shadow-sm placeholder:text-slate-400 focus:border-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-600 sm:text-sm"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g., +1 555 555 5555"
                />
              </div>
            </div>
          </>
        )}

        {(selectedRole === 'institution_admin' || selectedRole === 'company_admin') && (
          <>
            <div>
              <label htmlFor="orgName" className="block text-sm font-medium text-slate-700">
                Organization name
              </label>
              <div className="mt-1">
                <input
                  id="orgName"
                  type="text"
                  name="orgName"
                  required
                  className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 shadow-sm placeholder:text-slate-400 focus:border-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-600 sm:text-sm"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="orgType" className="block text-sm font-medium text-slate-700">
                Organization type
              </label>
              <div className="mt-1">
                <select
                  id="orgType"
                  name="orgType"
                  required
                  className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-600 sm:text-sm"
                  value={orgType}
                  onChange={(e) => setOrgType(e.target.value as OrganizationType)}
                >
                  <option value="">Select type</option>
                  <option value="medical_institution">Medical Institution</option>
                  <option value="company">Company</option>
                  <option value="school">School</option>
                </select>
              </div>
            </div>
          </>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </div>

        {error && (
          <div className="text-sm text-red-600 text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="text-sm text-green-600 text-center">
            {message}
          </div>
        )}

        <div className="mt-6">
          <button
            type="button"
            onClick={handleGoogleSignUp}
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
          <span className="text-slate-600">Already have an account?</span>{" "}
          <Link href="/login" className="font-semibold text-sky-600 hover:text-sky-500">
            Sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}