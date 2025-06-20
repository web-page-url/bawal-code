# Supabase Setup Instructions for Feedback System

## 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Wait for the project to be ready

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (something like: `https://xxxxxxxxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## 3. Set Environment Variables

Create a file called `.env.local` in your project root and add:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace the values with your actual Supabase credentials.

## 4. Create Database Table

In your Supabase dashboard, go to **Table Editor** and create a new table called `feedback` with these columns:

### Table: feedback

| Column Name | Data Type | Constraints |
|-------------|-----------|-------------|
| id | int8 | Primary Key, Auto-increment |
| name | text | Not null |
| email | text | Not null |
| experience | text | Not null |
| rating | int4 | Not null |
| feedback | text | Not null |
| suggestions | text | Nullable |
| would_recommend | text | Not null |
| submitted_at | timestamptz | Not null |
| created_at | timestamptz | Default: now() |

### SQL Script (Alternative)

You can also run this SQL script in the **SQL Editor**:

```sql
CREATE TABLE feedback (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  experience TEXT NOT NULL,
  rating INTEGER NOT NULL,
  feedback TEXT NOT NULL,
  suggestions TEXT,
  would_recommend TEXT NOT NULL,
  submitted_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for feedback submission)
CREATE POLICY "Allow anonymous inserts" ON feedback
FOR INSERT TO anon WITH CHECK (true);

-- Create policy to allow authenticated users to read all feedback (for admin)
CREATE POLICY "Allow authenticated reads" ON feedback
FOR SELECT TO authenticated USING (true);
```

## 5. Test the Integration

1. Start your development server: `npm run dev`
2. Go to `/feedback` page
3. Fill out and submit the form
4. Check your Supabase table editor to see if the data was inserted

## 6. Security Considerations

- The current setup allows anonymous users to submit feedback
- Consider adding rate limiting in production
- You may want to add email verification
- Consider adding CAPTCHA for spam protection

## 7. Viewing Feedback Data

To create an admin interface to view feedback:

1. Create an authenticated route
2. Use the `getAllFeedback()` function from `src/lib/supabase.js`
3. Display the feedback in a table format

## 8. Troubleshooting

**Common Issues:**

1. **Environment variables not working**: Restart your dev server after adding `.env.local`
2. **CORS errors**: Make sure your domain is added to Supabase auth settings
3. **Database errors**: Check your table schema matches the expected format
4. **API errors**: Check browser console and server logs for detailed error messages

## Environment Variables Template

```env
# Copy this to .env.local and fill in your details
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your-long-key-here
```

---

🎉 Once setup is complete, users will be able to submit feedback through the `/feedback` page, and the data will be stored securely in your Supabase database! 