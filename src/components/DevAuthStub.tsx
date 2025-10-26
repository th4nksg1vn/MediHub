"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRoleStore } from "@/store/useRoleStore";

// Dev-only helper to inject a fake authenticated user for UI/layout work.
export default function DevAuthStub() {
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    // Only run when developer opts in via NEXT_PUBLIC_BYPASS_AUTH
    if (process.env.NEXT_PUBLIC_BYPASS_AUTH !== 'true') return;

    // Allow selecting a dev role via NEXT_PUBLIC_DEV_ROLE (nav role: individual|researcher|institution|admin)
    const devNavRole = (process.env.NEXT_PUBLIC_DEV_ROLE as any) || 'individual';

    // Map nav role back to auth role where applicable
    const navToAuth: Record<string, string> = {
      individual: 'patient',
      researcher: 'researcher',
      institution: 'health_professional',
      admin: 'admin',
    };

    const authRole = navToAuth[devNavRole] || 'patient';

    const mockAuthUser = {
      id: 'dev-user-1',
      email: `dev+${devNavRole}@example.com`,
      role: authRole,
      profile: {
        id: 'dev-profile-1',
        auth_id: 'dev-user-1',
        full_name: `Dev ${devNavRole}`,
      },
      organization: null,
    } as any;

    // Set auth store (used by auth flows)
    setUser(mockAuthUser);

    // Also populate the role store so layout/nav components pick up the role
    const mockRoleUser = {
      id: 'dev-user-1',
      email: `dev+${devNavRole}@example.com`,
      role: devNavRole,
      full_name: `Dev ${devNavRole}`,
      organization: null,
    } as any;

    // Directly set the role store state
    useRoleStore.setState({ user: mockRoleUser });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
