-- Villa Mima — enquiries table
-- Run this in the Supabase SQL editor (see README.md for step-by-step setup).

create table if not exists public.enquiries (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  check_in    date not null,
  check_out   date not null,
  guests      smallint not null check (guests between 1 and 8),
  message     text,
  -- simple triage workflow for the dashboard: new → replied → booked / closed
  status      text not null default 'new'
              check (status in ('new', 'replied', 'booked', 'closed'))
);

comment on table public.enquiries is
  'Direct booking enquiries from villamima.com. Written by the website API route using the service-role key.';

-- Lock the table down: RLS on, no public policies. The API route uses the
-- service-role key (which bypasses RLS); the anon key can do nothing here.
alter table public.enquiries enable row level security;

create index if not exists enquiries_created_at_idx
  on public.enquiries (created_at desc);
