import { describe, expect, it } from 'vitest';
import { MockVehicleRepository } from './vehicle-repository.service';

describe('MockVehicleRepository', () => {
  it('returns only published vehicles and does not expose drafts by slug', async () => {
    const repository = new MockVehicleRepository();

    const vehicles = await repository.listPublished();

    expect(vehicles).toHaveLength(2);
    expect(vehicles.every((vehicle) => vehicle.status === 'published')).toBe(true);
    await expect(
      repository.findPublishedBySlug('bmw-m3-competition-2023'),
    ).resolves.toBeUndefined();
  });
});
