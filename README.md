# NeoUI

Demo de una **librería de componentes UI futurista** para dashboards de alta densidad de datos con
estética cyberpunk: botones, badges, inputs, toggles, tarjetas de métricas, tablas densas con
sparklines y snippets. Incluye **selector de acento** para mostrar el sistema de tokens.

## Stack (objetivo del producto)

React · Tailwind CSS · Framer Motion · Storybook.

Este repo contiene la **galería demo** autocontenida (React + Next.js + Tailwind).

## Ejecución local

```bash
npm install
npm run dev        # http://localhost:3000
```

## Deploy en Coolify (app única, Dockerfile)

1. New Resource → App → build pack **Dockerfile**.
2. Repo público `https://github.com/cesargarrido/neoui`, rama `main`.
3. Base Directory vacío · Dockerfile `Dockerfile` · Port `3000`.
4. Dominio propuesto: `https://neoui.evoluciondigitalia.cl`.

## Estructura

```
app/           Rutas Next (layout, página)
components/    Gallery (galería de componentes con acento dinámico)
Dockerfile     Contenedor único (Next standalone)
```
