export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          category: Database["public"]["Enums"]["announcement_category"] | null
          content: string
          created_at: string | null
          created_by: string | null
          id: string
          title: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["announcement_category"] | null
          content: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          title: string
        }
        Update: {
          category?: Database["public"]["Enums"]["announcement_category"] | null
          content?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      internship_postings: {
        Row: {
          apply_link: string | null
          company: string
          company_logo_url: string | null
          created_at: string | null
          deadline: string | null
          description: string | null
          id: string
          is_women_focused: boolean | null
          location: string | null
          posted_by: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          stipend: string | null
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          apply_link?: string | null
          company: string
          company_logo_url?: string | null
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          is_women_focused?: boolean | null
          location?: string | null
          posted_by?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          stipend?: string | null
          title: string
          type?: string
          updated_at?: string | null
        }
        Update: {
          apply_link?: string | null
          company?: string
          company_logo_url?: string | null
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          is_women_focused?: boolean | null
          location?: string | null
          posted_by?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          stipend?: string | null
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      meetings: {
        Row: {
          created_at: string | null
          date: string
          id: string
          mentor_id: string | null
          notes: string | null
          status: Database["public"]["Enums"]["meeting_status"] | null
          student_id: string | null
          time: string
          title: string
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          mentor_id?: string | null
          notes?: string | null
          status?: Database["public"]["Enums"]["meeting_status"] | null
          student_id?: string | null
          time: string
          title: string
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          mentor_id?: string | null
          notes?: string | null
          status?: Database["public"]["Enums"]["meeting_status"] | null
          student_id?: string | null
          time?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "meetings_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meetings_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mentor_student_assignments: {
        Row: {
          assigned_at: string | null
          id: string
          mentor_id: string | null
          student_id: string | null
        }
        Insert: {
          assigned_at?: string | null
          id?: string
          mentor_id?: string | null
          student_id?: string | null
        }
        Update: {
          assigned_at?: string | null
          id?: string
          mentor_id?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mentor_student_assignments_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentor_student_assignments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mentors: {
        Row: {
          availability:
            | Database["public"]["Enums"]["mentor_availability"]
            | null
          bio: string | null
          created_at: string | null
          designation: string | null
          expertise: string[] | null
          id: string
          next_available_slot: string | null
          rating: number | null
          user_id: string | null
        }
        Insert: {
          availability?:
            | Database["public"]["Enums"]["mentor_availability"]
            | null
          bio?: string | null
          created_at?: string | null
          designation?: string | null
          expertise?: string[] | null
          id?: string
          next_available_slot?: string | null
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          availability?:
            | Database["public"]["Enums"]["mentor_availability"]
            | null
          bio?: string | null
          created_at?: string | null
          designation?: string | null
          expertise?: string[] | null
          id?: string
          next_available_slot?: string | null
          rating?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mentors_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          receiver_id: string | null
          sender_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          receiver_id?: string | null
          sender_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          receiver_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      opportunities: {
        Row: {
          apply_link: string | null
          company: string
          created_at: string | null
          deadline: string | null
          description: string | null
          id: string
          is_women_focused: boolean | null
          location: string | null
          stipend: string | null
          title: string
          type: string
        }
        Insert: {
          apply_link?: string | null
          company: string
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          is_women_focused?: boolean | null
          location?: string | null
          stipend?: string | null
          title: string
          type: string
        }
        Update: {
          apply_link?: string | null
          company?: string
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          is_women_focused?: boolean | null
          location?: string | null
          stipend?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          cgpa: number | null
          created_at: string | null
          department: string | null
          email: string
          id: string
          name: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          roll_number: string | null
          skills: string[] | null
          updated_at: string | null
          year: number | null
        }
        Insert: {
          avatar_url?: string | null
          cgpa?: number | null
          created_at?: string | null
          department?: string | null
          email: string
          id: string
          name: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          roll_number?: string | null
          skills?: string[] | null
          updated_at?: string | null
          year?: number | null
        }
        Update: {
          avatar_url?: string | null
          cgpa?: number | null
          created_at?: string | null
          department?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          roll_number?: string | null
          skills?: string[] | null
          updated_at?: string | null
          year?: number | null
        }
        Relationships: []
      }
      skill_roadmaps: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          difficulty: string | null
          estimated_duration: string | null
          id: string
          steps: Json
          title: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          estimated_duration?: string | null
          id?: string
          steps?: Json
          title: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          estimated_duration?: string | null
          id?: string
          steps?: Json
          title?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      announcement_category:
        | "workshop"
        | "opportunity"
        | "recruitment"
        | "general"
      app_role: "student" | "faculty" | "mentor" | "admin"
      meeting_status: "scheduled" | "completed" | "cancelled" | "upcoming"
      mentor_availability: "online" | "busy" | "offline"
      user_role: "student" | "mentor" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      announcement_category: [
        "workshop",
        "opportunity",
        "recruitment",
        "general",
      ],
      app_role: ["student", "faculty", "mentor", "admin"],
      meeting_status: ["scheduled", "completed", "cancelled", "upcoming"],
      mentor_availability: ["online", "busy", "offline"],
      user_role: ["student", "mentor", "admin"],
    },
  },
} as const
