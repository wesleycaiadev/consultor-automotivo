import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { AdminAuthService } from '../../core/auth/admin-auth.service';
import { AdminVehicleEditorPageComponent } from './admin-vehicle-editor-page.component';

describe('AdminVehicleEditorPageComponent', () => {
  const brands = [
    { id: 'brand-1', name: 'Toyota', fipeCode: '56' },
    { id: 'brand-2', name: 'Volkswagen', fipeCode: '59' },
  ];
  const models = [
    { id: 'model-1', name: 'Corolla', fipeModelCode: '5940' },
    { id: 'model-2', name: 'Corolla Cross', fipeModelCode: '9464' },
  ];

  const setup = async () => {
    const auth = {
      listCatalogBrands: vi.fn().mockResolvedValue(brands),
      listCatalogModels: vi.fn().mockResolvedValue(models),
      listFipeYears: vi
        .fn()
        .mockResolvedValue([{ code: '2026-1', name: '2026 Gasolina', modelYear: 2026 }]),
      getFipeReference: vi.fn().mockResolvedValue({
        code: '003339-1',
        price: 145_000,
        referenceMonth: 'agosto de 2026',
        fuel: 'Gasolina',
        modelYear: 2026,
      }),
      createVehicle: vi.fn().mockResolvedValue(undefined),
      getVehicleForEdit: vi.fn(),
      listVehicleImages: vi.fn().mockResolvedValue([]),
      updateVehicle: vi.fn().mockResolvedValue(undefined),
      deleteVehicle: vi.fn().mockResolvedValue(undefined),
      setVehicleCover: vi.fn().mockResolvedValue(undefined),
      reorderVehicleImages: vi.fn().mockResolvedValue(undefined),
      removeVehicleImage: vi.fn().mockResolvedValue(undefined),
    };
    await TestBed.configureTestingModule({
      imports: [AdminVehicleEditorPageComponent],
      providers: [{ provide: AdminAuthService, useValue: auth }, provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(AdminVehicleEditorPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return { auth, fixture };
  };

  afterEach(() => TestBed.resetTestingModule());

  it('filters brands and loads the models only after a valid brand is selected', async () => {
    const { auth, fixture } = await setup();
    const component = fixture.componentInstance;

    component.onBrandInput('toy');
    fixture.detectChanges();
    expect(component.filteredBrands().map((brand) => brand.name)).toEqual(['Toyota']);

    await component.selectBrand(brands[0]);
    fixture.detectChanges();

    expect(auth.listCatalogModels).toHaveBeenCalledWith('brand-1');
    expect(component.models()).toEqual(models);
    expect(fixture.nativeElement.querySelector('#model-options')?.textContent).toContain('Corolla');
    expect(
      Array.from(fixture.nativeElement.querySelectorAll('.helper'), (element: Element) =>
        element.textContent?.trim(),
      ),
    ).toContain('2 opções FIPE disponíveis para Toyota.');

    await component.selectModel(models[1]);
    fixture.detectChanges();
    expect(component.draft).toMatchObject({
      model: 'Corolla Cross',
      version: 'Corolla Cross',
      fipe_code: '003339-1',
      fipe_price: 145_000,
    });
    expect(fixture.nativeElement.querySelector('#vehicle-model-value')?.textContent).toContain(
      'Corolla Cross',
    );
  });

  it('prioritizes the exact model search and exposes every matching FIPE version', async () => {
    const { fixture } = await setup();
    const component = fixture.componentInstance;
    component.models.set([
      { id: 'grand-1', name: 'Grand Siena 1.0 EVO', fipeModelCode: '9209' },
      { id: 'grand-2', name: 'Grand Siena 1.4 EVO', fipeModelCode: '9210' },
      { id: 'siena-1', name: 'Siena EL 1.4 Flex', fipeModelCode: '5361' },
    ]);

    component.onModelInput('siena');

    expect(component.filteredModels().map((model) => model.name)).toEqual([
      'Siena EL 1.4 Flex',
      'Grand Siena 1.0 EVO',
      'Grand Siena 1.4 EVO',
    ]);
  });

  it('shows clear empty and error states for catalog and photos', async () => {
    const { fixture } = await setup();
    const component = fixture.componentInstance;

    await component.selectBrand(brands[0]);
    component.onModelInput('modelo inexistente');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#model-options')?.textContent).toContain(
      'Nenhuma opção encontrada',
    );

    component.addPhotos([new File(['texto'], 'arquivo.txt', { type: 'text/plain' })]);
    fixture.detectChanges();
    expect(component.photoCount()).toBe(0);
    expect(fixture.nativeElement.querySelector('.field-error')?.textContent).toContain(
      'foram ignoradas',
    );
  });

  it('limits photos to 15, marks the first as cover and lets the admin remove it', async () => {
    const { fixture } = await setup();
    const component = fixture.componentInstance;
    const photos = Array.from(
      { length: 16 },
      (_, index) => new File(['image'], `vehicle-${index}.jpg`, { type: 'image/jpeg' }),
    );

    component.addPhotos(photos);
    fixture.detectChanges();

    expect(component.photoCount()).toBe(15);
    expect(fixture.nativeElement.querySelector('.photo-grid figcaption')?.textContent).toContain(
      'CAPA',
    );
    expect(component.photoError()).toContain('limite é de 15');

    component.removePhoto(component.selectedPhotos()[0].id);
    fixture.detectChanges();
    expect(component.photoCount()).toBe(14);
  });

  it('uses clear showroom visibility choices and reserves sold for later management', async () => {
    const { fixture } = await setup();
    const component = fixture.componentInstance;
    component.draft.featured = true;

    component.setPublication('draft');
    fixture.detectChanges();

    expect(component.draft).toMatchObject({ status: 'draft', featured: false });
    expect(fixture.nativeElement.textContent).toContain('Guardar em preparação');
    expect(fixture.nativeElement.textContent).toContain('“Vendido” poderá ser marcado depois');

    const publishControl = fixture.nativeElement.querySelectorAll(
      'input[name="status"]',
    )[1] as HTMLInputElement;
    publishControl.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.draft.status).toBe('published');
    expect(fixture.nativeElement.textContent).toContain('Destacar no showroom');
  });

  it('updates every editable field, including the vehicle years, without creating a new row', async () => {
    const { auth, fixture } = await setup();
    const component = fixture.componentInstance;
    component.editingVehicleId.set('vehicle-1');
    component.draft = {
      ...component.draft,
      brand: 'Toyota',
      model: 'Corolla',
      version: 'Corolla',
      manufacturing_year: 2020,
      model_year: 2021,
      color: 'Prata',
      description: 'Revisado e pronto para avaliação.',
    };

    await component.save();

    expect(auth.updateVehicle).toHaveBeenCalledWith(
      'vehicle-1',
      expect.objectContaining({
        manufacturing_year: 2020,
        model_year: 2021,
        slug: 'toyota-corolla-2021',
      }),
      [],
      expect.any(Function),
    );
    expect(auth.createVehicle).not.toHaveBeenCalled();
  });

  it('requires confirmation before permanently deleting an existing vehicle', async () => {
    const { auth, fixture } = await setup();
    const component = fixture.componentInstance;
    component.editingVehicleId.set('vehicle-1');
    component.draft.brand = 'Toyota';
    component.draft.model = 'Corolla';
    const confirm = vi.spyOn(globalThis, 'confirm').mockReturnValue(true);

    await component.deleteVehicle();

    expect(confirm).toHaveBeenCalledOnce();
    expect(auth.deleteVehicle).toHaveBeenCalledWith('vehicle-1');
  });

  it('manages already saved photos directly from the complete editor', async () => {
    const { auth, fixture } = await setup();
    const component = fixture.componentInstance;
    component.editingVehicleId.set('vehicle-1');
    component.existingPhotos.set([
      {
        id: 'image-1',
        storagePath: 'vehicle-1/cover.jpg',
        isCover: true,
        sortOrder: 0,
        signedUrl: 'https://example.com/cover.jpg',
      },
      {
        id: 'image-2',
        storagePath: 'vehicle-1/second.jpg',
        isCover: false,
        sortOrder: 1,
        signedUrl: 'https://example.com/second.jpg',
      },
    ]);
    component.existingPhotoCount.set(2);

    await component.setExistingCover('image-2');
    await component.moveExistingPhoto('image-2', -1);
    await component.removeExistingPhoto(component.existingPhotos()[0]);

    expect(auth.setVehicleCover).toHaveBeenCalledWith('vehicle-1', 'image-2');
    expect(auth.reorderVehicleImages).toHaveBeenCalledWith('vehicle-1', ['image-2', 'image-1']);
    expect(auth.removeVehicleImage).toHaveBeenCalledWith(
      'vehicle-1',
      expect.objectContaining({ id: 'image-2' }),
    );
    expect(component.existingPhotos()).toHaveLength(1);
    expect(component.photoCount()).toBe(1);
  });
});
