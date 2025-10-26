import { supabase } from './supabaseClient';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { OrganizationCreate, OrganizationUpdate, Organization, User } from '../types/schema';

// Hack: Cast to any to work around Supabase type issues
type DbResponse<T> = PostgrestSingleResponse<T>;

export const db = {
  organizations: {
    create: async (data: OrganizationCreate): Promise<DbResponse<Organization>> => {
      return await supabase
        .from('organizations')
        // @ts-ignore: Supabase types are incorrect
        .insert(data)
        .select()
        .single();
    },
    update: async (id: string, data: OrganizationUpdate): Promise<DbResponse<Organization>> => {
      return await supabase
        .from('organizations')
        // @ts-ignore: Supabase types are incorrect
        .update(data)
        .eq('id', id)
        .select()
        .single();
    }
  },
  users: {
    updateOrganization: async (userId: string, organizationId: string): Promise<DbResponse<User & { organization: Organization }>> => {
      return await supabase
        .from('users')
        // @ts-ignore: Supabase types are incorrect
        .update({ organization_id: organizationId })
        .eq('id', userId)
        .select('*, organization:organizations(*)')
        .single();
    }
  }
};