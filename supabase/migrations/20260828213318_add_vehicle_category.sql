alter table public.vehicles
  add column category text not null default 'other'
  check (category in ('suv', 'sedan', 'hatch', 'pickup', 'other'));

-- Preserve the public filter experience for the vehicle already registered.
update public.vehicles
set category = case
  when lower(concat_ws(' ', brand, model, version)) like '%siena%' then 'sedan'
  when lower(concat_ws(' ', brand, model, version)) like '%range rover%' then 'suv'
  else category
end
where lower(concat_ws(' ', brand, model, version)) like any (array['%siena%', '%range rover%']);

create index vehicles_published_category_idx
  on public.vehicles (category, featured desc, created_at desc)
  where status = 'published';
