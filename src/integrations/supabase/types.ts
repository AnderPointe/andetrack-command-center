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
      shipments: {
        Row: {
          commodity: string | null
          company_id: string
          created_at: string
          customer_name: string | null
          dropoff_address: string | null
          eta: string | null
          id: string
          load_id: string
          package_type: string | null
          pickup_address: string | null
          proof_of_delivery_url: string | null
          quantity: number | null
          special_instructions: string | null
          status: Database["public"]["Enums"]["load_status"]
          updated_at: string
          weight: number | null
        }
        Insert: {
          commodity?: string | null
          company_id: string
          created_at?: string
          customer_name?: string | null
          dropoff_address?: string | null
          eta?: string | null
          id?: string
          load_id: string
          package_type?: string | null
          pickup_address?: string | null
          proof_of_delivery_url?: string | null
          quantity?: number | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["load_status"]
          updated_at?: string
          weight?: number | null
        }
        Update: {
          commodity?: string | null
          company_id?: string
          created_at?: string
          customer_name?: string | null
          dropoff_address?: string | null
          eta?: string | null
          id?: string
          load_id?: string
          package_type?: string | null
          pickup_address?: string | null
          proof_of_delivery_url?: string | null
          quantity?: number | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["load_status"]
          updated_at?: string
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
          company_id: string
          created_at: string
          current_driver_id: string | null
          fuel_type: Database["public"]["Enums"]["fuel_type"]
          id: string
          make: string | null
          model: string | null
          plate: string | null
          status: Database["public"]["Enums"]["vehicle_op_status"]
          type: Database["public"]["Enums"]["vehicle_type"]
          unit_number: string
          updated_at: string
          year: number | null
        }
        Insert: {
          average_mpg?: number | null
          company_id: string
          created_at?: string
          current_driver_id?: string | null
          fuel_type?: Database["public"]["Enums"]["fuel_type"]
          id?: string
          make?: string | null
          model?: string | null
          plate?: string | null
          status?: Database["public"]["Enums"]["vehicle_op_status"]
          type: Database["public"]["Enums"]["vehicle_type"]
          unit_number: string
          updated_at?: string
          year?: number | null
        }
        Update: {
          average_mpg?: number | null
          company_id?: string
          created_at?: string
          current_driver_id?: string | null
          fuel_type?: Database["public"]["Enums"]["fuel_type"]
          id?: string
          make?: string | null
          model?: string | null
          plate?: string | null
          status?: Database["public"]["Enums"]["vehicle_op_status"]
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
    }
    Enums: {
      alert_severity: "low" | "medium" | "high" | "critical"
      alert_status: "open" | "acknowledged" | "resolved"
      app_role: "owner" | "admin" | "dispatcher" | "driver"
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
      location_permission_status:
        | "granted"
        | "denied"
        | "prompt"
        | "restricted"
        | "unknown"
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
      app_role: ["owner", "admin", "dispatcher", "driver"],
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
      location_permission_status: [
        "granted",
        "denied",
        "prompt",
        "restricted",
        "unknown",
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
