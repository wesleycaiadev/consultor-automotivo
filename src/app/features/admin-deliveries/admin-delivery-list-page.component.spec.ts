import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { AdminAuthService } from '../../core/auth/admin-auth.service';
import { AdminDeliveryListPageComponent } from './admin-delivery-list-page.component';

describe('AdminDeliveryListPageComponent', () => {
  const delivery = {
    id: 'delivery-1',
    customer_name: 'Marina Costa',
    vehicle_id: 'vehicle-1',
    vehicle_name: 'BMW X1 sDrive20i',
    city: 'Maceió, AL',
    testimonial: 'Processo claro do começo à entrega.',
    delivery_date: '2026-08-26',
    status: 'published' as const,
  };
  const vehicle = {
    id: 'vehicle-1',
    brand: 'BMW',
    model: 'X1',
    version: 'sDrive20i',
    manufacturing_year: 2024,
    model_year: 2025,
    mileage: 1200,
    price: 285000,
    status: 'published' as const,
    featured: false,
    updated_at: '2026-08-26T12:00:00.000Z',
  };
  const image = {
    id: 'image-1',
    storagePath: 'delivery-1/cover.jpg',
    isCover: true,
    sortOrder: 0,
    signedUrl: 'https://example.com/cover.jpg',
  };

  const setup = async () => {
    const auth = {
      listDeliveries: vi.fn().mockResolvedValue([delivery]),
      listVehicles: vi.fn().mockResolvedValue([vehicle]),
      createDelivery: vi.fn().mockResolvedValue({ ...delivery, id: 'delivery-2' }),
      updateDelivery: vi.fn().mockResolvedValue({ ...delivery, city: 'Recife, PE' }),
      deleteDelivery: vi.fn().mockResolvedValue(undefined),
      listDeliveryImages: vi.fn().mockResolvedValue([image]),
      setDeliveryCover: vi.fn().mockResolvedValue(undefined),
      uploadDeliveryImages: vi.fn().mockResolvedValue([
        image,
        {
          id: 'image-2',
          storagePath: 'delivery-1/second.jpg',
          isCover: false,
          sortOrder: 1,
          signedUrl: 'https://example.com/second.jpg',
        },
      ]),
      reorderDeliveryImages: vi.fn().mockResolvedValue(undefined),
      removeDeliveryImage: vi.fn().mockResolvedValue(undefined),
    };
    await TestBed.configureTestingModule({
      imports: [AdminDeliveryListPageComponent],
      providers: [{ provide: AdminAuthService, useValue: auth }, provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(AdminDeliveryListPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return { auth, fixture };
  };

  afterEach(() => TestBed.resetTestingModule());

  it('loads deliveries and vehicles for the admin view', async () => {
    const { auth, fixture } = await setup();

    expect(auth.listDeliveries).toHaveBeenCalledOnce();
    expect(auth.listVehicles).toHaveBeenCalledOnce();
    expect(fixture.componentInstance.deliveries()).toHaveLength(1);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Marina Costa');
  });

  it('blocks publishing without at least one delivery photo', async () => {
    const { auth, fixture } = await setup();
    const component = fixture.componentInstance;
    component.startCreate();
    component.draft = {
      customer_name: 'João Lima',
      vehicle_id: null,
      vehicle_name: 'Toyota Corolla XEi',
      city: 'Maceió, AL',
      testimonial: 'Compra sem ruído.',
      delivery_date: '2026-08-27',
      status: 'published',
    };

    await component.saveDelivery();

    expect(auth.createDelivery).not.toHaveBeenCalled();
    expect(component.saveError()).toContain('pelo menos uma foto');
  });

  it('creates a delivery with selected media', async () => {
    const { auth, fixture } = await setup();
    const component = fixture.componentInstance;
    component.startCreate();
    component.draft = {
      customer_name: 'João Lima',
      vehicle_id: null,
      vehicle_name: 'Toyota Corolla XEi',
      city: 'Maceió, AL',
      testimonial: 'Compra sem ruído.',
      delivery_date: '2026-08-27',
      status: 'published',
    };
    component.pendingFiles.set([new File(['image'], 'entrega.jpg', { type: 'image/jpeg' })]);

    await component.saveDelivery();

    expect(auth.createDelivery).toHaveBeenCalledWith(
      expect.objectContaining({ customer_name: 'João Lima', status: 'published' }),
      expect.any(Array),
      expect.any(Function),
    );
    expect(component.deliveries()[0].id).toBe('delivery-2');
  });

  it('updates delivery data and only switches cover when it changed', async () => {
    const { auth, fixture } = await setup();
    const component = fixture.componentInstance;
    await component.openEdit(delivery);
    component.draft.city = 'Recife, PE';
    component.images.set([
      image,
      {
        id: 'image-2',
        storagePath: 'delivery-1/second.jpg',
        isCover: false,
        sortOrder: 1,
        signedUrl: 'https://example.com/second.jpg',
      },
    ]);
    component.selectCover('image-2');

    await component.saveDelivery();

    expect(auth.updateDelivery).toHaveBeenCalledWith(
      'delivery-1',
      expect.objectContaining({ city: 'Recife, PE' }),
    );
    expect(auth.setDeliveryCover).toHaveBeenCalledWith('delivery-1', 'image-2');
  });

  it('rejects invalid media before upload', async () => {
    const { auth, fixture } = await setup();
    const component = fixture.componentInstance;
    await component.openEdit(delivery);

    component.selectMedia({
      target: {
        files: [new File(['texto'], 'relato.txt', { type: 'text/plain' })],
        value: 'relato.txt',
      },
    } as unknown as Event);
    await fixture.whenStable();

    expect(auth.uploadDeliveryImages).not.toHaveBeenCalled();
    expect(component.mediaError()).toContain('foram ignoradas');
  });

  it('deletes a delivery from the list', async () => {
    const { auth, fixture } = await setup();
    const component = fixture.componentInstance;

    await component.deleteDelivery(delivery);

    expect(auth.deleteDelivery).toHaveBeenCalledWith('delivery-1');
    expect(component.deliveries()).toHaveLength(0);
  });

  it('keeps the delivery list visible after an action error', async () => {
    const { auth, fixture } = await setup();
    auth.deleteDelivery.mockRejectedValue(new Error('delete failed'));
    const component = fixture.componentInstance;

    await component.deleteDelivery(delivery);
    fixture.detectChanges();

    expect(component.error()).toContain('Não foi possível apagar');
    expect(component.deliveries()).toHaveLength(1);
    expect(fixture.nativeElement.textContent).toContain('Marina Costa');
  });
});
