# LEAN SYSTEM — Complete Brand Identity & Design System Audit

**Official Brand Name:** Lean System (stylized as **LEAN** in wordmark and standalone brand styling)  
**Canonical Domain:** `https://www.leansystem.co/`  
**Primary Market:** Hyderabad, Telangana, India (`areaServed`: India)  
**Industry Positioning:** Real Estate Lead Generation, Conversion Landing Pages & CRM Tracking Pipelines  
**Tech & Styling Stack:** React 19 + TypeScript + Vite 6 + Tailwind CSS v4 (`@tailwindcss/vite` `^4.1.14`) + Motion (`motion/react` `^12.23.24`) + Three.js (`^0.184.0`)

> **Audit Basis:** Every specification, HEX code, CSS variable, typographic scale, asset dimension, shadow, gradient, and animation parameter in this document is extracted directly from the live project source code without modification or guesswork.

---

## 1. Brand Colour Palette

### 1.1 Core Brand Theme Tokens (`src/index.css` `@theme`)

Defined in `src/index.css` (lines 14–18) and exposed as Tailwind v4 utilities (`bg-brand-*`, `text-brand-*`, `border-brand-*`):

| Token Name | CSS Variable | HEX | RGB | Primary Usage in Source Code |
| :--- | :--- | :--- | :--- | :--- |
| **Brand Dark** | `--color-brand-dark` | `#0F0F11` | `rgb(15, 15, 17)` | Global body text (`body`), primary heading text (`text-brand-dark`), global footer background (`Footer.tsx`), closing dark CTA banners (`AboutPremium.tsx`, `ServicesPremium.tsx`), private digital card page background (`HelloPrivateCard.tsx`), non-featured plan CTA buttons. |
| **Brand Navy** | `--color-brand-navy` | `#151B26` | `rgb(21, 27, 38)` | Secondary dark slate-navy for interactive FAQ question titles (`App.tsx`) and contact option card headings (`LeadPortal.tsx`). |
| **Brand Orange** | `--color-brand-orange` | `#FF7A1A` | `rgb(255, 122, 26)` | Official `@theme` accent orange. Used for header/hero primary CTA buttons, active navigation links & indicator bar (`Header.tsx`), hero typewriter phrase & blinking caret (`MinimalHero.tsx`), input focus borders (`focus:border-brand-orange`), FAQ/Contact section eyebrows, text selection (`selection:bg-brand-orange`), and ambient hero light ribbons. |
| **Brand Light** | `--color-brand-light` | `#F8F9FA` | `rgb(248, 249, 250)` | Primary off-white architectural surface background across `ServicesBento.tsx`, `AboutPremium.tsx`, `ServicesPremium.tsx`, `BlogPremium.tsx`, `ContactPremium.tsx`, `LeadPortal.tsx` form container, and `404` view. |
| **Brand Gray** | `--color-brand-gray` | `#8A94A6` | `rgb(138, 148, 166)` | Muted cool slate gray used for supporting subcopy in the homepage FAQ header, FAQ answer text (`App.tsx`), and `LeadPortal.tsx` section subtitle. |

---

### 1.2 Direct Component Accent & Surface HEX Values

In addition to `@theme` tokens, components explicitly apply arbitrary HEX values for high-contrast orange highlights, hero surfaces, and Three.js WebGL materials:

| Colour Role | HEX | RGB | Source Files & Usage |
| :--- | :--- | :--- | :--- |
| **Solar Orange (Component Accent)** | `#FF6B00` | `rgb(255, 107, 0)` | Arbitrary Tailwind utility (`text-[#FF6B00]`, `bg-[#FF6B00]`, `border-[#FF6B00]`) and Three.js hex (`0xff6b00`). Used for metric counters & icons (`MetricsGlass.tsx`), Bento card icons/badges/charts (`ServicesBento.tsx`), timeline active phase badge & icons (`HowItWorksTimeline.tsx`), section eyebrows, pricing Growth CTA, blog executive brief border (`BlogPremium.tsx`), and 3D lighting/spheres/wireframes (`AboutPremium.tsx`). |
| **Selection / Glow Orange** | `#FF8C42` | `rgb(255, 140, 66)` | Global `::selection` background in `src/index.css` (line 55). Also used in RGBA form `rgba(255, 140, 66, 0.3–0.45)` for orange CTA button drop shadows (`Header.tsx`, `MinimalHero.tsx`). |
| **Ribbon Warm Orange 1** | `#FF8C33` | `rgb(255, 140, 51)` | Mid-stop gradient tint (`via-[#FF8C33]/10`, `via-[#FF8C33]/05`) in `MinimalHero.tsx` flowing background light ribbons. |
| **Ribbon Warm Orange 2** | `#FFA352` | `rgb(255, 163, 82)` | Mid-stop gradient tint (`via-[#FFA352]/09`) in `MinimalHero.tsx` Ribbon 2. |
| **Ribbon Soft Amber** | `#FFB366` | `rgb(255, 179, 102)` | End-stop gradient tint (`to-[#FFB366]/06`) in `MinimalHero.tsx` Ribbon 3. |
| **Pure White** | `#FFFFFF` | `rgb(255, 255, 255)` | `body` default background (`src/index.css`), elevated card surfaces (`bg-white`), icon squircle containers, button text on orange/dark fills, standalone `logo.png` & dark-mode favicon `"L"` glyph, and Three.js ambient lights/fog. |
| **Hero Off-White Canvas** | `#FAFAFA` | `rgb(250, 250, 250)` | Homepage hero section background (`bg-[#FAFAFA]` in `MinimalHero.tsx`). |
| **Favicon Dark Ink** | `#0A0A0A` | `rgb(10, 10, 10)` | Light-mode favicon `"L"` glyph (`favicon.png`, `favicon-32x32.png`, `favicon-16x16.png`, `favicon.ico`) and opaque background of `apple-touch-icon.png`. |
| **Metric Label Slate** | `#6B7280` | `rgb(107, 114, 128)` | Metric caption label colour (`text-[#6B7280]`) in `MetricsGlass.tsx`. |
| **3D Warm Glass Tint** | `#FFEAE0` | `rgb(255, 234, 224)` | Alternating physical glass cube tint (`0xffeae0`) in `AboutPremium.tsx` Section 08 3D showcase. |
| **3D Neutral Connection Line** | `#CCCCCC` | `rgb(204, 204, 204)` | Three.js node network connection line colour (`0xcccccc` at `0.25` opacity) in `AboutPremium.tsx` Section 02. |

*(Note: Unmounted legacy 3D component `src/components/Hero3DBackground.tsx` additionally defines `0x1a1a2e` / `#1A1A2E` scene background, `0x0f3460` / `#0F3460` navy wireframes, and `0xff6b35` / `#FF6B35` electric orange wireframe caps/rings.)*

---

