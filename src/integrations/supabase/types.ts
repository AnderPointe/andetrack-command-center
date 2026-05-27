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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      accessorial_charges: {
        Row: {
          code: string
          company_id: string
          created_at: string
          default_amount: number
          id: string
          label: string
          taxable: boolean
          unit: string | null
        }
        Insert: {
          code: string
          company_id: string
          created_at?: string
          default_amount?: number
          id?: string
          label: string
          taxable?: boolean
          unit?: string | null
        }
        Update: {
          code?: string
          company_id?: string
          created_at?: string
          default_amount?: number
          id?: string
          label?: string
          taxable?: boolean
          unit?: string | null
        }
        Relationships: []
      }
      ai_cost_events: {
        Row: {
          company_id: string
          completion_tokens: number | null
          cost_usd: number | null
          created_at: string
          driver_id: string | null
          error: string | null
          id: string
          latency_ms: number | null
          metadata: Json
          model: string
          operation: string
          prompt_tokens: number | null
          provider: string
          status: string
          total_tokens: number | null
          user_id: string | null
        }
        Insert: {
          company_id: string
          completion_tokens?: number | null
          cost_usd?: number | null
          created_at?: string
          driver_id?: string | null
          error?: string | null
          id?: string
          latency_ms?: number | null
          metadata?: Json
          model: string
          operation: string
          prompt_tokens?: number | null
          provider: string
          status?: string
          total_tokens?: number | null
          user_id?: string | null
        }
        Update: {
          company_id?: string
          completion_tokens?: number | null
          cost_usd?: number | null
          created_at?: string
          driver_id?: string | null
          error?: string | null
          id?: string
          latency_ms?: number | null
          metadata?: Json
          model?: string
          operation?: string
          prompt_tokens?: number | null
          provider?: string
          status?: string
          total_tokens?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      alerts: {
        Row: {
          acknowledged_at: string | null
          acknowledged_by: string | null
          alert_type: string | null
          company_id: string
          created_at: string
          driver_id: string | null
          id: string
          load_id: string | null
          message: string
          recommended_action: string | null
          resolved: boolean
          resolved_at: string | null
          resolved_by: string | null
          severity: Database["public"]["Enums"]["alert_severity"]
          status: Database["public"]["Enums"]["alert_status"]
          type: string
        }
        Insert: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_type?: string | null
          company_id: string
          created_at?: string
          driver_id?: string | null
          id?: string
          load_id?: string | null
          message: string
          recommended_action?: string | null
          resolved?: boolean
          resolved_at?: string | null
          resolved_by?: string | null
          severity: Database["public"]["Enums"]["alert_severity"]
          status?: Database["public"]["Enums"]["alert_status"]
          type: string
        }
        Update: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_type?: string | null
          company_id?: string
          created_at?: string
          driver_id?: string | null
          id?: string
          load_id?: string | null
          message?: string
          recommended_action?: string | null
          resolved?: boolean
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: Database["public"]["Enums"]["alert_severity"]
          status?: Database["public"]["Enums"]["alert_status"]
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alerts_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alerts_load_id_fkey"
            columns: ["load_id"]
            isOneToOne: false
            referencedRelation: "loads"
            referencedColumns: ["id"]
          },
        ]
      }
      api_key_scopes: {
        Row: {
          api_key_id: string
          created_at: string
          id: string
          scope: string
        }
        Insert: {
          api_key_id: string
          created_at?: string
          id?: string
          scope: string
        }
        Update: {
          api_key_id?: string
          created_at?: string
          id?: string
          scope?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_key_scopes_api_key_id_fkey"
            columns: ["api_key_id"]
            isOneToOne: false
            referencedRelation: "api_keys"
            referencedColumns: ["id"]
          },
        ]
      }
      api_keys: {
        Row: {
          company_id: string
          created_at: string
          created_by: string | null
          expires_at: string | null
          hashed_key: string
          id: string
          last_used_at: string | null
          name: string
          prefix: string
          revoked_at: string | null
          scopes: string[]
          status: string
        }
        Insert: {
          company_id: string
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          hashed_key: string
          id?: string
          last_used_at?: string | null
          name: string
          prefix: string
          revoked_at?: string | null
          scopes?: string[]
          status?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          hashed_key?: string
          id?: string
          last_used_at?: string | null
          name?: string
          prefix?: string
          revoked_at?: string | null
          scopes?: string[]
          status?: string
        }
        Relationships: []
      }
      api_request_logs: {
        Row: {
          api_key_id: string | null
          company_id: string
          created_at: string
          duration_ms: number | null
          id: string
          ip_address: string | null
          method: string
          path: string
          request_id: string | null
          status_code: number | null
          user_agent: string | null
        }
        Insert: {
          api_key_id?: string | null
          company_id: string
          created_at?: string
          duration_ms?: number | null
          id?: string
          ip_address?: string | null
          method: string
          path: string
          request_id?: string | null
          status_code?: number | null
          user_agent?: string | null
        }
        Update: {
          api_key_id?: string | null
          company_id?: string
          created_at?: string
          duration_ms?: number | null
          id?: string
          ip_address?: string | null
          method?: string
          path?: string
          request_id?: string | null
          status_code?: number | null
          user_agent?: string | null
        }
        Relationships: []
      }
      app_error_events: {
        Row: {
          app_version: string | null
          company_id: string
          context: Json
          created_at: string
          driver_id: string | null
          id: string
          message: string
          platform: string | null
          severity: string
          source: string
          stack: string | null
          user_id: string | null
        }
        Insert: {
          app_version?: string | null
          company_id: string
          context?: Json
          created_at?: string
          driver_id?: string | null
          id?: string
          message: string
          platform?: string | null
          severity?: string
          source: string
          stack?: string | null
          user_id?: string | null
        }
        Update: {
          app_version?: string | null
          company_id?: string
          context?: Json
          created_at?: string
          driver_id?: string | null
          id?: string
          message?: string
          platform?: string | null
          severity?: string
          source?: string
          stack?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      audit_log_events: {
        Row: {
          action: string
          actor_user_id: string | null
          company_id: string | null
          created_at: string
          id: string
          ip_address: string | null
          metadata: Json
          resource_id: string | null
          resource_type: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          actor_user_id?: string | null
          company_id?: string | null
          created_at?: string
          id?: string
          ip_address?: string | null
          metadata?: Json
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          actor_user_id?: string | null
          company_id?: string | null
          created_at?: string
          id?: string
          ip_address?: string | null
          metadata?: Json
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          actor_user_id: string | null
          company_id: string
          created_at: string
          driver_id: string | null
          event_type: Database["public"]["Enums"]["audit_event_type"]
          id: string
          ip_address: string | null
          load_id: string | null
          message: string | null
          metadata: Json
          user_agent: string | null
        }
        Insert: {
          actor_user_id?: string | null
          company_id: string
          created_at?: string
          driver_id?: string | null
          event_type: Database["public"]["Enums"]["audit_event_type"]
          id?: string
          ip_address?: string | null
          load_id?: string | null
          message?: string | null
          metadata?: Json
          user_agent?: string | null
        }
        Update: {
          actor_user_id?: string | null
          company_id?: string
          created_at?: string
          driver_id?: string | null
          event_type?: Database["public"]["Enums"]["audit_event_type"]
          id?: string
          ip_address?: string | null
          load_id?: string | null
          message?: string | null
          metadata?: Json
          user_agent?: string | null
        }
        Relationships: []
      }
      billing_customers: {
        Row: {
          company_id: string
          created_at: string
          email: string | null
          id: string
          name: string | null
          stripe_customer_id: string | null
        }
        Insert: {
          company_id: string
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          stripe_customer_id?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          stripe_customer_id?: string | null
        }
        Relationships: []
      }
      billing_events: {
        Row: {
          company_id: string
          created_at: string
          event_type: string
          id: string
          payload: Json
        }
        Insert: {
          company_id: string
          created_at?: string
          event_type: string
          id?: string
          payload?: Json
        }
        Update: {
          company_id?: string
          created_at?: string
          event_type?: string
          id?: string
          payload?: Json
        }
        Relationships: []
      }
      billing_invoices: {
        Row: {
          amount_due_usd: number | null
          amount_paid_usd: number | null
          company_id: string
          created_at: string
          id: string
          invoice_pdf_url: string | null
          number: string | null
          period_end: string | null
          period_start: string | null
          status: string
          stripe_invoice_id: string | null
        }
        Insert: {
          amount_due_usd?: number | null
          amount_paid_usd?: number | null
          company_id: string
          created_at?: string
          id?: string
          invoice_pdf_url?: string | null
          number?: string | null
          period_end?: string | null
          period_start?: string | null
          status?: string
          stripe_invoice_id?: string | null
        }
        Update: {
          amount_due_usd?: number | null
          amount_paid_usd?: number | null
          company_id?: string
          created_at?: string
          id?: string
          invoice_pdf_url?: string | null
          number?: string | null
          period_end?: string | null
          period_start?: string | null
          status?: string
          stripe_invoice_id?: string | null
        }
        Relationships: []
      }
      billing_usage_events: {
        Row: {
          company_id: string
          id: string
          metadata: Json
          metric: string
          occurred_at: string
          quantity: number
        }
        Insert: {
          company_id: string
          id?: string
          metadata?: Json
          metric: string
          occurred_at?: string
          quantity?: number
        }
        Update: {
          company_id?: string
          id?: string
          metadata?: Json
          metric?: string
          occurred_at?: string
          quantity?: number
        }
        Relationships: []
      }
      companies: {
        Row: {
          created_at: string
          id: string
          name: string
          plan: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          plan?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          plan?: string
        }
        Relationships: []
      }
      company_branding: {
        Row: {
          accent_color: string | null
          company_id: string
          company_logo_url: string | null
          custom_domain: string | null
          custom_privacy_url: string | null
          custom_terms_url: string | null
          customer_portal_brand_name: string | null
          dark_mode_enabled: boolean
          domain_verified: boolean
          driver_app_brand_name: string | null
          hide_anderoute_branding: boolean
          id: string
          portal_logo_url: string | null
          portal_title: string | null
          primary_color: string | null
          secondary_color: string | null
          ssl_status: string | null
          support_email: string | null
          support_phone: string | null
          updated_at: string
        }
        Insert: {
          accent_color?: string | null
          company_id: string
          company_logo_url?: string | null
          custom_domain?: string | null
          custom_privacy_url?: string | null
          custom_terms_url?: string | null
          customer_portal_brand_name?: string | null
          dark_mode_enabled?: boolean
          domain_verified?: boolean
          driver_app_brand_name?: string | null
          hide_anderoute_branding?: boolean
          id?: string
          portal_logo_url?: string | null
          portal_title?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          ssl_status?: string | null
          support_email?: string | null
          support_phone?: string | null
          updated_at?: string
        }
        Update: {
          accent_color?: string | null
          company_id?: string
          company_logo_url?: string | null
          custom_domain?: string | null
          custom_privacy_url?: string | null
          custom_terms_url?: string | null
          customer_portal_brand_name?: string | null
          dark_mode_enabled?: boolean
          domain_verified?: boolean
          driver_app_brand_name?: string | null
          hide_anderoute_branding?: boolean
          id?: string
          portal_logo_url?: string | null
          portal_title?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          ssl_status?: string | null
          support_email?: string | null
          support_phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      company_feature_flags: {
        Row: {
          company_id: string
          enabled: boolean
          flag_key: string
          id: string
          updated_at: string
        }
        Insert: {
          company_id: string
          enabled?: boolean
          flag_key: string
          id?: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          enabled?: boolean
          flag_key?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      company_integrations: {
        Row: {
          company_id: string
          config: Json
          connector_id: string | null
          connector_key: string
          created_at: string
          created_by: string | null
          display_name: string
          enabled: boolean
          health: string
          id: string
          last_error: string | null
          last_sync_at: string | null
          status: string
          updated_at: string
        }
        Insert: {
          company_id: string
          config?: Json
          connector_id?: string | null
          connector_key: string
          created_at?: string
          created_by?: string | null
          display_name: string
          enabled?: boolean
          health?: string
          id?: string
          last_error?: string | null
          last_sync_at?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          config?: Json
          connector_id?: string | null
          connector_key?: string
          created_at?: string
          created_by?: string | null
          display_name?: string
          enabled?: boolean
          health?: string
          id?: string
          last_error?: string | null
          last_sync_at?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_integrations_connector_id_fkey"
            columns: ["connector_id"]
            isOneToOne: false
            referencedRelation: "integration_connectors"
            referencedColumns: ["id"]
          },
        ]
      }
      company_subscriptions: {
        Row: {
          cancel_at_period_end: boolean
          company_id: string
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_id: string | null
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_ends_at: string | null
          updated_at: string
        }
        Insert: {
          cancel_at_period_end?: boolean
          company_id: string
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at?: string | null
          updated_at?: string
        }
        Update: {
          cancel_at_period_end?: boolean
          company_id?: string
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      company_theme_settings: {
        Row: {
          accent_color: string
          border_radius_px: number | null
          button_style: string | null
          company_id: string
          created_at: string | null
          created_by: string | null
          custom_css: Json | null
          danger_color: string | null
          dark_background: string | null
          dark_muted_text: string | null
          dark_surface: string | null
          dark_text: string | null
          favicon_url: string | null
          font_family: string | null
          glass_blur_px: number | null
          glass_opacity: number | null
          id: string
          info_color: string | null
          is_custom: boolean | null
          is_published: boolean | null
          light_background: string | null
          light_muted_text: string | null
          light_surface: string | null
          light_text: string | null
          logo_dark_url: string | null
          logo_light_url: string | null
          map_style_key: string | null
          primary_color: string
          secondary_color: string
          shadow_strength: string | null
          success_color: string | null
          theme_name: string
          theme_template_id: string | null
          theme_tokens: Json | null
          updated_at: string | null
          updated_by: string | null
          warning_color: string | null
        }
        Insert: {
          accent_color: string
          border_radius_px?: number | null
          button_style?: string | null
          company_id: string
          created_at?: string | null
          created_by?: string | null
          custom_css?: Json | null
          danger_color?: string | null
          dark_background?: string | null
          dark_muted_text?: string | null
          dark_surface?: string | null
          dark_text?: string | null
          favicon_url?: string | null
          font_family?: string | null
          glass_blur_px?: number | null
          glass_opacity?: number | null
          id?: string
          info_color?: string | null
          is_custom?: boolean | null
          is_published?: boolean | null
          light_background?: string | null
          light_muted_text?: string | null
          light_surface?: string | null
          light_text?: string | null
          logo_dark_url?: string | null
          logo_light_url?: string | null
          map_style_key?: string | null
          primary_color: string
          secondary_color: string
          shadow_strength?: string | null
          success_color?: string | null
          theme_name?: string
          theme_template_id?: string | null
          theme_tokens?: Json | null
          updated_at?: string | null
          updated_by?: string | null
          warning_color?: string | null
        }
        Update: {
          accent_color?: string
          border_radius_px?: number | null
          button_style?: string | null
          company_id?: string
          created_at?: string | null
          created_by?: string | null
          custom_css?: Json | null
          danger_color?: string | null
          dark_background?: string | null
          dark_muted_text?: string | null
          dark_surface?: string | null
          dark_text?: string | null
          favicon_url?: string | null
          font_family?: string | null
          glass_blur_px?: number | null
          glass_opacity?: number | null
          id?: string
          info_color?: string | null
          is_custom?: boolean | null
          is_published?: boolean | null
          light_background?: string | null
          light_muted_text?: string | null
          light_surface?: string | null
          light_text?: string | null
          logo_dark_url?: string | null
          logo_light_url?: string | null
          map_style_key?: string | null
          primary_color?: string
          secondary_color?: string
          shadow_strength?: string | null
          success_color?: string | null
          theme_name?: string
          theme_template_id?: string | null
          theme_tokens?: Json | null
          updated_at?: string | null
          updated_by?: string | null
          warning_color?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_theme_settings_theme_template_id_fkey"
            columns: ["theme_template_id"]
            isOneToOne: false
            referencedRelation: "theme_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      company_theme_versions: {
        Row: {
          company_id: string
          created_at: string | null
          created_by: string | null
          id: string
          theme_settings_id: string | null
          theme_snapshot: Json
          version_name: string | null
        }
        Insert: {
          company_id: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          theme_settings_id?: string | null
          theme_snapshot: Json
          version_name?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          theme_settings_id?: string | null
          theme_snapshot?: Json
          version_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_theme_versions_theme_settings_id_fkey"
            columns: ["theme_settings_id"]
            isOneToOne: false
            referencedRelation: "company_theme_settings"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_contract_rates: {
        Row: {
          company_id: string
          created_at: string
          customer_id: string
          effective_from: string | null
          effective_to: string | null
          flat_rate: number | null
          fuel_surcharge_pct: number | null
          id: string
          lane_destination: string | null
          lane_origin: string | null
          notes: string | null
          rate_per_mile: number | null
          vehicle_type: string | null
        }
        Insert: {
          company_id: string
          created_at?: string
          customer_id: string
          effective_from?: string | null
          effective_to?: string | null
          flat_rate?: number | null
          fuel_surcharge_pct?: number | null
          id?: string
          lane_destination?: string | null
          lane_origin?: string | null
          notes?: string | null
          rate_per_mile?: number | null
          vehicle_type?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string
          customer_id?: string
          effective_from?: string | null
          effective_to?: string | null
          flat_rate?: number | null
          fuel_surcharge_pct?: number | null
          id?: string
          lane_destination?: string | null
          lane_origin?: string | null
          notes?: string | null
          rate_per_mile?: number | null
          vehicle_type?: string | null
        }
        Relationships: []
      }
      customer_locations: {
        Row: {
          address: string
          company_id: string
          created_at: string
          customer_id: string
          id: string
          kind: string
          label: string
          lat: number | null
          lng: number | null
        }
        Insert: {
          address: string
          company_id: string
          created_at?: string
          customer_id: string
          id?: string
          kind?: string
          label: string
          lat?: number | null
          lng?: number | null
        }
        Update: {
          address?: string
          company_id?: string
          created_at?: string
          customer_id?: string
          id?: string
          kind?: string
          label?: string
          lat?: number | null
          lng?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_locations_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_users: {
        Row: {
          accepted_at: string | null
          company_id: string
          customer_id: string
          id: string
          invited_at: string
          role: Database["public"]["Enums"]["app_role"]
          status: string
          user_id: string
        }
        Insert: {
          accepted_at?: string | null
          company_id: string
          customer_id: string
          id?: string
          invited_at?: string
          role?: Database["public"]["Enums"]["app_role"]
          status?: string
          user_id: string
        }
        Update: {
          accepted_at?: string | null
          company_id?: string
          customer_id?: string
          id?: string
          invited_at?: string
          role?: Database["public"]["Enums"]["app_role"]
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_users_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          billing_address: string | null
          company_id: string
          contact_name: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
          portal_enabled: boolean
          priority: string
          service_notes: string | null
          status: string
          updated_at: string
        }
        Insert: {
          billing_address?: string | null
          company_id: string
          contact_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          portal_enabled?: boolean
          priority?: string
          service_notes?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          billing_address?: string | null
          company_id?: string
          contact_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          portal_enabled?: boolean
          priority?: string
          service_notes?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      data_export_jobs: {
        Row: {
          company_id: string
          completed_at: string | null
          created_at: string
          created_by: string | null
          export_type: string
          file_url: string | null
          filters: Json
          id: string
          row_count: number | null
          status: string
        }
        Insert: {
          company_id: string
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          export_type: string
          file_url?: string | null
          filters?: Json
          id?: string
          row_count?: number | null
          status?: string
        }
        Update: {
          company_id?: string
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          export_type?: string
          file_url?: string | null
          filters?: Json
          id?: string
          row_count?: number | null
          status?: string
        }
        Relationships: []
      }
      data_import_jobs: {
        Row: {
          company_id: string
          completed_at: string | null
          created_at: string
          created_by: string | null
          error_rows: number | null
          filename: string | null
          id: string
          import_type: string
          mapping: Json
          status: string
          success_rows: number | null
          total_rows: number | null
        }
        Insert: {
          company_id: string
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          error_rows?: number | null
          filename?: string | null
          id?: string
          import_type: string
          mapping?: Json
          status?: string
          success_rows?: number | null
          total_rows?: number | null
        }
        Update: {
          company_id?: string
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          error_rows?: number | null
          filename?: string | null
          id?: string
          import_type?: string
          mapping?: Json
          status?: string
          success_rows?: number | null
          total_rows?: number | null
        }
        Relationships: []
      }
      data_import_rows: {
        Row: {
          company_id: string
          created_at: string
          error: string | null
          id: string
          job_id: string
          payload: Json
          row_number: number
          status: string
        }
        Insert: {
          company_id: string
          created_at?: string
          error?: string | null
          id?: string
          job_id: string
          payload: Json
          row_number: number
          status: string
        }
        Update: {
          company_id?: string
          created_at?: string
          error?: string | null
          id?: string
          job_id?: string
          payload?: Json
          row_number?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "data_import_rows_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "data_import_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      dispatch_assignments: {
        Row: {
          assigned_at: string
          assigned_by: string | null
          company_id: string
          driver_id: string
          id: string
          load_id: string
          notes: string | null
        }
        Insert: {
          assigned_at?: string
          assigned_by?: string | null
          company_id: string
          driver_id: string
          id?: string
          load_id: string
          notes?: string | null
        }
        Update: {
          assigned_at?: string
          assigned_by?: string | null
          company_id?: string
          driver_id?: string
          id?: string
          load_id?: string
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dispatch_assignments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dispatch_assignments_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dispatch_assignments_load_id_fkey"
            columns: ["load_id"]
            isOneToOne: false
            referencedRelation: "loads"
            referencedColumns: ["id"]
          },
        ]
      }
      dispatch_status_sync: {
        Row: {
          channel: string
          company_id: string
          connection_state: string
          driver_id: string | null
          id: string
          last_event_id: string | null
          last_seen_at: string
          load_id: string | null
          updated_at: string
        }
        Insert: {
          channel: string
          company_id: string
          connection_state: string
          driver_id?: string | null
          id?: string
          last_event_id?: string | null
          last_seen_at?: string
          load_id?: string | null
          updated_at?: string
        }
        Update: {
          channel?: string
          company_id?: string
          connection_state?: string
          driver_id?: string | null
          id?: string
          last_event_id?: string | null
          last_seen_at?: string
          load_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      dispatch_voice_messages: {
        Row: {
          acknowledged_at: string | null
          audio_url: string | null
          company_id: string
          created_at: string
          delivered_at: string | null
          dispatcher_id: string
          driver_id: string
          id: string
          message: string
          priority: string
          session_id: string | null
        }
        Insert: {
          acknowledged_at?: string | null
          audio_url?: string | null
          company_id: string
          created_at?: string
          delivered_at?: string | null
          dispatcher_id: string
          driver_id: string
          id?: string
          message: string
          priority?: string
          session_id?: string | null
        }
        Update: {
          acknowledged_at?: string | null
          audio_url?: string | null
          company_id?: string
          created_at?: string
          delivered_at?: string | null
          dispatcher_id?: string
          driver_id?: string
          id?: string
          message?: string
          priority?: string
          session_id?: string | null
        }
        Relationships: []
      }
      document_links: {
        Row: {
          company_id: string
          created_at: string
          document_id: string
          entity_id: string
          entity_type: string
          id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          document_id: string
          entity_id: string
          entity_type: string
          id?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          document_id?: string
          entity_id?: string
          entity_type?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_links_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "document_records"
            referencedColumns: ["id"]
          },
        ]
      }
      document_records: {
        Row: {
          company_id: string
          created_at: string
          document_type: string
          expires_at: string | null
          id: string
          mime_type: string | null
          size_bytes: number | null
          status: string
          storage_path: string | null
          tags: string[]
          title: string
          uploaded_by: string | null
        }
        Insert: {
          company_id: string
          created_at?: string
          document_type: string
          expires_at?: string | null
          id?: string
          mime_type?: string | null
          size_bytes?: number | null
          status?: string
          storage_path?: string | null
          tags?: string[]
          title: string
          uploaded_by?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string
          document_type?: string
          expires_at?: string | null
          id?: string
          mime_type?: string | null
          size_bytes?: number | null
          status?: string
          storage_path?: string | null
          tags?: string[]
          title?: string
          uploaded_by?: string | null
        }
        Relationships: []
      }
      driver_live_state: {
        Row: {
          active_load_id: string | null
          active_shipment_id: string | null
          app_state: Database["public"]["Enums"]["app_state"] | null
          battery_level: number | null
          company_id: string
          current_latitude: number | null
          current_longitude: number | null
          driver_id: string
          driver_status: Database["public"]["Enums"]["driver_status"] | null
          eta_minutes: number | null
          heading: number | null
          is_charging: boolean | null
          is_gps_stale: boolean
          last_location_at: string | null
          last_status_at: string | null
          location_permission_status: Database["public"]["Enums"]["location_permission_status"]
          remaining_miles: number | null
          route_progress_pct: number | null
          route_status: string | null
          speed_mph: number | null
          tracking_mode: Database["public"]["Enums"]["tracking_mode"]
          updated_at: string
          vehicle_id: string | null
        }
        Insert: {
          active_load_id?: string | null
          active_shipment_id?: string | null
          app_state?: Database["public"]["Enums"]["app_state"] | null
          battery_level?: number | null
          company_id: string
          current_latitude?: number | null
          current_longitude?: number | null
          driver_id: string
          driver_status?: Database["public"]["Enums"]["driver_status"] | null
          eta_minutes?: number | null
          heading?: number | null
          is_charging?: boolean | null
          is_gps_stale?: boolean
          last_location_at?: string | null
          last_status_at?: string | null
          location_permission_status?: Database["public"]["Enums"]["location_permission_status"]
          remaining_miles?: number | null
          route_progress_pct?: number | null
          route_status?: string | null
          speed_mph?: number | null
          tracking_mode?: Database["public"]["Enums"]["tracking_mode"]
          updated_at?: string
          vehicle_id?: string | null
        }
        Update: {
          active_load_id?: string | null
          active_shipment_id?: string | null
          app_state?: Database["public"]["Enums"]["app_state"] | null
          battery_level?: number | null
          company_id?: string
          current_latitude?: number | null
          current_longitude?: number | null
          driver_id?: string
          driver_status?: Database["public"]["Enums"]["driver_status"] | null
          eta_minutes?: number | null
          heading?: number | null
          is_charging?: boolean | null
          is_gps_stale?: boolean
          last_location_at?: string | null
          last_status_at?: string | null
          location_permission_status?: Database["public"]["Enums"]["location_permission_status"]
          remaining_miles?: number | null
          route_progress_pct?: number | null
          route_status?: string | null
          speed_mph?: number | null
          tracking_mode?: Database["public"]["Enums"]["tracking_mode"]
          updated_at?: string
          vehicle_id?: string | null
        }
        Relationships: []
      }
      driver_location_events: {
        Row: {
          accuracy_meters: number | null
          active_load_id: string | null
          active_shipment_id: string | null
          altitude: number | null
          app_state: Database["public"]["Enums"]["app_state"] | null
          battery_level: number | null
          company_id: string
          driver_id: string
          driver_status: Database["public"]["Enums"]["driver_status"] | null
          eta_minutes: number | null
          event_source: Database["public"]["Enums"]["event_source"] | null
          heading: number | null
          id: number
          is_charging: boolean | null
          lat: number
          lng: number
          recorded_at: string
          remaining_miles: number | null
          route_status: string | null
          speed: number | null
          tracking_mode: Database["public"]["Enums"]["tracking_mode"] | null
          vehicle_id: string | null
        }
        Insert: {
          accuracy_meters?: number | null
          active_load_id?: string | null
          active_shipment_id?: string | null
          altitude?: number | null
          app_state?: Database["public"]["Enums"]["app_state"] | null
          battery_level?: number | null
          company_id: string
          driver_id: string
          driver_status?: Database["public"]["Enums"]["driver_status"] | null
          eta_minutes?: number | null
          event_source?: Database["public"]["Enums"]["event_source"] | null
          heading?: number | null
          id?: number
          is_charging?: boolean | null
          lat: number
          lng: number
          recorded_at?: string
          remaining_miles?: number | null
          route_status?: string | null
          speed?: number | null
          tracking_mode?: Database["public"]["Enums"]["tracking_mode"] | null
          vehicle_id?: string | null
        }
        Update: {
          accuracy_meters?: number | null
          active_load_id?: string | null
          active_shipment_id?: string | null
          altitude?: number | null
          app_state?: Database["public"]["Enums"]["app_state"] | null
          battery_level?: number | null
          company_id?: string
          driver_id?: string
          driver_status?: Database["public"]["Enums"]["driver_status"] | null
          eta_minutes?: number | null
          event_source?: Database["public"]["Enums"]["event_source"] | null
          heading?: number | null
          id?: number
          is_charging?: boolean | null
          lat?: number
          lng?: number
          recorded_at?: string
          remaining_miles?: number | null
          route_status?: string | null
          speed?: number | null
          tracking_mode?: Database["public"]["Enums"]["tracking_mode"] | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "driver_location_events_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "driver_location_events_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
        ]
      }
      driver_locations: {
        Row: {
          company_id: string
          created_at: string
          current_load_number: string | null
          driver_id: string
          eta_minutes: number | null
          heading: number | null
          last_ping_at: string
          latitude: number
          longitude: number
          speed_mph: number | null
          status: Database["public"]["Enums"]["driver_location_status"]
          unit_number: string | null
          updated_at: string
          vehicle_type: string | null
        }
        Insert: {
          company_id: string
          created_at?: string
          current_load_number?: string | null
          driver_id: string
          eta_minutes?: number | null
          heading?: number | null
          last_ping_at?: string
          latitude: number
          longitude: number
          speed_mph?: number | null
          status?: Database["public"]["Enums"]["driver_location_status"]
          unit_number?: string | null
          updated_at?: string
          vehicle_type?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string
          current_load_number?: string | null
          driver_id?: string
          eta_minutes?: number | null
          heading?: number | null
          last_ping_at?: string
          latitude?: number
          longitude?: number
          speed_mph?: number | null
          status?: Database["public"]["Enums"]["driver_location_status"]
          unit_number?: string | null
          updated_at?: string
          vehicle_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "driver_locations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      driver_navigation_preferences: {
        Row: {
          avoid_highways: boolean
          avoid_tolls: boolean
          company_id: string
          created_at: string
          driver_id: string
          id: string
          preferred_provider: string | null
          updated_at: string
          voice_enabled: boolean
        }
        Insert: {
          avoid_highways?: boolean
          avoid_tolls?: boolean
          company_id: string
          created_at?: string
          driver_id: string
          id?: string
          preferred_provider?: string | null
          updated_at?: string
          voice_enabled?: boolean
        }
        Update: {
          avoid_highways?: boolean
          avoid_tolls?: boolean
          company_id?: string
          created_at?: string
          driver_id?: string
          id?: string
          preferred_provider?: string | null
          updated_at?: string
          voice_enabled?: boolean
        }
        Relationships: []
      }
      driver_push_tokens: {
        Row: {
          app_version: string | null
          company_id: string
          created_at: string
          device_id: string | null
          device_model: string | null
          driver_id: string
          id: string
          last_seen_at: string
          locale: string | null
          platform: string | null
          provider: string
          revoked_at: string | null
          token: string
          updated_at: string
        }
        Insert: {
          app_version?: string | null
          company_id: string
          created_at?: string
          device_id?: string | null
          device_model?: string | null
          driver_id: string
          id?: string
          last_seen_at?: string
          locale?: string | null
          platform?: string | null
          provider: string
          revoked_at?: string | null
          token: string
          updated_at?: string
        }
        Update: {
          app_version?: string | null
          company_id?: string
          created_at?: string
          device_id?: string | null
          device_model?: string | null
          driver_id?: string
          id?: string
          last_seen_at?: string
          locale?: string | null
          platform?: string | null
          provider?: string
          revoked_at?: string | null
          token?: string
          updated_at?: string
        }
        Relationships: []
      }
      driver_status_events: {
        Row: {
          company_id: string
          created_by: string | null
          driver_id: string
          id: number
          lat: number | null
          lng: number | null
          load_id: string | null
          note: string | null
          previous_status: Database["public"]["Enums"]["driver_status"] | null
          reason: string | null
          recorded_at: string
          status: Database["public"]["Enums"]["driver_status"]
          vehicle_id: string | null
        }
        Insert: {
          company_id: string
          created_by?: string | null
          driver_id: string
          id?: number
          lat?: number | null
          lng?: number | null
          load_id?: string | null
          note?: string | null
          previous_status?: Database["public"]["Enums"]["driver_status"] | null
          reason?: string | null
          recorded_at?: string
          status: Database["public"]["Enums"]["driver_status"]
          vehicle_id?: string | null
        }
        Update: {
          company_id?: string
          created_by?: string | null
          driver_id?: string
          id?: number
          lat?: number | null
          lng?: number | null
          load_id?: string | null
          note?: string | null
          previous_status?: Database["public"]["Enums"]["driver_status"] | null
          reason?: string | null
          recorded_at?: string
          status?: Database["public"]["Enums"]["driver_status"]
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "driver_status_events_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "driver_status_events_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
        ]
      }
      drivers: {
        Row: {
          active_shipment_id: string | null
          average_mpg: number | null
          cdl_status: boolean
          company_id: string
          created_at: string
          current_lat: number | null
          current_lng: number | null
          current_load_id: string | null
          current_location_label: string | null
          current_speed: number | null
          dispatcher_name: string | null
          email: string | null
          eta: string | null
          id: string
          last_updated: string
          license_type: Database["public"]["Enums"]["license_type"]
          loads_today: number | null
          miles_today: number | null
          name: string
          on_time_percentage: number | null
          phone: string | null
          photo_url: string | null
          safety_score: number | null
          status: Database["public"]["Enums"]["driver_status"]
          user_id: string | null
          vehicle_id: string | null
          vehicle_type: Database["public"]["Enums"]["vehicle_type"] | null
        }
        Insert: {
          active_shipment_id?: string | null
          average_mpg?: number | null
          cdl_status?: boolean
          company_id: string
          created_at?: string
          current_lat?: number | null
          current_lng?: number | null
          current_load_id?: string | null
          current_location_label?: string | null
          current_speed?: number | null
          dispatcher_name?: string | null
          email?: string | null
          eta?: string | null
          id?: string
          last_updated?: string
          license_type?: Database["public"]["Enums"]["license_type"]
          loads_today?: number | null
          miles_today?: number | null
          name: string
          on_time_percentage?: number | null
          phone?: string | null
          photo_url?: string | null
          safety_score?: number | null
          status?: Database["public"]["Enums"]["driver_status"]
          user_id?: string | null
          vehicle_id?: string | null
          vehicle_type?: Database["public"]["Enums"]["vehicle_type"] | null
        }
        Update: {
          active_shipment_id?: string | null
          average_mpg?: number | null
          cdl_status?: boolean
          company_id?: string
          created_at?: string
          current_lat?: number | null
          current_lng?: number | null
          current_load_id?: string | null
          current_location_label?: string | null
          current_speed?: number | null
          dispatcher_name?: string | null
          email?: string | null
          eta?: string | null
          id?: string
          last_updated?: string
          license_type?: Database["public"]["Enums"]["license_type"]
          loads_today?: number | null
          miles_today?: number | null
          name?: string
          on_time_percentage?: number | null
          phone?: string | null
          photo_url?: string | null
          safety_score?: number | null
          status?: Database["public"]["Enums"]["driver_status"]
          user_id?: string | null
          vehicle_id?: string | null
          vehicle_type?: Database["public"]["Enums"]["vehicle_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "drivers_active_shipment_fk"
            columns: ["active_shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "drivers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "drivers_current_load_fk"
            columns: ["current_load_id"]
            isOneToOne: false
            referencedRelation: "loads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "drivers_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      edi_acknowledgments: {
        Row: {
          acknowledgment_type: string
          company_id: string
          control_number: string | null
          created_at: string
          id: string
          message: string | null
          status: string
          transaction_id: string | null
        }
        Insert: {
          acknowledgment_type: string
          company_id: string
          control_number?: string | null
          created_at?: string
          id?: string
          message?: string | null
          status: string
          transaction_id?: string | null
        }
        Update: {
          acknowledgment_type?: string
          company_id?: string
          control_number?: string | null
          created_at?: string
          id?: string
          message?: string | null
          status?: string
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "edi_acknowledgments_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "edi_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      edi_mappings: {
        Row: {
          company_id: string
          created_at: string
          destination_field: string
          id: string
          partner_id: string | null
          required: boolean
          source_field: string
          transaction_type: string
          transform_rule: string | null
        }
        Insert: {
          company_id: string
          created_at?: string
          destination_field: string
          id?: string
          partner_id?: string | null
          required?: boolean
          source_field: string
          transaction_type: string
          transform_rule?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string
          destination_field?: string
          id?: string
          partner_id?: string | null
          required?: boolean
          source_field?: string
          transaction_type?: string
          transform_rule?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "edi_mappings_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "edi_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      edi_partners: {
        Row: {
          company_id: string
          contact_email: string | null
          created_at: string
          edi_standard: string
          enabled: boolean
          id: string
          partner_name: string
          partner_type: string
          qualifier: string | null
          trading_partner_id: string | null
          transport_method: string
          updated_at: string
        }
        Insert: {
          company_id: string
          contact_email?: string | null
          created_at?: string
          edi_standard?: string
          enabled?: boolean
          id?: string
          partner_name: string
          partner_type?: string
          qualifier?: string | null
          trading_partner_id?: string | null
          transport_method?: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          contact_email?: string | null
          created_at?: string
          edi_standard?: string
          enabled?: boolean
          id?: string
          partner_name?: string
          partner_type?: string
          qualifier?: string | null
          trading_partner_id?: string | null
          transport_method?: string
          updated_at?: string
        }
        Relationships: []
      }
      edi_transactions: {
        Row: {
          acknowledged_at: string | null
          company_id: string
          control_number: string | null
          created_at: string
          direction: string
          error_message: string | null
          id: string
          parsed_payload: Json | null
          partner_id: string | null
          processed_at: string | null
          raw_payload: string | null
          received_at: string | null
          related_invoice_id: string | null
          related_load_id: string | null
          related_shipment_id: string | null
          status: string
          transaction_type: string
        }
        Insert: {
          acknowledged_at?: string | null
          company_id: string
          control_number?: string | null
          created_at?: string
          direction: string
          error_message?: string | null
          id?: string
          parsed_payload?: Json | null
          partner_id?: string | null
          processed_at?: string | null
          raw_payload?: string | null
          received_at?: string | null
          related_invoice_id?: string | null
          related_load_id?: string | null
          related_shipment_id?: string | null
          status?: string
          transaction_type: string
        }
        Update: {
          acknowledged_at?: string | null
          company_id?: string
          control_number?: string | null
          created_at?: string
          direction?: string
          error_message?: string | null
          id?: string
          parsed_payload?: Json | null
          partner_id?: string | null
          processed_at?: string | null
          raw_payload?: string | null
          received_at?: string | null
          related_invoice_id?: string | null
          related_load_id?: string | null
          related_shipment_id?: string | null
          status?: string
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "edi_transactions_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "edi_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          body_html: string | null
          body_text: string | null
          branding_enabled: boolean
          company_id: string
          created_at: string
          enabled: boolean
          id: string
          subject: string
          template_type: string
          updated_at: string
        }
        Insert: {
          body_html?: string | null
          body_text?: string | null
          branding_enabled?: boolean
          company_id: string
          created_at?: string
          enabled?: boolean
          id?: string
          subject: string
          template_type: string
          updated_at?: string
        }
        Update: {
          body_html?: string | null
          body_text?: string | null
          branding_enabled?: boolean
          company_id?: string
          created_at?: string
          enabled?: boolean
          id?: string
          subject?: string
          template_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      eta_updates: {
        Row: {
          company_id: string
          confidence: number | null
          driver_id: string | null
          eta_at: string | null
          eta_seconds_remaining: number | null
          id: string
          load_id: string | null
          reason: string
          recorded_at: string
          route_id: string
          source: string
        }
        Insert: {
          company_id: string
          confidence?: number | null
          driver_id?: string | null
          eta_at?: string | null
          eta_seconds_remaining?: number | null
          id?: string
          load_id?: string | null
          reason: string
          recorded_at?: string
          route_id: string
          source: string
        }
        Update: {
          company_id?: string
          confidence?: number | null
          driver_id?: string | null
          eta_at?: string | null
          eta_seconds_remaining?: number | null
          id?: string
          load_id?: string | null
          reason?: string
          recorded_at?: string
          route_id?: string
          source?: string
        }
        Relationships: []
      }
      feature_flags: {
        Row: {
          created_at: string
          default_enabled: boolean
          description: string | null
          id: string
          key: string
        }
        Insert: {
          created_at?: string
          default_enabled?: boolean
          description?: string | null
          id?: string
          key: string
        }
        Update: {
          created_at?: string
          default_enabled?: boolean
          description?: string | null
          id?: string
          key?: string
        }
        Relationships: []
      }
      fuel_surcharge_rules: {
        Row: {
          base_fuel_price: number
          company_id: string
          created_at: string
          effective_from: string | null
          effective_to: string | null
          id: string
          index_source: string | null
          miles_per_gallon: number
          name: string
          surcharge_per_mile: number | null
        }
        Insert: {
          base_fuel_price: number
          company_id: string
          created_at?: string
          effective_from?: string | null
          effective_to?: string | null
          id?: string
          index_source?: string | null
          miles_per_gallon?: number
          name: string
          surcharge_per_mile?: number | null
        }
        Update: {
          base_fuel_price?: number
          company_id?: string
          created_at?: string
          effective_from?: string | null
          effective_to?: string | null
          id?: string
          index_source?: string | null
          miles_per_gallon?: number
          name?: string
          surcharge_per_mile?: number | null
        }
        Relationships: []
      }
      in_vehicle_sessions: {
        Row: {
          app_template: string | null
          company_id: string
          connected_at: string
          created_at: string
          disconnected_at: string | null
          driver_id: string
          id: string
          last_event_at: string
          session_id: string
          surface: string
          updated_at: string
          vehicle_make: string | null
          vehicle_model: string | null
        }
        Insert: {
          app_template?: string | null
          company_id: string
          connected_at?: string
          created_at?: string
          disconnected_at?: string | null
          driver_id: string
          id?: string
          last_event_at?: string
          session_id: string
          surface: string
          updated_at?: string
          vehicle_make?: string | null
          vehicle_model?: string | null
        }
        Update: {
          app_template?: string | null
          company_id?: string
          connected_at?: string
          created_at?: string
          disconnected_at?: string | null
          driver_id?: string
          id?: string
          last_event_at?: string
          session_id?: string
          surface?: string
          updated_at?: string
          vehicle_make?: string | null
          vehicle_model?: string | null
        }
        Relationships: []
      }
      integration_connectors: {
        Row: {
          capabilities: Json
          category: string
          created_at: string
          description: string | null
          id: string
          key: string
          logo_url: string | null
          name: string
          status: string
          vendor: string | null
        }
        Insert: {
          capabilities?: Json
          category: string
          created_at?: string
          description?: string | null
          id?: string
          key: string
          logo_url?: string | null
          name: string
          status?: string
          vendor?: string | null
        }
        Update: {
          capabilities?: Json
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          key?: string
          logo_url?: string | null
          name?: string
          status?: string
          vendor?: string | null
        }
        Relationships: []
      }
      integration_error_logs: {
        Row: {
          company_id: string
          context: Json
          created_at: string
          id: string
          integration_id: string | null
          message: string
          severity: string
          source: string
        }
        Insert: {
          company_id: string
          context?: Json
          created_at?: string
          id?: string
          integration_id?: string | null
          message: string
          severity?: string
          source: string
        }
        Update: {
          company_id?: string
          context?: Json
          created_at?: string
          id?: string
          integration_id?: string | null
          message?: string
          severity?: string
          source?: string
        }
        Relationships: []
      }
      integration_health_events: {
        Row: {
          company_id: string
          created_at: string
          id: string
          integration_id: string
          message: string | null
          status: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          integration_id: string
          message?: string | null
          status: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          integration_id?: string
          message?: string | null
          status?: string
        }
        Relationships: []
      }
      integration_sync_logs: {
        Row: {
          company_id: string
          created_at: string
          duration_ms: number | null
          id: string
          integration_id: string
          message: string | null
          records_processed: number | null
          status: string
        }
        Insert: {
          company_id: string
          created_at?: string
          duration_ms?: number | null
          id?: string
          integration_id: string
          message?: string | null
          records_processed?: number | null
          status: string
        }
        Update: {
          company_id?: string
          created_at?: string
          duration_ms?: number | null
          id?: string
          integration_id?: string
          message?: string | null
          records_processed?: number | null
          status?: string
        }
        Relationships: []
      }
      load_offers: {
        Row: {
          company_id: string
          created_at: string
          deny_reason: string | null
          driver_id: string
          expires_at: string | null
          id: string
          load_id: string
          offered_by: string | null
          responded_at: string | null
          response: Database["public"]["Enums"]["offer_response"]
        }
        Insert: {
          company_id: string
          created_at?: string
          deny_reason?: string | null
          driver_id: string
          expires_at?: string | null
          id?: string
          load_id: string
          offered_by?: string | null
          responded_at?: string | null
          response?: Database["public"]["Enums"]["offer_response"]
        }
        Update: {
          company_id?: string
          created_at?: string
          deny_reason?: string | null
          driver_id?: string
          expires_at?: string | null
          id?: string
          load_id?: string
          offered_by?: string | null
          responded_at?: string | null
          response?: Database["public"]["Enums"]["offer_response"]
        }
        Relationships: [
          {
            foreignKeyName: "load_offers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "load_offers_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "load_offers_load_id_fkey"
            columns: ["load_id"]
            isOneToOne: false
            referencedRelation: "loads"
            referencedColumns: ["id"]
          },
        ]
      }
      load_status_updates: {
        Row: {
          changed_at: string
          company_id: string
          driver_id: string | null
          from_status: Database["public"]["Enums"]["load_status"] | null
          id: string
          lat: number | null
          lng: number | null
          load_id: string
          note: string | null
          source: string
          to_status: Database["public"]["Enums"]["load_status"]
        }
        Insert: {
          changed_at?: string
          company_id: string
          driver_id?: string | null
          from_status?: Database["public"]["Enums"]["load_status"] | null
          id?: string
          lat?: number | null
          lng?: number | null
          load_id: string
          note?: string | null
          source?: string
          to_status: Database["public"]["Enums"]["load_status"]
        }
        Update: {
          changed_at?: string
          company_id?: string
          driver_id?: string | null
          from_status?: Database["public"]["Enums"]["load_status"] | null
          id?: string
          lat?: number | null
          lng?: number | null
          load_id?: string
          note?: string | null
          source?: string
          to_status?: Database["public"]["Enums"]["load_status"]
        }
        Relationships: []
      }
      load_stops: {
        Row: {
          actual_arrival: string | null
          actual_departure: string | null
          address: string | null
          city: string | null
          company_id: string
          contact_name: string | null
          contact_phone: string | null
          country: string | null
          created_at: string
          customer_location_id: string | null
          id: string
          instructions: string | null
          kind: Database["public"]["Enums"]["load_stop_kind"]
          latitude: number | null
          load_id: string
          longitude: number | null
          name: string | null
          postal_code: string | null
          region: string | null
          scheduled_arrival: string | null
          scheduled_departure: string | null
          sequence: number
          status: Database["public"]["Enums"]["load_stop_status"]
          updated_at: string
        }
        Insert: {
          actual_arrival?: string | null
          actual_departure?: string | null
          address?: string | null
          city?: string | null
          company_id: string
          contact_name?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string
          customer_location_id?: string | null
          id?: string
          instructions?: string | null
          kind: Database["public"]["Enums"]["load_stop_kind"]
          latitude?: number | null
          load_id: string
          longitude?: number | null
          name?: string | null
          postal_code?: string | null
          region?: string | null
          scheduled_arrival?: string | null
          scheduled_departure?: string | null
          sequence?: number
          status?: Database["public"]["Enums"]["load_stop_status"]
          updated_at?: string
        }
        Update: {
          actual_arrival?: string | null
          actual_departure?: string | null
          address?: string | null
          city?: string | null
          company_id?: string
          contact_name?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string
          customer_location_id?: string | null
          id?: string
          instructions?: string | null
          kind?: Database["public"]["Enums"]["load_stop_kind"]
          latitude?: number | null
          load_id?: string
          longitude?: number | null
          name?: string | null
          postal_code?: string | null
          region?: string | null
          scheduled_arrival?: string | null
          scheduled_departure?: string | null
          sequence?: number
          status?: Database["public"]["Enums"]["load_stop_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "load_stops_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "load_stops_customer_location_id_fkey"
            columns: ["customer_location_id"]
            isOneToOne: false
            referencedRelation: "customer_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "load_stops_load_id_fkey"
            columns: ["load_id"]
            isOneToOne: false
            referencedRelation: "loads"
            referencedColumns: ["id"]
          },
        ]
      }
      loads: {
        Row: {
          assigned_driver_id: string | null
          commodity: string | null
          company_id: string
          created_at: string
          created_by: string | null
          customer: string | null
          delivery_window: string | null
          dispatcher_note: string | null
          dropoff_location: string
          estimated_duration: string | null
          estimated_miles: number | null
          id: string
          package_type: string | null
          pickup_location: string
          pickup_window: string | null
          quantity: number | null
          rate: number | null
          required_vehicle_type:
            | Database["public"]["Enums"]["vehicle_type"]
            | null
          requires_cdl: boolean
          requires_hazmat: boolean
          status: Database["public"]["Enums"]["load_status"]
          updated_at: string
          weight: number | null
        }
        Insert: {
          assigned_driver_id?: string | null
          commodity?: string | null
          company_id: string
          created_at?: string
          created_by?: string | null
          customer?: string | null
          delivery_window?: string | null
          dispatcher_note?: string | null
          dropoff_location: string
          estimated_duration?: string | null
          estimated_miles?: number | null
          id?: string
          package_type?: string | null
          pickup_location: string
          pickup_window?: string | null
          quantity?: number | null
          rate?: number | null
          required_vehicle_type?:
            | Database["public"]["Enums"]["vehicle_type"]
            | null
          requires_cdl?: boolean
          requires_hazmat?: boolean
          status?: Database["public"]["Enums"]["load_status"]
          updated_at?: string
          weight?: number | null
        }
        Update: {
          assigned_driver_id?: string | null
          commodity?: string | null
          company_id?: string
          created_at?: string
          created_by?: string | null
          customer?: string | null
          delivery_window?: string | null
          dispatcher_note?: string | null
          dropoff_location?: string
          estimated_duration?: string | null
          estimated_miles?: number | null
          id?: string
          package_type?: string | null
          pickup_location?: string
          pickup_window?: string | null
          quantity?: number | null
          rate?: number | null
          required_vehicle_type?:
            | Database["public"]["Enums"]["vehicle_type"]
            | null
          requires_cdl?: boolean
          requires_hazmat?: boolean
          status?: Database["public"]["Enums"]["load_status"]
          updated_at?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "loads_assigned_driver_id_fkey"
            columns: ["assigned_driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loads_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      logistics_map_geofences: {
        Row: {
          company_id: string
          created_at: string
          created_by: string | null
          id: string
          latitude: number
          longitude: number
          name: string
          notes: string | null
          radius_m: number
          status: string
          type: string
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          latitude: number
          longitude: number
          name: string
          notes?: string | null
          radius_m?: number
          status?: string
          type?: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          latitude?: number
          longitude?: number
          name?: string
          notes?: string | null
          radius_m?: number
          status?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "logistics_map_geofences_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      logistics_map_pois: {
        Row: {
          address: string | null
          category: string
          city: string | null
          company_id: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          is_public: boolean
          latitude: number
          longitude: number
          metadata: Json
          name: string
          phone: string | null
          state: string | null
          updated_at: string
          website: string | null
          zip: string | null
        }
        Insert: {
          address?: string | null
          category?: string
          city?: string | null
          company_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          is_public?: boolean
          latitude: number
          longitude: number
          metadata?: Json
          name: string
          phone?: string | null
          state?: string | null
          updated_at?: string
          website?: string | null
          zip?: string | null
        }
        Update: {
          address?: string | null
          category?: string
          city?: string | null
          company_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          is_public?: boolean
          latitude?: number
          longitude?: number
          metadata?: Json
          name?: string
          phone?: string | null
          state?: string | null
          updated_at?: string
          website?: string | null
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "logistics_map_pois_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      message_read_receipts: {
        Row: {
          contact_id: string | null
          id: string
          message_id: string
          read_at: string
          user_id: string | null
        }
        Insert: {
          contact_id?: string | null
          id?: string
          message_id: string
          read_at?: string
          user_id?: string | null
        }
        Update: {
          contact_id?: string | null
          id?: string
          message_id?: string
          read_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "message_read_receipts_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "messenger_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_read_receipts_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messenger_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      messenger_ai_summaries: {
        Row: {
          company_id: string
          conversation_id: string
          created_at: string
          id: string
          risk_level: string
          suggested_action: string | null
          summary_text: string
        }
        Insert: {
          company_id: string
          conversation_id: string
          created_at?: string
          id?: string
          risk_level?: string
          suggested_action?: string | null
          summary_text: string
        }
        Update: {
          company_id?: string
          conversation_id?: string
          created_at?: string
          id?: string
          risk_level?: string
          suggested_action?: string | null
          summary_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "messenger_ai_summaries_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "messenger_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      messenger_attachments: {
        Row: {
          company_id: string | null
          created_at: string
          file_name: string
          file_size_bytes: number | null
          file_type: string | null
          file_url: string | null
          height: number | null
          id: string
          message_id: string
          mime_type: string | null
          storage_bucket: string
          storage_path: string
          uploaded_by: string | null
          width: number | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          file_name: string
          file_size_bytes?: number | null
          file_type?: string | null
          file_url?: string | null
          height?: number | null
          id?: string
          message_id: string
          mime_type?: string | null
          storage_bucket?: string
          storage_path: string
          uploaded_by?: string | null
          width?: number | null
        }
        Update: {
          company_id?: string | null
          created_at?: string
          file_name?: string
          file_size_bytes?: number | null
          file_type?: string | null
          file_url?: string | null
          height?: number | null
          id?: string
          message_id?: string
          mime_type?: string | null
          storage_bucket?: string
          storage_path?: string
          uploaded_by?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "messenger_attachments_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messenger_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      messenger_audit_log: {
        Row: {
          action_type: string
          actor_contact_id: string | null
          actor_user_id: string | null
          company_id: string
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          metadata: Json
        }
        Insert: {
          action_type: string
          actor_contact_id?: string | null
          actor_user_id?: string | null
          company_id: string
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          metadata?: Json
        }
        Update: {
          action_type?: string
          actor_contact_id?: string | null
          actor_user_id?: string | null
          company_id?: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          metadata?: Json
        }
        Relationships: []
      }
      messenger_call_logs: {
        Row: {
          call_status: string
          call_type: string
          company_id: string
          contact_user_id: string | null
          conversation_id: string | null
          created_at: string
          created_by: string | null
          duration_seconds: number | null
          id: string
          linked_load_id: string | null
          notes: string | null
        }
        Insert: {
          call_status?: string
          call_type: string
          company_id: string
          contact_user_id?: string | null
          conversation_id?: string | null
          created_at?: string
          created_by?: string | null
          duration_seconds?: number | null
          id?: string
          linked_load_id?: string | null
          notes?: string | null
        }
        Update: {
          call_status?: string
          call_type?: string
          company_id?: string
          contact_user_id?: string | null
          conversation_id?: string | null
          created_at?: string
          created_by?: string | null
          duration_seconds?: number | null
          id?: string
          linked_load_id?: string | null
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messenger_call_logs_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "messenger_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      messenger_channels: {
        Row: {
          channel_key: string
          channel_name: string
          channel_type: string | null
          company_id: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_archived: boolean | null
          is_private: boolean | null
          workspace_id: string | null
        }
        Insert: {
          channel_key: string
          channel_name: string
          channel_type?: string | null
          company_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_archived?: boolean | null
          is_private?: boolean | null
          workspace_id?: string | null
        }
        Update: {
          channel_key?: string
          channel_name?: string
          channel_type?: string | null
          company_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_archived?: boolean | null
          is_private?: boolean | null
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messenger_channels_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "messenger_workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      messenger_contacts: {
        Row: {
          avatar_url: string | null
          company_id: string
          company_name: string | null
          contact_type: Database["public"]["Enums"]["messenger_contact_type"]
          created_at: string
          display_name: string
          email: string | null
          full_name: string
          id: string
          is_online: boolean
          last_seen_at: string | null
          metadata: Json
          phone: string | null
          role: string
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          company_id: string
          company_name?: string | null
          contact_type?: Database["public"]["Enums"]["messenger_contact_type"]
          created_at?: string
          display_name: string
          email?: string | null
          full_name: string
          id?: string
          is_online?: boolean
          last_seen_at?: string | null
          metadata?: Json
          phone?: string | null
          role: string
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          company_id?: string
          company_name?: string | null
          contact_type?: Database["public"]["Enums"]["messenger_contact_type"]
          created_at?: string
          display_name?: string
          email?: string | null
          full_name?: string
          id?: string
          is_online?: boolean
          last_seen_at?: string | null
          metadata?: Json
          phone?: string | null
          role?: string
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messenger_contacts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      messenger_conversation_members: {
        Row: {
          company_id: string | null
          contact_id: string | null
          conversation_id: string
          id: string
          is_favorite: boolean | null
          is_muted: boolean | null
          joined_at: string
          left_at: string | null
          member_role: string | null
          notification_level: string | null
          role: string | null
          snoozed_until: string | null
          user_id: string | null
        }
        Insert: {
          company_id?: string | null
          contact_id?: string | null
          conversation_id: string
          id?: string
          is_favorite?: boolean | null
          is_muted?: boolean | null
          joined_at?: string
          left_at?: string | null
          member_role?: string | null
          notification_level?: string | null
          role?: string | null
          snoozed_until?: string | null
          user_id?: string | null
        }
        Update: {
          company_id?: string | null
          contact_id?: string | null
          conversation_id?: string
          id?: string
          is_favorite?: boolean | null
          is_muted?: boolean | null
          joined_at?: string
          left_at?: string | null
          member_role?: string | null
          notification_level?: string | null
          role?: string | null
          snoozed_until?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messenger_conversation_members_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "messenger_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messenger_conversation_members_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "messenger_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      messenger_conversation_participants: {
        Row: {
          contact_id: string | null
          conversation_id: string
          id: string
          is_muted: boolean
          joined_at: string
          user_id: string | null
        }
        Insert: {
          contact_id?: string | null
          conversation_id: string
          id?: string
          is_muted?: boolean
          joined_at?: string
          user_id?: string | null
        }
        Update: {
          contact_id?: string | null
          conversation_id?: string
          id?: string
          is_muted?: boolean
          joined_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messenger_conversation_participants_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "messenger_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messenger_conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "messenger_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      messenger_conversation_tags: {
        Row: {
          company_id: string
          conversation_id: string
          created_at: string
          id: string
          tag_color: string | null
          tag_name: string
        }
        Insert: {
          company_id: string
          conversation_id: string
          created_at?: string
          id?: string
          tag_color?: string | null
          tag_name: string
        }
        Update: {
          company_id?: string
          conversation_id?: string
          created_at?: string
          id?: string
          tag_color?: string | null
          tag_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "messenger_conversation_tags_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "messenger_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      messenger_conversations: {
        Row: {
          category: Database["public"]["Enums"]["messenger_conversation_category"]
          channel_id: string | null
          company_id: string
          conversation_type: string | null
          created_at: string
          created_by: string | null
          customer_id: string | null
          driver_id: string | null
          facility_id: string | null
          id: string
          is_archived: boolean | null
          is_pinned: boolean
          last_message_at: string | null
          last_message_preview: string | null
          load_id: string | null
          order_id: string | null
          order_ref: string | null
          priority: string | null
          title: string | null
          updated_at: string
          workspace_id: string | null
        }
        Insert: {
          category?: Database["public"]["Enums"]["messenger_conversation_category"]
          channel_id?: string | null
          company_id: string
          conversation_type?: string | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          driver_id?: string | null
          facility_id?: string | null
          id?: string
          is_archived?: boolean | null
          is_pinned?: boolean
          last_message_at?: string | null
          last_message_preview?: string | null
          load_id?: string | null
          order_id?: string | null
          order_ref?: string | null
          priority?: string | null
          title?: string | null
          updated_at?: string
          workspace_id?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["messenger_conversation_category"]
          channel_id?: string | null
          company_id?: string
          conversation_type?: string | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          driver_id?: string | null
          facility_id?: string | null
          id?: string
          is_archived?: boolean | null
          is_pinned?: boolean
          last_message_at?: string | null
          last_message_preview?: string | null
          load_id?: string | null
          order_id?: string | null
          order_ref?: string | null
          priority?: string | null
          title?: string | null
          updated_at?: string
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messenger_conversations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      messenger_internal_notes: {
        Row: {
          author_id: string
          body: string
          company_id: string
          conversation_id: string
          created_at: string
          id: string
        }
        Insert: {
          author_id: string
          body: string
          company_id: string
          conversation_id: string
          created_at?: string
          id?: string
        }
        Update: {
          author_id?: string
          body?: string
          company_id?: string
          conversation_id?: string
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messenger_internal_notes_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "messenger_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      messenger_mentions: {
        Row: {
          company_id: string
          created_at: string
          id: string
          mentioned_contact_id: string | null
          mentioned_user_id: string | null
          message_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          mentioned_contact_id?: string | null
          mentioned_user_id?: string | null
          message_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          mentioned_contact_id?: string | null
          mentioned_user_id?: string | null
          message_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messenger_mentions_mentioned_contact_id_fkey"
            columns: ["mentioned_contact_id"]
            isOneToOne: false
            referencedRelation: "messenger_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messenger_mentions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messenger_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      messenger_message_edits: {
        Row: {
          company_id: string
          edited_at: string
          edited_by: string | null
          id: string
          message_id: string
          new_message_body: string | null
          old_message_body: string | null
        }
        Insert: {
          company_id: string
          edited_at?: string
          edited_by?: string | null
          id?: string
          message_id: string
          new_message_body?: string | null
          old_message_body?: string | null
        }
        Update: {
          company_id?: string
          edited_at?: string
          edited_by?: string | null
          id?: string
          message_id?: string
          new_message_body?: string | null
          old_message_body?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messenger_message_edits_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messenger_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      messenger_messages: {
        Row: {
          body: string | null
          company_id: string | null
          conversation_id: string
          created_at: string
          deleted_at: string | null
          edited_at: string | null
          id: string
          is_deleted: boolean | null
          is_edited: boolean | null
          is_outgoing: boolean | null
          is_pinned: boolean | null
          is_system: boolean
          message_body: string | null
          message_type: string | null
          priority: string | null
          reply_to_id: string | null
          search_vector: unknown
          sender_contact_id: string | null
          sender_user_id: string | null
          thread_parent_id: string | null
        }
        Insert: {
          body?: string | null
          company_id?: string | null
          conversation_id: string
          created_at?: string
          deleted_at?: string | null
          edited_at?: string | null
          id?: string
          is_deleted?: boolean | null
          is_edited?: boolean | null
          is_outgoing?: boolean | null
          is_pinned?: boolean | null
          is_system?: boolean
          message_body?: string | null
          message_type?: string | null
          priority?: string | null
          reply_to_id?: string | null
          search_vector?: unknown
          sender_contact_id?: string | null
          sender_user_id?: string | null
          thread_parent_id?: string | null
        }
        Update: {
          body?: string | null
          company_id?: string | null
          conversation_id?: string
          created_at?: string
          deleted_at?: string | null
          edited_at?: string | null
          id?: string
          is_deleted?: boolean | null
          is_edited?: boolean | null
          is_outgoing?: boolean | null
          is_pinned?: boolean | null
          is_system?: boolean
          message_body?: string | null
          message_type?: string | null
          priority?: string | null
          reply_to_id?: string | null
          search_vector?: unknown
          sender_contact_id?: string | null
          sender_user_id?: string | null
          thread_parent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messenger_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "messenger_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messenger_messages_reply_to_id_fkey"
            columns: ["reply_to_id"]
            isOneToOne: false
            referencedRelation: "messenger_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messenger_messages_sender_contact_id_fkey"
            columns: ["sender_contact_id"]
            isOneToOne: false
            referencedRelation: "messenger_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messenger_messages_thread_parent_id_fkey"
            columns: ["thread_parent_id"]
            isOneToOne: false
            referencedRelation: "messenger_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      messenger_notification_preferences: {
        Row: {
          company_id: string
          conversation_id: string | null
          created_at: string
          id: string
          is_muted: boolean
          muted_until: string | null
          notification_level: string
          user_id: string
        }
        Insert: {
          company_id: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          is_muted?: boolean
          muted_until?: string | null
          notification_level?: string
          user_id: string
        }
        Update: {
          company_id?: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          is_muted?: boolean
          muted_until?: string | null
          notification_level?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messenger_notification_preferences_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "messenger_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      messenger_pinned_items: {
        Row: {
          company_id: string
          conversation_id: string
          id: string
          message_id: string | null
          pinned_at: string
          pinned_by: string | null
        }
        Insert: {
          company_id: string
          conversation_id: string
          id?: string
          message_id?: string | null
          pinned_at?: string
          pinned_by?: string | null
        }
        Update: {
          company_id?: string
          conversation_id?: string
          id?: string
          message_id?: string | null
          pinned_at?: string
          pinned_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messenger_pinned_items_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "messenger_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messenger_pinned_items_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messenger_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      messenger_presence: {
        Row: {
          company_id: string
          contact_id: string | null
          current_view: string | null
          id: string
          last_seen_at: string
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          company_id: string
          contact_id?: string | null
          current_view?: string | null
          id?: string
          last_seen_at?: string
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          company_id?: string
          contact_id?: string | null
          current_view?: string | null
          id?: string
          last_seen_at?: string
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messenger_presence_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "messenger_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      messenger_reactions: {
        Row: {
          company_id: string
          contact_id: string | null
          created_at: string
          id: string
          message_id: string
          reaction: string
          user_id: string | null
        }
        Insert: {
          company_id: string
          contact_id?: string | null
          created_at?: string
          id?: string
          message_id: string
          reaction: string
          user_id?: string | null
        }
        Update: {
          company_id?: string
          contact_id?: string | null
          created_at?: string
          id?: string
          message_id?: string
          reaction?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messenger_reactions_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "messenger_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messenger_reactions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messenger_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      messenger_saved_messages: {
        Row: {
          company_id: string
          id: string
          message_id: string
          saved_at: string
          saved_by: string
        }
        Insert: {
          company_id: string
          id?: string
          message_id: string
          saved_at?: string
          saved_by: string
        }
        Update: {
          company_id?: string
          id?: string
          message_id?: string
          saved_at?: string
          saved_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "messenger_saved_messages_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messenger_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      messenger_tasks: {
        Row: {
          assigned_to: string | null
          company_id: string
          completed_at: string | null
          conversation_id: string | null
          created_at: string
          created_by: string | null
          due_at: string | null
          id: string
          message_id: string | null
          priority: string
          status: string
          task_description: string | null
          task_title: string
        }
        Insert: {
          assigned_to?: string | null
          company_id: string
          completed_at?: string | null
          conversation_id?: string | null
          created_at?: string
          created_by?: string | null
          due_at?: string | null
          id?: string
          message_id?: string | null
          priority?: string
          status?: string
          task_description?: string | null
          task_title: string
        }
        Update: {
          assigned_to?: string | null
          company_id?: string
          completed_at?: string | null
          conversation_id?: string | null
          created_at?: string
          created_by?: string | null
          due_at?: string | null
          id?: string
          message_id?: string | null
          priority?: string
          status?: string
          task_description?: string | null
          task_title?: string
        }
        Relationships: [
          {
            foreignKeyName: "messenger_tasks_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "messenger_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messenger_tasks_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messenger_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      messenger_templates: {
        Row: {
          category: string | null
          company_id: string
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean
          template_body: string
          template_name: string
        }
        Insert: {
          category?: string | null
          company_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          template_body: string
          template_name: string
        }
        Update: {
          category?: string | null
          company_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          template_body?: string
          template_name?: string
        }
        Relationships: []
      }
      messenger_typing_status: {
        Row: {
          company_id: string
          contact_id: string | null
          conversation_id: string
          id: string
          is_typing: boolean | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          company_id: string
          contact_id?: string | null
          conversation_id: string
          id?: string
          is_typing?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          company_id?: string
          contact_id?: string | null
          conversation_id?: string
          id?: string
          is_typing?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messenger_typing_status_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "messenger_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messenger_typing_status_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "messenger_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      messenger_workspaces: {
        Row: {
          company_id: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          company_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          company_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      mobile_device_sessions: {
        Row: {
          app_version: string | null
          battery_level: number | null
          company_id: string
          created_at: string
          device_id: string | null
          device_model: string | null
          driver_id: string
          ended_at: string | null
          id: string
          is_charging: boolean | null
          last_seen_at: string
          locale: string | null
          metadata: Json
          network_type: string | null
          os_version: string | null
          platform: string
          started_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          app_version?: string | null
          battery_level?: number | null
          company_id: string
          created_at?: string
          device_id?: string | null
          device_model?: string | null
          driver_id: string
          ended_at?: string | null
          id?: string
          is_charging?: boolean | null
          last_seen_at?: string
          locale?: string | null
          metadata?: Json
          network_type?: string | null
          os_version?: string | null
          platform: string
          started_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          app_version?: string | null
          battery_level?: number | null
          company_id?: string
          created_at?: string
          device_id?: string | null
          device_model?: string | null
          driver_id?: string
          ended_at?: string | null
          id?: string
          is_charging?: boolean | null
          last_seen_at?: string
          locale?: string | null
          metadata?: Json
          network_type?: string | null
          os_version?: string | null
          platform?: string
          started_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      navigation_events: {
        Row: {
          company_id: string
          created_at: string
          driver_id: string
          eta_minutes: number | null
          event_metadata: Json
          event_type: string
          heading: number | null
          id: string
          instruction: string | null
          latitude: number | null
          load_id: string | null
          longitude: number | null
          provider: string
          remaining_miles: number | null
          road_name: string | null
          session_id: string
          speed_mph: number | null
        }
        Insert: {
          company_id: string
          created_at?: string
          driver_id: string
          eta_minutes?: number | null
          event_metadata?: Json
          event_type: string
          heading?: number | null
          id?: string
          instruction?: string | null
          latitude?: number | null
          load_id?: string | null
          longitude?: number | null
          provider: string
          remaining_miles?: number | null
          road_name?: string | null
          session_id: string
          speed_mph?: number | null
        }
        Update: {
          company_id?: string
          created_at?: string
          driver_id?: string
          eta_minutes?: number | null
          event_metadata?: Json
          event_type?: string
          heading?: number | null
          id?: string
          instruction?: string | null
          latitude?: number | null
          load_id?: string | null
          longitude?: number | null
          provider?: string
          remaining_miles?: number | null
          road_name?: string | null
          session_id?: string
          speed_mph?: number | null
        }
        Relationships: []
      }
      navigation_provider_settings: {
        Row: {
          cdl_validation_required: boolean
          company_id: string
          created_at: string
          enable_alternatives: boolean
          enable_copilot: boolean
          enable_dispatch_monitoring: boolean
          enable_off_route_alerts: boolean
          enable_traffic: boolean
          enable_voice_instructions: boolean
          id: string
          mock_mode: boolean
          navigation_provider: string
          truck_validator: string
          updated_at: string
        }
        Insert: {
          cdl_validation_required?: boolean
          company_id: string
          created_at?: string
          enable_alternatives?: boolean
          enable_copilot?: boolean
          enable_dispatch_monitoring?: boolean
          enable_off_route_alerts?: boolean
          enable_traffic?: boolean
          enable_voice_instructions?: boolean
          id?: string
          mock_mode?: boolean
          navigation_provider?: string
          truck_validator?: string
          updated_at?: string
        }
        Update: {
          cdl_validation_required?: boolean
          company_id?: string
          created_at?: string
          enable_alternatives?: boolean
          enable_copilot?: boolean
          enable_dispatch_monitoring?: boolean
          enable_off_route_alerts?: boolean
          enable_traffic?: boolean
          enable_voice_instructions?: boolean
          id?: string
          mock_mode?: boolean
          navigation_provider?: string
          truck_validator?: string
          updated_at?: string
        }
        Relationships: []
      }
      navigation_sessions: {
        Row: {
          company_id: string
          completed_at: string | null
          created_at: string
          current_instruction: string | null
          current_step_index: number
          destination_latitude: number
          destination_longitude: number
          driver_id: string
          eta_minutes: number | null
          id: string
          is_navigation_active: boolean
          is_off_route: boolean
          is_rerouting: boolean
          load_id: string | null
          mode: string
          origin_latitude: number
          origin_longitude: number
          provider: string
          remaining_miles: number | null
          route_geometry_json: Json | null
          route_polyline: string | null
          route_progress_percentage: number | null
          shipment_id: string | null
          started_at: string | null
          truck_route_validated: boolean
          updated_at: string
          vehicle_id: string | null
        }
        Insert: {
          company_id: string
          completed_at?: string | null
          created_at?: string
          current_instruction?: string | null
          current_step_index?: number
          destination_latitude: number
          destination_longitude: number
          driver_id: string
          eta_minutes?: number | null
          id?: string
          is_navigation_active?: boolean
          is_off_route?: boolean
          is_rerouting?: boolean
          load_id?: string | null
          mode?: string
          origin_latitude: number
          origin_longitude: number
          provider: string
          remaining_miles?: number | null
          route_geometry_json?: Json | null
          route_polyline?: string | null
          route_progress_percentage?: number | null
          shipment_id?: string | null
          started_at?: string | null
          truck_route_validated?: boolean
          updated_at?: string
          vehicle_id?: string | null
        }
        Update: {
          company_id?: string
          completed_at?: string | null
          created_at?: string
          current_instruction?: string | null
          current_step_index?: number
          destination_latitude?: number
          destination_longitude?: number
          driver_id?: string
          eta_minutes?: number | null
          id?: string
          is_navigation_active?: boolean
          is_off_route?: boolean
          is_rerouting?: boolean
          load_id?: string | null
          mode?: string
          origin_latitude?: number
          origin_longitude?: number
          provider?: string
          remaining_miles?: number | null
          route_geometry_json?: Json | null
          route_polyline?: string | null
          route_progress_percentage?: number | null
          shipment_id?: string | null
          started_at?: string | null
          truck_route_validated?: boolean
          updated_at?: string
          vehicle_id?: string | null
        }
        Relationships: []
      }
      notification_events: {
        Row: {
          body: string
          category: string
          company_id: string
          created_at: string
          delivered_at: string | null
          driver_id: string
          error: string | null
          id: string
          opened_at: string | null
          payload: Json
          priority: string
          provider: string | null
          push_token_id: string | null
          related_intelligence_id: string | null
          related_load_id: string | null
          sent_at: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          body: string
          category: string
          company_id: string
          created_at?: string
          delivered_at?: string | null
          driver_id: string
          error?: string | null
          id?: string
          opened_at?: string | null
          payload?: Json
          priority?: string
          provider?: string | null
          push_token_id?: string | null
          related_intelligence_id?: string | null
          related_load_id?: string | null
          sent_at?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          body?: string
          category?: string
          company_id?: string
          created_at?: string
          delivered_at?: string | null
          driver_id?: string
          error?: string | null
          id?: string
          opened_at?: string | null
          payload?: Json
          priority?: string
          provider?: string | null
          push_token_id?: string | null
          related_intelligence_id?: string | null
          related_load_id?: string | null
          sent_at?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_events_push_token_id_fkey"
            columns: ["push_token_id"]
            isOneToOne: false
            referencedRelation: "driver_push_tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      optimization_recommendations: {
        Row: {
          company_id: string
          created_at: string
          deadhead_miles: number | null
          driver_id: string | null
          estimated_fuel_cost: number | null
          eta_to_pickup_min: number | null
          explanation: string | null
          id: string
          load_id: string | null
          match_score: number | null
          on_time_probability: number | null
          risk_score: number | null
          run_id: string | null
          status: string
          vehicle_id: string | null
        }
        Insert: {
          company_id: string
          created_at?: string
          deadhead_miles?: number | null
          driver_id?: string | null
          estimated_fuel_cost?: number | null
          eta_to_pickup_min?: number | null
          explanation?: string | null
          id?: string
          load_id?: string | null
          match_score?: number | null
          on_time_probability?: number | null
          risk_score?: number | null
          run_id?: string | null
          status?: string
          vehicle_id?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string
          deadhead_miles?: number | null
          driver_id?: string | null
          estimated_fuel_cost?: number | null
          eta_to_pickup_min?: number | null
          explanation?: string | null
          id?: string
          load_id?: string | null
          match_score?: number | null
          on_time_probability?: number | null
          risk_score?: number | null
          run_id?: string | null
          status?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "optimization_recommendations_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "optimization_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      optimization_runs: {
        Row: {
          company_id: string
          created_at: string
          goal: string
          id: string
          scope: Json
          status: string
          summary: Json
          triggered_by: string | null
        }
        Insert: {
          company_id: string
          created_at?: string
          goal?: string
          id?: string
          scope?: Json
          status?: string
          summary?: Json
          triggered_by?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string
          goal?: string
          id?: string
          scope?: Json
          status?: string
          summary?: Json
          triggered_by?: string | null
        }
        Relationships: []
      }
      platform_settings: {
        Row: {
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company_id: string | null
          created_at: string
          display_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          company_id?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          company_id?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      proof_of_delivery: {
        Row: {
          captured_at: string
          company_id: string
          dispatch_confirmed: boolean
          dispatch_confirmed_at: string | null
          dispatch_confirmed_by: string | null
          driver_id: string | null
          id: string
          load_id: string
          notes: string | null
          photo_url: string | null
          shipment_id: string
          signature_name: string | null
        }
        Insert: {
          captured_at?: string
          company_id: string
          dispatch_confirmed?: boolean
          dispatch_confirmed_at?: string | null
          dispatch_confirmed_by?: string | null
          driver_id?: string | null
          id?: string
          load_id: string
          notes?: string | null
          photo_url?: string | null
          shipment_id: string
          signature_name?: string | null
        }
        Update: {
          captured_at?: string
          company_id?: string
          dispatch_confirmed?: boolean
          dispatch_confirmed_at?: string | null
          dispatch_confirmed_by?: string | null
          driver_id?: string | null
          id?: string
          load_id?: string
          notes?: string | null
          photo_url?: string | null
          shipment_id?: string
          signature_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "proof_of_delivery_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proof_of_delivery_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proof_of_delivery_load_id_fkey"
            columns: ["load_id"]
            isOneToOne: false
            referencedRelation: "loads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proof_of_delivery_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      push_devices: {
        Row: {
          app_version: string | null
          company_id: string
          created_at: string
          driver_id: string | null
          id: string
          last_active_at: string
          platform: string
          token: string
          user_id: string
        }
        Insert: {
          app_version?: string | null
          company_id: string
          created_at?: string
          driver_id?: string | null
          id?: string
          last_active_at?: string
          platform: string
          token: string
          user_id: string
        }
        Update: {
          app_version?: string | null
          company_id?: string
          created_at?: string
          driver_id?: string | null
          id?: string
          last_active_at?: string
          platform?: string
          token?: string
          user_id?: string
        }
        Relationships: []
      }
      push_notifications: {
        Row: {
          body: string | null
          company_id: string
          created_at: string
          data: Json
          delivered_at: string | null
          driver_id: string | null
          id: string
          provider: string | null
          sent_at: string | null
          status: string
          title: string
          topic: string
          user_id: string | null
        }
        Insert: {
          body?: string | null
          company_id: string
          created_at?: string
          data?: Json
          delivered_at?: string | null
          driver_id?: string | null
          id?: string
          provider?: string | null
          sent_at?: string | null
          status?: string
          title: string
          topic: string
          user_id?: string | null
        }
        Update: {
          body?: string | null
          company_id?: string
          created_at?: string
          data?: Json
          delivered_at?: string | null
          driver_id?: string | null
          id?: string
          provider?: string | null
          sent_at?: string | null
          status?: string
          title?: string
          topic?: string
          user_id?: string | null
        }
        Relationships: []
      }
      rate_quote_line_items: {
        Row: {
          amount: number
          category: string
          company_id: string
          created_at: string
          id: string
          label: string
          meta: Json
          quote_id: string
        }
        Insert: {
          amount?: number
          category: string
          company_id: string
          created_at?: string
          id?: string
          label: string
          meta?: Json
          quote_id: string
        }
        Update: {
          amount?: number
          category?: string
          company_id?: string
          created_at?: string
          id?: string
          label?: string
          meta?: Json
          quote_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rate_quote_line_items_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "rate_quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      rate_quotes: {
        Row: {
          accessorials_total: number | null
          base_rate: number | null
          commodity: string | null
          company_id: string
          created_at: string
          created_by: string | null
          customer_id: string | null
          destination: string | null
          driver_pay_estimate: number | null
          expires_at: string | null
          fuel_surcharge: number | null
          id: string
          load_id: string | null
          margin_pct: number | null
          miles: number | null
          notes: string | null
          origin: string | null
          shipment_request_id: string | null
          status: string
          total: number | null
          updated_at: string
          urgency: string | null
          vehicle_type: string | null
          weight: number | null
        }
        Insert: {
          accessorials_total?: number | null
          base_rate?: number | null
          commodity?: string | null
          company_id: string
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          destination?: string | null
          driver_pay_estimate?: number | null
          expires_at?: string | null
          fuel_surcharge?: number | null
          id?: string
          load_id?: string | null
          margin_pct?: number | null
          miles?: number | null
          notes?: string | null
          origin?: string | null
          shipment_request_id?: string | null
          status?: string
          total?: number | null
          updated_at?: string
          urgency?: string | null
          vehicle_type?: string | null
          weight?: number | null
        }
        Update: {
          accessorials_total?: number | null
          base_rate?: number | null
          commodity?: string | null
          company_id?: string
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          destination?: string | null
          driver_pay_estimate?: number | null
          expires_at?: string | null
          fuel_surcharge?: number | null
          id?: string
          load_id?: string | null
          margin_pct?: number | null
          miles?: number | null
          notes?: string | null
          origin?: string | null
          shipment_request_id?: string | null
          status?: string
          total?: number | null
          updated_at?: string
          urgency?: string | null
          vehicle_type?: string | null
          weight?: number | null
        }
        Relationships: []
      }
      route_intelligence_insights: {
        Row: {
          company_id: string
          created_at: string
          distance_ahead_m: number | null
          driver_id: string
          expires_at: string | null
          id: string
          insight_type: string
          location_lat: number | null
          location_lng: number | null
          message: string
          metadata: Json | null
          session_id: string | null
          severity: string
          title: string
        }
        Insert: {
          company_id: string
          created_at?: string
          distance_ahead_m?: number | null
          driver_id: string
          expires_at?: string | null
          id?: string
          insight_type: string
          location_lat?: number | null
          location_lng?: number | null
          message: string
          metadata?: Json | null
          session_id?: string | null
          severity?: string
          title: string
        }
        Update: {
          company_id?: string
          created_at?: string
          distance_ahead_m?: number | null
          driver_id?: string
          expires_at?: string | null
          id?: string
          insight_type?: string
          location_lat?: number | null
          location_lng?: number | null
          message?: string
          metadata?: Json | null
          session_id?: string | null
          severity?: string
          title?: string
        }
        Relationships: []
      }
      route_progress: {
        Row: {
          company_id: string
          current_lat: number | null
          current_lng: number | null
          current_step_index: number
          distance_off_route_m: number
          driver_id: string
          heading: number | null
          id: string
          load_id: string | null
          on_route: boolean
          recorded_at: string
          remaining_miles: number
          route_id: string
          speed: number | null
          traveled_miles: number
        }
        Insert: {
          company_id: string
          current_lat?: number | null
          current_lng?: number | null
          current_step_index?: number
          distance_off_route_m?: number
          driver_id: string
          heading?: number | null
          id?: string
          load_id?: string | null
          on_route?: boolean
          recorded_at?: string
          remaining_miles?: number
          route_id: string
          speed?: number | null
          traveled_miles?: number
        }
        Update: {
          company_id?: string
          current_lat?: number | null
          current_lng?: number | null
          current_step_index?: number
          distance_off_route_m?: number
          driver_id?: string
          heading?: number | null
          id?: string
          load_id?: string | null
          on_route?: boolean
          recorded_at?: string
          remaining_miles?: number
          route_id?: string
          speed?: number | null
          traveled_miles?: number
        }
        Relationships: []
      }
      route_progress_events: {
        Row: {
          company_id: string
          current_lat: number | null
          current_lng: number | null
          current_step_index: number
          distance_off_route_m: number
          driver_id: string
          eta_minutes: number | null
          heading: number | null
          id: string
          load_id: string | null
          on_route: boolean
          progress_pct: number
          recorded_at: string
          remaining_miles: number
          route_id: string | null
          source: Database["public"]["Enums"]["event_source"]
          speed_mph: number | null
          traveled_miles: number
        }
        Insert: {
          company_id: string
          current_lat?: number | null
          current_lng?: number | null
          current_step_index?: number
          distance_off_route_m?: number
          driver_id: string
          eta_minutes?: number | null
          heading?: number | null
          id?: string
          load_id?: string | null
          on_route?: boolean
          progress_pct?: number
          recorded_at?: string
          remaining_miles?: number
          route_id?: string | null
          source?: Database["public"]["Enums"]["event_source"]
          speed_mph?: number | null
          traveled_miles?: number
        }
        Update: {
          company_id?: string
          current_lat?: number | null
          current_lng?: number | null
          current_step_index?: number
          distance_off_route_m?: number
          driver_id?: string
          eta_minutes?: number | null
          heading?: number | null
          id?: string
          load_id?: string | null
          on_route?: boolean
          progress_pct?: number
          recorded_at?: string
          remaining_miles?: number
          route_id?: string | null
          source?: Database["public"]["Enums"]["event_source"]
          speed_mph?: number | null
          traveled_miles?: number
        }
        Relationships: []
      }
      route_provider_logs: {
        Row: {
          company_id: string
          cost_units: number | null
          created_at: string
          http_status: number | null
          id: string
          latency_ms: number | null
          metadata: Json
          operation: string
          provider: string
        }
        Insert: {
          company_id: string
          cost_units?: number | null
          created_at?: string
          http_status?: number | null
          id?: string
          latency_ms?: number | null
          metadata?: Json
          operation: string
          provider: string
        }
        Update: {
          company_id?: string
          cost_units?: number | null
          created_at?: string
          http_status?: number | null
          id?: string
          latency_ms?: number | null
          metadata?: Json
          operation?: string
          provider?: string
        }
        Relationships: []
      }
      route_recalculation_events: {
        Row: {
          company_id: string
          created_at: string
          delta_eta_minutes: number | null
          driver_id: string
          id: string
          reason: string | null
          session_id: string
          succeeded: boolean
        }
        Insert: {
          company_id: string
          created_at?: string
          delta_eta_minutes?: number | null
          driver_id: string
          id?: string
          reason?: string | null
          session_id: string
          succeeded?: boolean
        }
        Update: {
          company_id?: string
          created_at?: string
          delta_eta_minutes?: number | null
          driver_id?: string
          id?: string
          reason?: string | null
          session_id?: string
          succeeded?: boolean
        }
        Relationships: []
      }
      route_requests: {
        Row: {
          company_id: string
          created_at: string
          destination_latitude: number
          destination_longitude: number
          driver_id: string
          id: string
          load_id: string | null
          origin_latitude: number
          origin_longitude: number
          requested_provider: string | null
          route_profile: string
          shipment_id: string | null
          vehicle_id: string | null
          vehicle_profile_json: Json | null
        }
        Insert: {
          company_id: string
          created_at?: string
          destination_latitude: number
          destination_longitude: number
          driver_id: string
          id?: string
          load_id?: string | null
          origin_latitude: number
          origin_longitude: number
          requested_provider?: string | null
          route_profile: string
          shipment_id?: string | null
          vehicle_id?: string | null
          vehicle_profile_json?: Json | null
        }
        Update: {
          company_id?: string
          created_at?: string
          destination_latitude?: number
          destination_longitude?: number
          driver_id?: string
          id?: string
          load_id?: string | null
          origin_latitude?: number
          origin_longitude?: number
          requested_provider?: string | null
          route_profile?: string
          shipment_id?: string | null
          vehicle_id?: string | null
          vehicle_profile_json?: Json | null
        }
        Relationships: []
      }
      route_steps: {
        Row: {
          company_id: string
          created_at: string
          distance: string | null
          duration: string | null
          id: string
          instruction: string
          route_id: string
          step_order: number
          street: string | null
        }
        Insert: {
          company_id: string
          created_at?: string
          distance?: string | null
          duration?: string | null
          id?: string
          instruction: string
          route_id: string
          step_order: number
          street?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string
          distance?: string | null
          duration?: string | null
          id?: string
          instruction?: string
          route_id?: string
          step_order?: number
          street?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "route_steps_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "route_steps_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          },
        ]
      }
      routes: {
        Row: {
          company_id: string
          created_at: string
          current_step: number | null
          driver_id: string | null
          eta: string | null
          id: string
          load_id: string
          remaining_miles: number | null
          route_status: Database["public"]["Enums"]["route_status"]
          total_miles: number | null
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          current_step?: number | null
          driver_id?: string | null
          eta?: string | null
          id?: string
          load_id: string
          remaining_miles?: number | null
          route_status?: Database["public"]["Enums"]["route_status"]
          total_miles?: number | null
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          current_step?: number | null
          driver_id?: string | null
          eta?: string | null
          id?: string
          load_id?: string
          remaining_miles?: number | null
          route_status?: Database["public"]["Enums"]["route_status"]
          total_miles?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "routes_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "routes_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "routes_load_id_fkey"
            columns: ["load_id"]
            isOneToOne: false
            referencedRelation: "loads"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_views: {
        Row: {
          company_id: string
          config: Json
          created_at: string
          id: string
          name: string
          surface: string
          user_id: string
        }
        Insert: {
          company_id: string
          config?: Json
          created_at?: string
          id?: string
          name: string
          surface: string
          user_id: string
        }
        Update: {
          company_id?: string
          config?: Json
          created_at?: string
          id?: string
          name?: string
          surface?: string
          user_id?: string
        }
        Relationships: []
      }
      shipment_requests: {
        Row: {
          commodity: string | null
          company_id: string
          contact: string | null
          converted_load_id: string | null
          created_at: string
          customer_id: string
          delivery_window: string | null
          dropoff_location: string
          id: string
          package_type: string | null
          pickup_at: string | null
          pickup_location: string
          quantity: number | null
          requested_by: string | null
          required_vehicle_type: string | null
          requires_cdl: boolean
          requires_hazmat: boolean
          special_instructions: string | null
          status: string
          updated_at: string
          weight: number | null
        }
        Insert: {
          commodity?: string | null
          company_id: string
          contact?: string | null
          converted_load_id?: string | null
          created_at?: string
          customer_id: string
          delivery_window?: string | null
          dropoff_location: string
          id?: string
          package_type?: string | null
          pickup_at?: string | null
          pickup_location: string
          quantity?: number | null
          requested_by?: string | null
          required_vehicle_type?: string | null
          requires_cdl?: boolean
          requires_hazmat?: boolean
          special_instructions?: string | null
          status?: string
          updated_at?: string
          weight?: number | null
        }
        Update: {
          commodity?: string | null
          company_id?: string
          contact?: string | null
          converted_load_id?: string | null
          created_at?: string
          customer_id?: string
          delivery_window?: string | null
          dropoff_location?: string
          id?: string
          package_type?: string | null
          pickup_at?: string | null
          pickup_location?: string
          quantity?: number | null
          requested_by?: string | null
          required_vehicle_type?: string | null
          requires_cdl?: boolean
          requires_hazmat?: boolean
          special_instructions?: string | null
          status?: string
          updated_at?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "shipment_requests_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      shipments: {
        Row: {
          capacity_percent: number | null
          cargo_type: string | null
          commodity: string | null
          company_id: string
          created_at: string
          customer_name: string | null
          delay_minutes: number | null
          dropoff_address: string | null
          eta: string | null
          eta_minutes: number | null
          hauling_description: string | null
          id: string
          is_hazardous: boolean | null
          is_temperature_controlled: boolean | null
          load_id: string
          package_type: string | null
          pickup_address: string | null
          proof_of_delivery_url: string | null
          quantity: number | null
          quantity_unit: string | null
          route_progress: number | null
          scheduled_arrival_at: string | null
          special_instructions: string | null
          status: Database["public"]["Enums"]["load_status"]
          updated_at: string
          volume: number | null
          weight: number | null
        }
        Insert: {
          capacity_percent?: number | null
          cargo_type?: string | null
          commodity?: string | null
          company_id: string
          created_at?: string
          customer_name?: string | null
          delay_minutes?: number | null
          dropoff_address?: string | null
          eta?: string | null
          eta_minutes?: number | null
          hauling_description?: string | null
          id?: string
          is_hazardous?: boolean | null
          is_temperature_controlled?: boolean | null
          load_id: string
          package_type?: string | null
          pickup_address?: string | null
          proof_of_delivery_url?: string | null
          quantity?: number | null
          quantity_unit?: string | null
          route_progress?: number | null
          scheduled_arrival_at?: string | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["load_status"]
          updated_at?: string
          volume?: number | null
          weight?: number | null
        }
        Update: {
          capacity_percent?: number | null
          cargo_type?: string | null
          commodity?: string | null
          company_id?: string
          created_at?: string
          customer_name?: string | null
          delay_minutes?: number | null
          dropoff_address?: string | null
          eta?: string | null
          eta_minutes?: number | null
          hauling_description?: string | null
          id?: string
          is_hazardous?: boolean | null
          is_temperature_controlled?: boolean | null
          load_id?: string
          package_type?: string | null
          pickup_address?: string | null
          proof_of_delivery_url?: string | null
          quantity?: number | null
          quantity_unit?: string | null
          route_progress?: number | null
          scheduled_arrival_at?: string | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["load_status"]
          updated_at?: string
          volume?: number | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "shipments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipments_load_id_fkey"
            columns: ["load_id"]
            isOneToOne: false
            referencedRelation: "loads"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          code: string
          created_at: string
          driver_limit: number | null
          features: Json
          id: string
          is_active: boolean
          name: string
          price_monthly_usd: number | null
          tier: string
          vehicle_limit: number | null
        }
        Insert: {
          code: string
          created_at?: string
          driver_limit?: number | null
          features?: Json
          id?: string
          is_active?: boolean
          name: string
          price_monthly_usd?: number | null
          tier: string
          vehicle_limit?: number | null
        }
        Update: {
          code?: string
          created_at?: string
          driver_limit?: number | null
          features?: Json
          id?: string
          is_active?: boolean
          name?: string
          price_monthly_usd?: number | null
          tier?: string
          vehicle_limit?: number | null
        }
        Relationships: []
      }
      support_access_sessions: {
        Row: {
          company_id: string
          created_at: string
          expires_at: string
          granted_by: string | null
          id: string
          reason: string
          revoked_at: string | null
          support_user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          expires_at: string
          granted_by?: string | null
          id?: string
          reason: string
          revoked_at?: string | null
          support_user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          expires_at?: string
          granted_by?: string | null
          id?: string
          reason?: string
          revoked_at?: string | null
          support_user_id?: string
        }
        Relationships: []
      }
      telemetry: {
        Row: {
          company_id: string
          created_at: string
          driver_id: string
          fuel_or_battery_percent: number | null
          id: string
          route_progress_percent: number | null
          shipment_id: string | null
          signal_percent: number | null
          speed_mph: number | null
          trip_status: string | null
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          driver_id: string
          fuel_or_battery_percent?: number | null
          id?: string
          route_progress_percent?: number | null
          shipment_id?: string | null
          signal_percent?: number | null
          speed_mph?: number | null
          trip_status?: string | null
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          driver_id?: string
          fuel_or_battery_percent?: number | null
          id?: string
          route_progress_percent?: number | null
          shipment_id?: string | null
          signal_percent?: number | null
          speed_mph?: number | null
          trip_status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "telemetry_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "telemetry_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "telemetry_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      theme_templates: {
        Row: {
          accent_color: string
          border_radius_px: number | null
          button_style: string | null
          created_at: string
          danger_color: string | null
          dark_background: string | null
          dark_muted_text: string | null
          dark_surface: string | null
          dark_text: string | null
          description: string | null
          font_family: string | null
          glass_blur_px: number | null
          glass_opacity: number | null
          id: string
          industry_type: string | null
          info_color: string | null
          is_active: boolean | null
          is_system_template: boolean | null
          light_background: string | null
          light_muted_text: string | null
          light_surface: string | null
          light_text: string | null
          map_style_key: string | null
          primary_color: string
          secondary_color: string
          shadow_strength: string | null
          success_color: string | null
          theme_key: string
          theme_name: string
          theme_tokens: Json | null
          updated_at: string
          warning_color: string | null
        }
        Insert: {
          accent_color: string
          border_radius_px?: number | null
          button_style?: string | null
          created_at?: string
          danger_color?: string | null
          dark_background?: string | null
          dark_muted_text?: string | null
          dark_surface?: string | null
          dark_text?: string | null
          description?: string | null
          font_family?: string | null
          glass_blur_px?: number | null
          glass_opacity?: number | null
          id?: string
          industry_type?: string | null
          info_color?: string | null
          is_active?: boolean | null
          is_system_template?: boolean | null
          light_background?: string | null
          light_muted_text?: string | null
          light_surface?: string | null
          light_text?: string | null
          map_style_key?: string | null
          primary_color: string
          secondary_color: string
          shadow_strength?: string | null
          success_color?: string | null
          theme_key: string
          theme_name: string
          theme_tokens?: Json | null
          updated_at?: string
          warning_color?: string | null
        }
        Update: {
          accent_color?: string
          border_radius_px?: number | null
          button_style?: string | null
          created_at?: string
          danger_color?: string | null
          dark_background?: string | null
          dark_muted_text?: string | null
          dark_surface?: string | null
          dark_text?: string | null
          description?: string | null
          font_family?: string | null
          glass_blur_px?: number | null
          glass_opacity?: number | null
          id?: string
          industry_type?: string | null
          info_color?: string | null
          is_active?: boolean | null
          is_system_template?: boolean | null
          light_background?: string | null
          light_muted_text?: string | null
          light_surface?: string | null
          light_text?: string | null
          map_style_key?: string | null
          primary_color?: string
          secondary_color?: string
          shadow_strength?: string | null
          success_color?: string | null
          theme_key?: string
          theme_name?: string
          theme_tokens?: Json | null
          updated_at?: string
          warning_color?: string | null
        }
        Relationships: []
      }
      truck_route_restrictions: {
        Row: {
          company_id: string
          created_at: string
          distance_from_origin_m: number | null
          id: string
          latitude: number | null
          longitude: number | null
          message: string
          recommended_action: string | null
          road_name: string | null
          severity: string
          type: string
          validation_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          distance_from_origin_m?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          message: string
          recommended_action?: string | null
          road_name?: string | null
          severity: string
          type: string
          validation_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          distance_from_origin_m?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          message?: string
          recommended_action?: string | null
          road_name?: string | null
          severity?: string
          type?: string
          validation_id?: string
        }
        Relationships: []
      }
      truck_route_validations: {
        Row: {
          company_id: string
          created_at: string
          driver_id: string
          hazmat_restriction_detected: boolean
          id: string
          is_valid: boolean
          load_id: string | null
          low_clearance_detected: boolean
          provider: string
          restricted_road_detected: boolean
          restrictions_json: Json
          route_safety_score: number | null
          validated_at: string
          vehicle_id: string | null
          warnings_json: Json
          weight_restriction_detected: boolean
        }
        Insert: {
          company_id: string
          created_at?: string
          driver_id: string
          hazmat_restriction_detected?: boolean
          id?: string
          is_valid: boolean
          load_id?: string | null
          low_clearance_detected?: boolean
          provider: string
          restricted_road_detected?: boolean
          restrictions_json?: Json
          route_safety_score?: number | null
          validated_at: string
          vehicle_id?: string | null
          warnings_json?: Json
          weight_restriction_detected?: boolean
        }
        Update: {
          company_id?: string
          created_at?: string
          driver_id?: string
          hazmat_restriction_detected?: boolean
          id?: string
          is_valid?: boolean
          load_id?: string | null
          low_clearance_detected?: boolean
          provider?: string
          restricted_road_detected?: boolean
          restrictions_json?: Json
          route_safety_score?: number | null
          validated_at?: string
          vehicle_id?: string | null
          warnings_json?: Json
          weight_restriction_detected?: boolean
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          company_id: string
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          average_mpg: number | null
          battery_level: number | null
          company_id: string
          created_at: string
          current_driver_id: string | null
          driver_app_status: string | null
          engine_status: string | null
          fuel_level: number | null
          fuel_type: Database["public"]["Enums"]["fuel_type"]
          id: string
          make: string | null
          mileage: number | null
          model: string | null
          plate: string | null
          signal_strength: number | null
          status: Database["public"]["Enums"]["vehicle_op_status"]
          telemetry_status: string | null
          temperature_f: number | null
          type: Database["public"]["Enums"]["vehicle_type"]
          unit_number: string
          updated_at: string
          year: number | null
        }
        Insert: {
          average_mpg?: number | null
          battery_level?: number | null
          company_id: string
          created_at?: string
          current_driver_id?: string | null
          driver_app_status?: string | null
          engine_status?: string | null
          fuel_level?: number | null
          fuel_type?: Database["public"]["Enums"]["fuel_type"]
          id?: string
          make?: string | null
          mileage?: number | null
          model?: string | null
          plate?: string | null
          signal_strength?: number | null
          status?: Database["public"]["Enums"]["vehicle_op_status"]
          telemetry_status?: string | null
          temperature_f?: number | null
          type: Database["public"]["Enums"]["vehicle_type"]
          unit_number: string
          updated_at?: string
          year?: number | null
        }
        Update: {
          average_mpg?: number | null
          battery_level?: number | null
          company_id?: string
          created_at?: string
          current_driver_id?: string | null
          driver_app_status?: string | null
          engine_status?: string | null
          fuel_level?: number | null
          fuel_type?: Database["public"]["Enums"]["fuel_type"]
          id?: string
          make?: string | null
          mileage?: number | null
          model?: string | null
          plate?: string | null
          signal_strength?: number | null
          status?: Database["public"]["Enums"]["vehicle_op_status"]
          telemetry_status?: string | null
          temperature_f?: number | null
          type?: Database["public"]["Enums"]["vehicle_type"]
          unit_number?: string
          updated_at?: string
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicles_driver_fk"
            columns: ["current_driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
        ]
      }
      voice_assistant_events: {
        Row: {
          company_id: string
          driver_id: string | null
          id: string
          intent: string | null
          kind: string
          latency_ms: number | null
          load_id: string | null
          occurred_at: string
          response: string | null
          safety_mode: boolean
          transcript: string | null
        }
        Insert: {
          company_id: string
          driver_id?: string | null
          id?: string
          intent?: string | null
          kind: string
          latency_ms?: number | null
          load_id?: string | null
          occurred_at?: string
          response?: string | null
          safety_mode?: boolean
          transcript?: string | null
        }
        Update: {
          company_id?: string
          driver_id?: string | null
          id?: string
          intent?: string | null
          kind?: string
          latency_ms?: number | null
          load_id?: string | null
          occurred_at?: string
          response?: string | null
          safety_mode?: boolean
          transcript?: string | null
        }
        Relationships: []
      }
      voice_command_events: {
        Row: {
          company_id: string
          confidence: number | null
          created_at: string
          driver_id: string
          handled: boolean
          handler_result: Json | null
          id: string
          intent: string | null
          session_id: string | null
          transcript: string
        }
        Insert: {
          company_id: string
          confidence?: number | null
          created_at?: string
          driver_id: string
          handled?: boolean
          handler_result?: Json | null
          id?: string
          intent?: string | null
          session_id?: string | null
          transcript: string
        }
        Update: {
          company_id?: string
          confidence?: number | null
          created_at?: string
          driver_id?: string
          handled?: boolean
          handler_result?: Json | null
          id?: string
          intent?: string | null
          session_id?: string | null
          transcript?: string
        }
        Relationships: []
      }
      voice_instruction_events: {
        Row: {
          company_id: string
          created_at: string
          distance_to_maneuver_m: number | null
          driver_id: string
          id: string
          instruction_text: string
          load_id: string | null
          maneuver_type: string
          provider: string
          road_name: string | null
          session_id: string
          spoken_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          distance_to_maneuver_m?: number | null
          driver_id: string
          id?: string
          instruction_text: string
          load_id?: string | null
          maneuver_type: string
          provider: string
          road_name?: string | null
          session_id: string
          spoken_at: string
        }
        Update: {
          company_id?: string
          created_at?: string
          distance_to_maneuver_m?: number | null
          driver_id?: string
          id?: string
          instruction_text?: string
          load_id?: string | null
          maneuver_type?: string
          provider?: string
          road_name?: string | null
          session_id?: string
          spoken_at?: string
        }
        Relationships: []
      }
      webhook_deliveries: {
        Row: {
          attempt_count: number
          company_id: string
          created_at: string
          delivered_at: string | null
          endpoint_id: string
          event_type: string
          failed_at: string | null
          id: string
          next_retry_at: string | null
          payload: Json
          response_body: string | null
          response_code: number | null
          status: string
        }
        Insert: {
          attempt_count?: number
          company_id: string
          created_at?: string
          delivered_at?: string | null
          endpoint_id: string
          event_type: string
          failed_at?: string | null
          id?: string
          next_retry_at?: string | null
          payload?: Json
          response_body?: string | null
          response_code?: number | null
          status?: string
        }
        Update: {
          attempt_count?: number
          company_id?: string
          created_at?: string
          delivered_at?: string | null
          endpoint_id?: string
          event_type?: string
          failed_at?: string | null
          id?: string
          next_retry_at?: string | null
          payload?: Json
          response_body?: string | null
          response_code?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "webhook_deliveries_endpoint_id_fkey"
            columns: ["endpoint_id"]
            isOneToOne: false
            referencedRelation: "webhook_endpoints"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_endpoints: {
        Row: {
          company_id: string
          created_at: string
          enabled: boolean
          event_types: string[]
          id: string
          name: string
          retry_policy: Json
          secret: string
          updated_at: string
          url: string
        }
        Insert: {
          company_id: string
          created_at?: string
          enabled?: boolean
          event_types?: string[]
          id?: string
          name: string
          retry_policy?: Json
          secret: string
          updated_at?: string
          url: string
        }
        Update: {
          company_id?: string
          created_at?: string
          enabled?: boolean
          event_types?: string[]
          id?: string
          name?: string
          retry_policy?: Json
          secret?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      bootstrap_demo_membership: { Args: never; Returns: string }
      can_manage_company: {
        Args: { _company_id: string; _user_id: string }
        Returns: boolean
      }
      current_company: { Args: never; Returns: string }
      customer_ids_for_user: { Args: { _user_id: string }; Returns: string[] }
      has_role: {
        Args: {
          _company_id: string
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_company_member: {
        Args: { _company_id: string; _user_id: string }
        Returns: boolean
      }
      is_conversation_participant: {
        Args: { _conversation_id: string; _user_id: string }
        Returns: boolean
      }
      is_customer_user: {
        Args: { _customer_id: string; _user_id: string }
        Returns: boolean
      }
      is_driver_self: {
        Args: { _driver_id: string; _user_id: string }
        Returns: boolean
      }
      is_platform_owner: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      alert_severity: "low" | "medium" | "high" | "critical"
      alert_status: "open" | "acknowledged" | "resolved"
      app_role:
        | "owner"
        | "admin"
        | "dispatcher"
        | "driver"
        | "platform_owner"
        | "platform_support"
        | "company_owner"
        | "company_admin"
        | "billing_admin"
        | "dispatcher_manager"
        | "mechanic"
        | "customer_admin"
        | "customer_user"
        | "viewer"
      app_state: "foreground" | "background" | "inactive" | "unknown"
      audit_event_type:
        | "tracking_started"
        | "tracking_stopped"
        | "permission_granted"
        | "permission_denied"
        | "load_offered"
        | "load_accepted"
        | "load_denied"
        | "status_changed"
        | "load_assigned"
        | "alert_resolved"
        | "pod_submitted"
        | "login"
        | "logout"
      driver_location_status:
        | "driving"
        | "idle"
        | "loading"
        | "unloading"
        | "break"
        | "offline"
      driver_status:
        | "waiting"
        | "offered"
        | "accepted"
        | "pickup"
        | "loaded"
        | "transit"
        | "break"
        | "offduty"
        | "delayed"
        | "delivered"
      event_source:
        | "mobile_gps"
        | "mock_stream"
        | "manual_status_update"
        | "navigation_sdk_future"
        | "dispatcher"
        | "system"
      fuel_type: "Diesel" | "Gas" | "Electric"
      license_type: "CDL-A" | "CDL-B" | "Non-CDL"
      load_status:
        | "draft"
        | "available"
        | "offered"
        | "accepted"
        | "denied"
        | "assigned"
        | "pickup"
        | "picked_up"
        | "loaded"
        | "transit"
        | "delayed"
        | "delivered"
        | "completed"
        | "cancelled"
      load_stop_kind: "pickup" | "dropoff"
      load_stop_status:
        | "pending"
        | "en_route"
        | "arrived"
        | "completed"
        | "skipped"
      location_permission_status:
        | "granted"
        | "denied"
        | "prompt"
        | "restricted"
        | "unknown"
      messenger_contact_type:
        | "driver"
        | "courier"
        | "carrier"
        | "broker"
        | "customer"
        | "warehouse"
        | "dispatcher"
        | "other"
      messenger_conversation_category:
        | "pinned"
        | "active_loads"
        | "dispatch"
        | "invoices"
        | "completed"
        | "general"
      offer_response: "pending" | "accepted" | "denied" | "expired"
      route_status: "planned" | "active" | "completed"
      tracking_mode:
        | "off"
        | "foreground"
        | "background"
        | "active_load"
        | "reduced_frequency"
        | "paused"
      vehicle_op_status: "Active" | "Idle" | "Maintenance" | "Out of Service"
      vehicle_type:
        | "CDL Freight"
        | "Hotshot"
        | "Box Truck"
        | "Cargo Van"
        | "Personal Vehicle"
        | "Flatbed"
        | "Reefer"
        | "Dry Van"
        | "Power Only"
        | "Step Deck"
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
      alert_severity: ["low", "medium", "high", "critical"],
      alert_status: ["open", "acknowledged", "resolved"],
      app_role: [
        "owner",
        "admin",
        "dispatcher",
        "driver",
        "platform_owner",
        "platform_support",
        "company_owner",
        "company_admin",
        "billing_admin",
        "dispatcher_manager",
        "mechanic",
        "customer_admin",
        "customer_user",
        "viewer",
      ],
      app_state: ["foreground", "background", "inactive", "unknown"],
      audit_event_type: [
        "tracking_started",
        "tracking_stopped",
        "permission_granted",
        "permission_denied",
        "load_offered",
        "load_accepted",
        "load_denied",
        "status_changed",
        "load_assigned",
        "alert_resolved",
        "pod_submitted",
        "login",
        "logout",
      ],
      driver_location_status: [
        "driving",
        "idle",
        "loading",
        "unloading",
        "break",
        "offline",
      ],
      driver_status: [
        "waiting",
        "offered",
        "accepted",
        "pickup",
        "loaded",
        "transit",
        "break",
        "offduty",
        "delayed",
        "delivered",
      ],
      event_source: [
        "mobile_gps",
        "mock_stream",
        "manual_status_update",
        "navigation_sdk_future",
        "dispatcher",
        "system",
      ],
      fuel_type: ["Diesel", "Gas", "Electric"],
      license_type: ["CDL-A", "CDL-B", "Non-CDL"],
      load_status: [
        "draft",
        "available",
        "offered",
        "accepted",
        "denied",
        "assigned",
        "pickup",
        "picked_up",
        "loaded",
        "transit",
        "delayed",
        "delivered",
        "completed",
        "cancelled",
      ],
      load_stop_kind: ["pickup", "dropoff"],
      load_stop_status: [
        "pending",
        "en_route",
        "arrived",
        "completed",
        "skipped",
      ],
      location_permission_status: [
        "granted",
        "denied",
        "prompt",
        "restricted",
        "unknown",
      ],
      messenger_contact_type: [
        "driver",
        "courier",
        "carrier",
        "broker",
        "customer",
        "warehouse",
        "dispatcher",
        "other",
      ],
      messenger_conversation_category: [
        "pinned",
        "active_loads",
        "dispatch",
        "invoices",
        "completed",
        "general",
      ],
      offer_response: ["pending", "accepted", "denied", "expired"],
      route_status: ["planned", "active", "completed"],
      tracking_mode: [
        "off",
        "foreground",
        "background",
        "active_load",
        "reduced_frequency",
        "paused",
      ],
      vehicle_op_status: ["Active", "Idle", "Maintenance", "Out of Service"],
      vehicle_type: [
        "CDL Freight",
        "Hotshot",
        "Box Truck",
        "Cargo Van",
        "Personal Vehicle",
        "Flatbed",
        "Reefer",
        "Dry Van",
        "Power Only",
        "Step Deck",
      ],
    },
  },
} as const
