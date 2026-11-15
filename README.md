# Eiscafe Venezia Premium Website

2027 Premium Website für Eiscafe Venezia Magstadt — WebGL, GSAP, Dopamine Effects, SEO-Funnel.

## 🚀 Tech Stack

- **Astro 4** — Static Site Generator, Island Architecture
- **Three.js** — WebGL Hero Background (Partikel-System)
- **GSAP + ScrollTrigger** — Scroll-Animationen, Reveal-Effekte
- **Lenis** — Smooth Scrolling
- **Tailwind CSS** — Utility-First Styling mit Custom Design Tokens
- **TypeScript** — Type Safety

## 🎨 Design System

### Farben (Venezia Palette)
- `venezia.cream` `#FFF8F0` — Hintergrund
- `venezia.warm` `#FFE8D0` — Warmton
- `venezia.peach` `#FFD4B8` — Pfirsich
- `venezia.coral` `#FF9F7A` — Koralle (Primary)
- `venezia.deepCoral` `#E86C4A` — Tiefkoralle (Accent)
- `venezia.chocolate` `#4A3428` — Schokolade (Text)
- `venezia.darkChocolate` `#2D1F16` — Dunkel (Footer)
- `venezia.mint` `#A8E6CF` — Minze (Vegan)
- `venezia.pistachio` `#8FD4A8` — Pistazie
- `venezia.gold` `#D4A843` — Gold (Highlight)

### Typografie
- **Display:** Fraunces (Variable, 9-144opsz)
- **Sans:** Inter (Variable)
- **Mono:** JetBrains Mono

### Fluid Spacing & Type
- `fluid-1` bis `fluid-24` — Responsive Spacing
- `fluid-xs` bis `fluid-6xl` — Responsive Typography

## ⚡ Features

### WebGL Hero (Three.js)
- 800 Partikel in Cremetönen
- Maus-/Touch-Interaktion (Parallax)
- Scroll-Parallaxe
- 60fps auf Mobile (reduzierte Partikelanzahl)
- `prefers-reduced-motion` respektiert

### GSAP ScrollTrigger Animations
- Staggered Reveal (Fade + Slide Up)
- Counter-Animation für Stats
- Parallax Hero Background
- Hover-Lift auf Flavor Cards
- Smooth Scroll via Lenis

### SEO & Performance
- Schema.org `IceCreamShop` + `Restaurant`
- FAQ/Review/Menu Structured Data
- hreflang (de/en/it)
- AVIF/WebP Images mit `srcset`
- Preload Hero Image + Fonts
- Bundle < 150KB JS gzipped
- Core Web Vitals Target: LCP < 2.5s, CLS < 0.1, INP < 100ms

### Accessibility
- Semantic HTML5
- ARIA Labels & Roles
- Focus Visible States
- Skip Link
- `prefers-reduced-motion`
- Color Contrast AA/AAA

## 📁 Projektstruktur

```
premium-site/
├── public/
│   ├── images/
│   │   ├── flavors/           # Flavor Images (AVIF/WebP)
│   │   ├── about/             # About Section Images
│   │   ├── og-image.webp      # Open Graph Image
│   │   └── placeholder.webp   # Fallback
│   ├── icons/                 # PWA Icons
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   ├── manifest.webmanifest
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Header.astro       # Navigation, Lang-Switch, Mobile Menu
│   │   ├── Hero.astro         # Three.js Hero + CTA
│   │   ├── FlavorCard.astro   # Flavor Card Component
│   │   ├── Menu.astro         # Filterable Flavor Grid
│   │   ├── About.astro        # Story + Values
│   │   ├── Location.astro     # Map + Hours + Contact
│   │   ├── Contact.astro      # Form + Validation
│   │   └── Footer.astro       # Links, Newsletter, Social
│   ├── content/
│   │   ├── flavors.ts         # 18 Flavors mit Details
│   │   └── site.ts            # Site Config, Schema, Hours
│   ├── layouts/
│   │   └── BaseLayout.astro   # HTML Shell, SEO, Fonts
│   ├── pages/
│   │   ├── index.astro        # Homepage
│   │   ├── 404.astro
│   │   ├── sitemap-index.xml.ts
│   │   └── api/
│   │       ├── contact.ts
│   │       └── newsletter.ts
│   ├── scripts/
│   │   └── reveal.ts          # GSAP Init
│   └── styles/
│       └── global.css         # Tailwind + Custom Utilities
├── astro.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🛠 Installation & Development

```bash
cd premium-site
npm install
npm run dev          # http://localhost:4321
npm run build        # Production Build in ./dist
npm run preview      # Preview Build
```

## 📸 Bilder hinzufügen

Ersetzen Sie die Platzhalter in `public/images/flavors/` durch echte Fotos:

```
public/images/flavors/
├── stracciatella.webp
├── pistachio.webp
├── hazelnut.webp
├── dark-chocolate.webp
├── vanilla.webp
├── fior-di-latte.webp
├── mango.webp
├── strawberry-basil.webp
├── lemon-mint.webp
├── chocolate-chili.webp
├── coffee.webp
├── zuppa-inglese.webp
├── vegan-chocolate.webp
├── vegan-strawberry.webp
├── rhubarb.webp
└── chestnut.webp
```

**Empfohlene Specs:**
- Format: AVIF (Primary) + WebP (Fallback)
- Größe: 800x800px (1:1)
- Qualität: 80-85%
- Benennung: kebab-case wie Flavor-ID

## 🌐 Deployment

### Statisches Hosting (Netlify, Vercel, Cloudflare Pages)
```bash
npm run build
# Output: ./dist
```

### Apache/Nginx
```nginx
# Nginx Config
location / {
    try_files $uri $uri/ /index.html;
}
# Gzip/ Brotli Compression aktivieren
# Cache-Control für Assets: 1 Jahr
```

## 🔧 Anpassung

### Farben ändern
`tailwind.config.ts` → `theme.extend.colors.venezia`

### Flavor hinzufügen
`src/content/flavors.ts` → `flavors` Array erweitern

### Öffnungszeiten ändern
`src/content/site.ts` → `siteConfig.hours`

### Schema.org anpassen
`src/content/site.ts` → `siteConfig.schema`

## 📊 Performance Budget

| Metric | Target |
|--------|--------|
| Total JS (gz) | < 150 KB |
| Total CSS (gz) | < 30 KB |
| Hero Image | < 100 KB (AVIF) |
| Fonts (woff2) | < 50 KB |
| LCP | < 2.5 s |
| CLS | < 0.1 |
| INP | < 100 ms |
| Lighthouse Score | > 95 |

## ♿ Accessibility Checklist

- [x] Semantic HTML
- [x] ARIA Labels
- [x] Focus Visible
- [x] Skip Link
- [x] Color Contrast
- [x] Reduced Motion
- [x] Alt Texts
- [x] Form Labels
- [x] Error Handling
- [x] Language Declaration

## 📝 Lizenz

Entwickelt für Eiscafe Venezia Magstadt. Alle Rechte vorbehalten.