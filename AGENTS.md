<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Repo facts

- Single Next.js 16 App Router app (not a monorepo). App code is under `src/app`; shared components in `src/components`; path alias `@/*` → `src/*`.
- No tests, no CI workflows, no formatter config. Verification = `npm run lint` → `npx tsc --noEmit` → `npm run build` (build also typechecks).
- `package.json` has no `typecheck` script; use `npx tsc --noEmit` (tsconfig is `strict`).

## Gotchas

- **Route types are generated.** `PageProps<"/…">` / `LayoutProps<"/…">` come from `.next/dev/types/routes.d.ts`, pulled in via the gitignored `next-env.d.ts`. On a fresh clone, run `npx next typegen` (or start `npm run dev` once) before `tsc`, or typecheck fails with missing names.
- **Tailwind v4 is CSS-first.** Config lives in `src/app/globals.css` (`@import "tailwindcss"`, `@theme`), wired through the `turbopack.rules` loader in `next.config.ts`. There is deliberately no `tailwind.config.*` or `postcss.config.*` — don't add one.
- **shadcn/ui uses style `base-nova`** (`components.json`): components build on `@base-ui/react`, not Radix. Add components with `npx shadcn add <name>`; they land in `src/components/ui` and are imported via `@/components/ui/*`.
- **`src/lib/utils.ts` is a re-export** of `cn` from the `cn` npm package — not the usual clsx + tailwind-merge implementation. Don't "fix" it.
- **`next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `reactCompiler`** (via `babel-plugin-react-compiler`). These change data-fetching/component rules versus stock Next — check the bundled docs rather than assuming defaults.
- **Turbopack is the bundler** for dev and build (Next 16 default); the only bundler config is `turbopack.rules` in `next.config.ts`.
- The `<!-- BEGIN:nextjs-agent-rules -->` block above is managed by `next dev`; it upserts only the marked region and preserves everything outside it, so add your own notes outside the markers.
