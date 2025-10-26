// Base Types
export type OrganizationType = 'hospital' | 'clinic' | 'pharmacy' | 'laboratory';

export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at?: string;
}

// Organization Types
export interface Organization extends BaseEntity {
  name: string;
  type: OrganizationType;
  created_by: string;
  verified: boolean;
}

export interface OrganizationCreate {
  name: string;
  type: OrganizationType;
  created_by: string;
  verified: boolean;
}

export interface OrganizationUpdate {
  name?: string;
  type?: OrganizationType;
}

// User Types
// Supported user roles. Include legacy/UX role labels used by the UI
export type UserRole =
  | 'patient'
  | 'professional'
  | 'researcher'
  | 'admin'
  | 'individual'
  | 'institution_admin'
  | 'company_admin';

export interface User extends BaseEntity {
  email: string;
  role: UserRole;
  full_name: string | null;
  avatar_url: string | null;
  organization_id: string | null;
  organization?: Organization | null;
}

export interface UserCreate {
  email: string;
  full_name: string;
  role: UserRole;
  organization_id?: string;
}

export interface UserUpdate {
  full_name?: string;
  role?: UserRole;
  organization_id?: string | null;
}

// Database Types
export interface Tables {
  organizations: {
    Row: Organization;
    Insert: OrganizationCreate;
    Update: OrganizationUpdate;
  };
  users: {
    Row: User;
    Insert: UserCreate;
    Update: UserUpdate;
  };
}