-- Enable realtime for comments table
ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;

-- Enable realtime for notifications table  
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- Create function to notify users when mentioned in comments
CREATE OR REPLACE FUNCTION public.notify_mentioned_users()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Extract @mentions from comment content (simple regex pattern)
  -- In a real app, you'd parse the content more thoroughly
  -- For now, we'll create a notification for the document owner
  INSERT INTO public.notifications (user_id, type, title, message, link)
  SELECT 
    d.user_id,
    'comment',
    'Nouveau commentaire',
    'Un nouveau commentaire a été ajouté à votre document',
    '/documents/' || NEW.document_id || '/edit'
  FROM public.documents d
  WHERE d.id = NEW.document_id
    AND d.user_id != NEW.user_id;  -- Don't notify yourself
  
  RETURN NEW;
END;
$$;

-- Trigger to create notifications on new comments
CREATE TRIGGER on_comment_created
  AFTER INSERT ON public.comments
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_mentioned_users();

-- Add index for better performance on comments queries
CREATE INDEX IF NOT EXISTS idx_comments_document_id ON public.comments(document_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON public.comments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id_read ON public.notifications(user_id, read);