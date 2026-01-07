-- Profiles Table (extends auth.users)
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  avatar_url text,
  bio text,
  role text check (role in ('user', 'expert', 'admin')) default 'user',
  specialty text,
  phone text,
  linkedin text,
  instagram text,
  updated_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for profiles
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Jobs Table
create table jobs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  budget text,
  tags text[],
  category text,
  status text default 'open',
  employer_id uuid references profiles(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for jobs
alter table jobs enable row level security;

create policy "Jobs are viewable by everyone."
  on jobs for select
  using ( true );

create policy "Authenticated users can insert jobs."
  on jobs for insert
  with check ( auth.role() = 'authenticated' );

create policy "Users can update own jobs."
  on jobs for update
  using ( auth.uid() = employer_id );

-- Portfolios Table
create table portfolios (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) not null,
  title text not null,
  description text,
  media_url text,
  external_link text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for portfolios
alter table portfolios enable row level security;

create policy "Portfolios are viewable by everyone."
  on portfolios for select
  using ( true );

create policy "Users can insert own portfolios."
  on portfolios for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own portfolios."
  on portfolios for update
  using ( auth.uid() = user_id );

create policy "Users can delete own portfolios."
  on portfolios for delete
  using ( auth.uid() = user_id );

-- Storage Buckets
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true);

insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true);

-- Storage Policies: Avatars
create policy "Avatar images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy "Anyone can upload an avatar."
  on storage.objects for insert
  with check ( bucket_id = 'avatars' );

create policy "Anyone can update their own avatar."
  on storage.objects for update
  using ( auth.uid() = owner and bucket_id = 'avatars' );

-- Storage Policies: Portfolio
create policy "Portfolio images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'portfolio' );

create policy "Anyone can upload portfolio images."
  on storage.objects for insert
  with check ( bucket_id = 'portfolio' );

create policy "Anyone can update their own portfolio images."
  on storage.objects for update
  using ( auth.uid() = owner and bucket_id = 'portfolio' );
