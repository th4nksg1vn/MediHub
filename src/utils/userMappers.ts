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
    full_name: dbUser.full_name ?? null,
    email: dbUser.email,
    role: dbUser.role,
    organization_id: dbUser.organization_id ?? null,
    organization: dbUser.organization ? mapDbOrgToOrg(dbUser.organization) : null,
    created_at: dbUser.created_at,
    avatar_url: (dbUser as any).avatar_url ?? null,
  };
}

export function mapUserToDbUser(user: User): Partial<DbUser> {
  return {
    full_name: user.full_name,
    email: user.email,
    role: user.role,
    organization_id: user.organization_id
  };
}

export function mapDbOrgToOrg(dbOrg: DbOrganization | null): Organization | null {
  if (!dbOrg || !dbOrg.created_by) {
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

export function mapOrgToDbOrg(org: Organization): Partial<DbOrganization> {
  return {
    name: org.name,
    type: org.type,
    created_by: org.created_by,
    verified: org.verified
  };
}