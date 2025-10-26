import type { PostgrestError } from '@supabase/supabase-js';
import type { Json } from './supabase';
import type {
  Organization,
  HealthInstitution,
} from './models';

// User roles
export type UserRole = 'patient' | 'health_professional' | 'researcher' | 'user';

// Base interfaces
interface ProfileBase {
  id: string;
  auth_id: string | null;
  full_name: string;
  gender: 'male' | 'female' | 'other';
  dob: string | null;
  contact: string | null;
  created_at: string;
}

export interface PatientProfile extends ProfileBase {
  medical_history: Json;
  last_checkin: string | null;
  organization_id: string | null;
}

export interface ProfessionalProfile extends ProfileBase {
  role_class: 'doctor' | 'nurse' | 'lab_tech' | 'admin' | 'other';
  speciality: string | null;
  license_number: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  profile_picture_url: string | null;
  institution_id: string | null;
}

export interface ResearcherProfile extends ProfileBase {
  researcher_type: string;
  organization: string | null;
}

export interface UserProfile extends ProfileBase {
  user_profile_id: string | null;
}

export type AuthProfile = PatientProfile | ProfessionalProfile | ResearcherProfile | UserProfile;

// Auth types
export interface AuthUser {
  id: string;
  email?: string;
  role: UserRole;
  profile: AuthProfile | null;
  organization?: Organization | HealthInstitution | null;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  error: PostgrestError | null;
  setUser: (user: AuthUser | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
}

export interface SignUpData {
  email: string;
  password: string;
  full_name: string;
  role: UserRole;
  organization?: Organization | HealthInstitution | null;
}

export interface UpdateProfileData {
  full_name?: string;
  organization?: Organization | HealthInstitution | null;
  gender?: string;
  role?: string;
}