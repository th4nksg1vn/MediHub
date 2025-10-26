import { UserRole } from '@/types/user';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import Image1 from "../../../public/assets/SignUpImage.png";
import Logo from "../../../public/assets/Frame.png";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  selectedRole?: UserRole;
  onRoleSelect?: (role: UserRole) => void;
  showRoleSelector?: boolean;
  illustration?: string | StaticImageData;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  selectedRole,
  onRoleSelect,
  showRoleSelector = false,
  illustration,
}: AuthLayoutProps) {
  const roles: { label: string; value: UserRole; description: string }[] = [
    {
      label: 'Individual',
      value: 'individual',
      description: 'Manage personal health data and insights',
    },
    {
      label: 'Researcher',
      value: 'researcher',
      description: 'Access datasets and research tools',
    },
    {
      label: 'Institution',
      value: 'institution_admin',
      description: 'Manage patient data and staff access',
    },
    {
      label: 'Company/School',
      value: 'company_admin',
      description: 'Track member wellness and research partnerships',
    },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left side: image background with logo + description overlaid */}
      <div className="hidden lg:flex w-1/2 bg-slate-50">
        <div className="relative w-full min-h-screen">
          {/* Background image (fills half-screen) */}
          <Image src={illustration ?? Image1} alt="Auth illustration" fill className="object-cover" />

          {/* Dim layer to improve contrast */}
          <div className="absolute inset-0 bg-black/25" />

          {/* Overlay content (logo + description) */}
          <div className="absolute inset-0 z-20 flex flex-col items-start px-24 pt-24">
            <div className="flex items-center gap-3">
              <Image src={Logo} alt="MediHub" width={160} height={48} className="h-16 w-auto" />
            </div>

            <p className="mt-6 text-sm text-white/95 max-w-md">
              Transforming healthcare through secure data, research tools, and patient-first experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-sm text-slate-600">
                {subtitle}
              </p>
            )}
          </div>

          {showRoleSelector && (
            <div className="space-y-4 mb-8">
              <label htmlFor="role" className="text-sm font-medium text-slate-700">
                Select your role
              </label>

              <div>
                <select
                  id="role"
                  value={selectedRole ?? ""}
                  onChange={(e) => onRoleSelect?.(e.target.value as UserRole)}
                  className="block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-600"
                >
                  <option value="">Choose a role</option>
                  {roles.map((role) => (
                    <option key={role.value} value={role.value} title={role.description}>
                      {role.label} — {role.description}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-sm text-slate-500">
                {selectedRole
                  ? roles.find((r) => r.value === selectedRole)?.description
                  : 'Select a role to see more information.'}
              </div>
            </div>
          )}

          {children}
        </div>
      </div>
    </div>
  );
}