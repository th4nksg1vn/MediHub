import type { UserRole } from './schema';
import type { Database } from './supabase';

type Tables = Database['public']['Tables'];

type BaseUser = {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  organization_id: string | null;
  created_at: string;
};

// For creating a new user
export type UserCreate = Pick<BaseUser, 'full_name' | 'email' | 'role'> & {
  id?: string;
  organization_id?: string | null;
  created_at?: string;
};

// For updating an existing user
export type UserUpdate = Partial<Pick<BaseUser, 'full_name' | 'role' | 'organization_id'>>;

// For database responses
export type DbUser = BaseUser;

// For database responses with organization data
export type DbUserWithOrg = BaseUser & {
  organization: Tables['health_institutions']['Row'];
};