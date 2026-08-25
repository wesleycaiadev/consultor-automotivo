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
  on-surface-variant: '#444844'
  inverse-surface: '#2f312e'
  inverse-on-surface: '#f2f1ed'
  outline: '#757874'
  outline-variant: '#c5c7c3'
  surface-tint: '#5e5e5d'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1c1b'
  on-primary-container: '#848482'
  inverse-primary: '#c7c6c4'
  secondary: '#9c432d'
  on-secondary: '#ffffff'
  secondary-container: '#ff8f74'
  on-secondary-container: '#762714'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1c1c18'
  on-tertiary-container: '#85847e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e4e2e0'
  primary-fixed-dim: '#c7c6c4'
  on-primary-fixed: '#1b1c1b'
  on-primary-fixed-variant: '#464745'
  secondary-fixed: '#ffdad2'
  secondary-fixed-dim: '#ffb4a3'
  on-secondary-fixed: '#3d0700'
  on-secondary-fixed-variant: '#7d2c19'
  tertiary-fixed: '#e5e2dc'
  tertiary-fixed-dim: '#c9c6c0'
  on-tertiary-fixed: '#1c1c18'
  on-tertiary-fixed-variant: '#474742'
  background: '#faf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e3e2df'
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
  headline-md:
    fontFamily: manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 120%
    letterSpacing: -0.01em
  body-lg:
    fontFamily: manrope
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 160%
  body-md:
    fontFamily: manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 160%
  label-caps:
    fontFamily: geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 100%
    letterSpacing: 0.1em
  ui-mono:
    fontFamily: geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 140%
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-tablet: 32px
  margin-mobile: 20px
  stack-xl: 120px
  stack-lg: 80px
  stack-md: 40px
---

## Brand & Style

This design system is built upon the pillars of Swiss International Style, industrial precision, and high-end automotive curation. It is designed for an audience that values engineering excellence and architectural minimalism. The visual language evokes a sense of "quiet luxury"—sophisticated, authoritative, and meticulously structured.

The style is a fusion of **Swiss Editorial** and **Modern Industrial**. It utilizes a strict underlying grid to manage asymmetric layouts, allowing for large, dramatic typography to coexist with significant whitespace. Visual tension is created through the "MF Frame" concept: a structural motif that uses sharp, diagonal cuts and precise technical borders to frame content like a piece of high-performance machinery.

**Key Visual Principles:**
- **Asymmetric Balance:** Use heavy-weight typography against expansive negative space to create a dynamic, editorial feel.
- **Cinematic Pacing:** Treat imagery as architectural focal points, utilizing desaturated tones and high contrast.
- **Technical Rigor:** Incorporate subtle micro-interactions and "blueprint" details (monospaced labels, hairline dividers) to reinforce the industrial narrative.

## Colors

The color palette is rooted in industrial materials—ink, stone, and metal. The primary surface is **Paper (#F8F7F3)**, providing a sophisticated, tactile warmth compared to pure white. 

**Usage Guidelines:**
- **MF Ink & Graphite:** Reserved for primary typography, structural borders, and deep backgrounds.
- **Warm Silver & Porcelain:** Used for subtle layering, tonal depth, and secondary containers.
- **MF Oxide:** This is a high-contrast accent color representing oxidized metal. It should be used with extreme restraint—only for critical calls to action, active states, or singular editorial highlights.
- **Contrast:** Maintain high legibility by pairing MF Ink typography against Paper or Porcelain surfaces.

## Typography

The typography strategy leverages the elegance of **Instrument Serif** for display moments and the technical precision of **Manrope** and **Geist** for functional UI.

**Editorial Hierarchy:**
- **Display & Headlines:** Use Instrument Serif (Regular/Italic) for large-scale editorial titles. These should often be set with tight letter-spacing to emphasize the serif's sophisticated silhouette.
- **Body Text:** Manrope provides a modern, readable grotesque base. Use generous line heights (1.6x) to ensure an open, premium reading experience.
- **Technical UI:** Geist (monospaced qualities) is used for labels, data points, and navigation. Use `label-caps` for section headers and metadata to evoke industrial labeling.

## Layout & Spacing

This design system employs a **12-column fixed-width grid** for desktop and a fluid grid for mobile. The layout is characterized by "asymmetric tension"—avoiding perfectly centered content in favor of compositions that lead the eye across the frame.

**Structural Rules:**
- **The MF Frame:** Use a 45-degree diagonal cut on the corner of primary image containers or buttons. This "angle of attack" should be consistent (typically top-right or bottom-left).
- **Whitespace:** Use `stack-xl` (120px) between major editorial sections to allow the design to breathe.
- **Alignment:** Align text to the left margin, but allow imagery to bleed off-edge or span specific column counts (e.g., a 7-column image paired with 4-columns of text).
- **Hairlines:** Use 1px borders in Graphite or Warm Silver to separate logical sections without adding visual weight.

## Elevation & Depth

This design system rejects traditional shadows in favor of **Tonal Layering** and **Structural Overlaps**. Depth is communicated through the physical stack of materials rather than light sources.

**Depth Markers:**
- **Level 0 (Base):** Paper (#F8F7F3) surface.
- **Level 1 (Containers):** Porcelain (#F1F0EB) or Warm Silver (#D1D0CB) for cards and nested areas.
- **Level 2 (Inlays):** Graphite (#202220) for high-contrast interactive elements.
- **The Layered Look:** Elements should occasionally overlap (e.g., typography bleeding over the edge of a cinematic image) to create a sense of physical depth. 
- **Shadows:** If absolutely required for clarity, use extremely subtle, "sharp" shadows with 0 blur, mimicking a technical drawing's offset.

## Shapes

The shape language is strictly **Sharp (0px)**. To reflect industrial design and architectural precision, all corners are right angles. 

**Structural Modification:**
The only departure from 90-degree angles is the **MF Frame Cut**. This is a functional notch or diagonal chamfer applied to primary UI elements (buttons, image frames, and active tabs). This cut should be precisely 16px or 24px deep at a 45-degree angle, reinforcing the "machined" aesthetic.

## Components

**Buttons:**
- **Primary:** Solid MF Ink background, sharp corners, Geist UI-Mono text in Paper. Features a single 45-degree diagonal cut on the top-right corner.
- **Secondary:** 1px Graphite border, no fill, sharp corners.
- **Ghost:** Minimal text with a 1px MF Oxide underline on hover.

**Cards:**
- Images should be treated with a subtle grain and desaturated "cinematic" filter.
- Card containers use the Porcelain background with 1px Warm Silver borders. No rounded corners.
- Use Geist for small technical labels (e.g., "01 / SPECIFICATIONS") at the top of the card.

**Input Fields:**
- Underline-only style using a 1px Graphite border. 
- Labels should be Geist `label-caps` positioned above the input.
- Focus state: The underline shifts to MF Oxide.

**Lists:**
- Use hairline dividers (Warm Silver). 
- List items should have generous vertical padding (24px) to maintain the editorial feel.
- Bullet points are replaced by small, sharp squares (2x2px) in MF Oxide.

**Chips/Tags:**
- Rectangular, MF Ink or Graphite backgrounds. 
- Typography is Geist Mono, size 12px, all-caps.