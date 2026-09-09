-- OAK Zimbabwe Partner Gathering schema
-- Canonical event: Cresta Lodge, Harare | 9–11 November 2026

create extension if not exists pgcrypto;

create table if not exists public.attendees (
  id uuid primary key default gen_random_uuid(),
  qr_code text not null unique,
  first_name text not null check (length(trim(first_name)) between 1 and 100),
  last_name text not null check (length(trim(last_name)) between 1 and 100),
  email text not null unique check (length(trim(email)) <= 320),
  phone text,
  organization text not null check (length(trim(organization)) between 1 and 200),
  sub_partner text,
  role text not null check (role in ('Partner', 'OAK Staff', 'Coordination Team', 'Presenter', 'Observer')),
  dietary_requirements text,
  accessibility_requirements text,
  travel_accommodation text,
  consent_agreed boolean not null default false check (consent_agreed = true),
  created_at timestamptz not null default now()
);

comment on column public.attendees.dietary_requirements is 'Sensitive: admin access only.';
comment on column public.attendees.accessibility_requirements is 'Sensitive: admin access only.';
comment on column public.attendees.travel_accommodation is 'Sensitive: admin access only.';
comment on column public.attendees.email is 'Private contact data: admin access only.';
comment on column public.attendees.phone is 'Private contact data: admin access only.';

create table if not exists public.check_ins (
  id uuid primary key default gen_random_uuid(),
  attendee_id uuid not null references public.attendees(id) on delete cascade,
  check_in_date date not null default current_date,
  checked_in_at timestamptz not null default now(),
  unique (attendee_id, check_in_date)
);

create table if not exists public.program_sessions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  speaker text,
  start_time timestamptz not null,
  end_time timestamptz not null,
  location text not null,
  category text not null check (category in ('Plenary', 'Breakout', 'Workshop', 'Social')),
  day_number integer not null check (day_number between 1 and 3),
  check (end_time > start_time)
);

create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  region text not null,
  org_type text not null,
  partner_since integer check (partner_since between 1900 and 2200),
  about_text text,
  focus_areas text[] not null default '{}',
  website_url text,
  contact_email text,
  logo_url text
);

alter table public.attendees enable row level security;
alter table public.check_ins enable row level security;
alter table public.program_sessions enable row level security;
alter table public.partners enable row level security;

-- Public registration may insert only. Public reads use the restricted view below.
create policy "public can self register"
  on public.attendees for insert to anon, authenticated
  with check (consent_agreed = true);

create policy "authenticated admins can read attendees"
  on public.attendees for select to authenticated
  using ((select auth.role()) = 'authenticated');

create policy "authenticated admins can update attendees"
  on public.attendees for update to authenticated
  using ((select auth.role()) = 'authenticated')
  with check ((select auth.role()) = 'authenticated');

create policy "authenticated admins can read check ins"
  on public.check_ins for select to authenticated
  using ((select auth.role()) = 'authenticated');

create policy "authenticated admins can insert check ins"
  on public.check_ins for insert to authenticated
  with check ((select auth.role()) = 'authenticated');

create policy "public can read programme"
  on public.program_sessions for select to anon, authenticated
  using (true);

create policy "authenticated admins can write programme"
  on public.program_sessions for all to authenticated
  using ((select auth.role()) = 'authenticated')
  with check ((select auth.role()) = 'authenticated');

create policy "public can read partners"
  on public.partners for select to anon, authenticated
  using (true);

create policy "authenticated admins can write partners"
  on public.partners for all to authenticated
  using ((select auth.role()) = 'authenticated')
  with check ((select auth.role()) = 'authenticated');

-- RLS cannot hide individual columns. Revoke base-table reads and expose only safe fields publicly.
revoke all on public.attendees from anon;
grant insert on public.attendees to anon;
revoke select on public.attendees from anon;

create or replace view public.attendees_public
with (security_invoker = false) as
select id, first_name, last_name, organization, role, qr_code
from public.attendees;

revoke all on public.attendees_public from public;
grant select on public.attendees_public to anon, authenticated;

-- Daily idempotency is enforced by the unique(attendee_id, check_in_date) constraint.
comment on table public.check_ins is 'One check-in per attendee per calendar date; duplicate inserts fail safely.';
