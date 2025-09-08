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
    PostgrestVersion: "12.2.3 (519615d)"
  }
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
      contest_banners: {
        Row: {
          banner_type: string
          contest_id: string
          created_at: string
          display_order: number
          id: string
          image_url: string
          is_active: boolean
          updated_at: string
        }
        Insert: {
          banner_type: string
          contest_id: string
          created_at?: string
          display_order?: number
          id?: string
          image_url: string
          is_active?: boolean
          updated_at?: string
        }
        Update: {
          banner_type?: string
          contest_id?: string
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string
          is_active?: boolean
          updated_at?: string
        }
        Relationships: []
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
          user_id: string | null
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
          user_id?: string | null
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
          user_id?: string | null
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
          cash_prize_amount: number | null
          commercial_use: boolean | null
          contest_password: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          image_url: string | null
          is_premium: boolean | null
          is_private: boolean | null
          latitude: number | null
          location: string | null
          longitude: number | null
          max_premium_participants: number | null
          minimum_distance_km: number | null
          organizer: string
          organizer_commission_fee: number | null
          participants: number | null
          payment_session_id: string | null
          payment_status: string | null
          photo_deadline: string | null
          photo_ownership: boolean | null
          plan: string | null
          points_required: number | null
          prize: string | null
          start_date: string | null
          status: string
          title: string
        }
        Insert: {
          cash_prize_amount?: number | null
          commercial_use?: boolean | null
          contest_password?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          is_premium?: boolean | null
          is_private?: boolean | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          max_premium_participants?: number | null
          minimum_distance_km?: number | null
          organizer: string
          organizer_commission_fee?: number | null
          participants?: number | null
          payment_session_id?: string | null
          payment_status?: string | null
          photo_deadline?: string | null
          photo_ownership?: boolean | null
          plan?: string | null
          points_required?: number | null
          prize?: string | null
          start_date?: string | null
          status?: string
          title: string
        }
        Update: {
          cash_prize_amount?: number | null
          commercial_use?: boolean | null
          contest_password?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          is_premium?: boolean | null
          is_private?: boolean | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          max_premium_participants?: number | null
          minimum_distance_km?: number | null
          organizer?: string
          organizer_commission_fee?: number | null
          participants?: number | null
          payment_session_id?: string | null
          payment_status?: string | null
          photo_deadline?: string | null
          photo_ownership?: boolean | null
          plan?: string | null
          points_required?: number | null
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
      organizer_payments: {
        Row: {
          cash_prize_amount: number
          commission_fee: number
          contest_id: string
          created_at: string | null
          id: string
          organizer_email: string
          paid_at: string | null
          payment_status: string | null
          stripe_session_id: string | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          cash_prize_amount: number
          commission_fee: number
          contest_id: string
          created_at?: string | null
          id?: string
          organizer_email: string
          paid_at?: string | null
          payment_status?: string | null
          stripe_session_id?: string | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          cash_prize_amount?: number
          commission_fee?: number
          contest_id?: string
          created_at?: string | null
          id?: string
          organizer_email?: string
          paid_at?: string | null
          payment_status?: string | null
          stripe_session_id?: string | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organizer_payments_contest_id_fkey"
            columns: ["contest_id"]
            isOneToOne: false
            referencedRelation: "contests"
            referencedColumns: ["id"]
          },
        ]
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
      payment_orders: {
        Row: {
          amount_cents: number
          completed_at: string | null
          created_at: string
          id: string
          points_purchased: number
          status: string
          stripe_session_id: string | null
          user_id: string
        }
        Insert: {
          amount_cents: number
          completed_at?: string | null
          created_at?: string
          id?: string
          points_purchased: number
          status?: string
          stripe_session_id?: string | null
          user_id: string
        }
        Update: {
          amount_cents?: number
          completed_at?: string | null
          created_at?: string
          id?: string
          points_purchased?: number
          status?: string
          stripe_session_id?: string | null
          user_id?: string
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
      point_transactions: {
        Row: {
          amount: number
          contest_id: string | null
          created_at: string
          description: string | null
          id: string
          order_id: string | null
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          contest_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          order_id?: string | null
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          contest_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          order_id?: string | null
          transaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "point_transactions_contest_id_fkey"
            columns: ["contest_id"]
            isOneToOne: false
            referencedRelation: "contests"
            referencedColumns: ["id"]
          },
        ]
      }
      premium_contest_entries: {
        Row: {
          contest_id: string
          created_at: string
          id: string
          points_spent: number
          user_id: string
        }
        Insert: {
          contest_id: string
          created_at?: string
          id?: string
          points_spent: number
          user_id: string
        }
        Update: {
          contest_id?: string
          created_at?: string
          id?: string
          points_spent?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "premium_contest_entries_contest_id_fkey"
            columns: ["contest_id"]
            isOneToOne: false
            referencedRelation: "contests"
            referencedColumns: ["id"]
          },
        ]
      }
      premium_photo_uploads: {
        Row: {
          contest_id: string
          created_at: string
          extra_photos_count: number
          id: string
          points_spent: number
          updated_at: string
          user_id: string
        }
        Insert: {
          contest_id: string
          created_at?: string
          extra_photos_count?: number
          id?: string
          points_spent?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          contest_id?: string
          created_at?: string
          extra_photos_count?: number
          id?: string
          points_spent?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      prize_awards: {
        Row: {
          contest_id: string
          created_at: string
          email_sent: boolean
          id: string
          points_awarded: number
          position: number
          updated_at: string
          user_id: string
        }
        Insert: {
          contest_id: string
          created_at?: string
          email_sent?: boolean
          id?: string
          points_awarded: number
          position: number
          updated_at?: string
          user_id: string
        }
        Update: {
          contest_id?: string
          created_at?: string
          email_sent?: boolean
          id?: string
          points_awarded?: number
          position?: number
          updated_at?: string
          user_id?: string
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
      user_action_limits: {
        Row: {
          action_count: number
          action_type: string
          created_at: string
          id: string
          user_id: string
          window_start: string
        }
        Insert: {
          action_count?: number
          action_type: string
          created_at?: string
          id?: string
          user_id: string
          window_start?: string
        }
        Update: {
          action_count?: number
          action_type?: string
          created_at?: string
          id?: string
          user_id?: string
          window_start?: string
        }
        Relationships: []
      }
      user_points: {
        Row: {
          created_at: string
          id: string
          points: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          points?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          points?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_votes: {
        Row: {
          contest_id: string
          created_at: string
          daily_votes_cast: number
          id: string
          last_vote_date: string | null
          updated_at: string
          user_id: string
          votes_cast: number
        }
        Insert: {
          contest_id: string
          created_at?: string
          daily_votes_cast?: number
          id?: string
          last_vote_date?: string | null
          updated_at?: string
          user_id: string
          votes_cast?: number
        }
        Update: {
          contest_id?: string
          created_at?: string
          daily_votes_cast?: number
          id?: string
          last_vote_date?: string | null
          updated_at?: string
          user_id?: string
          votes_cast?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_votes_contest_id_fkey"
            columns: ["contest_id"]
            isOneToOne: false
            referencedRelation: "contests"
            referencedColumns: ["id"]
          },
        ]
      }
      user_wallets: {
        Row: {
          balance: number
          created_at: string
          id: string
          total_earned: number
          total_withdrawn: number
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string
          id?: string
          total_earned?: number
          total_withdrawn?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          id?: string
          total_earned?: number
          total_withdrawn?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      wallet_transactions: {
        Row: {
          amount: number
          contest_id: string | null
          created_at: string
          description: string | null
          id: string
          transaction_type: string
          user_id: string
          withdrawal_request_id: string | null
        }
        Insert: {
          amount: number
          contest_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          transaction_type: string
          user_id: string
          withdrawal_request_id?: string | null
        }
        Update: {
          amount?: number
          contest_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          transaction_type?: string
          user_id?: string
          withdrawal_request_id?: string | null
        }
        Relationships: []
      }
      withdrawal_requests: {
        Row: {
          admin_notes: string | null
          amount: number
          id: string
          payment_details: Json | null
          payment_method: string
          processed_at: string | null
          requested_at: string
          status: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          amount: number
          id?: string
          payment_details?: Json | null
          payment_method?: string
          processed_at?: string | null
          requested_at?: string
          status?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          amount?: number
          id?: string
          payment_details?: Json | null
          payment_method?: string
          processed_at?: string | null
          requested_at?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_points_to_user: {
        Args: {
          p_amount: number
          p_description?: string
          p_order_id?: string
          p_transaction_type: string
          p_user_id: string
        }
        Returns: boolean
      }
      add_prize_money: {
        Args: {
          p_amount: number
          p_contest_id: string
          p_description?: string
          p_user_id: string
        }
        Returns: boolean
      }
      award_contest_prizes: {
        Args: { contest_id_param: string }
        Returns: undefined
      }
      get_user_photo_slots: {
        Args: { p_contest_id: string; p_user_id: string }
        Returns: {
          extra_slots_purchased: number
          remaining_slots: number
          total_slots: number
          used_slots: number
        }[]
      }
      get_user_points: {
        Args: { p_user_id: string }
        Returns: number
      }
      get_user_vote_status: {
        Args: { p_contest_id: string; p_user_id: string }
        Returns: {
          can_vote: boolean
          daily_votes_remaining: number
          votes_remaining: number
        }[]
      }
      increment_photo_votes: {
        Args: { photo_id: string }
        Returns: undefined
      }
      increment_user_votes: {
        Args: { p_contest_id: string; p_user_id: string }
        Returns: {
          daily_votes_remaining: number
          votes_remaining: number
        }[]
      }
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      process_withdrawal: {
        Args: { p_amount: number; p_request_id: string; p_user_id: string }
        Returns: boolean
      }
      purchase_extra_photo_slot: {
        Args: { p_contest_id: string; p_user_id: string }
        Returns: boolean
      }
      spend_user_points: {
        Args: {
          p_amount: number
          p_contest_id?: string
          p_description?: string
          p_transaction_type: string
          p_user_id: string
        }
        Returns: boolean
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
    Enums: {},
  },
} as const
