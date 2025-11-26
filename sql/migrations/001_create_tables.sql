-- Supabase / Postgres migration (skeleton)

-- Profiles table (linked to supabase auth.users.id)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  stripe_customer_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Subscriptions linked to profiles
create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text,
  status text,
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Questionnaires
create table if not exists questionnaires (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id),
  title text,
  data jsonb,
  created_at timestamptz default now()
);

-- Business models
create table if not exists business_models (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id),
  name text,
  details jsonb,
  created_at timestamptz default now()
);

-- Roadmaps
create table if not exists roadmaps (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id),
  title text,
  items jsonb,
  created_at timestamptz default now()
);

-- Tasks
create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  roadmap_id uuid references roadmaps(id) on delete cascade,
  title text,
  description text,
  status text,
  due_date timestamptz,
  created_at timestamptz default now()
);

-- Chat sessions and messages
create table if not exists chat_sessions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id),
  metadata jsonb,
  created_at timestamptz default now()
);

create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references chat_sessions(id) on delete cascade,
  sender text,
  role text,
  content text,
  created_at timestamptz default now()
);
