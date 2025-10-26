import { Database } from './supabase';

type Tables = Database['public']['Tables'];

// Database row types
export type Organization = Tables['organizations']['Row'];
export type Patient = Tables['patients']['Row'];
export type HealthProfessional = Tables['health_professionals']['Row'];
export type Researcher = Tables['researchers']['Row'];
export type UserProfile = Tables['user_profiles']['Row'];
export type HealthInstitution = Tables['health_institutions']['Row'];

// Database insert types
export type OrganizationInsert = Tables['organizations']['Insert'];
export type PatientInsert = Tables['patients']['Insert'];
export type HealthProfessionalInsert = Tables['health_professionals']['Insert'];
export type ResearcherInsert = Tables['researchers']['Insert'];
export type UserProfileInsert = Tables['user_profiles']['Insert'];
export type HealthInstitutionInsert = Tables['health_institutions']['Insert'];

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