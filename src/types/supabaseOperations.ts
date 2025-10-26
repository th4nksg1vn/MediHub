import type { User, Organization } from './user';
import type { Database } from './supabase';

export type Tables = Database['public']['Tables'];

// Helper types for specific table operations
export type UserRow = Tables['users']['Row'];
export type UserInsert = Tables['users']['Insert'];
export type UserUpdate = Partial<Tables['users']['Update']>;

export type OrganizationRow = Tables['organizations']['Row'];
export type OrganizationInsert = Tables['organizations']['Insert'];
export type OrganizationUpdate = Partial<Tables['organizations']['Update']>;

// Operation types
export type DbOperation<T> = {
  data: T | null;
  error: Error | null;
};

// Mapped types for responses
export type UserResponse = DbOperation<User>;
export type OrganizationResponse = DbOperation<Organization>;

// Helper functions for type casting
export function asUserUpdate(data: Partial<User>): UserUpdate {
  return {
    full_name: data.full_name ?? undefined,
    role: data.role ?? undefined,
    organization_id: data.organization_id ?? undefined,
  };
}

export function asOrganizationUpdate(data: Partial<Organization>): OrganizationUpdate {
  return {
    name: data.name,
    type: data.type,
  };
}

export function asOrganizationInsert(
  data: Partial<Organization>, 
  userId: string
): OrganizationInsert {
  return {
    name: data.name!,
    type: data.type!,
    created_by: userId,
    verified: false,
  };
}