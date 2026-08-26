create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null check (role in ('admin'))
);

create table public.vehicles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (char_length(trim(slug)) > 0),
  brand text not null check (char_length(trim(brand)) > 0),
  model text not null check (char_length(trim(model)) > 0),
  version text not null check (char_length(trim(version)) > 0),
  manufacturing_year smallint not null check (manufacturing_year between 1886 and 2100),
  model_year smallint not null check (model_year between 1886 and 2100),
  mileage integer not null check (mileage >= 0),
  price numeric(14, 2) check (price >= 0),
  transmission text not null check (char_length(trim(transmission)) > 0),
  fuel text not null check (char_length(trim(fuel)) > 0),
  color text not null check (char_length(trim(color)) > 0),
  location text not null check (char_length(trim(location)) > 0),
  description text not null check (char_length(trim(description)) > 0),
  status text not null default 'draft' check (status in ('draft', 'published', 'sold')),
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.vehicle_images (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles (id) on delete cascade,
  storage_path text not null unique check (char_length(trim(storage_path)) > 0),
  alt_text text not null check (char_length(trim(alt_text)) > 0),
  sort_order integer not null default 0 check (sort_order >= 0),
  is_cover boolean not null default false,
  unique (vehicle_id, sort_order)
);

create table public.deliveries (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null check (char_length(trim(customer_name)) > 0),
  vehicle_id uuid references public.vehicles (id) on delete set null,
  vehicle_name text not null check (char_length(trim(vehicle_name)) > 0),
  city text not null check (char_length(trim(city)) > 0),
  testimonial text not null check (char_length(trim(testimonial)) > 0),
  delivery_date date not null,
  status text not null default 'draft' check (status in ('draft', 'published'))
);

create table public.delivery_images (
  id uuid primary key default gen_random_uuid(),
  delivery_id uuid not null references public.deliveries (id) on delete cascade,
  storage_path text not null unique check (char_length(trim(storage_path)) > 0),
  sort_order integer not null default 0 check (sort_order >= 0),
  is_cover boolean not null default false,
  unique (delivery_id, sort_order)
);

create table public.feedbacks (
  id uuid primary key default gen_random_uuid(),
  author text not null check (char_length(trim(author)) > 0),
  text text not null check (char_length(trim(text)) > 0),
  status text not null default 'draft' check (status in ('draft', 'published')),
  sort_order integer not null default 0 check (sort_order >= 0)
);

create index vehicles_published_featured_idx
  on public.vehicles (featured desc, created_at desc)
  where status = 'published';

create index vehicle_images_vehicle_sort_idx
  on public.vehicle_images (vehicle_id, sort_order);

create unique index vehicle_images_one_cover_per_vehicle_idx
  on public.vehicle_images (vehicle_id)
  where is_cover;

create index deliveries_published_date_idx
  on public.deliveries (delivery_date desc)
  where status = 'published';

create index delivery_images_delivery_sort_idx
  on public.delivery_images (delivery_id, sort_order);

create unique index delivery_images_one_cover_per_delivery_idx
  on public.delivery_images (delivery_id)
  where is_cover;

create index feedbacks_published_sort_idx
  on public.feedbacks (sort_order)
  where status = 'published';
