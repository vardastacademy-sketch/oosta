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
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          role: 'user' | 'expert' | 'admin'
          specialty: string | null
          phone: string | null
          linkedin: string | null
          instagram: string | null
          updated_at: string | null
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          role?: 'user' | 'expert' | 'admin'
          specialty?: string | null
          phone?: string | null
          linkedin?: string | null
          instagram?: string | null
          updated_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          role?: 'user' | 'expert' | 'admin'
          specialty?: string | null
          phone?: string | null
          linkedin?: string | null
          instagram?: string | null
          updated_at?: string | null
          created_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          title: string
          description: string
          budget: string | null
          tags: string[] | null
          category: string | null
          status: string
          employer_id: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          budget?: string | null
          tags?: string[] | null
          category?: string | null
          status?: string
          employer_id: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          budget?: string | null
          tags?: string[] | null
          category?: string | null
          status?: string
          employer_id?: string
          created_at?: string
        }
      }
      portfolios: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          media_url: string | null
          external_link: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          media_url?: string | null
          external_link?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          media_url?: string | null
          external_link?: string | null
          created_at?: string
        }
      }
    }
  }
}
