-- Create app_role enum with all roles
CREATE TYPE public.app_role AS ENUM ('student', 'faculty', 'mentor', 'admin');

-- Create user_roles table (security requirement - roles in separate table)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create internship_postings table for faculty to post
CREATE TABLE public.internship_postings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    company_logo_url TEXT,
    description TEXT,
    location TEXT,
    stipend TEXT,
    type TEXT NOT NULL DEFAULT 'off_campus', -- 'on_campus' or 'off_campus'
    apply_link TEXT,
    deadline DATE,
    is_women_focused BOOLEAN DEFAULT false,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    posted_by UUID REFERENCES auth.users(id),
    reviewed_by UUID REFERENCES auth.users(id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on internship_postings
ALTER TABLE public.internship_postings ENABLE ROW LEVEL SECURITY;

-- RLS policies for internship_postings
CREATE POLICY "Students can view approved internships"
ON public.internship_postings
FOR SELECT
USING (status = 'approved' OR posted_by = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Faculty can create internship postings"
ON public.internship_postings
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'faculty') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Faculty can update their own postings"
ON public.internship_postings
FOR UPDATE
USING (posted_by = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete postings"
ON public.internship_postings
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create skill_roadmaps table
CREATE TABLE public.skill_roadmaps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    steps JSONB NOT NULL DEFAULT '[]',
    difficulty TEXT DEFAULT 'beginner',
    estimated_duration TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.skill_roadmaps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view roadmaps"
ON public.skill_roadmaps
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage roadmaps"
ON public.skill_roadmaps
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for internship_postings updated_at
CREATE TRIGGER update_internship_postings_updated_at
BEFORE UPDATE ON public.internship_postings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();