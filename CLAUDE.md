# W10 Coffee + Deli — Next.js Website

## Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 + CSS Custom Properties (design tokens)
- **Animation**: GSAP 3 (SplitText, ScrollTrigger, parallax)
- **Smooth Scroll**: @studio-freight/lenis
- **Language**: TypeScript (strict)

## Architecture
- `app/` — Next.js App Router pages
- `app/admin/` — CMS admin panel (password: `w10admin`)
- `components/layout/` — Navbar, Footer
- `components/ui/` — CustomCursor, SmoothScroll
- `components/sections/` — Homepage sections
- `lib/siteContent.ts` — Default CMS content / data model
- `lib/SiteContext.tsx` — CMS context with undo/redo (50 steps), localStorage persistence

## Design System
Southern France palette: Bordeaux red (#8B1A2F), warm linen (#F7F3EE), Cormorant Garamond display + Satoshi body.

## Dev
```bash
npm install
npm run dev
```
