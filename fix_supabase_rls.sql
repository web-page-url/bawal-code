-- Fix Row Level Security for feedback table
-- Run this in your Supabase SQL Editor

-- First, drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous inserts" ON feedback;
DROP POLICY IF EXISTS "Allow authenticated reads" ON feedback;

-- Disable RLS temporarily to ensure we can work with the table
ALTER TABLE feedback DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Create a simple policy that allows all inserts (for anonymous feedback)
CREATE POLICY "Enable insert for anonymous users" ON feedback
FOR INSERT 
WITH CHECK (true);

-- Create a policy to allow reading for authenticated users (optional - for admin)
CREATE POLICY "Enable read for authenticated users" ON feedback
FOR SELECT 
TO authenticated 
USING (true);

-- Alternative: If you want to completely disable RLS for this table (simpler approach)
-- Uncomment the line below instead of the policies above
-- ALTER TABLE feedback DISABLE ROW LEVEL SECURITY; 