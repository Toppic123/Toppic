export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_photo_analysis: {
        Row: {
          ai_score: number
          analysis_data: Json | null
          id: string
          photo_id: string
          processed_at: string
        }
        Insert: {
          ai_score: number
          analysis_data?: Json | null
          id?: string
          photo_id: string
          processed_at?: string
        }
        Update: {
          ai_score?: number
          analysis_data?: Json | null
          id?: string
          photo_id?: string
          processed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_photo_analysis_photo_id_fkey"
            columns: ["photo_id"]
            isOneToOne: false
            referencedRelation: "contest_photos"
            referencedColumns: ["id"]
          },
        ]
      }
      contest_photos: {
        Row: {
          ai_score: number | null
          contest_id: string
          created_at: string
          description: string | null
          id: string
          image_url: string
          is_featured: boolean
          photographer_avatar: string | null
          photographer_name: string
          status: string
          votes: number
        }
        Insert: {
          ai_score?: number | null
          contest_id: string
          created_at?: string
          description?: string | null
          id?: string
          image_url: string
          is_featured?: boolean
          photographer_avatar?: string | null
          photographer_name: string
          status?: string
          votes?: number
        }
        Update: {
          ai_score?: number | null
          contest_id?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string
          is_featured?: boolean
          photographer_avatar?: string | null
          photographer_name?: string
          status?: string
          votes?: number
        }
        Relationships: [
          {
            foreignKeyName: "contest_photos_contest_id_fkey"
            columns: ["contest_id"]
            isOneToOne: false
            referencedRelation: "contests"
            referencedColumns: ["id"]
          },
        ]
      }
      contests: {
        Row: {
          commercial_use: boolean | null
          contest_password: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          image_url: string | null
          is_private: boolean | null
          latitude: number | null
          location: string | null
          longitude: number | null
          minimum_distance_km: number | null
          organizer: string
          participants: number | null
          photo_deadline: string | null
          photo_ownership: boolean | null
          prize: string | null
          start_date: string | null
          status: string
          title: string
        }
        Insert: {
          commercial_use?: boolean | null
          contest_password?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          is_private?: boolean | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          minimum_distance_km?: number | null
          organizer: string
          participants?: number | null
          photo_deadline?: string | null
          photo_ownership?: boolean | null
          prize?: string | null
          start_date?: string | null
          status?: string
          title: string
        }
        Update: {
          commercial_use?: boolean | null
          contest_password?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          is_private?: boolean | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          minimum_distance_km?: number | null
          organizer?: string
          participants?: number | null
          photo_deadline?: string | null
          photo_ownership?: boolean | null
          prize?: string | null
          start_date?: string | null
          status?: string
          title?: string
        }
        Relationships: []
      }
      featured_contests: {
        Row: {
          contest_id: string
          created_at: string
          display_order: number
          id: string
          is_active: boolean
        }
        Insert: {
          contest_id: string
          created_at?: string
          display_order?: number
          id?: string
          is_active?: boolean
        }
        Update: {
          contest_id?: string
          created_at?: string
          display_order?: number
          id?: string
          is_active?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "featured_contests_contest_id_fkey"
            columns: ["contest_id"]
            isOneToOne: false
            referencedRelation: "contests"
            referencedColumns: ["id"]
          },
        ]
      }
      featured_gallery: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          id: string
          is_active: boolean
          photo_id: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          photo_id: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          photo_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "featured_gallery_photo_id_fkey"
            columns: ["photo_id"]
            isOneToOne: false
            referencedRelation: "contest_photos"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      organizers: {
        Row: {
          active_contests: number | null
          created_at: string | null
          email: string
          id: string
          name: string
          plan: string | null
          total_contests: number | null
        }
        Insert: {
          active_contests?: number | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          plan?: string | null
          total_contests?: number | null
        }
        Update: {
          active_contests?: number | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          plan?: string | null
          total_contests?: number | null
        }
        Relationships: []
      }
      photo_comments: {
        Row: {
          avatar_url: string | null
          comment_text: string
          created_at: string
          id: string
          photo_id: string
          updated_at: string
          user_id: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          comment_text: string
          created_at?: string
          id?: string
          photo_id: string
          updated_at?: string
          user_id?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          comment_text?: string
          created_at?: string
          id?: string
          photo_id?: string
          updated_at?: string
          user_id?: string | null
          username?: string
        }
        Relationships: []
      }
      photo_reports: {
        Row: {
          created_at: string
          description: string | null
          id: string
          photo_id: string
          reason: string
          reported_by_user_id: string | null
          reviewed_at: string | null
          reviewed_by_admin_id: string | null
          status: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          photo_id: string
          reason: string
          reported_by_user_id?: string | null
          reviewed_at?: string | null
          reviewed_by_admin_id?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          photo_id?: string
          reason?: string
          reported_by_user_id?: string | null
          reviewed_at?: string | null
          reviewed_by_admin_id?: string | null
          status?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string | null
          id: string
          name: string | null
          updated_at: string
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          id: string
          name?: string | null
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      support_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          status: string
          subject: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          status?: string
          subject: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string
          subject?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_photo_votes: {
        Args: { photo_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
