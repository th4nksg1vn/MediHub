import type { User, Organization } from '../types/user';
import type { Tables } from '../types/schema';

// Define database types
type DbUser = Tables['users']['Row'];
type DbOrganization = Tables['organizations']['Row'];
export type DbUserWithOrg = DbUser & { organization: DbOrganization | null };

// Create a type-safe mapper for database to application types
export function mapDbUserToUser(dbUser: DbUserWithOrg): User {
  return {
    id: dbUser.id,
    full_name: dbUser.full_name,
    email: dbUser.email,
    role: dbUser.role,
    avatar_url: dbUser.avatar_url ?? null,
    organization_id: dbUser.organization_id,
    organization: dbUser.organization ? mapDbOrgToOrg(dbUser.organization) : null,
    created_at: dbUser.created_at
  };
}

export function mapDbOrgToOrg(dbOrg: DbOrganization | null): Organization | null {
  if (!dbOrg) {
    return null;
  }
  
  return {
    id: dbOrg.id,
    name: dbOrg.name,
    type: dbOrg.type,
    created_by: dbOrg.created_by,
    verified: dbOrg.verified,
    created_at: dbOrg.created_at
  };
}