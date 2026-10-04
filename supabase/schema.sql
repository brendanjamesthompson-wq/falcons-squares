-- Falcons Squares database schema
create extension if not exists pgcrypto;

create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  jersey_number integer not null,
  first_name text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (jersey_number, first_name)
);

create table if not exists public.boards (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  team_a text not null,
  team_b text not null,
  game_date date,
  price numeric(10,2) not null default 0,
  payouts jsonb not null default '{"q1":0,"half":0,"q3":0,"final":0}'::jsonb,
  axis_a integer[] not null default array[0,1,2,3,4,5,6,7,8,9],
  axis_b integer[] not null default array[0,1,2,3,4,5,6,7,8,9],
  numbers_locked boolean not null default false,
  status text not null default 'draft' check (status in ('draft','open','closed','complete')),
  quarter_scores jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.squares (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references public.boards(id) on delete cascade,
  row_index integer not null check (row_index between 0 and 9),
  col_index integer not null check (col_index between 0 and 9),
  buyer_name text,
  player_id uuid references public.players(id),
  paid boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(board_id,row_index,col_index)
);

alter table public.players enable row level security;
alter table public.boards enable row level security;
alter table public.squares enable row level security;

-- Public can read active roster and any non-draft board/square data.
create policy "public read active players" on public.players for select using (active = true);
create policy "public read published boards" on public.boards for select using (status <> 'draft');
create policy "public read published squares" on public.squares for select using (
  exists (select 1 from public.boards b where b.id = board_id and b.status <> 'draft')
);

-- Brendan is the sole administrator in V1.
create policy "admin all players" on public.players for all to authenticated
using ((auth.jwt() ->> 'email') = 'brendanjamesthompson@gmail.com')
with check ((auth.jwt() ->> 'email') = 'brendanjamesthompson@gmail.com');
create policy "admin all boards" on public.boards for all to authenticated
using ((auth.jwt() ->> 'email') = 'brendanjamesthompson@gmail.com')
with check ((auth.jwt() ->> 'email') = 'brendanjamesthompson@gmail.com');
create policy "admin all squares" on public.squares for all to authenticated
using ((auth.jwt() ->> 'email') = 'brendanjamesthompson@gmail.com')
with check ((auth.jwt() ->> 'email') = 'brendanjamesthompson@gmail.com');

insert into public.players (jersey_number, first_name) values
(17,'Dexter'),(6,'Henry'),(8,'Silas'),(9,'Mason'),(10,'George'),(13,'Hudson'),
(14,'Bryson'),(22,'Colton'),(23,'Eli'),(26,'Jacob'),(27,'Ben'),(37,'Alex')
on conflict (jersey_number, first_name) do nothing;
