import type { Database } from './supabase';
import { Organization, User } from './schema';

// Helper aliases to match common generated Supabase helpers used across the codebase
export type DbRecord<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type DbInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type DbUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

// PostgrestError and SafeFilter are used in the codebase; provide minimal aliases so the project typechecks.
// For production correctness you may want to import types from @supabase/supabase-js instead.
export type PostgrestError = any;
export type SafeFilter<T extends keyof Database['public']['Tables']> = any;

export type DbClient = Database['public'];
export type Tables = DbClient['Tables'];
export type DbUserWithOrg = Tables['users']['Row'] & { organization: Organization | null };

// Type-safe database operations
export type InsertOrg = Omit<Organization, 'id' | 'created_at' | 'updated_at'>;
export type UpdateOrg = Partial<Omit<Organization, 'id' | 'created_at' | 'updated_at'>>;
export type UpdateUser = Partial<Omit<User, 'id' | 'created_at' | 'updated_at' | 'organization'>>;

// Utility functions
export const mapDbUserToUser = (dbUser: DbUserWithOrg): User => ({
  // Map fields explicitly and provide sensible defaults for fields that may be missing in older DB shapes
  id: dbUser.id,
  full_name: dbUser.full_name ?? null,
  email: dbUser.email,
  role: dbUser.role as User['role'],
  organization_id: dbUser.organization_id ?? null,
  organization: dbUser.organization || null,
  created_at: dbUser.created_at,
  // avatar_url may not exist on older DB user rows; default to null
  avatar_url: (dbUser as any).avatar_url ?? null,
});

export type UpdateResponse<T extends keyof Database['public']['Tables']> = {
  data: DbRecord<T> | null;
  error: PostgrestError | null;
};

// Named exports for common types
export type PatientRecord = DbRecord<'patients'>;
export type PatientInsert = DbInsert<'patients'>;
export type PatientUpdate = DbUpdate<'patients'>;

export type ProfessionalRecord = DbRecord<'health_professionals'>;
export type ProfessionalInsert = DbInsert<'health_professionals'>;
export type ProfessionalUpdate = DbUpdate<'health_professionals'>;

export type ResearcherRecord = DbRecord<'researchers'>;
export type ResearcherInsert = DbInsert<'researchers'>;
export type ResearcherUpdate = DbUpdate<'researchers'>;

export type OrganizationRecord = DbRecord<'organizations'>;
export type OrganizationInsert = DbInsert<'organizations'>;
export type OrganizationUpdate = DbUpdate<'organizations'>;

export type HealthInstitutionRecord = DbRecord<'health_institutions'>;
export type HealthInstitutionInsert = DbInsert<'health_institutions'>;
export type HealthInstitutionUpdate = DbUpdate<'health_institutions'>;

export type UserProfileRecord = DbRecord<'user_profiles'>;
export type UserProfileInsert = DbInsert<'user_profiles'>;
export type UserProfileUpdate = DbUpdate<'user_profiles'>;

export type HealthRecordRecord = DbRecord<'health_records'>;
export type HealthRecordInsert = DbInsert<'health_records'>;
export type HealthRecordUpdate = DbUpdate<'health_records'>;

export type ActivityLogRecord = DbRecord<'activity_logs'>;
export type ActivityLogInsert = DbInsert<'activity_logs'>;
export type ActivityLogUpdate = DbUpdate<'activity_logs'>;

export type FamilyGroupRecord = DbRecord<'family_groups'>;
export type FamilyGroupInsert = DbInsert<'family_groups'>;
export type FamilyGroupUpdate = DbUpdate<'family_groups'>;

export type FamilyMemberRecord = DbRecord<'family_members'>;
export type FamilyMemberInsert = DbInsert<'family_members'>;
export type FamilyMemberUpdate = DbUpdate<'family_members'>;

export type ResearchDatasetRecord = DbRecord<'research_datasets'>;
export type ResearchDatasetInsert = DbInsert<'research_datasets'>;
export type ResearchDatasetUpdate = DbUpdate<'research_datasets'>;

// Helper types for Supabase operations
export type DbTable<T extends keyof Database['public']['Tables']> = {
  record: DbRecord<T>;
  insert: DbInsert<T>;
  update: DbUpdate<T>;
};

export type TypedSupabaseFilter<T extends keyof Database['public']['Tables']> = {
  // Basic operations
  insert: (values: DbInsert<T>) => SafeFilter<T>;
  update: (values: DbUpdate<T>) => SafeFilter<T>;
  upsert: (values: DbInsert<T>) => SafeFilter<T>;
  delete: () => SafeFilter<T>;
  
  // Query operations
  select: (columns?: string) => SafeFilter<T>;
  order: (column: keyof DbRecord<T>, options?: { ascending?: boolean; nullsFirst?: boolean }) => SafeFilter<T>;
  limit: (count: number) => SafeFilter<T>;
  single: () => SafeFilter<T>;
  
  // Filter operations
  eq: (column: keyof DbRecord<T>, value: any) => SafeFilter<T>;
  neq: (column: keyof DbRecord<T>, value: any) => SafeFilter<T>;
  gt: (column: keyof DbRecord<T>, value: any) => SafeFilter<T>;
  gte: (column: keyof DbRecord<T>, value: any) => SafeFilter<T>;
  lt: (column: keyof DbRecord<T>, value: any) => SafeFilter<T>;
  lte: (column: keyof DbRecord<T>, value: any) => SafeFilter<T>;
  like: (column: keyof DbRecord<T>, pattern: string) => SafeFilter<T>;
  ilike: (column: keyof DbRecord<T>, pattern: string) => SafeFilter<T>;
  in: (column: keyof DbRecord<T>, values: any[]) => SafeFilter<T>;
  contains: (column: keyof DbRecord<T>, value: any) => SafeFilter<T>;
  containedBy: (column: keyof DbRecord<T>, value: any) => SafeFilter<T>;
  range: (column: keyof DbRecord<T>, from: any, to: any) => SafeFilter<T>;
  
  // Modifier operations
  not: (column: keyof DbRecord<T>, operator: string, value: any) => SafeFilter<T>;
  or: (filters: string, values?: any) => SafeFilter<T>;
  filter: (column: keyof DbRecord<T>, operator: string, value: any) => SafeFilter<T>;
};