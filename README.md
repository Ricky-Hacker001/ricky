# RICKY — I Build Weird Things

A premium, cinematic 3D cyber-engineering portfolio for **Ricky** — a Tamil
engineer working across **cybersecurity, full-stack, AI and electronics**.

The site is itself one of Ricky's engineering projects: a dark, technical,
award-level interface with a real-time 3D engineer avatar, a virtual
electronics workbench, a security-operations console and live GitHub data.

> Build. Break. Explain. Repeat.

## Stack

- **React 18 + TypeScript + Vite**
- **Tailwind CSS** (design tokens in `src/index.css`)
- **Framer Motion** — UI animation
- **Three.js · React Three Fiber** — hero avatar + hardware lab (lazy-loaded)
- **Lucide** icons · **Prism** (blog code highlighting)

## Run

```bash
npm install
npm run dev          # http://localhost:8080
npm run build        # production build → dist/
npm run preview      # serve the production build
```

## Performance & 3D strategy

Heavy 3D is confined to two places — the **hero avatar** and the **hardware
lab** — and both are lazy-loaded only when needed:

- **Device tiering** (`src/lib/device.ts`): `high` / `low` / `none`. Weak
  devices, software renderers, save-data, no-WebGL and `prefers-reduced-motion`
  all fall back to an optimised static image + CSS/SVG. Force a tier for
  testing with `?3d=high|low|none`.
- Three.js and the GLB/Draco/KTX2 loaders are split into their own chunks and
  fetched on idle; render loops **pause off-screen** (IntersectionObserver +
  `document.hidden`) and adapt resolution to the measured frame-time.
- A static avatar render (`public/images/avatar-fallback.webp`) paints first
  and cross-fades to the live canvas once it has drawn a frame.
- Everything else (project tilt, skill constellation, security console,
  backgrounds) is CSS / SVG / Framer Motion — no WebGL.

### Optional production avatar

The hero uses a procedural engineer by default. To swap in a real model, drop a
Draco-compressed GLB (KTX2 textures supported) into `public/models/` and set
`AVATAR.modelUrl` in `src/data/profile.ts`. It loads progressively and falls
back to the procedural avatar on any error.

## Structure

```
src/
  components/
    3d/          avatar, workstation, devices, hardware bench, materials
    hero/ about/ skills/ projects/ hardware/ cyber/ experience/ content/ contact/
    navigation/ system/ ui/ blog/
  data/          profile · projects · skills · experience · hardware · security · social · github · blogs
  hooks/ lib/    device detection, pointer, reveal, github fetch
  pages/         Index · Blog · BlogDetail · NotFound
```

All content lives in `src/data/*` — the single source of truth. Projects link
to real repositories on **github.com/Ricky-Hacker001**; nothing is invented.

Built in public by [Ricky-Hacker001](https://github.com/Ricky-Hacker001).
