# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start development server with HMR (http://localhost:5173)
npm run build    # Production build to dist/
npm run lint     # Run ESLint
npm run preview  # Preview production build locally
```

## Architecture Overview

This is a React 19 + Vite SPA for a health-focused NGO website using React Router DOM for client-side routing.

### Routing Structure

Routes are defined in `src/App.jsx` with a shared layout (Navbar + Footer wrapping all routes):
- `/` → HomePage
- `/about` → AboutUs
- `/volunteer` → VolunteerSignup

### Project Structure

```
health-ngo/
├── public/                     # Static assets served as-is
│   └── vite.svg
├── src/
│   ├── assets/                 # Bundled assets (images, SVGs)
│   │   └── react.svg
│   ├── components/             # Shared/reusable UI components
│   │   ├── Navbar.jsx          # Sticky navigation with mobile hamburger menu
│   │   ├── Navbar.css
│   │   ├── Footer.jsx          # Site footer with links and social icons
│   │   └── Footer.css
│   ├── pages/                  # Route page components
│   │   ├── HomePage.jsx        # Landing page with hero, impact stats, programs
│   │   ├── HomePage.css
│   │   ├── AboutUs.jsx         # Mission, vision, values, team section
│   │   ├── AboutUs.css
│   │   ├── VolunteerSignup.jsx # Volunteer form with skills/availability
│   │   └── VolunteerSignup.css
│   ├── hooks/                  # Custom React hooks
│   │   └── useScrollAnimation.js  # Intersection Observer scroll animations
│   ├── App.jsx                 # Root component with React Router setup
│   ├── App.css                 # Main layout styles
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles, CSS variables, animations
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint flat config
├── package.json                # Dependencies and scripts
└── package-lock.json           # Dependency lock file
```

### Key Patterns

**Scroll Animations:** The `useScrollAnimation` hook uses Intersection Observer to trigger CSS animations when elements enter the viewport. Two exports:
- `useScrollAnimation()` - Single element, returns `[ref, isVisible]`
- `useMultipleScrollAnimation(count)` - Multiple elements with callback refs

**Styling System:** CSS variables defined in `src/index.css` provide:
- Glassmorphism effects (`--glass-*` variables)
- Primary color palette (green: `#10b981`)
- Animation classes: `.animate-fade-in`, `.animate-fade-up`, `.animate-slide-right`, `.animate-slide-left`, `.animate-scale-up`
- Respects `prefers-reduced-motion`

**Component Pattern:** Each page/component has a paired `.jsx` and `.css` file. Components use local state with `useState`; no global state management.

**New Page Components:** When creating a new page component, add a navigation link to the Navbar (`src/components/Navbar.jsx`) and optionally to the Footer.