### 1.3 Tailwind CSS v4 Neutral & Semantic Utility Palette

Used across UI surfaces, borders, typography hierarchy, and status indicators (Tailwind CSS `v4.1.14` scale):

#### Neutral Scale (Structural Surfaces, Borders & Text)
- `neutral-50` (`#FAFAFA`): Subtle icon containers, FAQ expanded answer box (`ServicesPremium.tsx`), comparison table starter cell, category pill background (`BlogPremium.tsx`).
- `neutral-100` (`#F5F5F5`): Subtle card dividers (`border-neutral-100`), progress bar tracks, light-header mobile menu hover.
- `neutral-200` (`#E5E5E5`): Primary section/card hairline borders (`border-neutral-200`, `border-neutral-200/60`, `border-neutral-200/80`), timeline connector track, form input borders (`LeadPortal.tsx`).
- `neutral-300` (`#D4D4D4`): Dark-surface body text (`HelloPrivateCard.tsx`), footer column headers (`Footer.tsx`), dashed empty-state border (`AboutPremium.tsx`), nav pipe separator on light backgrounds.
- `neutral-400` (`#A3A3A3`): Monospace metadata labels, eyebrows, timestamps, inactive FAQ chevrons, footer links & address copy.
- `neutral-500` (`#737373`): Standard secondary body copy across light sections (`ServicesBento`, `HowItWorksTimeline`, `AboutPremium`, `ServicesPremium`, `BlogPremium`, `ContactPremium`).
- `neutral-600` (`#525252`): Hero subheading (`MinimalHero.tsx`), checklist feature labels, form field labels, blog prose body.
- `neutral-700` (`#404040`): Light-mode desktop nav links (`Header.tsx`), blog prose & author text, CRM/comparison item titles.
- `neutral-800` (`#262626`): Hero headline line 2 (`that create`), footer borders & newsletter input border (`Footer.tsx`), dark CTA button hover state (`hover:bg-neutral-800`).
- `neutral-900` (`#171717`): Hero headline line 1 (`Engineering lead systems`), adaptive dark floating header (`bg-neutral-900/90`), footer input background (`bg-neutral-900`), `/hello` glass card (`bg-neutral-900/80`).
- `neutral-950` (`#0A0A0A`): Deep inset panels on `/hello` (`bg-neutral-950`, `bg-neutral-950/60`, `bg-neutral-950/80`) and `HeroInteractiveDashboard.tsx`.

#### Semantic & Secondary Scales
- **Orange (`orange-*`):**
  - `orange-50` (`#FFF7ED`) & `orange-100` (`#FFEDD5`): Soft tinted icon badges, checkmark circles, live campaign pills, read-time tags.
  - `orange-500` (`#F97316`): Header CTA button gradient end (`from-brand-orange to-orange-500`) and ambient background glow blobs (`bg-orange-500/5`, `bg-orange-500/10`).
  - `orange-600` (`#EA580C`): Primary solid CTA hover state (`hover:bg-orange-600`) across `MinimalHero`, `App` (404), `AboutPremium`, `ServicesPremium`, and `HelloPrivateCard` avatar border gradient.
- **Emerald (`emerald-*` — Live Status & Trust Indicators):**
  - `emerald-50` (`#ECFDF5`), `emerald-100` (`#D1FAE5`), `emerald-200` (`#A7F3D0`): Timeline "System Outcome" check badge, Contact "Secure Channel" shield badge, form submission thank-you badge (`LeadPortal.tsx`), CRM "Site Visit Booked" pill.
  - `emerald-400` (`#34D399`), `emerald-500` (`#10B981`), `emerald-600` (`#059669`), `emerald-950` (`#022C22`): Status indicators, Lighthouse `99/100 Speed` metric, ROAS trend icon, verification checkmarks.
- **Amber (`amber-*` — Warm Highlights & Prospect Status):**
  - `amber-50` (`#FFFBEB`), `amber-100` (`#FEF3C7`), `amber-600` (`#D97706`): CRM `"Hot Prospect"` status pill (`ServicesBento.tsx`).
  - `amber-500` (`#F59E0B`): Ambient refraction glow (`bg-amber-500/5`, `bg-amber-500/10` in `MetricsGlass.tsx` and `ServicesBento.tsx`).
- **Blue (`blue-*` — Email Channel Accent):**
  - `blue-50` (`#EFF6FF`), `blue-600` (`#2563EB`), `blue-700` (`#1D4ED8`): Direct Email Inquiry icon circle and `hello@leansystem.co` link (`LeadPortal.tsx`), ambient glow (`bg-blue-600/10` in `HelloPrivateCard.tsx`).

---

## 2. Typography System

### 2.1 Font Imports

Loaded identically via Google Fonts in `index.html` (lines 35–37) and `src/index.css` (line 1):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap" rel="stylesheet" />
```

---

### 2.2 Font Families, Weights & Roles (`src/index.css`)

| Role | Font Family Stack | Imported Weights | CSS Variable / Utility Class | Specific Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Display / Editorial Headlines** | `"Syne", sans-serif` | `600` (SemiBold), `700` (Bold), `800` (ExtraBold) | `--font-display` / `.font-display` | Hero `<h1>`, section `<h2>` titles, card `<h3>` titles, 404 heading, blog article titles, dark CTA banner headlines, `/hello` founder greeting & monogram. *(Note: global `h1–h6` defaults to `Plus Jakarta Sans` in `src/index.css:45–47`, and components explicitly apply `.font-display` to display headings.)* |
| **Primary UI & Body Sans** | `"Plus Jakarta Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` | `400` (Regular), `500` (Medium), `600` (SemiBold), `700` (Bold) | `--font-sans-clean`, `--font-sans`, `--font-body` / `.font-sans-clean` | Default `body` copy, navigation links, buttons, section eyebrows, descriptions, FAQ items, form inputs/labels, blog prose, cards, and footer text. |
| **Technical & Numeric Monospace** | `"JetBrains Mono", monospace` | `400` (Regular), `500` (Medium) *(also styled with `font-semibold`/`font-bold` in select badges)* | `--font-mono-num`, `--font-mono` / `.font-mono-num` (`font-variant-numeric: tabular-nums`) | Animated KPI counters (`24/7`, `<60s`, `100%`, `3`), pricing fees (`₹25,000`, `₹50,000`), CPL/ROAS figures (`₹420`, `+148%`), phase/step tags (`PHASE 01`, `Week 1`), category/metadata eyebrows, email/phone links, and copyright year (`2026`). |

**Global Font Rendering (`src/index.css` lines 41–42):**
- `-webkit-font-smoothing: antialiased;`
- `-moz-osx-font-smoothing: grayscale;`

---

### 2.3 Typographic Scale, Line Heights & Tracking

