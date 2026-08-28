import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { type Vehicle } from '../../shared/models/vehicle.model';

export const PUBLIC_SITE_URL = 'https://marquesfelipe.com.br';
export const DEFAULT_OG_IMAGE = `${PUBLIC_SITE_URL}/images/felipe-hero.jpeg`;

export interface SeoData {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly image?: string;
  readonly noindex?: boolean;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  readonly #title = inject(Title);
  readonly #meta = inject(Meta);
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);
  readonly #document = inject(DOCUMENT);
  #jsonLdElement: HTMLScriptElement | null = null;

  init(): void {
    this.#router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.applyRouteMetadata());
    this.applyRouteMetadata();
  }

  setPage(data: SeoData, structuredData: Record<string, unknown> | null = null): void {
    const canonicalUrl = this.absoluteUrl(data.path);
    const imageUrl = this.absoluteUrl(data.image ?? DEFAULT_OG_IMAGE);

    this.#title.setTitle(data.title);
    this.#meta.updateTag({ name: 'description', content: data.description });
    this.#meta.updateTag({
      name: 'robots',
      content: data.noindex ? 'noindex,nofollow' : 'index,follow',
    });
    this.#meta.updateTag({ property: 'og:title', content: data.title });
    this.#meta.updateTag({ property: 'og:description', content: data.description });
    this.#meta.updateTag({ property: 'og:type', content: 'website' });
    this.#meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.#meta.updateTag({ property: 'og:image', content: imageUrl });
    this.#meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.#meta.updateTag({ name: 'twitter:title', content: data.title });
    this.#meta.updateTag({ name: 'twitter:description', content: data.description });
    this.#meta.updateTag({ name: 'twitter:image', content: imageUrl });
    this.setCanonical(canonicalUrl);
    this.setStructuredData(structuredData);
  }

  setVehicle(vehicle: Vehicle, imageUrl: string): void {
    const name = `${vehicle.brand} ${vehicle.model} ${vehicle.version}`;
    const year = `${vehicle.manufacturingYear}/${vehicle.modelYear}`;
    const price =
      vehicle.price === null
        ? 'preço sob consulta'
        : new Intl.NumberFormat('pt-BR', {
            currency: 'BRL',
            maximumFractionDigits: 0,
            style: 'currency',
          }).format(vehicle.price);

    this.setPage(
      {
        title: `${name} ${vehicle.modelYear} — Marques Felipe`,
        description: `${name}, ano ${year}, ${vehicle.mileage.toLocaleString('pt-BR')} km, ${vehicle.transmission}, ${vehicle.fuel}, ${price}.`,
        path: `/showroom/${vehicle.slug}`,
        image: imageUrl,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Vehicle',
        name,
        brand: vehicle.brand,
        model: vehicle.model,
        vehicleModelDate: String(vehicle.modelYear),
        mileageFromOdometer: {
          '@type': 'QuantitativeValue',
          unitCode: 'KMT',
          value: vehicle.mileage,
        },
        url: this.absoluteUrl(`/showroom/${vehicle.slug}`),
      },
    );
  }

  private applyRouteMetadata(): void {
    const routeSeo = this.collectSeoData(this.#route);
    if (!routeSeo) return;
    this.setPage(routeSeo, routeSeo.noindex ? null : this.structuredDataFor(routeSeo.path));
  }

  private collectSeoData(route: ActivatedRoute): SeoData | null {
    let current: ActivatedRoute | null = route;
    let seo: Partial<SeoData> = {};
    while (current) {
      seo = { ...seo, ...(current.snapshot.data['seo'] as Partial<SeoData> | undefined) };
      current = current.firstChild;
    }
    return seo.title && seo.description && seo.path ? (seo as SeoData) : null;
  }

  private structuredDataFor(path: string): Record<string, unknown> | null {
    if (path !== '/') return null;
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          name: 'Marques Felipe Curadoria Automotiva',
          url: PUBLIC_SITE_URL,
          logo: DEFAULT_OG_IMAGE,
          sameAs: ['https://www.instagram.com/'],
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            telephone: '+557998709362',
            areaServed: 'BR',
            availableLanguage: 'Portuguese',
          },
        },
        {
          '@type': 'WebSite',
          name: 'Marques Felipe Curadoria Automotiva',
          url: PUBLIC_SITE_URL,
          inLanguage: 'pt-BR',
        },
      ],
    };
  }

  private setCanonical(url: string): void {
    let link = this.#document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!link) {
      link = this.#document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.#document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setStructuredData(data: Record<string, unknown> | null): void {
    this.#jsonLdElement?.remove();
    this.#jsonLdElement = null;
    if (!data) return;

    const script = this.#document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    this.#document.head.appendChild(script);
    this.#jsonLdElement = script;
  }

  private absoluteUrl(pathOrUrl: string): string {
    if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
    const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
    return `${PUBLIC_SITE_URL}${path}`;
  }
}
