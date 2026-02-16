import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


// Helper function to submit feedback
export const submitFeedback = async (feedbackData) => {
  try {
    const { data, error } = await supabase
      .from('feedback')
      .insert([feedbackData])
      .select()

    if (error) {
      console.error('Error submitting feedback:', error)
      throw error
    }

    return { success: true, data }
  } catch (error) {
    console.error('Submission error:', error)
    return { success: false, error: error.message }
  }
}

// Helper function to get all feedback (for admin use)
export const getAllFeedback = async () => {
  try {
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching feedback:', error)
      throw error
    }

    return { success: true, data }
  } catch (error) {
    console.error('Fetch error:', error)
    return { success: false, error: error.message }
  }
} 