import type { UserRole, OrganizationType, Organization as SchemaOrg } from './schema';
export type { UserRole, OrganizationType };

export interface Organization extends SchemaOrg {}

export interface User {
  id: string;
  full_name: string | null;
  email: string;
  role: UserRole;
  avatar_url: string | null;
  organization_id: string | null;
  organization?: Organization | null;
  created_at: string;
}

export interface UserWithOrg extends User {
  organization: Organization;
}