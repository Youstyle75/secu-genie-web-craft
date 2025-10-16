-- Create storage bucket for plans
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'plans',
  'plans',
  false,
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
);

-- Policy: Users can view their own plans
CREATE POLICY "Users can view their own plans"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'plans' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Users can upload their own plans
CREATE POLICY "Users can upload their own plans"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'plans' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Users can update their own plans
CREATE POLICY "Users can update their own plans"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'plans' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Users can delete their own plans
CREATE POLICY "Users can delete their own plans"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'plans' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Add plan_data column to projects table for storing annotations
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS plan_data JSONB DEFAULT '{}'::jsonb;

COMMENT ON COLUMN projects.plan_data IS 'Stores Fabric.js canvas data and annotations for floor plans';