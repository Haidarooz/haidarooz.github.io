# Portfolio

Personal portfolio — plain HTML/CSS/JS, no build step, hosted on GitHub Pages.

## Structure
```
index.html        # all content — search for "TODO" to find what to fill in
styles.css        # theme tokens at the top (:root) — change --accent to re-colour
script.js         # dark-mode toggle, footer year, scroll reveal
assets/images/    # screenshots, favicon, og.png (1200×630 social preview)
.nojekyll         # tells GitHub Pages to serve files as-is
```

## Preview locally
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy
1. Push to `main`.
2. Repo **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.
3. Live at `https://haidarooz.github.io/Portfolio/`.
   (Rename the repo to `haidarooz.github.io` to serve it at the root URL instead.)

## Adding a project
Copy any `<article class="card">…</article>` block inside `.grid` in `index.html`.
