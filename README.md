# Caroline Wanjiku Mbuthia: portfolio site

React 19 + Vite 7, plain CSS. Built by SpenceTec and Logistics Limited.

- All text and images lists: `src/content.js`; images in `public/images/`.
- Contact details (email, phone, LinkedIn, optional Formspree id) are blank in `contact`; empty ones stay hidden.

```bash
npm install
npm run dev
npm run build        # outputs dist/
npm run deploy       # builds, then deploys to Cloudflare Workers (SPA fallback in wrangler.jsonc)
```

## Deploy on Cloudflare (from GitHub)

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Import a repository**.
2. Choose this repository, branch `main`.
3. Deploy command: `npx wrangler deploy` (it runs the build itself; the Build command can stay empty).
4. Click **Deploy**. Every push to `main` redeploys automatically.
5. Custom domain: the Worker's **Settings → Domains & Routes → Add → Custom domain**.

The Worker name is `caroline-portfolio` (set in `wrangler.jsonc`).

Source: Caroline's own CV site export (WYSIWYG Web Builder). Nothing was added beyond that content.
