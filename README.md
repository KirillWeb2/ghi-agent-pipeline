# React Application

This project has been migrated from vanilla JavaScript to React using Vite.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

Create a production build:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
.
├── src/
│   ├── App.jsx          # Main React component
│   ├── App.css          # Component styles
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## Features

- ⚡ Built with Vite for fast development and optimized builds
- ⚛️ React 18 for modern UI development
- 🎨 CSS styling with imported stylesheets
- 🔧 ESM module support

## Migration Notes

The core functionality from `app.js` has been preserved in the `App.jsx` component while adopting React best practices for state management and component composition.