| Element / Tier | Font Class | Weight | Responsive Size Classes | Computed Sizes | Line Height & Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Homepage Hero Static Lines** (`MinimalHero.tsx`) | `font-display` | `font-semibold` (`600`) | `text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem]` | `24px` → `48px` (`sm`) → `60px` (`md`) → `68px` (`lg`) → `76px` (`xl`) *(Note: `xs:` has no custom `@theme` breakpoint, so `24px` applies up to `640px`)* | `leading-[1.08] sm:leading-[1.05]`, `tracking-[-0.035em]` |
| **Homepage Hero Typewriter Line** (`MinimalHero.tsx`) | `font-display` | `font-extrabold` (`800`) | `text-[clamp(1.05rem,5.2vw,2.2rem)] sm:text-[clamp(2.05rem,5.1vw,3.45rem)]` | Fluid `16.8px–35.2px` (mobile) / `32.8px–55.2px` (`sm+`) | `leading-[1.2]`, `tracking-[-0.035em]` |
| **Inner Page Hero `<h1>`** (`Services`, `Blog`, `Contact`, `About`) | `font-display` | `font-bold` (`700`) | `text-3xl` / `text-4xl md:text-5xl lg:text-6xl` | `30px`/`36px` → `48px` (`md`) → `60px` (`lg`) (`uppercase` on Blog & Contact) | `leading-tight` (`1.25`), `tracking-tight` (`-0.025em`) |
| **Major Section `<h2>`** (`ServicesBento`, `HowItWorks`, `About`, `Services`) | `font-display` | `font-bold` (`700`) | `text-3xl sm:text-4xl md:text-5xl` (up to `lg:text-6xl` on `ServicesBento`) | `30px` → `36px` (`sm`) → `48px` (`md`) → `60px` (`lg`) | `leading-tight` (`1.25`), `tracking-tight` (`-0.025em`) |
| **Compact Section `<h2>`** (Home FAQ, `LeadPortal`) | `font-display` | `font-bold` (`700`) | `text-2xl md:text-3xl` / `text-3xl md:text-4xl` | `24px–30px` / `30px–36px` | `tracking-tight` (`-0.025em`) |
| **KPI Metric Value** (`MetricsGlass.tsx`) | `font-mono-num` | `font-medium` (`500`) | `text-[38px] sm:text-[44px] md:text-[48px] lg:text-[52px]` | `38px` → `44px` → `48px` → `52px` | `leading-none` (`1`), `tracking-tight` |
| **Pricing Plan Fee** (`ServicesPremium.tsx`) | `font-mono-num` | `font-bold` (`700`) | `text-3xl md:text-4xl` | `30px` → `36px` | `tracking-tight` |
| **Card Title `<h3>`** (Bento, Timeline, Pricing, Blog) | `font-display` | `font-bold` (`700`) | `text-lg` / `text-xl` / `text-2xl` | `18px` / `20px` / `24px` | `leading-snug` (`1.375`) |
| **Hero Lead Paragraph** (`MinimalHero.tsx`) | `font-sans-clean` | `font-normal` (`400`) | `text-sm sm:text-lg md:text-xl` | `14px` → `18px` → `20px` | `leading-relaxed` (`1.625`), `tracking-[-0.01em]` |
| **Section Subtitle** | `font-sans-clean` | `font-normal` (`400`) | `text-sm md:text-base` or `text-base md:text-lg` | `14px–16px` or `16px–18px` | `leading-relaxed` (`1.625`) |
| **Card & Component Body** | `font-sans-clean` | `font-normal`–`font-semibold` | `text-xs` (`12px`) / `text-[13px]` / `text-sm` (`14px`) | `12px`–`14px` | `leading-relaxed` (`1.625`) |
| **Section Eyebrow Underline Badge** | `font-sans-clean` | `font-bold` (`700`) | `text-xs` | `12px` (`uppercase`) | `tracking-[0.2em]` or `tracking-widest` (`0.1em`), `border-b-2 pb-2` |
| **Technical Metadata / Micro-Labels** | `font-mono-num` | `font-medium` (`500`) | `text-[8px]`, `text-[9px]`, `text-[10px]`, `text-[11px]`, `text-xs` | `8px`–`12px` (`uppercase`) | `tracking-wider` (`0.05em`), `tracking-[0.15em]`, `tracking-[0.18em]`, `tracking-[0.2em]` |
| **Desktop Navigation Links & Header CTA** (`Header.tsx`) | `font-sans-clean` | `font-medium` (`500`) / `font-bold` (`700` active & CTA) | `text-[13px]` | `13px` | `tracking-wide` (`0.025em`) |

---

## 3. Logo Variations & Asset File Locations

### 3.1 Full Wordmark Logo (`LEAN`) — External Hosted Asset

Used in the sticky header (`src/components/Header.tsx`, lines 139–150) and global footer (`src/components/Footer.tsx`, lines 50–59):

- **Primary Image Source URL:** `https://lh3.googleusercontent.com/d/1LFCv9BinE7S_-D4Fuf2MrPLf_KAUA-K5`
- **Automatic `onError` Fallback URL:** `https://drive.google.com/thumbnail?id=1LFCv9BinE7S_-D4Fuf2MrPLf_KAUA-K5&sz=w1000`
- **Source Dimensions & Format:** `1050 × 600 px` RGBA PNG (white `"LEAN"` letterforms on a transparent background)
- **Accessibility Attributes:** `alt="Lean System"`, parent anchor `aria-label="Lean System Home"`, `referrerPolicy="no-referrer"`
- **Adaptive Rendering Variations (CSS Filter Driven):**
  1. **Header — Over Dark Surface (`isOverDarkBg === true`):** `h-7 sm:h-8 w-auto object-contain brightness-0 invert` (renders crisp white `#FFFFFF` wordmark, `28px` mobile / `32px` desktop height, hover `group-hover:scale-[1.04]`).
  2. **Header — Over Light Surface (`isOverDarkBg === false`):** `h-7 sm:h-8 w-auto object-contain brightness-0` (renders pure black `#000000` wordmark, `28px` mobile / `32px` desktop height, hover `group-hover:scale-[1.04]`).
  3. **Global Footer (`Footer.tsx`):** `h-9 md:h-11 w-auto object-contain brightness-0 invert` (renders crisp white `#FFFFFF` wordmark, `36px` mobile / `44px` desktop height, hover `group-hover:scale-[1.02]`), paired with an animated reveal sub-caption `"Built for Real Estate Growth"` (`text-[7px] md:text-[8px] uppercase tracking-widest text-neutral-400`).

---

### 3.2 Standalone `"L"` Brand Mark & Favicon Suite — Local `/public` Assets

Extracted directly from the first letter `"L"` of the official `"LEAN"` wordmark, preserving original geometry and proportions:

