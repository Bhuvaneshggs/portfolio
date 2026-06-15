# Bhuvanesh Gopal — Cinematic Portfolio

A premium, Apple-level cinematic portfolio built with **Next.js 14**, **Three.js**, **GSAP**, and **CSS Modules**. Designed to feel immersive, emotional, and award-winning — not flashy.

---

## ✨ Hero Section — What Was Built

The hero is the centrepiece of this portfolio. Here's everything it does:

### 🎬 Dual-Video Cinematic Background
- The **same video plays twice simultaneously**
- One copy is blurred (`blur(40px) saturate(1.3)`) and fills the entire background as an ambient layer
- The other plays sharp on the right side of the screen as the foreground talking-head
- A multi-layer CSS gradient (left vignette + bottom vignette + top vignette + warm orange glow) blends the video seamlessly into the dark scene

### 🌟 Three.js Bokeh / Particle Layer
- **Two independent particle systems** float above the video:
  - Large dreamy bokeh — 110 particles, 128px soft-circle texture, slow drift
  - Small crisp sparkles — 200 particles, 64px texture, faster shimmer
- **6-colour weighted palette**: warm orange (28%), orange-light (22%), warm white (25%), peach (12%), near-white (8%), rare monitor-blue (5%)
- Additive blending for that cinematic glow feel
- Sine-wave oscillation with unique phase shifts per particle — nothing moves in sync
- **Mouse parallax** — camera follows cursor with smooth lerp easing
- Touch support for mobile parallax
- All Three.js resources properly disposed on unmount

### 🎥 Video Controls (Glassmorphism Dock)
- Top-right glassmorphism dock with **Play/Pause** and **Mute/Unmute** buttons
- Backdrop blur + orange hover glow on each button
- **"Tap for sound" badge** pulses with a ring animation and auto-hides after 4 seconds (or immediately when the user interacts)
- Mute state persists across re-renders via a module-level variable (`globalMuted`)
- IntersectionObserver mutes both videos when the hero scrolls out of view (saves CPU/battery)

### ✍️ GSAP Entrance Animations
- Controls dock fades down from above
- Tagline slides up with a blur-to-sharp reveal (`filter: blur(8px)` → `blur(0)`)
- First and last name slide up from 100px below with a skew (`skewY: 5deg`) — cinematic film-title feel
- Role, CTA buttons, social icons, and scroll indicator cascade in sequence
- Total orchestrated timeline: ~3 seconds, all GPU-composited

### 📜 Content Layout
- Pulsing orange dot beside the uppercase tagline
- Giant Bebas Neue name in two stacked lines with an orange gradient fill
- Role + tech stack line in JetBrains Mono
- Three CTA buttons: primary (orange), secondary (glass), resume download
- Row of 7 social icon links in glassmorphism circles
- Animated scroll indicator at bottom-centre with a vertical pulse line

---

## 🗂 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx               # Root layout, metadata, fonts
│   ├── page.tsx                 # Main page — composes all sections
│   ├── error.tsx                # Error boundary
│   ├── not-found.tsx            # 404 page
│   ├── forbidden/page.tsx       # 403 page
│   └── api/contact/route.ts     # Contact form API (Nodemailer + Gmail)
│
├── components/
│   ├── HeroSection.tsx          # ★ Cinematic hero — dual video, controls, GSAP
│   ├── HeroSection.module.css   # ★ Hero styles — ambient layer, glass buttons
│   ├── CinematicLayer.tsx       # ★ Three.js dual bokeh particle system
│   ├── AboutSection.tsx         # Bio + skills grid
│   ├── AboutSection.module.css
│   ├── ServicesSection.tsx      # 4 numbered service cards
│   ├── ServicesSection.module.css
│   ├── ProjectsSection.tsx      # Sticky-stacking project cards
│   ├── ProjectsSection.module.css
│   ├── ExperienceSection.tsx    # Timeline of work history
│   ├── ExperienceSection.module.css
│   ├── ContactSection.tsx       # Contact methods + form
│   ├── ContactSection.module.css
│   ├── FadeIn.tsx               # IntersectionObserver fade-in wrapper
│   ├── Magnet.tsx               # Magnetic mouse-following hover
│   ├── AnimatedText.tsx         # Character-by-character text reveal
│   ├── AnimatedText.module.css
│   ├── ContactButton.tsx        # Gradient pill CTA button
│   ├── ContactButton.module.css
│   ├── CustomCursor.tsx         # Custom cursor (desktop)
│   └── CustomCursor.module.css
│
├── styles/
│   └── globals.css              # CSS variables, resets, fonts, scrollbar
│
├── public/
│   ├── hero-video.mp4           # ← Your talking-head video goes here
│   ├── Bhuvanesh Gopal Resume.pdf
│   ├── icon.png
│   ├── logo.jpg
│   ├── favicon.ico
│   └── apple-touch-icon.png
│
├── next.config.js
├── tsconfig.json
├── vercel.json
└── package.json
```

> Files marked ★ were rewritten in the cinematic upgrade.

---

## 🎬 Adding Your Video

Place your talking-head video at:
```
public/hero-video.mp4
```

The hero uses it **twice simultaneously**:
1. Blurred ambient background — full screen, `blur(40px)`
2. Sharp foreground portrait — right 58% of screen, cinematic vignette edges

**Best results:** portrait or landscape both work, good lighting, 1080p+, keep it under 80MB for Vercel's limit.

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in your Gmail credentials (for contact form)
cp .env.local.example .env.local

# 3. Start dev server
npm run dev

# 4. Open in browser
open http://localhost:3000
```

