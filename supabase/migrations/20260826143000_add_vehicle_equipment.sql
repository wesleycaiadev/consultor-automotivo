alter table public.vehicles
  add column equipment text[] not null default array[]::text[];

comment on column public.vehicles.equipment is
  'Lista editorial de equipamentos e diferenciais exibidos no anúncio.';