| File Location | Dimensions | File Size | Colour Specification | Usage & HTML / Schema Binding |
| :--- | :--- | :--- | :--- | :--- |
| `/public/logo.png` | `300 × 300 px` | `13,741 B` | White (`#FFFFFF`) `"L"` on transparent RGBA background | Standalone brand mark referenced in `index.html` Schema.org `Organization.logo` (`ImageObject` at `https://www.leansystem.co/logo.png`, `width: 300`, `height: 300`). |
| `/public/favicon.png` | `192 × 192 px` | `2,200 B` | Dark (`#0A0A0A`) `"L"` on transparent RGBA background | `<link rel="icon" sizes="192x192" media="(prefers-color-scheme: light)">`, plus `og:image` and `twitter:image` (`https://www.leansystem.co/favicon.png`). |
| `/public/favicon-32x32.png` | `32 × 32 px` | `232 B` | Dark (`#0A0A0A`) `"L"` on transparent RGBA background | `<link rel="icon" sizes="32x32" media="(prefers-color-scheme: light)">` |
| `/public/favicon-16x16.png` | `16 × 16 px` | `152 B` | Dark (`#0A0A0A`) `"L"` on transparent RGBA background | `<link rel="icon" sizes="16x16" media="(prefers-color-scheme: light)">` |
| `/public/favicon.ico` | `16×16`, `32×32` | `422 B` | Dark (`#0A0A0A`) `"L"` multi-resolution ICO | `<link rel="icon" type="image/x-icon" media="(prefers-color-scheme: light)">` |
| `/public/favicon-dark.png` | `192 × 192 px` | `2,192 B` | White (`#FFFFFF`) `"L"` on transparent RGBA background | `<link rel="icon" sizes="192x192" media="(prefers-color-scheme: dark)">` |
| `/public/favicon-dark-32x32.png` | `32 × 32 px` | `231 B` | White (`#FFFFFF`) `"L"` on transparent RGBA background | `<link rel="icon" sizes="32x32" media="(prefers-color-scheme: dark)">` |
| `/public/favicon-dark-16x16.png` | `16 × 16 px` | `152 B` | White (`#FFFFFF`) `"L"` on transparent RGBA background | `<link rel="icon" sizes="16x16" media="(prefers-color-scheme: dark)">` |
| `/public/apple-touch-icon.png` | `180 × 180 px` | `1,799 B` | White (`#FFFFFF`) `"L"` centered on solid `#0A0A0A` background | `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">` |

### 3.3 Other Repository Image Assets
- `/src/assets/images/hero_industrial_bg_1782278933312.jpg` (`1376 × 768 px`, `796,017 B` JPEG): Retained in repository under `src/assets/images/`, **not imported or rendered** by any active component.
- **Founder Initial Avatar (`HelloPrivateCard.tsx`):** Programmatic typographic badge (`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-brand-orange via-orange-600 to-neutral-900 p-0.5` framing an inner `bg-neutral-950 rounded-[14px]` square displaying `"N"` in `font-display font-bold text-xl text-brand-orange`).

---

## 4. Button & Component Design Specifications

### 4.1 Buttons

| Button Variant | Source Component | Geometry & Sizing | Colours & Borders | Elevation & Interactive States |
| :--- | :--- | :--- | :--- | :--- |
| **Header Pill CTA (`Get started`)** | `Header.tsx` | `px-5 py-2 rounded-full` (desktop), `w-full min-h-[48px] py-3 rounded-full` (mobile drawer); `text-[13px]`/`text-sm font-bold tracking-wide` | `bg-gradient-to-r from-brand-orange to-orange-500 text-white` | `shadow-[0_4px_14px_rgba(255,140,66,0.3)]`, hover swaps gradient direction (`hover:from-orange-500 hover:to-brand-orange`), `hover:shadow-[0_6px_20px_rgba(255,140,66,0.45)] hover:scale-[1.02] active:scale-[0.98]`. |
| **Hero Primary Pill CTA (`Let's Talk`)** | `MinimalHero.tsx` | `min-h-[48px] px-8 py-3.5 rounded-full gap-2`; `text-sm sm:text-base font-bold` | `bg-brand-orange text-white` (`#FF7A1A`), hover `bg-orange-600` (`#EA580C`) | `shadow-[0_4px_20px_rgba(255,140,66,0.3)] hover:shadow-[0_6px_25px_rgba(255,140,66,0.4)] active:scale-[0.98]`; trailing `ArrowRight` shifts `group-hover:translate-x-0.5`. |
| **Hero Secondary Pill CTA (`How It Works`)** | `MinimalHero.tsx` | `min-h-[48px] px-8 py-3.5 rounded-full gap-1.5`; `text-sm sm:text-base font-bold` | `bg-white text-neutral-900 border border-neutral-200/80` | `shadow-sm hover:bg-neutral-100/80 hover:border-neutral-300 active:scale-[0.98]`. |
| **Dark Banner Primary CTA** | `AboutPremium.tsx`, `ServicesPremium.tsx` | `px-8 py-4 rounded-xl gap-2`; `text-sm font-bold uppercase tracking-wider` | `bg-[#FF6B00] hover:bg-orange-600 text-white` | `shadow-[0_10px_25px_rgba(255,107,0,0.25)]`, `ArrowRight` `group-hover/btn:translate-x-1.5`. |
| **Dark Banner Translucent Secondary CTA** | `AboutPremium.tsx`, `ServicesPremium.tsx` | `px-8 py-4 rounded-xl gap-2`; `text-sm font-bold uppercase tracking-wider` | `bg-white/10 hover:bg-white/15 border border-white/20 text-white` | Clean glass button on `#0F0F11` dark banner. |
| **Pricing Card CTA** | `ServicesPremium.tsx` | `w-full py-3.5 rounded-xl gap-2`; `text-xs font-bold uppercase tracking-wider` | Featured (`Growth`): `bg-[#FF6B00] hover:bg-orange-600 text-white`; Standard (`Starter`/`Premium`): `bg-brand-dark hover:bg-neutral-800 text-white` | Featured shadow `shadow-[0_10px_20px_rgba(255,107,0,0.15)]`. |
| **`AramcoButton` Architectural Action** | `AramcoButton.tsx` (used in `LeadPortal.tsx`, `HelloPrivateCard.tsx`) | Text label + trailing circular icon button (`w-10 h-10 md:w-12 md:h-12 rounded-full border`), `gap-4`, `text-sm md:text-base font-semibold tracking-wide` | 5 built-in variants: `orange` (default), `full-orange`, `white`, `dark`, `outline` *(Note: in `LeadPortal.tsx`, `variant="orange"` renders `text-white` label on light `bg-brand-light` form background)* | Circle fills softly on hover (`group-hover:bg-brand-orange/10` or `bg-white/10`) while `ArrowRight` translates `group-hover:translate-x-1`. |
| **Direct Call Action Button** | `HelloPrivateCard.tsx` | `w-full p-4 rounded-2xl` with `w-10 h-10 rounded-xl bg-white/20` leading icon box | `bg-[#FF6B00] hover:bg-[#FF7A1A] text-white` | `shadow-lg shadow-orange-950/50`, `ArrowRight` `group-hover:translate-x-1`. |

