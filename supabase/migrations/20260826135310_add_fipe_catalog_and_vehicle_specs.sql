alter table public.vehicles
  add column steering text not null default 'Elétrica' check (steering in ('Hidráulica', 'Elétrica', 'Eletro-hidráulica', 'Mecânica')),
  add column fipe_code text,
  add column fipe_price numeric(14, 2) check (fipe_price >= 0),
  add column fipe_reference_month text,
  add column fipe_last_sync timestamptz;

create table public.vehicle_brands (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  fipe_code text not null unique,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.vehicle_models (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references public.vehicle_brands (id) on delete cascade,
  name text not null,
  normalized_name text not null,
  fipe_model_code text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (brand_id, fipe_model_code)
);

create index vehicle_models_brand_active_idx on public.vehicle_models (brand_id, name) where active;
create index vehicles_fipe_code_idx on public.vehicles (fipe_code) where fipe_code is not null;

alter table public.vehicle_brands enable row level security;
alter table public.vehicle_models enable row level security;

create policy "Vehicle brands: admins manage catalog" on public.vehicle_brands for all to authenticated using (exists (select 1 from public.profiles where profiles.id = (select auth.uid()) and profiles.role = 'admin')) with check (exists (select 1 from public.profiles where profiles.id = (select auth.uid()) and profiles.role = 'admin'));
create policy "Vehicle models: admins manage catalog" on public.vehicle_models for all to authenticated using (exists (select 1 from public.profiles where profiles.id = (select auth.uid()) and profiles.role = 'admin')) with check (exists (select 1 from public.profiles where profiles.id = (select auth.uid()) and profiles.role = 'admin'));
