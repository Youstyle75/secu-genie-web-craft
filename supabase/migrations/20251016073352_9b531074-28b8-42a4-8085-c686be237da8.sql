-- Add pg_trgm extension first
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create indexes for frequently queried columns to improve performance

-- Projects table indexes
CREATE INDEX IF NOT EXISTS idx_projects_user_id_status 
ON public.projects(user_id, status);

CREATE INDEX IF NOT EXISTS idx_projects_user_id_updated_at 
ON public.projects(user_id, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_projects_type 
ON public.projects(type);

-- Documents table indexes
CREATE INDEX IF NOT EXISTS idx_documents_user_id_status 
ON public.documents(user_id, status);

CREATE INDEX IF NOT EXISTS idx_documents_project_id 
ON public.documents(project_id);

CREATE INDEX IF NOT EXISTS idx_documents_user_id_updated_at 
ON public.documents(user_id, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_documents_type 
ON public.documents(type);

-- Signatures table indexes
CREATE INDEX IF NOT EXISTS idx_signatures_user_id 
ON public.signatures(user_id);

-- Composite index for common query pattern
CREATE INDEX IF NOT EXISTS idx_documents_user_project_status 
ON public.documents(user_id, project_id, status);

-- Index for text search on document titles (after extension is created)
CREATE INDEX IF NOT EXISTS idx_documents_title_trgm 
ON public.documents USING gin(title gin_trgm_ops);

-- Index for text search on project names (after extension is created)
CREATE INDEX IF NOT EXISTS idx_projects_name_trgm 
ON public.projects USING gin(name gin_trgm_ops);

COMMENT ON INDEX idx_projects_user_id_status IS 'Optimizes queries filtering projects by user and status';
COMMENT ON INDEX idx_documents_user_project_status IS 'Optimizes queries filtering documents by user, project and status';
COMMENT ON INDEX idx_documents_title_trgm IS 'Enables fast fuzzy text search on document titles';
COMMENT ON INDEX idx_projects_name_trgm IS 'Enables fast fuzzy text search on project names';