---

### 4.2 Navigation Header (`Header.tsx`)

- **Floating Pill Geometry:** `fixed top-3 sm:top-4 inset-x-0 mx-auto max-w-[94%] sm:max-w-[88%] lg:max-w-5xl w-full z-50`.
- **Dynamic Radius & Scroll Compression:** `rounded-full` when closed (`rounded-2xl sm:rounded-3xl` when mobile drawer is open); vertical padding compresses from `py-2` (`scrollY <= 20`) to `py-1.5` (`scrollY > 20`), inner bar height `h-12 sm:h-14`.
- **Automatic Surface Theme Detection:** Observes `[data-header-theme="dark"]` sections via `getBoundingClientRect()` + `MutationObserver` (`headerHeight = 90px`):
  - **Over Dark Sections:** `bg-neutral-900/90 backdrop-blur-2xl border border-white/20 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.25),0_12px_40px_rgba(0,0,0,0.35)]`
  - **Over Light Sections:** `bg-white/90 backdrop-blur-2xl border border-neutral-200/80 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.8),0_12px_40px_rgba(0,0,0,0.08)]`
- **Active Route Indicator:** Shared-layout Motion underline (`layoutId="activeNavLine"`, `h-[2px] bg-brand-orange rounded-full`, spring `stiffness: 380, damping: 30`), with a vertical `|` separator before `Contact`.
- **Mobile Touch Ergonomics:** Hamburger toggle (`w-11 h-11 min-w-[44px] min-h-[44px] rounded-full`), drawer links (`min-h-[44px] px-3.5 py-2.5 rounded-xl`) with active orange dot (`w-2 h-2 rounded-full bg-brand-orange`).

---

### 4.3 Cards, Containers & Form Controls

- **Liquid Glass Bento & Timeline Cards (`ServicesBento.tsx`, `HowItWorksTimeline.tsx`, `AboutPremium.tsx`):**
  - Surface: `bg-white/10 backdrop-blur-[24px] border border-white/20`
  - Radii: `rounded-[28px]` (Bento), `rounded-[20px] sm:rounded-[24px]` (Timeline), `rounded-[22px]`–`rounded-[32px]` (About 3D & Pathway cards).
  - Active Highlight State (Timeline Step 2 & Services Growth Plan): `border-[#FF6B00]/30 ring-1 ring-[#FF6B00]/10` with top pill badge `ACTIVE PHASE` (`bg-[#FF6B00] text-white text-[9px] rounded-full`).
  - Embossed Icon Squircles: `w-11 h-11 rounded-[14px]` (or `w-12 h-12 rounded-2xl` in `MetricsGlass`, `w-10 h-10 rounded-[12px]` in `AboutPremium`) `bg-white border border-white/70` with inner top specular highlight shadow.
- **Solid Editorial White Cards (`ServicesPremium.tsx`, `BlogPremium.tsx`, `AboutPremium.tsx`):**
  - Surface: `bg-white border border-neutral-200/60` (or `border-neutral-200/50`), `rounded-[24px]` (cards) and `rounded-[32px]` (expanded blog study reader), hover border `hover:border-[#FF6B00]/20`–`40`.
- **Sharp Architectural Contact & Form Cards (`LeadPortal.tsx`, `Footer.tsx`):**
  - Uses crisp `rounded-sm` (`4px`) corners (`bg-white border border-neutral-200 p-5 rounded-sm` for contact options; `bg-brand-light p-6 md:p-8 rounded-sm border border-neutral-200` for the enquiry form).
  - Form Inputs (`LeadPortal.tsx`): `bg-white border border-neutral-200 focus:border-brand-orange px-3.5 py-3 sm:py-2.5 text-sm sm:text-xs rounded-sm text-brand-dark min-h-[44px] sm:min-h-0` (phone field uses `font-mono-num`).
  - Footer Newsletter Input (`Footer.tsx`): `bg-neutral-900 border border-neutral-800 focus:border-brand-orange px-4 py-3 text-sm rounded-sm text-white placeholder-neutral-600`.
- **Custom Animated SVG Icon Library (`src/components/icons/index.tsx`):**
  - 37 bespoke `motion.svg` icons (`24×24` viewBox, `strokeWidth = 1.75`, `strokeLinecap="round"`, `strokeLinejoin="round"`) engineered in "ItsHover" micro-interaction style with spring/ease `whileHover` path animations (used instead of raw static icon imports).

---

## 5. Backgrounds, Gradients, Borders & Shadows

### 5.1 Surface Hierarchy
1. **Pure White (`#FFFFFF`):** Root `<body>` and `#lean-app`, solid pricing/blog/value cards, icon squircles, form inputs.
2. **Hero Off-White (`#FAFAFA`):** `MinimalHero.tsx` canvas layered with SVG fractalNoise grain (`baseFrequency="0.8"`, `numOctaves="3"`, `opacity-[0.02] mix-blend-overlay`) and top/bottom `h-32` white vignette fades.
3. **Brand Light (`#F8F9FA`):** Main section & inner-page surface (`ServicesBento`, `AboutPremium`, `ServicesPremium`, `BlogPremium`, `ContactPremium`, `LeadPortal` form box).
4. **Translucent Frosted Glass (`bg-white/10` to `bg-white/18`, `bg-white/90`, `bg-neutral-900/80–90`):** Paired with `backdrop-blur-[24px]`, `backdrop-blur-[32px]`, or `backdrop-blur-2xl` (`40px`).
5. **Obsidian Dark (`#0F0F11` / `#171717` / `#0A0A0A`):** `Footer.tsx`, `AboutPremium` & `ServicesPremium` closing CTA cards, and `/hello` private card view.

### 5.2 Gradients & Ambient Light Effects
- **Hero Flowing Light Ribbons (`MinimalHero.tsx`):** Four oversized rotated elliptical layers (`900px–1600px` wide, `blur-[120px]` to `blur-[170px]`, `rounded-[100%]`):
  - Ribbon 1 (`-22deg`): `bg-gradient-to-r from-[#FF7A1A]/16 via-[#FF8C33]/10 to-transparent`
  - Ribbon 2 (`28deg`): `bg-gradient-to-l from-[#FF7A1A]/17 via-[#FFA352]/09 to-transparent`
  - Ribbon 3 (`-10deg`): `bg-gradient-to-r from-transparent via-[#FF7A1A]/14 to-[#FFB366]/06`
  - Ribbon 4 (`14deg`): `bg-radial from-[#FF7A1A]/12 via-[#FF8C33]/05 to-transparent`
