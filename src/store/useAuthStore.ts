import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PostgrestError, PostgrestSingleResponse } from '@supabase/supabase-js';
import type {
  AuthUser,
  UserRole,
  SignUpData,
  UpdateProfileData,
  AuthProfile
} from '../types/auth';
import type { Database } from '../types/supabase';
import supabase from '../lib/supabaseClient';
import {
  mapDbProfileToAuthProfile,
  mapDbOrgToAuthOrg,
  mapAuthOrgToDbOrg,
  mapAuthProfileToDbProfile
} from '../utils/typeMappers';

type Tables = Database['public']['Tables'];
type DbPatient = Tables['patients']['Row'];
type DbProfessional = Tables['health_professionals']['Row'];
type DbResearcher = Tables['researchers']['Row'];
type DbUserProfile = Tables['user_profiles']['Row'];
type DbOrganization = Tables['organizations']['Row'];
type DbHealthInstitution = Tables['health_institutions']['Row'];

// DB Insert types
type DbPatientInsert = Tables['patients']['Insert'];
type DbProfessionalInsert = Tables['health_professionals']['Insert'];
type DbResearcherInsert = Tables['researchers']['Insert'];
type DbUserProfileInsert = Tables['user_profiles']['Insert'];
type DbOrganizationInsert = Tables['organizations']['Insert'];
type DbHealthInstitutionInsert = Tables['health_institutions']['Insert'];

type DbPatientWithOrg = DbPatient & {
  organization: DbOrganization | null;
};

type DbProfessionalWithInst = DbProfessional & {
  institution: DbHealthInstitution | null;
};

interface DbProfileResponse {
  profile: DbPatient | DbProfessional | DbResearcher | DbUserProfile | null;
  organization: DbOrganization | DbHealthInstitution | null;
}

// Type guard functions
const isDbPatientWithOrg = (profile: any): profile is DbPatientWithOrg => {
  return profile && 'organization_id' in profile && 'medical_history' in profile;
};

const isDbProfessionalWithInst = (profile: any): profile is DbProfessionalWithInst => {
  return profile && 'institution_id' in profile && 'role_class' in profile;
};

const isDbResearcher = (profile: any): profile is DbResearcher => {
  return profile && 'researcher_type' in profile;
};

const isDbUserProfile = (profile: any): profile is DbUserProfile => {
  return profile && 'bmi' in profile;
};

// Type safe insert helper
type TypeSafeInsert<T> = {
  [K in keyof T]: T[K] extends DbOrganization ? DbOrganizationInsert :
                 T[K] extends DbHealthInstitution ? DbHealthInstitutionInsert :
                 T[K] extends DbPatientWithOrg ? DbPatientInsert :
                 T[K] extends DbProfessionalWithInst ? DbProfessionalInsert :
                 T[K];
};

type DatabaseTables = Database['public']['Tables'];

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  error: PostgrestError | string | null;
  setUser: (user: AuthUser | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
}

