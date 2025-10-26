import { Database } from '../types/supabase';

type Tables = Database['public']['Tables'];

// Table Rows
export type PatientRow = Tables['patients']['Row'];
export type HealthProfessionalRow = Tables['health_professionals']['Row'];
export type ResearcherRow = Tables['researchers']['Row'];
export type UserProfileRow = Tables['user_profiles']['Row'];
export type OrganizationRow = Tables['organizations']['Row'];
export type HealthInstitutionRow = Tables['health_institutions']['Row'];

// Table Inserts
export type PatientInsert = Tables['patients']['Insert'];
export type HealthProfessionalInsert = Tables['health_professionals']['Insert'];
export type ResearcherInsert = Tables['researchers']['Insert'];
export type UserProfileInsert = Tables['user_profiles']['Insert'];
export type OrganizationInsert = Tables['organizations']['Insert'];
export type HealthInstitutionInsert = Tables['health_institutions']['Insert'];

// Table Updates
export type PatientUpdate = Tables['patients']['Update'];
export type HealthProfessionalUpdate = Tables['health_professionals']['Update'];
export type ResearcherUpdate = Tables['researchers']['Update'];
export type UserProfileUpdate = Tables['user_profiles']['Update'];
export type OrganizationUpdate = Tables['organizations']['Update'];
export type HealthInstitutionUpdate = Tables['health_institutions']['Update'];

// Extended Types
export interface PatientWithOrg extends PatientRow {
  organization: OrganizationRow | null;
}

export interface ProfessionalWithInst extends HealthProfessionalRow {
  institution: HealthInstitutionRow | null;
}

// Type Guards
export function isPatientWithOrg(profile: any): profile is PatientWithOrg {
  return 'gender' in profile && 'medical_history' in profile;
}

export function isProfessionalWithInst(profile: any): profile is ProfessionalWithInst {
  return 'role_class' in profile && 'speciality' in profile;
}

export function isResearcher(profile: any): profile is ResearcherRow {
  return 'researcher_type' in profile && 'intended_dataset_use' in profile;
}

export function isUserProfile(profile: any): profile is UserProfileRow {
  return 'bmi' in profile && 'blood_type' in profile;
}

export type Profile = PatientWithOrg | ProfessionalWithInst | ResearcherRow | UserProfileRow;
export type Organization = OrganizationRow | HealthInstitutionRow;

// Response Types
export interface ProfileResponse {
  profile: Profile | null;
  organization: Organization | null;
}

// Generic database response type
export interface DbResult<T> {
  data: T | null;
  error: Error | null;
}