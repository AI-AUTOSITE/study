import { supabase } from './supabase'

export async function trackUsage(userId: string, creditsUsed: number = 1) {
  const today = new Date().toISOString().split('T')[0]

  const { data, error } = await supabase
    .from('usage_tracking')
    .upsert([
      {
        user_id: userId,
        date: today,
        files_processed: 1,
        credits_used: creditsUsed
      }
    ], {
      onConflict: 'user_id,date',
      ignoreDuplicates: false
    })
    .select()

  if (error) {
    console.error('Error tracking usage:', error)
    throw error
  }

  return data
}

export async function getUserUsage(userId: string, days: number = 30) {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const { data, error } = await supabase
    .from('usage_tracking')
    .select('*')
    .eq('user_id', userId)
    .gte('date', startDate.toISOString().split('T')[0])
    .order('date', { ascending: false })

  if (error) {
    console.error('Error fetching usage:', error)
    throw error
  }

  return data
}