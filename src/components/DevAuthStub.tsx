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

    const mockAuthUser = {
      id: 'dev-user-1',
      email: 'dev+individual@example.com',
      role: 'patient',
      profile: {
        id: 'dev-patient-1',
        auth_id: 'dev-user-1',
        full_name: 'Dev Individual',
      },
      organization: null,
    } as any;

    // Set auth store (used by auth flows)
    setUser(mockAuthUser);

    // Also populate the role store so layout/nav components pick up the role
    const mockRoleUser = {
      id: 'dev-user-1',
      email: 'dev+individual@example.com',
      role: 'individual',
      full_name: 'Dev Individual',
      organization: null,
    } as any;

    // Directly set the role store state
    useRoleStore.setState({ user: mockRoleUser });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
