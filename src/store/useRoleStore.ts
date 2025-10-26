import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabaseClient';
import type { User, Organization } from '../types/user';
import { mapDbUserToUser, mapDbOrgToOrg, type DbUserWithOrg } from '../utils/mappers';
import type { OrganizationType, UserRole } from '../types/schema';
import { db } from '../lib/database';
import type { Database } from '../types/supabase';
import type { UserCreate, UserUpdate as DbUserUpdate } from '../types/dbUsers';
import type { 
  PostgrestResponse, 
  AuthError, 
  PostgrestError 
} from '@supabase/supabase-js';

// Types from schema
import type { OrganizationCreate, OrganizationUpdate, UserUpdate } from '../types/schema';

// Types for request payloads
interface SignUpData {
  email: string;
  password: string;
  full_name: string;
  role: User['role'];
  organization?: {
    name: string;
    type: OrganizationType;
  };
}

type RoleError = AuthError | PostgrestError | Error;

interface RoleState {
  // State
  user: User | null;
  organization: Organization | null;
  isLoading: boolean;
  error: string | null;
  
  // Auth actions
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  
  // User actions  
  updateUserProfile: (data: Database['public']['Tables']['users']['Update']) => Promise<void>;
  
  // Organization actions
  createOrganization: (data: Pick<OrganizationCreate, 'name' | 'type'>) => Promise<void>;
  updateOrganization: (data: OrganizationUpdate) => Promise<void>;
}

export const useRoleStore = create<RoleState>()(
  persist(
    (set, get) => ({
      user: null,
      organization: null,
      isLoading: false,
      error: null,

      signIn: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (authError) throw authError;

          if (authData.user) {
            // Fetch user data including role and organization
            const { data: userData, error: userError } = await supabase
              .from('users')
              .select('*, organization:organizations(*)')
              .eq('id', authData.user.id)
              .single<DbUserWithOrg>();

            if (userError) throw userError;
            if (!userData) throw new Error('User not found');

            // Map database types to application types
            const mappedUser = mapDbUserToUser(userData);
            set({
              user: mappedUser,
              organization: mappedUser.organization || null,
            });
          }
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ isLoading: false });
        }
      },

      signOut: async () => {
        set({ isLoading: true, error: null });
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          set({ user: null, organization: null });
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ isLoading: false });
        }
      },

      signUp: async ({ email, password, full_name, role, organization }) => {
        set({ isLoading: true, error: null });
        try {
          const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name,
                role,
              },
            },
          });
          if (authError) throw authError;
          if (!authData.user) throw new Error('User creation failed');

          // If organization details provided, create organization first
          let orgId: string | undefined;
          if (organization) {
            const { data: orgData, error: orgError } = await db.organizations.create({
              name: organization.name,
              type: organization.type,
              created_by: authData.user.id,
              verified: false,
            });
            
            if (orgError) throw orgError;
            if (!orgData) throw new Error('Failed to create organization');
            orgId = orgData.id;
          }

          // Create user profile
          const insertResult = await ((supabase
            .from('users') as any)
            .insert({
              id: authData.user.id,
              full_name,
              email,
              role,
              organization_id: orgId || null,
            })
            .select('*, organization:health_institutions!users_organization_id_fkey(*)')
            .single());
          
          const { data: userData, error: userError } = insertResult as {
            data: DbUserWithOrg | null;
            error: any;
          };

          if (userError) throw userError;
          if (!userData) throw new Error('Failed to create user profile');

          const mappedUser = mapDbUserToUser(userData);
          
          set({
            user: mappedUser,
            organization: mappedUser.organization,
          });
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ isLoading: false });
        }
      },

      updateUserProfile: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const { user } = get();
          if (!user) throw new Error('No user logged in');

          // Update user profile
          const updateResult = await ((supabase
            .from('users') as any)
            .update({
              full_name: data.full_name,
              role: data.role,
              organization_id: data.organization_id
            })
            .eq('id', user.id)
            .select('*, organization:health_institutions!users_organization_id_fkey(*)')
            .single());

          const { data: userData, error } = updateResult as {
            data: DbUserWithOrg | null;
            error: any;
          };

          if (error) throw error;
          if (!userData) throw new Error('Failed to update user');

          const mappedUser = mapDbUserToUser(userData);

          set({
            user: mappedUser,
            organization: mappedUser.organization || null,
          });
        } catch (error) {
          set({ error: (error as RoleError).message });
        } finally {
          set({ isLoading: false });
        }
      },

      createOrganization: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const { user } = get();
          if (!user) throw new Error('No user logged in');

          // Create organization using db utility
          const { data: orgData, error: orgError } = await db.organizations.create({
            name: data.name,
            type: data.type,
            created_by: user.id,
            verified: false
          });

          if (orgError) throw orgError;
          if (!orgData) throw new Error('Failed to create organization');

          // Update user with organization using db utility
          const { data: userData, error: userError } = await db.users.updateOrganization(
            user.id, 
            orgData.id
          );

          if (userError) throw userError;
          if (!userData) throw new Error('Failed to update user with organization');

          const mappedUser = mapDbUserToUser(userData);
          set({
            user: mappedUser,
            organization: mappedUser.organization || null,
          });
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ isLoading: false });
        }
      },

      updateOrganization: async (data) => {
        set({ isLoading: true, error: null });
        try {
          // Validate input
          const { organization } = get();
          if (!organization) throw new Error('No organization found');
          if (!data.name && !data.type) throw new Error('No updates provided');

          // Update organization
          const { data: orgData, error: orgError } = await db.organizations.update(
            organization.id, 
            {
              name: data.name,
              type: data.type
            }
          );

          // Handle response
          if (orgError) throw orgError;
          if (!orgData) throw new Error('Failed to update organization');

          // Map and validate result
          const mappedOrg = mapDbOrgToOrg(orgData);
          if (!mappedOrg) throw new Error('Failed to map organization');

          // Update state with mapped data
          set({ organization: mappedOrg });
        } catch (error) {
          set({ error: (error as RoleError).message });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'role-storage',
      partialize: (state) => ({
        user: state.user,
        organization: state.organization,
      }),
    }
  )
);