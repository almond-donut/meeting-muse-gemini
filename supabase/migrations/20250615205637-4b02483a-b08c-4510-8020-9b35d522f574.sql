
-- Create custom enum types for priority and status
CREATE TYPE public.action_item_priority AS ENUM ('Low', 'Medium', 'High');
CREATE TYPE public.action_item_status AS ENUM ('Pending', 'In Progress', 'Completed');

-- Create the meetings table to store meeting details
CREATE TABLE public.meetings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  meeting_date TIMESTAMPTZ DEFAULT now(),
  participants TEXT[],
  transcript TEXT NOT NULL,
  summary JSONB,
  document_updates JSONB,
  follow_up_email JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE public.meetings IS 'Stores all meeting records and their generated summaries.';

-- Create the action_items table
CREATE TABLE public.action_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  meeting_id UUID NOT NULL REFERENCES public.meetings(id) ON DELETE CASCADE,
  task TEXT NOT NULL,
  assignee TEXT,
  deadline DATE,
  priority public.action_item_priority DEFAULT 'Medium',
  status public.action_item_status DEFAULT 'Pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE public.action_items IS 'Stores all action items related to a meeting.';

-- Enable Row Level Security for both tables
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.action_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for meetings table
-- Users can manage their own meetings
CREATE POLICY "Allow users to manage their own meetings"
ON public.meetings
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for action_items table
-- Users can manage action items for meetings they own
CREATE POLICY "Allow users to manage action items for their meetings"
ON public.action_items
FOR ALL
USING (
  EXISTS (
    SELECT 1
    FROM public.meetings m
    WHERE m.id = meeting_id AND m.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.meetings m
    WHERE m.id = meeting_id AND m.user_id = auth.uid()
  )
);