---

## 🔑 Environment Variables

Create `.env.local` from the example:

```env
GMAIL_USER=your@gmail.com
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
CONTACT_TO_EMAIL=your@gmail.com
```

> The Gmail App Password is a 16-character password generated at myaccount.google.com → Security → App Passwords. Do **not** use your regular Gmail password.

---

## 🚀 Deploy to Vercel

### Option A — Vercel CLI (fastest)

```bash
npm i -g vercel
cd portfolio
vercel login
vercel --prod
```

### Option B — GitHub + Vercel Dashboard (recommended for auto-deploys)

**Step 1 — Push to GitHub**
```bash
git init
git add .
git commit -m "Initial cinematic portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

**Step 2 — Connect on Vercel**
1. Go to [vercel.com](https://vercel.com) → Sign in
2. Click **Add New Project** → **Import Git Repository**
3. Select your repo — framework auto-detects as Next.js
4. Add your environment variables under **Environment Variables**
5. Click **Deploy**

Vercel auto-deploys on every `git push` to `main` from here on.

**Step 3 — Add environment variables in Vercel Dashboard**
Settings → Environment Variables → add `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `CONTACT_TO_EMAIL`

---

## 📦 Video Hosting (if video > 80MB)

Vercel has a **100MB deployment limit**. For large videos:

**Option A — Vercel Blob**
```bash
npm install @vercel/blob
```
Upload via Vercel Dashboard → Storage → Blob, then replace the `src` in `HeroSection.tsx`:
```tsx
src="https://your-blob-url.vercel-storage.com/hero-video.mp4"
```

**Option B — Cloudinary**
```tsx
src="https://res.cloudinary.com/YOUR_CLOUD/video/upload/hero-video.mp4"
```

**Option C — Bunny.net CDN** (cheapest for video)
Upload and use the pull-zone URL as the `src`.

---

## 🎨 Customisation Quick Reference

| What to change | File | What to edit |
|---|---|---|
| Name, tagline, role | `components/HeroSection.tsx` | Top of component, JSX content |
| Social links | `components/HeroSection.tsx` | `SOCIALS` array |
| CTA button links | `components/HeroSection.tsx` | `href` on `.ctaPrimary` / `.ctaSecondary` |
| Particle count | `components/CinematicLayer.tsx` | `buildSystem(...)` first argument |
| Particle colours | `components/CinematicLayer.tsx` | `palette` array + `weights` array |
| Colour theme | `styles/globals.css` | `:root` CSS variables |
| Bio text | `components/AboutSection.tsx` | Paragraph content |
| Skills | `components/AboutSection.tsx` | `techSkills` array |
| Services | `components/ServicesSection.tsx` | `services` array |
| Projects | `components/ProjectsSection.tsx` | `projects` array |
| Experience | `components/ExperienceSection.tsx` | `experiences` array |
| Contact info | `components/ContactSection.tsx` | `contacts` array |

---

## 🛠 Tech Stack

| Technology | Version | Used for |
|---|---|---|
| Next.js | 14.2 | App Router, SSR, routing |
| React | 18 | Components, hooks |
| Three.js | 0.165 | WebGL bokeh particle layer |
| GSAP | 3.12 | Hero entrance timeline |
| CSS Modules | — | Scoped per-component styles |
| TypeScript | 5 | Full type safety |
| Nodemailer | 6.9 | Contact form emails |
| Framer Motion | 11 | Section scroll animations |

---

## 📱 Performance Notes

- `CinematicLayer` loaded via `dynamic(..., { ssr: false })` — never runs on the server
- Three.js `requestAnimationFrame` properly cancelled on unmount
- All Three.js geometries, materials, and textures disposed on cleanup
- Particle count auto-halved on mobile (`window.innerWidth < 768`)
- Both videos muted via IntersectionObserver when hero is off-screen
- `prefers-reduced-motion` cuts all animations to 0.01ms in `globals.css`
- Custom cursor disabled on touch devices (only activates on `hover: hover` + `pointer: fine`)
- GPU-composited animations only (`transform`, `opacity`, `filter`) — no layout thrash
