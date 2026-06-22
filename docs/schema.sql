-- =========================================================
-- 기본사회위원회 AI교육센터 — Supabase 스키마
-- 공용 프로젝트(hcmgdztsgjvzcyxyayaj)에 접두사 basic_ 로 적재.
-- Supabase SQL Editor 에서 실행.
-- =========================================================

-- 1) 프로필 (auth.users 와 1:1, 역할 포함)
create table if not exists public.basic_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  name text,
  avatar_url text,
  role text not null default 'student',   -- student | instructor | admin
  created_at timestamptz not null default now()
);

-- 2) 교육과정
create table if not exists public.basic_courses (
  id text primary key default ('crs-' || gen_random_uuid()),
  category text not null,                  -- instructor | applied | public
  title text not null,
  summary text,
  region text,
  hours int default 0,
  weeks int default 0,
  level text,
  target text,
  fee int default 0,
  cover text,
  outline jsonb default '[]'::jsonb,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

-- 3) 모집공고
create table if not exists public.basic_recruitments (
  id text primary key default ('rec-' || gen_random_uuid()),
  course_id text references public.basic_courses(id) on delete set null,
  title text not null,
  region text,
  status text not null default 'upcoming', -- open | upcoming | closed
  start_date date,
  end_date date,
  apply_deadline date,
  capacity int default 0,
  applied int default 0,
  place text,
  schedule_text text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

-- 4) 수강신청
create table if not exists public.basic_enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  user_name text,
  user_email text,
  phone text,
  recruitment_id text references public.basic_recruitments(id) on delete set null,
  recruitment_title text,
  course_id text,
  course_title text,
  region text,
  motivation text,
  status text not null default 'pending',  -- pending | approved | rejected | done
  created_at timestamptz not null default now()
);

-- =========================================================
-- RLS
-- =========================================================
alter table public.basic_profiles    enable row level security;
alter table public.basic_courses     enable row level security;
alter table public.basic_recruitments enable row level security;
alter table public.basic_enrollments enable row level security;

-- 프로필: 본인 행만 조회/수정/생성
create policy basic_profiles_self_select on public.basic_profiles for select using (auth.uid() = id);
create policy basic_profiles_self_upsert on public.basic_profiles for insert with check (auth.uid() = id);
create policy basic_profiles_self_update on public.basic_profiles for update using (auth.uid() = id);

-- 과정/모집: 누구나 조회, 강사·관리자만 작성
create policy basic_courses_read on public.basic_courses for select using (true);
create policy basic_recruitments_read on public.basic_recruitments for select using (true);

create policy basic_courses_write on public.basic_courses for insert with check (
  exists (select 1 from public.basic_profiles p where p.id = auth.uid() and p.role in ('instructor','admin'))
);
create policy basic_recruitments_write on public.basic_recruitments for insert with check (
  exists (select 1 from public.basic_profiles p where p.id = auth.uid() and p.role in ('instructor','admin'))
);

-- 수강신청: 본인 것만 조회/생성
create policy basic_enroll_self_select on public.basic_enrollments for select using (auth.uid() = user_id);
create policy basic_enroll_self_insert on public.basic_enrollments for insert with check (auth.uid() = user_id);

-- =========================================================
-- 관리자 지정 예시 (가입 후 본인 uid 로 교체)
--   update public.basic_profiles set role = 'admin' where email = 'aebon@kyonggi.ac.kr';
-- =========================================================
