"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuthStore } from "@/store/useAuthStore";
import { useRoleStore } from "@/store/useRoleStore";
import { mapDbUserToUser } from "@/utils/mappers";

function mapAuthRoleToNav(role?: string) {
  switch (role) {
    case 'patient':
      return 'individual';
    case 'health_professional':
      return 'institution';
    case 'researcher':
      return 'researcher';
    case 'admin':
      return 'admin';
    default:
      return 'individual';
  }
}

export default function AuthListener() {
  const setAuthUser = useAuthStore((s) => s.setUser);
  const setRoleState = useRoleStore.setState;

  useEffect(() => {
    let mounted = true;

    async function syncFromSession() {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const user = sessionData?.session?.user;
        if (!user) {
          // clear stores
          if (mounted) {
            setAuthUser(null);
            setRoleState({ user: null, organization: null });
          }
          return;
        }

        // fetch our users table row to get profile & organization
        const { data: dbUser, error } = await supabase
          .from('users')
          .select('*, organization:organizations(*)')
          .eq('id', user.id)
          .single();

  const navRole = mapAuthRoleToNav(user.user_metadata?.role || (dbUser as any)?.role);

        if (dbUser && !error) {
          const mapped = mapDbUserToUser(dbUser as any);
          // populate role store (used by layout / nav)
          if (mounted) {
            setRoleState({ user: mapped, organization: mapped.organization || null });
          }
        } else {
          // if db row missing, at least set role store user minimal
          if (mounted) {
            setRoleState({ user: { id: user.id, full_name: '', email: user.email, role: navRole } as any, organization: null });
          }
        }

        // populate auth store (used by auth flows)
        if (mounted) {
          setAuthUser({ id: user.id, email: user.email ?? undefined, role: (user.user_metadata?.role as any) || (dbUser as any)?.role || 'patient', profile: null, organization: null } as any);
        }
      } catch (err) {
        // noop
        console.error('AuthListener sync error', err);
      }
    }

    // initial sync
    syncFromSession();

    // subscribe to changes
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      // when auth state changes, re-sync
      syncFromSession();
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
