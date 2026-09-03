import { expect, test, type Page } from '@playwright/test';

const supabaseOrigin = 'https://urjcjtwveunzixxkdikf.supabase.co';
const fipeOrigin = 'https://fipe.parallelum.com.br';

interface MockVehicle {
  id: string;
  brand: string;
  color: string;
  created_at: string;
  description: string;
  featured: boolean;
  fuel: string;
  category: 'suv' | 'sedan' | 'hatch' | 'pickup' | 'other';
  manufacturing_year: number;
  mileage: number;
  model: string;
  model_year: number;
  price: number | null;
  slug: string;
  status: 'draft' | 'published' | 'sold';
  transmission: string;
  updated_at: string;
  version: string;
  vehicle_images?: readonly unknown[];
}

interface MockApi {
  readonly createdVehicles: MockVehicle[];
  readonly vehicles: MockVehicle[];
}

function vehicleFixture(): MockVehicle {
  return {
    id: 'vehicle-e2e-1',
    brand: 'Fiat',
    color: 'Prata',
    created_at: '2026-08-28T12:00:00.000Z',
    description: 'Veículo de teste para validar o fluxo essencial da vitrine.',
    featured: false,
    fuel: 'Flex',
    category: 'sedan',
    manufacturing_year: 2010,
    mileage: 211000,
    model: 'Siena EL 1.0 mpi Fire Flex 8V 4p',
    model_year: 2010,
    price: 26000,
    slug: 'fiat-siena-2010',
    status: 'draft',
    transmission: 'Manual',
    updated_at: '2026-08-28T12:00:00.000Z',
    version: 'EL 1.0 mpi Fire Flex 8V 4p',
    vehicle_images: [],
  };
}

async function mockApi(page: Page): Promise<MockApi> {
  const vehicles = [vehicleFixture()];
  const createdVehicles: MockVehicle[] = [];

  await page.route(`${supabaseOrigin}/auth/v1/**`, async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({
          access_token:
            'eyJhbGciOiJub25lIn0.eyJzdWIiOiJlMmUtYWRtaW4iLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwiZXhwIjo0MTAyNDQ0ODAwfQ.',
          expires_in: 3600,
          refresh_token: 'e2e-refresh-token',
          token_type: 'bearer',
          user: { email: 'admin@example.com', id: 'e2e-admin' },
        }),
      });
      return;
    }

    await route.fulfill({ contentType: 'application/json', body: JSON.stringify({ user: null }) });
  });

  await page.route(`${supabaseOrigin}/rest/v1/**`, async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    const table = url.pathname.split('/').at(-1);

    if (table === 'vehicle_brands') {
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify([{ active: true, fipe_code: '21', id: 'brand-fiat', name: 'Fiat' }]),
      });
      return;
    }

    if (table === 'vehicle_models') {
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify([
          {
            active: true,
            brand_id: 'brand-fiat',
            fipe_model_code: '438',
            id: 'model-siena',
            name: 'Siena EL 1.0 mpi Fire Flex 8V 4p',
          },
        ]),
      });
      return;
    }

    if (table === 'vehicle_images') {
      await route.fulfill({ contentType: 'application/json', body: JSON.stringify([]) });
      return;
    }

    if (table !== 'vehicles') {
      await route.fulfill({ contentType: 'application/json', body: JSON.stringify([]) });
      return;
    }

    if (request.method() === 'GET') {
      await route.fulfill({ contentType: 'application/json', body: JSON.stringify(vehicles) });
      return;
    }

    const payload = (request.postDataJSON() ?? {}) as Partial<MockVehicle>;
    if (request.method() === 'POST') {
      const created: MockVehicle = {
        ...vehicleFixture(),
        ...payload,
        id: `vehicle-e2e-${vehicles.length + 1}`,
        updated_at: '2026-08-28T12:05:00.000Z',
      };
      vehicles.push(created);
      createdVehicles.push(created);
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({ id: created.id }),
      });
      return;
    }

    if (request.method() === 'PATCH') {
      const target = vehicles[0];
      Object.assign(target, payload);
      await route.fulfill({ contentType: 'application/json', body: JSON.stringify(target) });
      return;
    }

    await route.fulfill({ contentType: 'application/json', body: JSON.stringify({}) });
  });

  await page.route(`${fipeOrigin}/api/v2/cars/**`, async (route) => {
    const path = new URL(route.request().url()).pathname;
    const body = path.endsWith('/years')
      ? [{ code: '2010-1', name: '2010 Flex' }]
      : {
          codeFipe: '001004-9',
          fuel: 'Flex',
          modelYear: 2010,
          price: 'R$ 26.000,00',
          referenceMonth: 'agosto de 2026',
        };
    await route.fulfill({ contentType: 'application/json', body: JSON.stringify(body) });
  });

  return { createdVehicles, vehicles };
}

