---
name: Modern Industrial Editorial
colors:
  surface: '#faf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#faf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f0'
  surface-container: '#efeeea'
  surface-container-high: '#e9e8e4'
  surface-container-highest: '#e3e2df'
  on-surface: '#1b1c1a'
  on-surface-variant: '#454743'
  inverse-surface: '#2f312e'
  inverse-on-surface: '#f2f1ed'
  outline: '#767872'
  outline-variant: '#c6c7c1'
  surface-tint: '#5e5e5c'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1c1a'
  on-primary-container: '#848481'
  inverse-primary: '#c7c6c3'
  secondary: '#9c432d'
  on-secondary: '#ffffff'
  secondary-container: '#ff8f74'
  on-secondary-container: '#762714'
  tertiary: '#010000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1e1b1b'
  on-tertiary-container: '#888382'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e4e2df'
  primary-fixed-dim: '#c7c6c3'
  on-primary-fixed: '#1b1c1a'
  on-primary-fixed-variant: '#464744'
  secondary-fixed: '#ffdad2'
  secondary-fixed-dim: '#ffb4a3'
  on-secondary-fixed: '#3d0700'
  on-secondary-fixed-variant: '#7d2c19'
  tertiary-fixed: '#e8e1e0'
  tertiary-fixed-dim: '#ccc5c4'
  on-tertiary-fixed: '#1e1b1b'
  on-tertiary-fixed-variant: '#4a4646'
  background: '#faf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e3e2df'
  paper: '#F8F7F3'
  oxide: '#A34832'
  ink: '#1B1C1A'
  graphite: '#444844'
  silver: '#C5C7C3'
typography:
  display-xl:
    fontFamily: Instrument Serif
    fontSize: 96px
    fontWeight: '400'
    lineHeight: 100%
    letterSpacing: -0.04em
  display-xl-mobile:
    fontFamily: Instrument Serif
    fontSize: 56px
    fontWeight: '400'
    lineHeight: 100%
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Instrument Serif
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 110%
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Instrument Serif
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 110%
  body-lg:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 160%
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 160%
  label-caps:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 100%
    letterSpacing: 0.1em
  ui-mono:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 140%
spacing:
  unit: 8px
  margin-desktop: 64px
  margin-mobile: 24px
  gutter: 24px
  stack-xl: 120px
  stack-lg: 80px
  section-gap: 160px
---

## Brand & Style

This design system is a study in architectural precision and automotive curation. It is built for a demographic that appreciates engineering excellence, high-performance machinery, and the "quiet luxury" of Swiss International Style. The aesthetic is raw yet refined, utilizing a strict industrial narrative to frame luxury content.

The primary visual signature is the **MF Frame**: a disciplined 45-degree architectural cut (chamfer) applied to the corners of interactive elements and image containers. This motif represents a "machined" edge, moving away from decorative softness toward structural integrity.

**Visual Pillars:**
- **Industrial Tension:** High-contrast pairings of deep inks against tactile paper surfaces.
- **Architectural Grid:** Asymmetric layouts that leverage negative space as a functional element.
- **Precision Detailing:** The use of technical hairlines and monospaced metadata to evoke blueprints and spec sheets.
- **Portuguese Tonality:** All primary navigational elements follow strict Portuguese nomenclature: *Início, Curadoria, Entregas, Sobre, Fale com Felipe*, with the exception of *'Showroom'*.

## Colors

The palette is rooted in raw industrial materials. The primary surface is **Paper (#F8F7F3)**, providing a warmer, more tactile editorial base than pure white.

**Hierarchy & Usage:**
- **Paper (Surface):** The foundation for all layouts. It should dominate the visual field to create "breathing room."
- **Ink (Text/Structure):** Used for primary typography, 1px hairlines, and solid structural blocks.
- **Oxide (Accent):** A color of "editorial tension." Use this sparingly—only for active links, cursor dots, section markers, or critical calls to action. It represents the singular point of focus.
- **Silver/Graphite:** Used for secondary metadata and subtle technical dividers.

## Typography

The typographic strategy balances elegance with technical utility. 

- **Display (Instrument Serif):** Reserved for high-tension editorial moments. It should be typeset with tight tracking to emphasize its sophisticated silhouette. Use it for "Início" headers and large curated titles.
- **Body (Manrope):** The workhorse for narrative text. Ensure generous line heights to maintain the premium feel.
- **Technical/Metadata (Geist):** Used for all UI labels, technical specifications, and navigational links (e.g., *Showroom*, *Entregas*). This monospaced-leaning font reinforces the "Industrial" side of the narrative.

## Layout & Spacing

The layout follows an **Asymmetric Editorial Grid**. This is not a centered system; it relies on 12-column alignment where content is often weighted to one side to create dynamic visual paths.

- **The Grid:** 12 columns on desktop with 24px gutters. Content should "snap" to these columns, but imagery is encouraged to bleed off-edge or span irregular column counts (e.g., 7 columns wide).
- **Rhythm:** Use `stack-xl` (120px) to separate distinct projects or Curadoria entries.
- **Reflow:** On mobile, margins reduce to 24px and the grid becomes a single fluid column, maintaining vertical "Oxide" section markers to guide the eye.

## Elevation & Depth

This design system rejects shadows and blurs. Depth is achieved through **Material Stacking** and **Architectural Layering**.

- **Zero Shadows:** Use 1px hairlines and tonal shifts (Paper to Silver) to define boundaries.
- **Tonal Tiers:** Surface depth is communicated by placing Ink elements directly onto Paper. 
- **Overlaps:** To create a sense of physical space, typography (Instrument Serif) may occasionally overlap the edge of a cinematic image container.
- **The Cursor:** A small, precise **MF Oxide** dot acts as the primary interactive indicator, cutting through the neutral palette.

## Shapes

The shape language is **Sharp (0px)**. Every element—from buttons to image containers—must maintain a strict 90-degree corner profile to reflect industrial precision.

**The MF Frame Cut:**
The only exception to the 90-degree rule is the 45-degree architectural chamfer. This cut should be applied with discipline:
- **Buttons:** Top-right corner cut.
- **Images:** Bottom-left or top-right corner cut (consistent within a single section).
- **Active States:** Navigational highlights (Showroom, Curadoria) utilize the cut to indicate focus.

## Components

**The MF Monogram:**
The refined monogram must be used as a structural anchor. It serves as the favicon (16px), the mobile menu trigger, and a large-scale hero watermark in the corner of sections.

**Buttons:**
- **Primary:** Solid Ink background with the MF Frame (45-degree cut) on the top-right. Text is Geist UI-Mono in Paper.
- **Editorial Link:** Text-only in Ink with an Oxide dot prefix. Hover state triggers a 1px Oxide underline.

**Curadoria Cards:**
- Sharp-edged image containers with a technical hairline border.
- Metadata (Price, Reference, Year) set in Geist `ui-mono` at the bottom of the card.
- Images should feature high-contrast, architectural photography.

**Inputs & Forms (Fale com Felipe):**
- Minimalist underline style (1px Ink).
- Labels in Geist `label-caps`. 
- Active state: The underline transforms into Oxide.

**Navigation:**
- Horizontal header using Geist. Active page indicated by a small Oxide dot or a chamfered background block.
- Labels: *Início, Curadoria, Showroom, Entregas, Sobre, Fale com Felipe*.