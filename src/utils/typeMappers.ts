import type {
  AuthUser,
  PatientProfile,
  ProfessionalProfile,
  ResearcherProfile,
  UserProfile as AuthUserProfile,
  AuthProfile
} from '../types/auth';

import type { Database } from '../types/supabase';
type Tables = Database['public']['Tables'];

type DbPatient = Tables['patients']['Row'];
type DbProfessional = Tables['health_professionals']['Row'];
type DbResearcher = Tables['researchers']['Row'];
type DbUserProfile = Tables['user_profiles']['Row'];
type DbOrganization = Tables['organizations']['Row'];
type DbHealthInstitution = Tables['health_institutions']['Row'];

type DbProfile = DbPatient | DbProfessional | DbResearcher | DbUserProfile;
type DbOrgType = DbOrganization | DbHealthInstitution;

// Map database profile to auth profile
export function mapDbProfileToAuthProfile(profile: DbProfile | null): AuthProfile | null {
  if (!profile) return null;
  
  // Patient
  if ('organization_id' in profile && 'medical_history' in profile) {
    return {
      id: profile.id,
      auth_id: profile.auth_id,
      full_name: profile.full_name,
      gender: profile.gender,
      dob: profile.dob,
      contact: profile.contact,
      created_at: profile.created_at,
      medical_history: profile.medical_history,
      last_checkin: profile.last_checkin,
      organization_id: profile.organization_id
    } as PatientProfile;
  }
  
  // Professional
  if ('institution_id' in profile && 'role_class' in profile) {
    return {
      id: profile.id,
      auth_id: profile.auth_id,
      full_name: profile.full_name,
      gender: 'other', // Default as not stored in DB
      dob: null,
      contact: null,
      created_at: profile.created_at,
      role_class: profile.role_class,
      speciality: profile.speciality,
      license_number: profile.license_number,
      contact_email: profile.contact_email,
      contact_phone: profile.contact_phone,
      profile_picture_url: profile.profile_picture_url,
      institution_id: profile.institution_id
    } as ProfessionalProfile;
  }
  
  // Researcher
  if ('researcher_type' in profile) {
    return {
      id: profile.id,
      auth_id: profile.auth_id,
      full_name: profile.name,
      gender: 'other', // Default as not stored in DB
      dob: null,
      contact: profile.contact_phone ?? null,
      created_at: profile.created_at,
      researcher_type: profile.researcher_type,
      organization: profile.organization
    } as ResearcherProfile;
  }
  
  // User
  return {
    id: profile.id,
    auth_id: profile.auth_id,
    full_name: profile.full_name,
    gender: profile.gender,
    dob: profile.date_of_birth,
    contact: profile.phone_number,
    created_at: profile.created_at,
    user_profile_id: profile.id // Use ID as profile ID
  } as AuthUserProfile;
}

// Map auth profile to database profile
export function mapAuthProfileToDbProfile(profile: AuthProfile): Partial<DbProfile> {
  if ('medical_history' in profile) {
    return {
      auth_id: profile.auth_id,
      full_name: profile.full_name,
      gender: profile.gender,
      dob: profile.dob,
      contact: profile.contact,
      medical_history: profile.medical_history,
      last_checkin: profile.last_checkin,
      organization_id: profile.organization_id
    } as Partial<DbPatient>;
  }
  
  if ('role_class' in profile) {
    return {
      auth_id: profile.auth_id,
      full_name: profile.full_name,
      speciality: profile.speciality,
      role_class: profile.role_class,
      license_number: profile.license_number,
      contact_email: profile.contact_email,
      contact_phone: profile.contact_phone,
      profile_picture_url: profile.profile_picture_url,
      institution_id: profile.institution_id
    } as Partial<DbProfessional>;
  }
  
  if ('researcher_type' in profile) {
    return {
      auth_id: profile.auth_id,
      name: profile.full_name,
      researcher_type: profile.researcher_type,
      organization: profile.organization,
      contact_email: null,
      contact_phone: profile.contact || null
    } as Partial<DbResearcher>;
  }
  
  return {
    auth_id: profile.auth_id,
    full_name: profile.full_name,
    gender: profile.gender,
    date_of_birth: profile.dob,
    phone_number: profile.contact
  } as Partial<DbUserProfile>;
}

// Map database organization to auth organization
export function mapDbOrgToAuthOrg(org: DbOrgType | null): DbOrganization | DbHealthInstitution | null {
  if (!org) return null;
  return org;
}

// Map auth organization to database organization
export function mapAuthOrgToDbOrg(org: DbOrganization | DbHealthInstitution | null): DbOrgType | null {
  if (!org) return null;
  return org;
}