- **Ambient Section Glows:** Soft blurred radial blobs behind glass panels (`bg-orange-500/5` or `/10`, `bg-amber-500/5` or `/10`, `bg-[#FF6B00]/10`, `bg-brand-orange/10`, `bg-blue-600/10` with `blur-[50px]` to `blur-[150px]`).
- **Header CTA Linear Gradient:** `bg-gradient-to-r from-brand-orange to-orange-500` (`#FF7A1A` → `#F97316`).
- **Timeline Connector Gradient:** `bg-gradient-to-r from-neutral-200 via-[#FF6B00]/40 to-neutral-200`.
- **Metrics Vertical Hairline Divider:** `w-[1px] bg-gradient-to-b from-transparent via-black/10 to-transparent`.
- **SVG ROAS Area Chart Gradient (`ServicesBento.tsx`):** Vertical `linearGradient` from `#FF6B00` (`stopOpacity="0.25"`) to `#FF6B00` (`stopOpacity="0"`).

### 5.3 Border Radius System
- **Sharp Architectural (`4px`):** `rounded-sm` — Contact form inputs, `LeadPortal` cards, `Footer` newsletter field.
- **Compact Tags & Controls (`6px–12px`):** `rounded-md` (`6px`), `rounded-lg` (`8px`), `rounded-[10px]`, `rounded-xl` (`12px`) — Badges, dark banner buttons, pricing CTAs, mobile nav items.
- **Icon Squircles (`12px–16px`):** `rounded-[12px]`, `rounded-[14px]`, `rounded-2xl` (`16px`).
- **Large Cards & Panels (`20px–32px`):** `rounded-[20px]`, `rounded-[22px]`, `rounded-[24px]` / `rounded-3xl`, `rounded-[28px]`, `rounded-[32px]`.
- **Full Pill (`9999px`):** `rounded-full` — Floating header, hero primary/secondary CTAs, status pills, `AramcoButton` arrow circle.

### 5.4 Multi-Layered Shadow Tokens ("Liquid Glass" Specular + Ambient)
- **Header Over Dark:** `inset 0 1.5px 2px rgba(255,255,255,0.25), 0 12px 40px rgba(0,0,0,0.35)`
- **Header Over Light:** `inset 0 1.5px 2px rgba(255,255,255,0.8), 0 12px 40px rgba(0,0,0,0.08)`
- **Metrics Glass Bar:** `inset 0 1.5px 3px rgba(255,255,255,0.45), 0 12px 45px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.02)`
- **Bento Glass Card (Rest → Hover):**
  - Rest: `0 10px 35px -10px rgba(0,0,0,0.04), inset 0 1.5px 3px rgba(255,255,255,0.4)`
  - Hover: `0 24px 50px -15px rgba(255,107,0,0.07), inset 0 1.5px 4px rgba(255,255,255,0.5)`
- **Active Phase / Featured Growth Card:** `0 20px 50px rgba(255,107,0,0.06), inset 0 1.5px 3px rgba(255,255,255,0.4)`
- **Embossed Icon Squircle:** `inset 0 1.5px 2px rgba(255,255,255,0.9), 0 6px 16px rgba(0,0,0,0.04)` (hover glow `0 0 15px rgba(255,107,0,0.25)`)
- **Primary Orange CTA Glow:** `0 4px 20px rgba(255,140,66,0.3)` → hover `0 6px 25px rgba(255,140,66,0.4)` (or `0 10px 25px rgba(255,107,0,0.25)` on `#FF6B00` buttons)
- **Private Card Dark Elevation (`/hello`):** `0 25px 60px -15px rgba(0,0,0,0.7)`

---

## 6. Spacing, Layout & Visual Hierarchy

### 6.1 Container Max-Widths
| Container Width | Tailwind Class | Usage Across Pages |
| :--- | :--- | :--- |
| **`1280px` (`80rem`)** | `max-w-7xl mx-auto px-4 sm:px-6` (or `px-6`) | Primary architectural container for `MetricsGlass`, `ServicesBento`, `HowItWorksTimeline`, `AboutPremium`, `ServicesPremium`, `BlogPremium` grid, `ContactPremium` header, and `Footer`. |
| **`1152px` (`72rem`)** | `max-w-6xl mx-auto px-4 sm:px-6` | `LeadPortal` two-column conversion section. |
| **`1024px` (`64rem`)** | `max-w-5xl` | Desktop floating `Header` (`lg:max-w-5xl`), `MinimalHero` outer wrapper, `ServicesPremium` expandable feature blocks, `About`/`Services` dark closing CTA banners, `About` principles section. |
| **`896px` (`56rem`)** | `max-w-4xl` | `MinimalHero` inner text stack, Home `GENERAL_FAQS`, `HowItWorks` trust bar, `About` intro & closing copy, `Services` comparison matrix. |
| **`768px` (`48rem`)** | `max-w-3xl` | `ServicesPremium` FAQs, `BlogPremium` single-article reader card, `HowItWorks` header. |
| **`576px` (`36rem`)** | `max-w-xl` | `/hello` private business card container (`HelloPrivateCard.tsx`). |

### 6.2 Vertical Section Rhythm & Overlap Architecture
- **Homepage Flow (`App.tsx`):** `space-y-24 pb-24` (`96px` vertical gap between sections), with `MetricsGlass` negatively overlapping the hero bottom edge via `-mt-12 sm:-mt-16 md:-mt-20 relative z-20`.
- **Inner Page Flow (`AboutPremium`, `ServicesPremium`):** `space-y-20 sm:space-y-32 pb-16 sm:pb-24` (`80px` mobile / `128px` desktop vertical rhythm), top offset `pt-24 sm:pt-28 md:pt-36` to clear the fixed floating header.
- **Full-Bleed Band Padding (`ServicesBento`, `HowItWorksTimeline`):** `py-28 md:py-36` (`112px`–`144px`) or `py-16 sm:py-28 md:py-36`.
- **Anchor Scroll Clearance:** `scroll-mt-24` (`96px`) on `#how-it-works`, `#general-faqs`, and `#contact`.