async function fetchUserProfile(userId: string, role: UserRole): Promise<DbProfileResponse> {
  try {
    switch (role) {
      case 'patient': {
        const response = await supabase
          .from('patients')
          .select('*, organization:organizations(*)')
          .eq('auth_id', userId)
          .single() as PostgrestSingleResponse<DbPatientWithOrg>;

        if (!response.data || response.error) {
          return { profile: null, organization: null };
        }

        const profile = response.data;
        if (!isDbPatientWithOrg(profile)) {
          return { profile: null, organization: null };
        }

        return {
          profile,
          organization: profile.organization
        };
      }

      case 'health_professional': {
        const response = await supabase
          .from('health_professionals')
          .select('*, institution:health_institutions(*)')
          .eq('auth_id', userId)
          .single() as PostgrestSingleResponse<DbProfessionalWithInst>;

        if (!response.data || response.error) {
          return { profile: null, organization: null };
        }

        const profile = response.data;
        if (!isDbProfessionalWithInst(profile)) {
          return { profile: null, organization: null };
        }

        return {
          profile,
          organization: profile.institution
        };
      }

      case 'researcher': {
        const { data, error } = await supabase
          .from('researchers')
          .select('*')
          .eq('auth_id', userId)
          .single();

        if (!data || error) {
          return { profile: null, organization: null };
        }

        if (!isDbResearcher(data)) {
          return { profile: null, organization: null };
        }

        return {
          profile: data,
          organization: null
        };
      }

      default: {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('auth_id', userId)
          .single();

        if (!data || error) {
          return { profile: null, organization: null };
        }

        if (!isDbUserProfile(data)) {
          return { profile: null, organization: null };
        }

        return {
          profile: data,
          organization: null
        };
      }
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { profile: null, organization: null };
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user, error: null }),

      signIn: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (authError) throw authError;
          if (!authData.user) throw new Error('No user data returned');

          const role = authData.user.user_metadata.role as UserRole;
          const { profile: dbProfile, organization: dbOrg } = await fetchUserProfile(authData.user.id, role);

          set({
            user: {
              id: authData.user.id,
              email: authData.user.email,
              role,
              profile: mapDbProfileToAuthProfile(dbProfile),
              organization: mapDbOrgToAuthOrg(dbOrg),
            },
            isLoading: false,
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          set({ error: errorMessage, isLoading: false });
        }
      },

      signOut: async () => {
        set({ isLoading: true, error: null });
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          set({ user: null, isLoading: false });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          set({ error: errorMessage, isLoading: false });
        }
      },

      signUp: async ({ email, password, full_name, role, organization, ...rest }) => {
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

          let orgId: string | undefined;
          if (organization) {
            if ('type' in organization) {
              // Regular organization
              // Type assertion for organizations table
              const orgTable = supabase.from('organizations');
              const typedOrgTable = orgTable as unknown as {
                insert: (data: DbOrganizationInsert[]) => {
                  select: () => {
                    single: () => Promise<PostgrestSingleResponse<DbOrganization>>;
                  };
                };
              };

              const { data: orgData, error: orgError } = await typedOrgTable
                .insert([{
                  name: organization.name,
                  type: organization.type,
                  created_by: authData.user.id,
                  verified: false,
                }])
                .select()
                .single();

              if (orgError) throw orgError;
              if (!orgData) throw new Error('Organization creation failed');
              orgId = orgData.id;
            } else {
              // Type assertion for health institutions table
              const instTable = supabase.from('health_institutions');
              const typedInstTable = instTable as unknown as {
                insert: (data: DbHealthInstitutionInsert[]) => {
                  select: () => {
                    single: () => Promise<PostgrestSingleResponse<DbHealthInstitution>>;
                  };
                };
              };

              // Health institution
              const { data: orgData, error: orgError } = await typedInstTable
                .insert([{
                  name: organization.name,
                  institution_type: organization.institution_type,
                  created_by: authData.user.id,
                  num_personnel: 0,
                }])
                .select()
                .single();

              if (orgError) throw orgError;
              if (!orgData) throw new Error('Health Institution creation failed');
              orgId = orgData.id;
            }
          }

          let profileData: DbPatient | DbProfessional | DbResearcher | DbUserProfile;
          let tableName: string;
          let selectQuery: string;

          switch (role) {
            case 'patient':
              tableName = 'patients';
              profileData = {
                auth_id: authData.user.id,
                full_name,
                organization_id: orgId,
                gender: 'other',
                dob: null,
                contact: null,
                medical_history: {},
                last_checkin: null,
                user_profile_id: null
              } as DbPatient;
              selectQuery = '*, organization:organizations(*)';
              break;
            case 'health_professional':
              tableName = 'health_professionals';
              profileData = {
                auth_id: authData.user.id,
                full_name,
                institution_id: orgId,
                speciality: null,
                role_class: 'other',
                organization: null,
                license_number: null,
                contact_email: null,
                contact_phone: null,
                profile_picture_url: null
              } as DbProfessional;
              selectQuery = '*, institution:health_institutions(*)';
              break;
            case 'researcher':
              tableName = 'researchers';
              profileData = {
                auth_id: authData.user.id,
                name: full_name,
                researcher_type: 'other',
                organization: organization?.name ?? null,
                contact_email: null,
                contact_phone: null,
                intended_dataset_use: null
              } as DbResearcher;
              selectQuery = '*';
              break;
            default:
              tableName = 'user_profiles';
              profileData = {
                auth_id: authData.user.id,
                full_name,
                gender: 'other',
                date_of_birth: null,
                address: null,
                weight_kg: null,
                height_cm: null,
                bmi: null,
                blood_type: null,
                email: null,
                phone_number: null,
                allergies: null,
                medical_notes: null,
                profile_picture_url: null
              } as DbUserProfile;
              selectQuery = '*';
              break;
          }

          // Type assertion for tables
          const table = supabase.from(tableName);
          const typedTable = table as unknown as {
            insert: (data: typeof profileData[]) => {
              select: (query: string) => {
                single: () => Promise<PostgrestSingleResponse<DbPatientWithOrg | DbProfessionalWithInst | DbResearcher | DbUserProfile>>;
              };
            };
          };

          const { data: dbProfile, error: profileError } = await typedTable
            .insert([profileData])
            .select(selectQuery)
            .single();

          if (profileError) throw profileError;
          if (!dbProfile) throw new Error('Profile creation failed');

          const finalOrg = role === 'patient' ? (dbProfile as DbPatientWithOrg)?.organization :
                           role === 'health_professional' ? (dbProfile as DbProfessionalWithInst)?.institution : null;

          set({
            user: {
              id: authData.user.id,
              email,
              role,
              profile: mapDbProfileToAuthProfile(dbProfile),
              organization: mapDbOrgToAuthOrg(finalOrg),
            },
            isLoading: false,
          });

        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          set({ error: errorMessage, isLoading: false });
        }
      },

      updateProfile: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const { user } = get();
          if (!user || !user.profile) throw new Error('No user or profile to update');

          let tableName: string;
          let selectQuery: string;
          let updatedData: Partial<DbPatient | DbProfessional | DbResearcher | DbUserProfile>;

          switch (user.role) {
            case 'patient':
              tableName = 'patients';
              selectQuery = '*, organization:organizations(*)';
              updatedData = {
                full_name: data.full_name,
                gender: data.gender as 'male' | 'female' | 'other',
                organization_id: data.organization?.id
              } as Partial<DbPatient>;
              break;
            case 'health_professional':
              tableName = 'health_professionals';
              selectQuery = '*, institution:health_institutions(*)';
              updatedData = {
                full_name: data.full_name,
                institution_id: data.organization?.id
              } as Partial<DbProfessional>;
              break;
            case 'researcher':
              tableName = 'researchers';
              selectQuery = '*';
              updatedData = {
                name: data.full_name,
                organization: data.organization?.name
              } as Partial<DbResearcher>;
              break;
            default:
              tableName = 'user_profiles';
              selectQuery = '*';
              updatedData = {
                full_name: data.full_name,
                gender: data.gender as 'male' | 'female' | 'other'
              } as Partial<DbUserProfile>;
              break;
          }

          // Type assertion for tables
          const table = supabase.from(tableName);
          const typedTable = table as unknown as {
            update: (data: typeof updatedData) => {
              eq: (column: string, value: string) => {
                select: (query: string) => {
                  single: () => Promise<PostgrestSingleResponse<DbPatientWithOrg | DbProfessionalWithInst | DbResearcher | DbUserProfile>>;
                };
              };
            };
          };

          const { data: updatedProfile, error } = await typedTable
            .update(updatedData)
            .eq('auth_id', user.id)
            .select(selectQuery)
            .single();

          if (error) throw error;

          const finalOrg = user.role === 'patient' ? (updatedProfile as DbPatientWithOrg)?.organization :
                           user.role === 'health_professional' ? (updatedProfile as DbProfessionalWithInst)?.institution : null;

          const authProfile = mapDbProfileToAuthProfile(updatedProfile);
          const authOrg = mapDbOrgToAuthOrg(finalOrg);

          set({
            user: {
              ...user,
              profile: authProfile,
              organization: authOrg,
            },
            isLoading: false,
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          set({ error: errorMessage, isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);
