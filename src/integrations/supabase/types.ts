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
      alerts: {
        Row: {
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
          type: string
        }
        Insert: {
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
          type: string
        }
        Update: {
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
      driver_location_events: {
        Row: {
          company_id: string
          driver_id: string
          heading: number | null
          id: number
          lat: number
          lng: number
          recorded_at: string
          speed: number | null
        }
        Insert: {
          company_id: string
          driver_id: string
          heading?: number | null
          id?: number
          lat: number
          lng: number
          recorded_at?: string
          speed?: number | null
        }
        Update: {
          company_id?: string
          driver_id?: string
          heading?: number | null
          id?: number
          lat?: number
          lng?: number
          recorded_at?: string
          speed?: number | null
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
      driver_status_events: {
        Row: {
          company_id: string
          driver_id: string
          id: number
          note: string | null
          recorded_at: string
          status: Database["public"]["Enums"]["driver_status"]
        }
        Insert: {
          company_id: string
          driver_id: string
          id?: number
          note?: string | null
          recorded_at?: string
          status: Database["public"]["Enums"]["driver_status"]
        }
        Update: {
          company_id?: string
          driver_id?: string
          id?: number
          note?: string | null
          recorded_at?: string
          status?: Database["public"]["Enums"]["driver_status"]
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
      app_role: "owner" | "admin" | "dispatcher" | "driver"
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
      offer_response: "pending" | "accepted" | "denied" | "expired"
      route_status: "planned" | "active" | "completed"
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
      app_role: ["owner", "admin", "dispatcher", "driver"],
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
      offer_response: ["pending", "accepted", "denied", "expired"],
      route_status: ["planned", "active", "completed"],
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
