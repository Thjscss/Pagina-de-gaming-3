Project: simple static site (HTML + CSS + SASS)

Purpose
- Help AI coding agents be immediately productive in this repository: a small static website with an authored SASS source and compiled CSS served as static assets.

Big picture
- This is a single-page static site: `index.html` is the entry point and links to `./css/style.css`.
- Source styles live in `sass/style.scss` (SASS source) and are compiled to `css/style.css` which the HTML links to.
- Static assets (images, extra pages) belong in `img/` and `pages/` respectively.

What to edit
- Styles: change `sass/style.scss` and compile to `css/style.css` (do not directly edit `css/style.css` unless you intend to commit generated output).
- Markup/content: modify `index.html` or add new files under `pages/` and link them from `index.html`.
- Images: put new images in `img/` and reference them with relative paths (e.g. `img/my-photo.png`).

Typical workflows (no build system present)
- Dev watch compile (recommended):
  - If you have Dart Sass installed:

    sass --watch sass:css

  - Or use any SASS compiler that watches `sass/` and writes to `css/`.
- Quick preview: open `index.html` in a browser, or run a simple static server:

    npx http-server . -c-1

Project-specific conventions and gotchas
- Prefer editing `sass/style.scss` over `css/style.css`. `css/style.css` is the compiled output and may be empty in this repo.
- `index.html` currently contains a stray empty stylesheet link (`<link rel="stylesheet" href="">`) — remove it when fixing HTML to avoid unexpected behavior.
- Keep stylesheet link path exactly `./css/style.css` (relative path expected by the current HTML).
- `pages/` is present for additional HTML pages; files here are plain HTML fragments/pages and are linked manually from `index.html`.

Integration points & external deps
- There is no package.json or build config in the repo. External tools expected:
  - SASS compiler (Dart Sass or equivalent) to produce `css/style.css` from `sass/style.scss`.
  - Optional static server (e.g., `http-server`, Live Server) for local preview.

Examples (concrete edits)
- Add a new page: create `pages/about.html`, then add a link in `index.html` like `<a href="pages/about.html">About</a>`.
- Add a new image: put `logo.svg` into `img/` and reference `<img src="img/logo.svg" alt="logo">`.
- Fix styles: change variables/mixins in `sass/style.scss` and run `sass --watch sass:css` to update `css/style.css`.

Agent behavior rules
- Do not assume any JS framework or build pipeline exists; propose adding one explicitly if the task requires it and ask the user first.
- When changing CSS, prefer editing SASS source; if you modify compiled CSS, explain why and note that source may need corresponding changes.
- Keep changes minimal and focused: the project is a small static site—avoid large scaffolding unless requested.

If unclear
- Ask the user whether they want generated files (compiled CSS) committed, and whether to add a lightweight build step (npm + scripts) before adding one.

Feedback
- After applying changes, ask the user if they'd like a tiny README or a simple `package.json` with `sass` + `start` scripts added.
