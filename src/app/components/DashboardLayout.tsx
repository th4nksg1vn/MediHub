import { redirect } from "next/navigation";
import { useRoleStore } from "@/store/useRoleStore";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, organization } = useRoleStore();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              {/* Logo */}
              <div className="flex flex-shrink-0 items-center">
                <span className="text-2xl font-bold text-sky-600">Medihub</span>
              </div>
              
              {/* Role-specific navigation will be added here */}
            </div>

            {/* User menu */}
            <div className="flex items-center">
              <div className="relative ml-3">
                <button
                  type="button"
                  className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-sky-600 flex items-center justify-center text-white">
                    {user.full_name
                      ? user.full_name[0]?.toUpperCase()
                      : user.email
                      ? user.email[0]?.toUpperCase()
                      : "?"}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}