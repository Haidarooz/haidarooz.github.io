# Portfolio

Personal portfolio: plain HTML/CSS/JS, no build step, hosted on GitHub Pages.

## Structure
```
index.html          # all content
styles.css          # design tokens at the top (:root): --blue is the accent
script.js           # nav indicator/scrollspy, mobile menu, flip cards, services counter, reveals
assets/icons/       # Figma / Zapier / Slack / Mailchimp logos
assets/images/      # favicon (+ any images you add)
.nojekyll           # tells GitHub Pages to serve files as-is
```

Most images (profile photo, app icons, project shots, 3D shapes) are loaded from
`framerusercontent.com`, the CDN behind the original Framer site. They keep working
as long as that Framer project exists. To self-host them, download each URL into
`assets/images/` and update the `src` in `index.html`.

## Editing
- **Stack / Other Contributions:** each card is an `<li>` with a `.flip` button. The front shows the logo and name, the back shows the description.
- **Services:** each `<article class="svc">` needs `data-num` and `data-title`; the big sticky number reads from those.
- **Projects:** `<a class="project">` cards link to the case-study pages.

## Preview locally
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy
Push to `main`, then go to **Settings → Pages → Deploy from a branch → `main` / `(root)`**.
The site goes live at `https://haidarooz.github.io/Portfolio/`.
