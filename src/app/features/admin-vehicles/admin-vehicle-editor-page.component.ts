import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  AdminAuthService,
  type CatalogBrand,
  type CatalogFipeYear,
  type CatalogModel,
  type VehicleDraft,
} from '../../core/auth/admin-auth.service';

interface SelectedPhoto {
  readonly id: string;
  readonly file: File;
  readonly previewUrl: string | null;
}

@Component({
  selector: 'app-admin-vehicle-editor-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './admin-vehicle-editor-page.component.html',
  styleUrls: [
    './admin-vehicle-editor-page.component.scss',
    './admin-vehicle-editor-media.component.scss',
    './admin-vehicle-editor-picker.component.scss',
    './admin-vehicle-editor-publication.component.scss',
  ],
})
export class AdminVehicleEditorPageComponent implements OnInit, OnDestroy {
  readonly auth = inject(AdminAuthService);
  readonly router = inject(Router);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);
  readonly catalogError = signal<string | null>(null);
  readonly brands = signal<readonly CatalogBrand[]>([]);
  readonly models = signal<readonly CatalogModel[]>([]);
  readonly fipeYears = signal<readonly CatalogFipeYear[]>([]);
  readonly brandQuery = signal('');
  readonly modelQuery = signal('');
  readonly brandOpen = signal(false);
  readonly modelOpen = signal(false);
  readonly loadingBrands = signal(true);
  readonly loadingModels = signal(false);
  readonly loadingFipeYears = signal(false);
  readonly loadingFipeReference = signal(false);
  readonly fipeError = signal<string | null>(null);
  readonly selectedFipeYearCode = signal<string | null>(null);
  readonly manualFipeEntry = signal(false);
  readonly selectedPhotos = signal<readonly SelectedPhoto[]>([]);
  readonly photoError = signal<string | null>(null);
  readonly uploadedPhotos = signal(0);
  readonly customEquipment = signal('');
  readonly years = Array.from({ length: 81 }, (_, index) => new Date().getFullYear() + 1 - index);
  readonly equipmentOptions = [
    'Ar-condicionado',
    'Direção assistida',
    'Vidros elétricos',
    'Travas elétricas',
    'Central multimídia',
    'Câmera de ré',
    'Sensor de estacionamento',
    'Bancos em couro',
    'Piloto automático',
    'Controle de estabilidade',
    'Airbags',
    'Teto solar',
  ] as const;

  readonly filteredBrands = computed(() => {
    const query = this.normalize(this.brandQuery());
    return this.filterAndRank(this.brands(), query);
  });
  readonly filteredModels = computed(() => {
    const query = this.normalize(this.modelQuery());
    return this.filterAndRank(this.models(), query);
  });
  readonly photoCount = computed(() => this.selectedPhotos().length);
  private readonly selectedBrandFipeCode = signal<string | null>(null);
  private readonly selectedModelFipeCode = signal<string | null>(null);

  draft: VehicleDraft = {
    slug: '',
    brand: '',
    model: '',
    version: '',
    manufacturing_year: new Date().getFullYear(),
    model_year: new Date().getFullYear(),
    mileage: 0,
    price: null,
    transmission: 'Automático',
    fuel: 'Gasolina',
    steering: 'Elétrica',
    color: '',
    location: 'Aracaju — SE',
    description: '',
    equipment: [],
    status: 'draft',
    featured: false,
    fipe_code: null,
    fipe_price: null,
    fipe_reference_month: null,
    fipe_last_sync: null,
  };

  async ngOnInit(): Promise<void> {
    try {
      this.brands.set(await this.auth.listCatalogBrands());
    } catch {
      this.catalogError.set(
        'O catálogo não pôde ser carregado. Atualize a página e tente novamente.',
      );
    } finally {
      this.loadingBrands.set(false);
    }
  }

  ngOnDestroy(): void {
    this.selectedPhotos().forEach((photo) => this.revokePreview(photo.previewUrl));
  }

  onBrandInput(value: string): void {
    this.brandQuery.set(value);
    if (value !== this.draft.brand) {
      this.draft.brand = '';
      this.draft.model = '';
      this.draft.version = '';
      this.modelQuery.set('');
      this.models.set([]);
      this.resetFipeReference();
    }
  }

  async selectBrand(brand: CatalogBrand): Promise<void> {
    this.draft.brand = brand.name;
    this.brandQuery.set(brand.name);
    this.brandOpen.set(false);
    this.draft.model = '';
    this.draft.version = '';
    this.modelQuery.set('');
    this.models.set([]);
    this.selectedBrandFipeCode.set(brand.fipeCode);
    this.resetFipeReference();
    this.loadingModels.set(true);
    this.catalogError.set(null);
    try {
      this.models.set(await this.auth.listCatalogModels(brand.id));
      this.modelOpen.set(true);
      this.focusPickerSearch('model-search');
    } catch {
      this.catalogError.set('Não foi possível carregar os modelos desta marca. Tente novamente.');
    } finally {
      this.loadingModels.set(false);
    }
  }

  selectFirstBrand(event: Event): void {
    event.preventDefault();
    const brand = this.filteredBrands()[0];
    if (brand) void this.selectBrand(brand);
  }

  openBrandPicker(): void {
    this.brandOpen.set(true);
    this.focusPickerSearch('brand-search');
  }

  onModelInput(value: string): void {
    this.modelQuery.set(value);
    if (value !== this.draft.model) this.draft.model = '';
  }

  async selectModel(model: CatalogModel): Promise<void> {
    this.resetFipeReference();
    this.draft.model = model.name;
    this.draft.version = model.name;
    this.modelQuery.set(model.name);
    this.modelOpen.set(false);
    this.selectedModelFipeCode.set(model.fipeModelCode);
    await this.loadFipeYears();
  }

  selectFirstModel(event: Event): void {
    event.preventDefault();
    const model = this.filteredModels()[0];
    if (model) void this.selectModel(model);
  }

  openModelPicker(): void {
    if (!this.draft.brand || this.loadingModels()) return;
    this.modelOpen.set(true);
    this.focusPickerSearch('model-search');
  }

  setModelYear(value: number): void {
    this.draft.model_year = Number(value);
    this.selectMatchingFipeYear();
  }

  setFuel(value: string): void {
    this.draft.fuel = value;
    this.selectMatchingFipeYear();
  }

  async selectFipeYear(yearCode: string): Promise<void> {
    const brandCode = this.selectedBrandFipeCode();
    const modelCode = this.selectedModelFipeCode();
    if (!brandCode || !modelCode || !yearCode) return;

    this.selectedFipeYearCode.set(yearCode);
    this.loadingFipeReference.set(true);
    this.fipeError.set(null);
    try {
      const reference = await this.auth.getFipeReference(brandCode, modelCode, yearCode);
      if (this.selectedFipeYearCode() !== yearCode) return;
      this.draft.fipe_code = reference.code;
      this.draft.fipe_price = reference.price;
      this.draft.fipe_reference_month = reference.referenceMonth;
      this.draft.fipe_last_sync = new Date().toISOString();
      this.draft.fuel = reference.fuel || this.draft.fuel;
      this.draft.model_year = reference.modelYear || this.draft.model_year;
      this.manualFipeEntry.set(false);
    } catch {
      this.fipeError.set(
        'A referência FIPE não está disponível agora. Você ainda pode salvar o anúncio ou preencher os dados manualmente.',
      );
    } finally {
      if (this.selectedFipeYearCode() === yearCode) this.loadingFipeReference.set(false);
    }
  }

  enableManualFipeEntry(): void {
    this.manualFipeEntry.set(true);
    this.fipeError.set(null);
  }

  selectPhotos(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.addPhotos(input.files ? Array.from(input.files) : []);
    input.value = '';
  }

  dropPhotos(event: DragEvent): void {
    event.preventDefault();
    this.addPhotos(event.dataTransfer?.files ? Array.from(event.dataTransfer.files) : []);
  }

  addPhotos(files: readonly File[]): void {
    this.photoError.set(null);
    const validTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
    const validFiles = files.filter(
      (file) => validTypes.has(file.type) && file.size <= 10 * 1024 * 1024,
    );
    if (validFiles.length !== files.length) {
      this.photoError.set('Algumas fotos foram ignoradas. Use JPEG, PNG ou WebP com até 10 MB.');
    }
    const available = 15 - this.photoCount();
    if (validFiles.length > available) {
      this.photoError.set('O limite é de 15 fotos. As imagens excedentes não foram adicionadas.');
    }
    const additions = validFiles.slice(0, available).map((file, index) => ({
      id: `${file.name}-${file.lastModified}-${this.photoCount() + index}`,
      file,
      previewUrl: this.createPreview(file),
    }));
    this.selectedPhotos.update((current) => [...current, ...additions]);
  }

  removePhoto(id: string): void {
    const photo = this.selectedPhotos().find((item) => item.id === id);
    this.revokePreview(photo?.previewUrl ?? null);
    this.selectedPhotos.update((current) => current.filter((item) => item.id !== id));
  }

  toggleEquipment(item: string): void {
    this.draft.equipment = this.draft.equipment.includes(item)
      ? this.draft.equipment.filter((current) => current !== item)
      : [...this.draft.equipment, item];
  }

  addCustomEquipment(): void {
    const item = this.customEquipment().trim();
    if (!item || this.draft.equipment.includes(item)) return;
    this.draft.equipment = [...this.draft.equipment, item];
    this.customEquipment.set('');
  }

  setPublication(status: 'draft' | 'published'): void {
    this.draft.status = status;
    if (status === 'draft') this.draft.featured = false;
  }

  async save(): Promise<void> {
    const missing = this.saveReadiness();
    if (missing.length) {
      this.error.set(`Antes de salvar, preencha: ${missing.join(', ')}.`);
      return;
    }
    this.saving.set(true);
    this.error.set(null);
    this.uploadedPhotos.set(0);
    try {
      this.draft.slug = `${this.draft.brand}-${this.draft.model}-${this.draft.model_year}`
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      await this.auth.createVehicle(
        this.draft,
        this.selectedPhotos().map((photo) => photo.file),
        (completed) => this.uploadedPhotos.set(completed),
      );
      await this.router.navigateByUrl('/admin/veiculos');
    } catch (saveError) {
      console.error('Falha ao cadastrar veículo:', saveError);
      this.error.set(this.saveErrorMessage(saveError));
    } finally {
      this.saving.set(false);
    }
  }

  private normalize(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  private filterAndRank<T extends { readonly name: string }>(
    entries: readonly T[],
    normalizedQuery: string,
  ): readonly T[] {
    if (!normalizedQuery) return entries;
    return entries
      .filter((entry) => this.normalize(entry.name).includes(normalizedQuery))
      .slice()
      .sort(
        (first, second) =>
          this.matchRank(first.name, normalizedQuery) -
          this.matchRank(second.name, normalizedQuery),
      );
  }

  private matchRank(value: string, query: string): number {
    const normalizedValue = this.normalize(value);
    if (normalizedValue === query) return 0;
    if (normalizedValue.startsWith(query)) return 1;
    if (normalizedValue.includes(` ${query}`)) return 2;
    return 3;
  }

  private async loadFipeYears(): Promise<void> {
    const brandCode = this.selectedBrandFipeCode();
    const modelCode = this.selectedModelFipeCode();
    if (!brandCode || !modelCode) return;

    this.loadingFipeYears.set(true);
    this.fipeError.set(null);
    try {
      this.fipeYears.set(await this.auth.listFipeYears(brandCode, modelCode));
      this.selectMatchingFipeYear();
    } catch {
      this.fipeError.set(
        'Não foi possível carregar as referências FIPE deste modelo. O cadastro segue disponível.',
      );
    } finally {
      this.loadingFipeYears.set(false);
    }
  }

  private selectMatchingFipeYear(): void {
    const current = this.fipeYears().find(
      (year) =>
        year.modelYear === this.draft.model_year &&
        this.normalize(year.name).includes(this.normalize(this.draft.fuel)),
    );
    const sameYear = this.fipeYears().find((year) => year.modelYear === this.draft.model_year);
    const match = current ?? sameYear;
    if (match && this.selectedFipeYearCode() !== match.code) void this.selectFipeYear(match.code);
  }

  private resetFipeReference(): void {
    this.fipeYears.set([]);
    this.selectedFipeYearCode.set(null);
    this.selectedModelFipeCode.set(null);
    this.draft.fipe_code = null;
    this.draft.fipe_price = null;
    this.draft.fipe_reference_month = null;
    this.draft.fipe_last_sync = null;
    this.fipeError.set(null);
    this.manualFipeEntry.set(false);
  }

  saveReadiness(): string[] {
    const missing: string[] = [];
    if (!this.draft.brand) missing.push('marca');
    if (!this.draft.model) missing.push('modelo / versão');
    if (!this.draft.color.trim()) missing.push('cor');
    if (!this.draft.location.trim()) missing.push('localização');
    if (!this.draft.description.trim()) missing.push('descrição');
    return missing;
  }

  private createPreview(file: File): string | null {
    return typeof URL.createObjectURL === 'function' ? URL.createObjectURL(file) : null;
  }

  private revokePreview(url: string | null): void {
    if (url && typeof URL.revokeObjectURL === 'function') URL.revokeObjectURL(url);
  }

  private focusPickerSearch(id: string): void {
    window.setTimeout(() => document.getElementById(id)?.focus());
  }

  private saveErrorMessage(error: unknown): string {
    const message = error instanceof Error ? error.message : '';
    if (message.includes('vehicles_description_check')) {
      return 'Adicione uma descrição do veículo antes de salvar.';
    }
    if (message.includes('vehicles_version_check')) {
      return 'Escolha um modelo/versão na lista antes de salvar.';
    }
    if (message.includes('duplicate key')) {
      return 'Já existe um veículo com esta identificação. Altere o ano ou revise os dados.';
    }
    return 'Não foi possível salvar. Seus dados foram preservados; tente novamente.';
  }
}
