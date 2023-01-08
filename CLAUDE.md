# folio.didoo.net

Plain HTML and CSS published by GitHub Pages from `main:/docs`. There is deliberately no generator,
templating or build step: don't add one. Node is only used for the dev checks.

## Structure

- `docs/index.html`: homepage, the list of all the case studies
- `docs/work/<slug>/index.html`: a case study, with its images and videos in `media/` next to it
- `docs/assets/`: the single stylesheet (`css/style.css`), `fonts/` and `img/`
- `docs/albums/<id>/`: redirects from the old Koken URLs (see below)
- `docs/404.html`, `docs/CNAME`, `docs/.nojekyll`

## CSS conventions

- Flat BEM selectors with full class names: no IDs, no nesting, no combinators, no `!important`
- Never use `&__element` style shorthands
- Separate each BEM block with a `/* ===== BLOCK NAME ===== */` comment
- Blocks: `page-header`, `page-main`, `project-intro`, `media-list`, `media-item`, `project-nav`

## Adding a case study

1. Copy an existing `docs/work/<slug>/index.html` to a new slug, and add the files to its `media/`
2. Update `<title>`, the description, `project-intro` and the `media-item` list
3. Set `width` and `height` on each image, and `loading="lazy"` on all but the first
4. Add the entry at the top of the `media-list` in `docs/index.html`
5. Update the `project-nav` of the new page and of its two neighbours: the prev/next order follows the homepage
6. Run `npm run check`

## Editing the header

The header is repeated in every page, including `404.html`: use find and replace across `docs/`.

## Old URLs

The stubs in `docs/albums/` redirect old URLs to `/work/<slug>/`. After about a year they can be deleted,
adding a small old-to-new lookup in `404.html` so that old links keep working for people.

Keep page text exactly as written, unless asked to change it.
