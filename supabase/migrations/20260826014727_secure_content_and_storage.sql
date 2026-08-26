alter table public.profiles enable row level security;
alter table public.vehicles enable row level security;
alter table public.vehicle_images enable row level security;
alter table public.deliveries enable row level security;
alter table public.delivery_images enable row level security;
alter table public.feedbacks enable row level security;

create policy "Profiles: authenticated users read own role"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

create policy "Vehicles: public reads published"
on public.vehicles
for select
to anon, authenticated
using (status = 'published');

create policy "Vehicles: admins manage all"
on public.vehicles
for all
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role = 'admin'
  )
)
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role = 'admin'
  )
);

create policy "Vehicle images: public reads published"
on public.vehicle_images
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.vehicles
    where vehicles.id = vehicle_images.vehicle_id
      and vehicles.status = 'published'
  )
);

create policy "Vehicle images: admins manage all"
on public.vehicle_images
for all
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role = 'admin'
  )
)
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role = 'admin'
  )
);

create policy "Deliveries: public reads published"
on public.deliveries
for select
to anon, authenticated
using (status = 'published');

create policy "Deliveries: admins manage all"
on public.deliveries
for all
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role = 'admin'
  )
)
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role = 'admin'
  )
);

create policy "Delivery images: public reads published"
on public.delivery_images
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.deliveries
    where deliveries.id = delivery_images.delivery_id
      and deliveries.status = 'published'
  )
);

create policy "Delivery images: admins manage all"
on public.delivery_images
for all
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role = 'admin'
  )
)
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role = 'admin'
  )
);

create policy "Feedbacks: public reads published"
on public.feedbacks
for select
to anon, authenticated
using (status = 'published');

create policy "Feedbacks: admins manage all"
on public.feedbacks
for all
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role = 'admin'
  )
)
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role = 'admin'
  )
);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('vehicles', 'vehicles', false, 10485760, array['image/jpeg', 'image/png', 'image/webp']),
  ('deliveries', 'deliveries', false, 10485760, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Vehicle storage: public reads published"
on storage.objects
for select
to anon, authenticated
using (
  bucket_id = 'vehicles'
  and exists (
    select 1
    from public.vehicle_images
    join public.vehicles on vehicles.id = vehicle_images.vehicle_id
    where vehicles.status = 'published'
      and (
        vehicle_images.storage_path = name
        or vehicle_images.storage_path = 'vehicles/' || name
      )
  )
);

create policy "Delivery storage: public reads published"
on storage.objects
for select
to anon, authenticated
using (
  bucket_id = 'deliveries'
  and exists (
    select 1
    from public.delivery_images
    join public.deliveries on deliveries.id = delivery_images.delivery_id
    where deliveries.status = 'published'
      and (
        delivery_images.storage_path = name
        or delivery_images.storage_path = 'deliveries/' || name
      )
  )
);

create policy "Storage: admins manage MF media"
on storage.objects
for all
to authenticated
using (
  bucket_id in ('vehicles', 'deliveries')
  and exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role = 'admin'
  )
)
with check (
  bucket_id in ('vehicles', 'deliveries')
  and char_length(trim(name)) > 0
  and exists (
    select 1
    from public.profiles
    where profiles.id = (select auth.uid())
      and profiles.role = 'admin'
  )
);
