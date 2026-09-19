# GEN-C Portfolio

A modern React + Vite product showcase for a campus management and access-control platform called GEN-C. The project presents the platform as a polished experience for student access workflows, approvals, auditing, and administrative operations.

This app is designed as a landing-page style presentation that explains how the GEN-C system works visually through animated sections, workflow steps, and operational dashboards.

## About This Project

GEN-C is positioned as a centralized system for campus operations. It helps manage:

- Secure login and access control
- Gate pass requests and approval flows
- Dynamic delegation and authority assignment
- Special pass management
- Library audit tracking
- Student and staff workflow visibility

The interface uses a futuristic, technical visual style with dark backgrounds, neon accents, motion effects, and modular sections to communicate the idea of a secure and intelligent campus operating system.

## Project Goal

The goal of this project is to present a product story and workflow demo in a way that feels professional, modern, and technically credible. Instead of a plain static page, the app uses animated product storytelling to highlight the system architecture and day-to-day campus processes.

## How It Works

The app is built as a single-page React experience. The main structure is defined in `src/App.jsx`, which assembles several visual sections:

- `src/HeroAnimation.jsx` – Landing section with branding, intro copy, and animated system UI
- `src/WorkflowDemo.jsx` – Workflow steps explaining the flow of actions across the platform
- `src/LatecomerFeature.jsx` – Feature highlight for attendance and late-arrival handling
- `src/GatePassScene.jsx` – Scene explaining gate pass operations
- `src/SpecialPassScene.jsx` – Special access and approval workflows
- `src/LibraryAuditScene.jsx` – Audit and library workflow view
- `src/ResponsiveShowcase.jsx` – Responsive product showcase section
- `src/ParticleBackground.jsx` – Background effects and ambient motion
- `src/DelegationShift.jsx` – Visualization for dynamic authority delegation

The UI uses:

- React for component-based structure
- Framer Motion for transitions and animations
- Lucide icons for interface elements
- Vite for fast frontend development and production build

## Tech Stack

### Frontend
- React 18
- Vite
- Framer Motion
- Lucide React

### Styling
- Custom CSS in `src/index.css`
- Tailwind-inspired design patterns and utility classes

### Deployment
- GitHub Pages via `gh-pages`

## Package Information

The project uses the following scripts from `package.json`:

- `npm install` – Install project dependencies
- `npm run dev` – Start the local development server
- `npm run build` – Build the project for production
- `npm run preview` – Preview the production build locally
- `npm run deploy` – Deploy the built app to GitHub Pages

### Main dependencies

- `react` – UI library
- `react-dom` – DOM rendering for React
- `framer-motion` – Animation library
- `lucide-react` – Icons

### Development dependencies

- `vite` – Build tool and dev server
- `@vitejs/plugin-react` – React support in Vite
- `gh-pages` – Deployment to GitHub Pages

## Getting Started

1. Clone the repository
2. Open the project directory
3. Install dependencies:

```bash
npm install
```

4. Run the local app:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

6. Deploy to GitHub Pages:

```bash
npm run deploy
```

## Project Structure

```bash
GENC-Portfilo/
├── public/
├── src/
│   ├── App.jsx
│   ├── DelegationShift.jsx
│   ├── DFDVisualization.jsx
│   ├── GatePassScene.jsx
│   ├── HeroAnimation.jsx
│   ├── LatecomerFeature.jsx
│   ├── LibraryAuditScene.jsx
│   ├── ParticleBackground.jsx
│   ├── ResponsiveShowcase.jsx
│   ├── SpecialPassScene.jsx
│   ├── WorkflowDemo.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── eslint.config.js
├── README.md
└── public/
```

## Notes

This project is best understood as a product showcase and user-experience prototype rather than a full backend application. It focuses on communication, storytelling, and visual representation of a campus management system in a polished frontend experience.

If you want to expand the project further, the next steps could include:

- connecting the UI to a real backend API
- adding authentication flow
- creating admin dashboards
- integrating real database-driven records
- turning the showcase into a full SaaS product

## License

This project is currently configured as a personal portfolio/demo project and is intended for educational and presentation use.
