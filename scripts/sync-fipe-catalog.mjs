const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error('Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY localmente.');
const base = 'https://fipe.parallelum.com.br/api/v2/cars';
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function request(path, attempt = 0) {
  const response = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(15000) });
  if (response.ok) return response.json();
  if ((response.status === 429 || response.status >= 500) && attempt < 3) {
    await wait(1000 * (attempt + 1));
    return request(path, attempt + 1);
  }
  throw new Error(`FIPE ${response.status}: ${path}`);
}
async function upsert(table, rows, conflict) {
  const response = await fetch(`${url}/rest/v1/${table}?on_conflict=${conflict}`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify(rows),
  });
  if (!response.ok) throw new Error(`Supabase ${table}: ${await response.text()}`);
  return response.json();
}
const slug = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
const brands = await request('/brands');
const savedBrands = await upsert(
  'vehicle_brands',
  brands.map((brand) => ({
    name: brand.name,
    slug: slug(brand.name),
    fipe_code: String(brand.code),
    active: true,
  })),
  'fipe_code',
);
for (const brand of savedBrands) {
  const models = await request(`/brands/${brand.fipe_code}/models`);
  await upsert(
    'vehicle_models',
    models.map((model) => ({
      brand_id: brand.id,
      name: model.name,
      normalized_name: slug(model.name),
      fipe_model_code: String(model.code),
      active: true,
    })),
    'brand_id,fipe_model_code',
  );
  await wait(150);
  console.info(`Sincronizada: ${brand.name} (${models.length} modelos)`);
}
console.info(`Catálogo FIPE concluído: ${brands.length} marcas.`);
