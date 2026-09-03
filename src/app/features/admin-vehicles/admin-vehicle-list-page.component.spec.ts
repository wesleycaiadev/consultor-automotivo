import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { AdminAuthService } from '../../core/auth/admin-auth.service';
import { AdminVehicleListPageComponent } from './admin-vehicle-list-page.component';

describe('AdminVehicleListPageComponent', () => {
  const vehicle = {
    id: 'vehicle-1',
    brand: 'Fiat',
    model: 'Siena EL',
    version: '1.4 Flex',
    manufacturing_year: 2010,
    model_year: 2010,
    mileage: 120000,
    price: 26000,
    status: 'published' as const,
    featured: false,
    updated_at: '2026-08-26T12:00:00.000Z',
  };
  const setup = async () => {
    const auth = {
      listVehicles: vi.fn().mockResolvedValue([vehicle]),
      listVehicleImages: vi.fn().mockResolvedValue([
        {
          id: 'image-1',
          storagePath: 'vehicle-1/cover.jpg',
          isCover: true,
          sortOrder: 0,
          signedUrl: 'https://example.com/cover.jpg',
        },
      ]),
      updateVehicleQuick: vi.fn().mockResolvedValue({ ...vehicle, price: 27500 }),
      setVehicleCover: vi.fn().mockResolvedValue(undefined),
      uploadVehicleImages: vi.fn().mockResolvedValue([
        {
          id: 'image-1',
          storagePath: 'vehicle-1/cover.jpg',
          isCover: true,
          sortOrder: 0,
          signedUrl: 'https://example.com/cover.jpg',
        },
        {
          id: 'image-2',
          storagePath: 'vehicle-1/new.jpg',
          isCover: false,
          sortOrder: 1,
          signedUrl: 'https://example.com/new.jpg',
        },
      ]),
      reorderVehicleImages: vi.fn().mockResolvedValue(undefined),
      removeVehicleImage: vi.fn().mockResolvedValue(undefined),
    };
    await TestBed.configureTestingModule({
      imports: [AdminVehicleListPageComponent],
      providers: [{ provide: AdminAuthService, useValue: auth }, provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(AdminVehicleListPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return { auth, fixture };
  };

  afterEach(() => TestBed.resetTestingModule());

  it('edits frequent vehicle fields without reopening the full editor', async () => {
    const { auth, fixture } = await setup();
    const component = fixture.componentInstance;
    await component.openQuickEdit(vehicle);
    component.quickDraft.price = 27500;
    component.quickDraft.mileage = 121000;
    component.setStatus('sold');
    await component.saveQuickEdit();

    expect(auth.updateVehicleQuick).toHaveBeenCalledWith('vehicle-1', {
      mileage: 121000,
      price: 27500,
      status: 'sold',
      featured: false,
    });
  });

  it('links each vehicle to the complete editor', async () => {
    const { fixture } = await setup();

    expect(
      fixture.nativeElement.querySelectorAll('.quick-edit-trigger')[0]?.getAttribute('href'),
    ).toBe('/admin/veiculos/vehicle-1/editar');
  });

  it('switches the cover only when another existing image is selected', async () => {
    const { auth, fixture } = await setup();
    auth.listVehicleImages.mockResolvedValue([
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
    const component = fixture.componentInstance;
    await component.openQuickEdit(vehicle);
    component.selectCover('image-2');
    await component.saveQuickEdit();

    expect(auth.setVehicleCover).toHaveBeenCalledWith('vehicle-1', 'image-2');
  });

  it('rejects unsupported and oversized media before upload', async () => {
    const { auth, fixture } = await setup();
    const component = fixture.componentInstance;
    await component.openQuickEdit(vehicle);

    await component.uploadMedia([new File(['texto'], 'contrato.txt', { type: 'text/plain' })]);
    expect(auth.uploadVehicleImages).not.toHaveBeenCalled();
    expect(component.mediaError()).toContain('foram ignoradas');

    const largePhoto = new File([new Uint8Array(10 * 1024 * 1024 + 1)], 'grande.jpg', {
      type: 'image/jpeg',
    });
    await component.uploadMedia([largePhoto]);
    expect(auth.uploadVehicleImages).not.toHaveBeenCalled();
    expect(component.mediaError()).toContain('foram ignoradas');
  });

  it('uploads valid media and exposes progress', async () => {
    const { auth, fixture } = await setup();
    const component = fixture.componentInstance;
    await component.openQuickEdit(vehicle);

    await component.uploadMedia([new File(['image'], 'nova.jpg', { type: 'image/jpeg' })]);

    expect(auth.uploadVehicleImages).toHaveBeenCalledWith(
      'vehicle-1',
      'Fiat',
      'Siena EL',
      expect.any(Array),
      expect.any(Function),
    );
    expect(component.images()).toHaveLength(2);
    expect(component.selectedCoverId()).toBe('image-1');
  });

  it('reorders media without losing cover state', async () => {
    const { auth, fixture } = await setup();
    auth.listVehicleImages.mockResolvedValue([
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
    const component = fixture.componentInstance;
    await component.openQuickEdit(vehicle);

    await component.moveImage('image-2', -1);

    expect(auth.reorderVehicleImages).toHaveBeenCalledWith('vehicle-1', ['image-2', 'image-1']);
    expect(component.images().map((image) => image.id)).toEqual(['image-2', 'image-1']);
    expect(component.images().find((image) => image.id === 'image-1')?.isCover).toBe(true);
  });

  it('removes the cover and promotes the next image locally', async () => {
    const { auth, fixture } = await setup();
    auth.listVehicleImages.mockResolvedValue([
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
    const component = fixture.componentInstance;
    await component.openQuickEdit(vehicle);

    await component.removeMedia(component.images()[0]);

    expect(auth.removeVehicleImage).toHaveBeenCalledWith(
      'vehicle-1',
      expect.objectContaining({ id: 'image-1' }),
    );
    expect(component.selectedCoverId()).toBe('image-2');
    expect(component.images()[0]).toMatchObject({ id: 'image-2', isCover: true, sortOrder: 0 });
  });
});
