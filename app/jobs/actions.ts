'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function createJob(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
      redirect('/login')
  }

  // Ensure user has a profile
  const { data: profile } = await supabase.from('profiles').select('id').eq('id', user.id).single()

  if (!profile) {
      // Create profile if it doesn't exist (basic)
      await supabase.from('profiles').insert({ id: user.id })
  }

  const jobData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    budget: formData.get('budget') as string,
    category: formData.get('category') as string,
    employer_id: user.id,
    tags: (formData.get('tags') as string).split(',').map(tag => tag.trim()).filter(Boolean)
  }

  const { error } = await supabase.from('jobs').insert(jobData)

  if (error) {
    console.error('Error creating job:', error)
    // In a real app, handle error UI
    // For simple form actions, returning or throwing works differently.
    // To fix type error in simple form action, we can throw or just redirect to error page.
    redirect('/?error=' + encodeURIComponent(error.message))
  }

  redirect('/')
}
