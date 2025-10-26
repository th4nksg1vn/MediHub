import { Database } from './supabase';

export type DatabaseRow<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type DatabaseInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];

// Database row types
export type Organization = DatabaseRow<'organizations'>;
export type Patient = DatabaseRow<'patients'>;
export type HealthProfessional = DatabaseRow<'health_professionals'>;
export type Researcher = DatabaseRow<'researchers'>;
export type UserProfile = DatabaseRow<'user_profiles'>;
export type HealthInstitution = DatabaseRow<'health_institutions'>;

// Database insert types
export type OrganizationInsert = DatabaseInsert<'organizations'>;
export type PatientInsert = DatabaseInsert<'patients'>;
export type HealthProfessionalInsert = DatabaseInsert<'health_professionals'>;
export type ResearcherInsert = DatabaseInsert<'researchers'>;
export type UserProfileInsert = DatabaseInsert<'user_profiles'>;
export type HealthInstitutionInsert = DatabaseInsert<'health_institutions'>;

// Join types
export interface PatientWithOrg extends Patient {
  organization?: Organization | null;
}

export interface ProfessionalWithInst extends HealthProfessional {
  institution?: HealthInstitution | null;
}

// Profile types 
export type Profile = PatientWithOrg | ProfessionalWithInst | Researcher | UserProfile;
export type OrgType = Organization | HealthInstitution;

export interface ProfileResponse {
  profile: Profile | null;
  organization: OrgType | null;
}

// Type guards
export function isPatientWithOrg(profile: any): profile is PatientWithOrg {
  return profile && 
    typeof profile === 'object' && 
    'medical_history' in profile;
}

export function isProfessionalWithInst(profile: any): profile is ProfessionalWithInst {
  return profile && 
    typeof profile === 'object' && 
    'role_class' in profile;
}

export function isResearcher(profile: any): profile is Researcher {
  return profile && 
    typeof profile === 'object' && 
    'researcher_type' in profile;
}

export function isUserProfile(profile: any): profile is UserProfile {
  return profile && 
    typeof profile === 'object' && 
    'gender' in profile && 
    !('medical_history' in profile) &&
    !('role_class' in profile) &&
    !('researcher_type' in profile);
}

export function isHealthInstitution(org: any): org is HealthInstitution {
  return org && 
    typeof org === 'object' && 
    'institution_type' in org;
}

export function isOrganization(org: any): org is Organization {
  return org && 
    typeof org === 'object' && 
    'type' in org &&
    !('institution_type' in org);
}