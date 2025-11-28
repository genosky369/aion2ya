-- Migration: Fix updates table for JWT authentication
-- This allows updates to be created without Supabase Auth

-- 1. Make author_id nullable since we're using JWT auth instead of Supabase Auth
ALTER TABLE updates ALTER COLUMN author_id DROP NOT NULL;

-- 2. Drop the restrictive RLS policy for inserts
DROP POLICY IF EXISTS "Only admins can insert updates" ON updates;

-- 3. Create a new policy that allows anyone to insert (we handle auth in the API layer)
CREATE POLICY "Allow inserts to updates"
  ON updates FOR INSERT
  WITH CHECK (true);

-- 4. Update other policies to also allow operations without Supabase Auth
DROP POLICY IF EXISTS "Only admins can update updates" ON updates;
DROP POLICY IF EXISTS "Only admins can delete updates" ON updates;

CREATE POLICY "Allow updates to updates"
  ON updates FOR UPDATE
  USING (true);

CREATE POLICY "Allow deletes to updates"
  ON updates FOR DELETE
  USING (true);
