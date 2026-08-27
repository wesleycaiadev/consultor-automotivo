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
});
