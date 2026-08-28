import { readFile } from 'node:fs/promises';

const requiredMigration = 'supabase/migrations/20260826014727_secure_content_and_storage.sql';
const catalogMigration =
  'supabase/migrations/20260826135310_add_fipe_catalog_and_vehicle_specs.sql';
const coreSchema = 'supabase/migrations/20260826012618_create_mf_core_schema.sql';

async function read(path) {
  return readFile(path, 'utf8');
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const [gitignore, migration, catalog, schema, adminClient, publicVehicles, publicContent] =
  await Promise.all([
    read('.gitignore'),
    read(requiredMigration),
    read(catalogMigration),
    read(coreSchema),
    read('src/app/core/auth/admin-auth.service.ts'),
    read('src/app/core/services/vehicle-repository.service.ts'),
    read('src/app/core/services/public-content-repository.service.ts'),
  ]);

assert(gitignore.includes('.env\n'), 'Inclua .env no .gitignore.');
assert(gitignore.includes('.env.*\n'), 'Inclua .env.* no .gitignore.');
assert(gitignore.includes('!.env.example'), 'Mantenha .env.example versionável.');

for (const table of [
  'profiles',
  'vehicles',
  'vehicle_images',
  'deliveries',
  'delivery_images',
  'feedbacks',
]) {
  assert(
    migration.includes(`alter table public.${table} enable row level security;`),
    `RLS ausente para public.${table}.`,
  );
}

for (const table of ['vehicle_brands', 'vehicle_models']) {
  assert(
    catalog.includes(`alter table public.${table} enable row level security;`),
    `RLS ausente para public.${table}.`,
  );
}

assert(
  migration.includes("using (status = 'published');"),
  'A leitura pública deve continuar limitada a conteúdo publicado.',
);
assert(
  migration.includes('public = excluded.public') &&
    migration.includes("'vehicles', 'vehicles', false"),
  'O bucket de veículos deve permanecer privado.',
);
assert(
  migration.includes("'deliveries', 'deliveries', false"),
  'O bucket de entregas deve permanecer privado.',
);
assert(
  migration.includes('Storage: admins manage MF media'),
  'A política de escrita administrativa do Storage está ausente.',
);
assert(
  schema.includes("role text not null check (role in ('admin'))"),
  'O papel administrativo precisa permanecer restrito.',
);

for (const [label, source] of [
  ['cliente administrativo', adminClient],
  ['repositório público de veículos', publicVehicles],
  ['repositório público de conteúdo', publicContent],
]) {
  assert(!source.includes('service_role'), `Service role encontrada no ${label}.`);
  assert(!source.includes('sb_secret_'), `Chave secreta encontrada no ${label}.`);
}

console.log('Security check passed: RLS, Storage privado, env e clientes públicos verificados.');
