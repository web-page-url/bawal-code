import { submitFeedback } from '../../lib/supabase'

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const feedbackData = req.body

    // Validate required fields
    if (!feedbackData.name || !feedbackData.email || !feedbackData.feedback) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, and feedback are required' 
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(feedbackData.email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Prepare data for database
    const dbData = {
      name: feedbackData.name.trim(),
      email: feedbackData.email.trim().toLowerCase(),
      experience: feedbackData.experience,
      rating: parseInt(feedbackData.rating),
      feedback: feedbackData.feedback.trim(),
      suggestions: feedbackData.suggestions?.trim() || null,
      would_recommend: feedbackData.wouldRecommend,
      submitted_at: feedbackData.submitted_at || new Date().toISOString(),
      created_at: new Date().toISOString()
    }

    // Submit to Supabase
    const result = await submitFeedback(dbData)

    if (result.success) {
      return res.status(200).json({ 
        success: true, 
        message: 'Feedback submitted successfully',
        id: result.data[0]?.id 
      })
    } else {
      return res.status(500).json({ 
        error: 'Failed to submit feedback',
        details: result.error 
      })
    }

  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    })
  }
} 