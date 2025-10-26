import type { OrganizationType } from './user';
import type { UserCreate, UserUpdate, DbUser, DbUserWithOrg } from './dbUsers';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: DbUser;
        Insert: UserCreate;
        Update: UserUpdate;
      };

      activity_logs: {
        Row: {
          id: string
          user_id: string | null
          action: string
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          metadata?: Json | null
          created_at?: string
        }
      }
      family_groups: {
        Row: {
          id: string
          created_by: string | null
          group_name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          created_by?: string | null
          group_name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          created_by?: string | null
          group_name?: string
          description?: string | null
          created_at?: string
        }
      }
      family_members: {
        Row: {
          id: string
          family_group_id: string | null
          user_id: string | null
          relationship: string | null
          added_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          family_group_id?: string | null
          user_id?: string | null
          relationship?: string | null
          added_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          family_group_id?: string | null
          user_id?: string | null
          relationship?: string | null
          added_by?: string | null
          created_at?: string
        }
      }
      health_institutions: {
        Row: {
          id: string
          created_by: string | null
          name: string
          institution_type: "clinic" | "hospital" | "lab" | "pharmacy" | "other"
          num_personnel: number
          services: string[] | null
          address: string | null
          contact_email: string | null
          contact_phone: string | null
          website: string | null
          logo_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          created_by?: string | null
          name: string
          institution_type: "clinic" | "hospital" | "lab" | "pharmacy" | "other"
          num_personnel?: number
          services?: string[] | null
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          website?: string | null
          logo_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          created_by?: string | null
          name?: string
          institution_type?: "clinic" | "hospital" | "lab" | "pharmacy" | "other"
          num_personnel?: number
          services?: string[] | null
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          website?: string | null
          logo_url?: string | null
          created_at?: string
        }
      }
      health_professionals: {
        Row: {
          id: string
          auth_id: string | null
          institution_id: string | null
          full_name: string
          speciality: string | null
          role_class: "doctor" | "nurse" | "lab_tech" | "admin" | "other"
          organization: string | null
          license_number: string | null
          contact_email: string | null
          contact_phone: string | null
          profile_picture_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          auth_id?: string | null
          institution_id?: string | null
          full_name: string
          speciality?: string | null
          role_class: "doctor" | "nurse" | "lab_tech" | "admin" | "other"
          organization?: string | null
          license_number?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          profile_picture_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          auth_id?: string | null
          institution_id?: string | null
          full_name?: string
          speciality?: string | null
          role_class?: "doctor" | "nurse" | "lab_tech" | "admin" | "other"
          organization?: string | null
          license_number?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          profile_picture_url?: string | null
          created_at?: string
        }
      }
      health_records: {
        Row: {
          id: string
          patient_id: string | null
          recorded_by: string | null
          record_type: string | null
          data: Json | null
          ai_recommendations: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          patient_id?: string | null
          recorded_by?: string | null
          record_type?: string | null
          data?: Json | null
          ai_recommendations?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          patient_id?: string | null
          recorded_by?: string | null
          record_type?: string | null
          data?: Json | null
          ai_recommendations?: Json | null
          created_at?: string
        }
      }
      organizations: {
        Row: {
          id: string;
          name: string;
          type: OrganizationType;
          created_by: string;
          verified: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          type: OrganizationType;
          created_by: string;
          verified?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          type?: OrganizationType;
          created_by?: string;
          verified?: boolean;
          created_at?: string;
        };
      }
      patients: {
        Row: {
          id: string
          organization_id: string | null
          full_name: string
          dob: string | null
          gender: "male" | "female" | "other"
          contact: string | null
          medical_history: Json | null
          last_checkin: string | null
          created_at: string
          auth_id: string | null
          user_profile_id: string | null
        }
        Insert: {
          id?: string
          organization_id?: string | null
          full_name: string
          dob?: string | null
          gender: "male" | "female" | "other"
          contact?: string | null
          medical_history?: Json | null
          last_checkin?: string | null
          created_at?: string
          auth_id?: string | null
          user_profile_id?: string | null
        }
        Update: {
          id?: string
          organization_id?: string | null
          full_name?: string
          dob?: string | null
          gender?: "male" | "female" | "other"
          contact?: string | null
          medical_history?: Json | null
          last_checkin?: string | null
          created_at?: string
          auth_id?: string | null
          user_profile_id?: string | null
        }
      }
      research_datasets: {
        Row: {
          id: string
          researcher_id: string | null
          title: string
          description: string | null
          data: Json | null
          visibility: "private" | "institution" | "public"
          created_at: string
        }
        Insert: {
          id?: string
          researcher_id?: string | null
          title: string
          description?: string | null
          data?: Json | null
          visibility?: "private" | "institution" | "public"
          created_at?: string
        }
        Update: {
          id?: string
          researcher_id?: string | null
          title?: string
          description?: string | null
          data?: Json | null
          visibility?: "private" | "institution" | "public"
          created_at?: string
        }
      }
      researchers: {
        Row: {
          id: string
          auth_id: string | null
          name: string
          researcher_type: "company" | "school" | "individual" | "student" | "other"
          organization: string | null
          contact_email: string | null
          contact_phone: string | null
          intended_dataset_use: string | null
          created_at: string
        }
        Insert: {
          id?: string
          auth_id?: string | null
          name: string
          researcher_type: "company" | "school" | "individual" | "student" | "other"
          organization?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          intended_dataset_use?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          auth_id?: string | null
          name?: string
          researcher_type?: "company" | "school" | "individual" | "student" | "other"
          organization?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          intended_dataset_use?: string | null
          created_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          auth_id: string | null
          full_name: string
          date_of_birth: string | null
          gender: "male" | "female" | "other"
          address: string | null
          weight_kg: number | null
          height_cm: number | null
          bmi: number | null
          blood_type: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | null
          email: string | null
          phone_number: string | null
          allergies: string[] | null
          medical_notes: string[] | null
          profile_picture_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          auth_id?: string | null
          full_name: string
          date_of_birth?: string | null
          gender: "male" | "female" | "other"
          address?: string | null
          weight_kg?: number | null
          height_cm?: number | null
          bmi?: number | null
          blood_type?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | null
          email?: string | null
          phone_number?: string | null
          allergies?: string[] | null
          medical_notes?: string[] | null
          profile_picture_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          auth_id?: string | null
          full_name?: string
          date_of_birth?: string | null
          gender?: "male" | "female" | "other"
          address?: string | null
          weight_kg?: number | null
          height_cm?: number | null
          bmi?: number | null
          blood_type?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | null
          email?: string | null
          phone_number?: string | null
          allergies?: string[] | null
          medical_notes?: string[] | null
          profile_picture_url?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}