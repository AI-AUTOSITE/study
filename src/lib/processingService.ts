import { supabase } from './supabase'
import type { ProcessingHistory } from './supabase'

export async function saveProcessingHistory(data: {
  user_id: string
  file_name: string
  file_size: number
  file_type: string
  summary_text: string
  flashcard_data: any
  credits_used: number
}) {
  const { data: result, error } = await supabase
    .from('processing_history')
    .insert([{
      ...data,
      processing_status: 'completed'
    }])
    .select()
    .single()

  if (error) {
    console.error('Error saving processing history:', error)
    throw error
  }

  return result as ProcessingHistory
}

export async function getUserHistory(userId: string) {
  const { data, error } = await supabase
    .from('processing_history')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching user history:', error)
    throw error
  }

  return data as ProcessingHistory[]
}