### 6.3 Responsive Grid Patterns & Breakpoints
- **Breakpoints:** Standard Tailwind v4 (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`). *(Audit note: `MinimalHero.tsx` includes `xs:text-3xl` without a custom `--breakpoint-xs` definition in `src/index.css`.)*
- **12-Column Asymmetric Bento Grid (`ServicesBento.tsx`):** `grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8` — Row 1: `7 + 5` columns (`lg:col-span-7`, `lg:col-span-5`); Row 2: `4 + 4 + 4` columns (`lg:col-span-4` × 3).
- **12-Column Split Layouts:**
  - `LeadPortal.tsx`: `5` cols (Direct Contact Options) + `7` cols (Quick Contact Form).
  - `AboutPremium.tsx` Philosophy: `4` cols (sticky-style title) + `8` cols (`3`-column sub-grid).
  - `AboutPremium.tsx` 3D Cube Showcase: `7` cols (Three.js canvas) + `5` cols (inspector card).
  - `ContactPremium.tsx` Header: `8` cols (headline) + `4` cols (encryption trust badge).
- **Multi-Column Card Grids:** 3-column (`HowItWorksTimeline`, `ServicesPremium` plans, `BlogPremium` articles), 4-column (`About` pathway & standards, `Footer`), and 5-column (`About` ecosystem modules, `Services` collaborative process).
- **Z-Index Hierarchy:** `z-0` (ambient backgrounds/ribbons) → `z-1` (hero edge vignettes) → `z-10` (section content) → `z-20` (overlapping `MetricsGlass` bar) → `z-50` (fixed `Header`).

---

## 7. Animation & Motion Design Characteristics

### 7.1 Custom CSS Keyframes & Reduced Motion (`src/index.css`)
- **Typewriter Caret Blink (`@keyframes caret-blink`, lines 59–73):**
  - `0%, 42% { opacity: 1 }` → `54%, 88% { opacity: 0 }` → `100% { opacity: 1 }`
  - Bound to `.animate-caret-blink` (`1.05s ease-in-out infinite`). Pauses at solid `opacity-100` while actively typing or deleting characters.
- **Reduced Motion Compliance:**
  - CSS: `@media (prefers-reduced-motion: reduce) { .animate-caret-blink { animation: none; } }`.
  - React (`MinimalHero.tsx`): Subscribes to `window.matchMedia('(prefers-reduced-motion: reduce)')` and renders static `"Appointments"` without timers or blinking cursor when enabled.
- *(Audit note: `Footer.tsx:199` references `animate-fade-in` on the newsletter confirmation message, which has no custom keyframe rule in `src/index.css`.)*

### 7.2 Hero Typewriter State Machine (`MinimalHero.tsx`)
- **Rotating Phrases:** `'Appointments'` → `'Qualified leads'` → `'More property sales'`
- **Exact Timing Constants:**
  - `TYPING_SPEED_MS = 34` (`34ms` per character)
  - `DELETING_SPEED_MS = 18` (`18ms` per character — ~1.9× faster than typing)
  - `PAUSE_AFTER_TYPING_MS = 1000` (`1.0s` hold on completed phrase)
  - `PAUSE_AFTER_DELETING_MS = 120` (`120ms` pause before next phrase)
- **Zero-CLS Layout Reservation:** Uses an invisible stacked CSS Grid sizer (`col-start-1 row-start-1 invisible`) containing `'More property sales'` + caret width so neither horizontal width nor vertical height shifts during typing.

### 7.3 Motion (`motion/react`) Choreography & Physics
- **Signature Expo-Out Curve:** `[0.16, 1, 0.3, 1]` — Used across `MinimalHero` staggered entrance (`duration: 0.6`, delays `0.08s`, `0.16s`, `0.24s`), `MetricsGlass` (`duration: 0.8`), `ServicesBento` (`duration: 0.7`, stagger `index * 0.1s`), `HowItWorksTimeline` (`duration: 0.8`, stagger `idx * 0.15s`), and custom SVG icon strokes.
- **Route-Level Transitions (`App.tsx`):** `<AnimatePresence mode="wait">` fading & sliding pages (`initial={{ opacity: 0, y: 15 }}`, `animate={{ opacity: 1, y: 0 }}`, `exit={{ opacity: 0, y: -15 }}`, `duration: 0.3s`).
- **Scroll-Triggered Viewport Reveals:** `useInView(ref, { once: true, amount: 0.1–0.25 })` triggers section headers, cards, and horizontal timeline progress bars (`scaleX: 0 -> 1`, `duration: 1.5s`, `ease: 'easeInOut'`).
- **Ambient Hero Ribbon Drift (`MinimalHero.tsx`):** 4 independent infinite keyframe loops (`duration: 22s, 24s, 27s, 29s`, `repeat: Infinity`, `ease: 'easeInOut'`) translating `x` and `y` by `±6%–14%` on the GPU (`transform-gpu`).
- **Card & Icon Micro-Interactions:**
  - Card hover lift: `whileHover={{ y: -8 }}` (Bento & Ecosystem cards), `y: -6` (Timeline, Plans, Blog cards), `y: -4` (Metric blocks).
  - Icon squircle hover: `group-hover:rotate-[5deg] group-hover:scale-105 transition-all duration-300`.
  - Custom SVG Icons (`src/components/icons/index.tsx`): Spring physics `stiffness: 400, damping: 25` on hover.
  - Accordion drawers (FAQs, Mobile Nav, Plan/Feature details): `height: 0 -> 'auto'` + `opacity: 0 -> 1` (`duration: 0.2s–0.25s`).
- **RAF Numeric CountUp (`MetricsGlass.tsx`):** `1600ms` `requestAnimationFrame` counter using quadratic ease-out `progress * (2 - progress)` triggered once on viewport entry.

### 7.4 Interactive Three.js WebGL Scenes (`AboutPremium.tsx`)
1. **Section 02 — Interactive 5-Node Ecosystem (`450px` height):** 5 translucent `0xff6b00` physical glass spheres (`transmission: 0.6`, `roughness: 0.1`) with rotating outer `RingGeometry` halos, cross-linked by `0xcccccc` lines, floating sinusoidally with mouse-raycast hover scaling (`1.4×`), camera parallax, and live React tooltip overlay.
2. **Section 08 — Interactive 5-Cube Service Showcase (`400px` height):** 5 rotating physical refractive cubes (`transmission: 0.85`, `ior: 1.5`, alternating `0xffffff` & `0xffeae0` with `0xff6b00` wireframe cages) supporting click-to-inspect state binding with the adjacent React specification card.

---

## 8. Photography & Image Treatment

- **Zero Stock Photography Architecture:** Lean System deliberately avoids generic real estate stock photos, team headshots, or decorative raster banners across all live routes.
- **Programmatic UI Telemetry & Data Visualizations:** Visual storytelling is delivered entirely through live interactive UI miniatures, SVG telemetry charts, Lighthouse speed cards (`99/100`), Airtable pipeline boards (`ServicesBento.tsx`), and interactive WebGL 3D glass geometry (`AboutPremium.tsx`).
- **CSS Filter & Blend Treatments:**
  - Wordmark adaptive recolouring via `brightness-0` (black on light surfaces) and `brightness-0 invert` (white on dark surfaces) with `object-contain` and subtle hover scale (`1.02`–`1.04`).
  - Hero procedural SVG grain uses `opacity-[0.02] mix-blend-overlay` for subtle paper-like tactility without visual noise.

---

## 9. Overall Visual Personality & Brand Positioning

### 9.1 Brand Positioning & Value Proposition
- **Category Definition:** Positioned not as a traditional "creative marketing agency", but as **real estate customer-acquisition & lead-ingestion infrastructure** (`"Systems Over Service"`).
- **Target Audience:** Residential & commercial property developers, builders, and project marketing heads in Hyderabad and major Indian real estate hubs.
- **Core Pillars:**
  1. **Speed-to-Lead (`<60s`):** Automated brochure delivery, instant alerts, and site-visit scheduling within 60 seconds, 24/7.
  2. **High-Intent Acquisition:** Exact/phrase-match Google Search and targeted Meta campaigns paired with sub-1.5s conversion landing pages.
  3. **Sovereign Client Ownership (Zero Lock-In):** All landing pages, ad accounts, domains, and Airtable/CRM databases are 100% owned by the client.
  4. **Radical Transparency:** Honest reporting focused on qualified enquiries, CPL, and booked site visits — `"No fake metrics. No unrealistic guarantees. No shortcuts."`

### 9.2 Visual Personality Archetype
- **Architectural Precision Meets Liquid Glass Minimalism:** Combines Apple/Linear-inspired frosted glass depth (`backdrop-blur-[24px–32px]`, inner white specular borders, diffused warm light ribbons) with industrial telemetry discipline (`JetBrains Mono` metrics, uppercase letter-spaced eyebrows, numbered phases, clean hairline dividers).
- **High-Contrast Restraint:** Dominated by calm, airy neutrals (`#FFFFFF`, `#FAFAFA`, `#F8F9FA`) and authoritative obsidian (`#0F0F11`), reserving vibrant orange (`#FF7A1A` / `#FF6B00`) strictly for focal conversion actions, live metrics, and active system states, alongside emerald green (`#10B981` / `#059669`) for verified outcomes.

---

## 10. Reusable CSS Variables & Design Tokens

Below is a consolidated, copy-paste-ready CSS custom property sheet reflecting every actual token, colour, font stack, radius, shadow, and motion timing extracted from the Lean System codebase:

```css
:root {
  /* === 1. Official @theme Brand Colours (src/index.css) === */
  --color-brand-dark: #0F0F11;
  --color-brand-navy: #151B26;
  --color-brand-orange: #FF7A1A;
  --color-brand-light: #F8F9FA;
  --color-brand-gray: #8A94A6;

  /* === 2. Extended Component Accent & Surface Colours === */
  --color-accent-solar-orange: #FF6B00;
  --color-selection-orange: #FF8C42;
  --color-surface-white: #FFFFFF;
  --color-surface-hero: #FAFAFA;
  --color-favicon-ink: #0A0A0A;
  --color-metric-label: #6B7280;

  /* Hero Ribbon Gradient Tints */
  --color-ribbon-orange-1: #FF8C33;
  --color-ribbon-orange-2: #FFA352;
  --color-ribbon-amber: #FFB366;

  /* Semantic Accents (Tailwind v4 Palette Equivalents) */
  --color-orange-50: #FFF7ED;
  --color-orange-100: #FFEDD5;
  --color-orange-500: #F97316;
  --color-orange-600: #EA580C;
  --color-emerald-50: #ECFDF5;
  --color-emerald-500: #10B981;
  --color-emerald-600: #059669;
  --color-blue-50: #EFF6FF;
  --color-blue-600: #2563EB;

  /* === 3. Typography Stacks === */
  --font-display: "Syne", sans-serif;
  --font-sans-clean: "Plus Jakarta Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-sans: var(--font-sans-clean);
  --font-body: var(--font-sans-clean);
  --font-mono-num: "JetBrains Mono", monospace;
  --font-mono: var(--font-mono-num);

  /* === 4. Layout & Container Widths === */
  --container-xl: 36rem;   /* 576px  - max-w-xl (/hello) */
  --container-3xl: 48rem;  /* 768px  - max-w-3xl (FAQs, Article Reader) */
  --container-4xl: 56rem;  /* 896px  - max-w-4xl (Hero text, Comparison) */
  --container-5xl: 64rem;  /* 1024px - max-w-5xl (Header pill, Dark CTAs) */
  --container-6xl: 72rem;  /* 1152px - max-w-6xl (LeadPortal) */
  --container-7xl: 80rem;  /* 1280px - max-w-7xl (Primary Page Grid) */

  /* === 5. Border Radii === */
  --radius-sharp: 0.25rem;      /* 4px  - rounded-sm (Forms, Footer input) */
  --radius-control: 0.75rem;    /* 12px - rounded-xl (Plan/Banner CTAs) */
  --radius-squircle-sm: 0.75rem;/* 12px - rounded-[12px] */
  --radius-squircle-md: 0.875rem;/* 14px - rounded-[14px] */
  --radius-squircle-lg: 1rem;   /* 16px - rounded-2xl */
  --radius-card-sm: 1.375rem;   /* 22px - rounded-[22px] */
  --radius-card-md: 1.5rem;     /* 24px - rounded-[24px] / rounded-3xl */
  --radius-card-lg: 1.75rem;    /* 28px - rounded-[28px] (Bento cards) */
  --radius-panel-xl: 2rem;      /* 32px - rounded-[32px] (Metrics, 3D, CTA banners) */
  --radius-pill: 9999px;        /* rounded-full (Header, Hero CTAs) */

  /* === 6. Blur & Liquid Glass Elevation Shadows === */
  --blur-glass-card: 24px;
  --blur-glass-metrics: 32px;
  --blur-glass-header: 40px;

  --shadow-header-dark: inset 0 1.5px 2px rgba(255, 255, 255, 0.25), 0 12px 40px rgba(0, 0, 0, 0.35);
  --shadow-header-light: inset 0 1.5px 2px rgba(255, 255, 255, 0.8), 0 12px 40px rgba(0, 0, 0, 0.08);
  --shadow-metrics-glass: inset 0 1.5px 3px rgba(255, 255, 255, 0.45), 0 12px 45px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.02);
  --shadow-bento-glass: 0 10px 35px -10px rgba(0, 0, 0, 0.04), inset 0 1.5px 3px rgba(255, 255, 255, 0.4);
  --shadow-bento-glass-hover: 0 24px 50px -15px rgba(255, 107, 0, 0.07), inset 0 1.5px 4px rgba(255, 255, 255, 0.5);
  --shadow-icon-squircle: inset 0 1.5px 2px rgba(255, 255, 255, 0.9), 0 6px 16px rgba(0, 0, 0, 0.04);
  --shadow-cta-orange: 0 4px 20px rgba(255, 140, 66, 0.3);
  --shadow-cta-orange-hover: 0 6px 25px rgba(255, 140, 66, 0.4);
  --shadow-cta-solar: 0 10px 25px rgba(255, 107, 0, 0.25);

  /* === 7. Motion Curves & Timings === */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 200ms;
  --duration-standard: 300ms;
  --duration-entrance: 600ms;
  --duration-reveal: 800ms;
  --duration-caret-blink: 1.05s;
}
```

*(See `/LEAN_SYSTEM_DESIGN_TOKENS.json` for the complete machine-readable JSON token specification.)*
