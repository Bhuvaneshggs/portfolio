# Bhuvanesh Gopal — Cinematic Portfolio

A premium, cinematic portfolio built with **Next.js 14**, **Three.js**, **GSAP**, and **CSS Modules**.

---

## 🗂 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Main page — composes all sections
│
├── components/
│   ├── HeroSection.tsx     # Fullscreen video hero with controls
│   ├── HeroSection.module.css
│   ├── CinematicLayer.tsx  # Three.js floating bokeh particles
│   ├── AboutSection.tsx    # Bio + full skills grid (IT + DevOps)
│   ├── AboutSection.module.css
│   ├── ServicesSection.tsx # 4 numbered service cards (white bg)
│   ├── ServicesSection.module.css
│   ├── ProjectsSection.tsx # Sticky-stacking project cards
│   ├── ProjectsSection.module.css
│   ├── ContactSection.tsx  # 4 contact methods with icons
│   ├── ContactSection.module.css
│   ├── FadeIn.tsx          # IntersectionObserver fade-in wrapper
│   ├── Magnet.tsx          # Mouse-following magnetic hover
│   ├── AnimatedText.tsx    # Character-by-character text reveal
│   ├── AnimatedText.module.css
│   ├── ContactButton.tsx   # Gradient pill CTA
│   └── ContactButton.module.css
│
├── styles/
│   └── globals.css         # CSS variables, resets, fonts
│
├── public/
│   └── hero-video.mp4      # ← YOUR video goes here
│
├── next.config.js
├── tsconfig.json
├── vercel.json
└── package.json
```

---

## 🎬 Adding Your Video

1. Place your talking-head video at:
   ```
   public/hero-video.mp4
   ```
2. The hero uses it as **both**:
   - A blurred ambient background (full width, blurred)
   - A masked foreground portrait (right side, cinematic masking)

For best results: portrait orientation, good lighting, 1080p or higher.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:3000
```

---

## 🚀 Deploy to Vercel (Step by Step)

### Method 1 — Vercel CLI (Fastest)

```bash
# 1. Install Vercel CLI globally
npm i -g vercel

# 2. Inside the portfolio folder
cd portfolio

# 3. Login to Vercel
vercel login

# 4. Deploy (follow prompts — all defaults work)
vercel

# 5. For production deployment
vercel --prod
```

Your site goes live at `https://your-project.vercel.app`

---

### Method 2 — GitHub + Vercel Dashboard (Recommended)

**Step 1 — Push to GitHub**
```bash
cd portfolio
git init
git add .
git commit -m "Initial cinematic portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

**Step 2 — Connect on Vercel**
1. Go to [vercel.com](https://vercel.com) → Sign in
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub repo
5. Framework: **Next.js** (auto-detected)
6. Click **"Deploy"**

Done — Vercel auto-deploys on every `git push` from now on.

---

## 🎥 Video Hosting Note

Vercel has a **100MB file size limit** on deployments. If your video is larger:

**Option A — Use Vercel Blob (recommended)**
```bash
npm install @vercel/blob
```
Upload video via Vercel dashboard → Storage → Blob, then replace `/hero-video.mp4` in `HeroSection.tsx` with the blob URL.

**Option B — Use Cloudinary or Bunny.net**
Upload your video there and replace the `src` in `HeroSection.tsx`:
```tsx
src="https://res.cloudinary.com/YOUR_CLOUD/video/upload/hero-video.mp4"
```

---

## 🎨 Customization

| What | Where |
|------|-------|
| Name, role, tagline | `components/HeroSection.tsx` |
| Bio text | `components/AboutSection.tsx` |
| Skills list | `components/AboutSection.tsx` → `techSkills` array |
| Services | `components/ServicesSection.tsx` → `services` array |
| Projects | `components/ProjectsSection.tsx` → `projects` array |
| Contact info | `components/ContactSection.tsx` → `contacts` array |
| Colors | `styles/globals.css` → `:root` CSS variables |
| Particle count/colors | `components/CinematicLayer.tsx` |

---

## 🛠 Tech Stack

- **Next.js 14** — App Router, SSR-ready
- **React 18** — Hooks, dynamic imports
- **Three.js** — WebGL bokeh particle layer
- **GSAP** — Hero entrance animations
- **CSS Modules** — Scoped styling per component
- **TypeScript** — Fully typed

---

## 📱 Performance

- Three.js canvas is pointer-events-none (no blocking)
- `dynamic()` import for CinematicLayer (SSR-safe)
- `requestAnimationFrame` properly cancelled on unmount
- Three.js resources disposed on cleanup
- Images and video use `playsInline` for mobile
- `prefers-reduced-motion` respected in globals.css