async function signIn(page: Page): Promise<void> {
  await page.goto('/admin/login');
  await page.getByLabel('E-mail').fill('admin@example.com');
  await page.getByLabel('Senha').fill('senha-e2e');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page).toHaveURL(/\/admin$/);
}

async function waitForPublicIntro(page: Page): Promise<void> {
  await page.locator('.mf-intro').waitFor({ state: 'detached', timeout: 7000 });
}

test('percorre showroom até o detalhe do veículo', async ({ page }) => {
  await mockApi(page);
  await page.goto('/showroom');
  await waitForPublicIntro(page);

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Veículos selecionados para uma decisão mais segura.',
    }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Sedã' }).click();
  await expect(page.getByRole('button', { name: 'Sedã' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('link', { name: /fiat siena/i })).toBeVisible();
  await page.getByRole('link', { name: /fiat siena/i }).click();

  await expect(page).toHaveURL(/\/showroom\/fiat-siena-2010$/);
  await expect(page.getByRole('heading', { name: /fiat siena/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /tenho interesse neste veículo/i })).toHaveAttribute(
    'href',
    /wa\.me/,
  );
});

test('navega da Home para o Showroom sem repetir a abertura', async ({ page }) => {
  await mockApi(page);
  await page.goto('/');
  await waitForPublicIntro(page);

  const timeOrigin = await page.evaluate(() => performance.timeOrigin);
  await page.getByRole('link', { name: 'Ver showroom' }).click();

  await expect(page).toHaveURL(/\/showroom$/);
  await expect(page.locator('.mf-intro')).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => performance.timeOrigin)).toBe(timeOrigin);
});

test('conclui a busca guiada e prepara o WhatsApp', async ({ page }) => {
  await page.goto('/encontrar-meu-carro');
  await waitForPublicIntro(page);

  await page.getByLabel('SUV').check({ force: true });
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByLabel('Até R$ 50 mil').check({ force: true });
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByLabel('Tanto faz').check({ force: true });
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByLabel('Família').check({ force: true });
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByLabel('Equilibrada (1.4 a 2.0)').check({ force: true });
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByLabel(/Marca desejada/).fill('Fiat');
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByLabel(/Modelo desejado/).fill('Siena');
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByLabel(/Observações/).fill('Uso familiar com porta-malas amplo.');
  await page.getByRole('button', { name: 'Revisar busca' }).click();
  await page.getByRole('button', { name: 'Continuar' }).click();

  const whatsapp = page.getByRole('link', { name: /enviar minha busca/i });
  await expect(whatsapp).toHaveAttribute('href', /Tipo%20de%20ve%C3%ADculo%3A%20SUV/);
});

test('autentica o administrador e publica uma edição rápida', async ({ page }) => {
  const api = await mockApi(page);
  await signIn(page);
  await page.goto('/admin/veiculos');

  await expect(page.getByRole('heading', { name: 'Veículos' })).toBeVisible();
  await page.getByRole('button', { name: 'Edição rápida' }).click();
  await page.getByRole('radio', { name: 'No showroom' }).check({ force: true });
  await page.getByRole('button', { name: 'Salvar alterações' }).click();

  await expect(page.getByText('No showroom', { exact: true }).first()).toBeVisible();
  await expect.poll(() => api.vehicles[0]?.status).toBe('published');
});

test('cria um veículo publicado sem tocar dados reais', async ({ page }) => {
  const api = await mockApi(page);
  await signIn(page);
  await page.goto('/admin/veiculos/novo');

  await page.getByRole('button', { name: /marca.*selecionar marca/i }).click();
  await page.getByLabel('Buscar marca').fill('Fiat');
  await page.getByRole('option', { name: /fiat/i }).click();
  await page.getByLabel('Buscar modelo ou versão').fill('Siena');
  await page.getByRole('option', { name: /siena/i }).click();
  await page.locator('#color').fill('Prata');
  await page.locator('#description').fill('Cadastro E2E com dados isolados.');
  await page.getByText('Exibir no showroom', { exact: true }).click();
  await page.getByRole('button', { name: 'Salvar veículo' }).click();

  await expect(page).toHaveURL(/\/admin\/veiculos$/);
  await expect.poll(() => api.createdVehicles).toHaveLength(1);
  await expect.poll(() => api.createdVehicles[0]?.status).toBe('published');
});
