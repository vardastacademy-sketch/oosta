'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return

  const profileData = {
      full_name: formData.get('full_name') as string,
      bio: formData.get('bio') as string,
      phone: formData.get('phone') as string,
      linkedin: formData.get('linkedin') as string,
      instagram: formData.get('instagram') as string,
      specialty: formData.get('specialty') as string,
      // role: 'expert', // Removed hardcoded role update to prevent overwriting admins
      updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      ...profileData
  })

  if (error) {
      console.error(error)
      redirect(`/profile/${user.id}?error=${encodeURIComponent(error.message)}`)
  }

  // Handle Portfolio Items (Simplified: just logging for now, typically needs separate client-side dynamic form or complex formData parsing)
  // In a real app we would iterate over portfolio items in formData or use a separate API endpoint for adding portfolio items.

  redirect(`/profile/${user.id}`)
}
