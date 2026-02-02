# Next.js + Builder.io Integration Plan

This document describes how the `next-app/` folder is intended to
integrate with the existing Vite/Express application and Builder.io.

## Goals

- Reuse shared types and data from `shared/` (for example `courseData.ts`).
- Keep the existing Vite SPA and Express API as the source of truth.
- Use Next.js for SEO-focused landing pages, blog/content, and experiments.
- Allow Builder.io to manage page sections while reusing React components.

## High-Level Approach

1. **Shared types and data**  
   - The Next.js app is configured with a TS path alias `@shared/*` pointing to `../shared/*`.  
   - This allows importing `COURSE_CATALOG`, API types, and other shared contracts directly.

2. **API integration**  
   - Next.js pages should call the existing Express endpoints under `/api/*` (the same ones used by the SPA).
   - In production, you can place both apps behind a reverse proxy or deploy Next.js separately with environment variables pointing to the Express API base URL.

3. **Builder.io**  
   - Register key React components (hero, course grid, testimonials, etc.) from the Next.js app with Builder.io.  
   - Map Builder models to routes (e.g. `/`, `/courses/[slug]`) and use Builder blocks to compose sections around your core components.

4. **Deployment**  
   - Keep this repository as the canonical source in GitHub.  
   - Deploy the Vite/Express bundle to Netlify (as today).  
   - Deploy `next-app` to Vercel, also pointing back to the same GitHub repo.  
   - Builder.io targets the Vercel-deployed Next.js site for content rendering.

## Next Steps

- From `next-app/`, run `pnpm install` and add any UI libraries you want (Tailwind, Radix, etc.).
- Port selected components from `client/` into `next-app` (or publish them as a shared package).
- Wire Builder.io into the Next.js app following their official Next.js guide.
- Gradually migrate SEO-critical pages (home, key course landing pages) to Next while keeping the SPA for application flows.
