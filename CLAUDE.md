# folio.didoo.net

Plain HTML and CSS published by GitHub Pages from `main:/docs`. There is deliberately no generator,
templating or build step: don't add one. Node is only used for the dev checks.

## Structure

- `docs/index.html`: homepage, the list of all the case studies
- `docs/work/<slug>/index.html`: a case study, with its images and videos in `media/` next to it
- `docs/assets/`: the single stylesheet (`css/style.css`), `fonts/` and `img/`
- `docs/albums/<id>/`: redirects from the old Koken URLs (see below)
- `docs/404.html`, `docs/CNAME`, `docs/.nojekyll`, `docs/favicon.svg`, `docs/apple-touch-icon.png`
- `docs/assets/img/share.png`: the social preview image of the homepage

## CSS conventions

- Flat BEM selectors with full class names: no IDs, no nesting, no combinators, no `!important`
- Never use `&__element` style shorthands
- Separate each BEM block with a `/* ===== BLOCK NAME ===== */` comment
- Blocks: `page-header`, `page-main`, `project-intro`, `media-list`, `media-item`, `project-nav`, plus the `visually-hidden` utility

## Adding a case study

1. Copy an existing `docs/work/<slug>/index.html` to a new slug, and add the files to its `media/`
2. Update `<title>`, the description, the canonical and `og:` tags (absolute `https://folio.didoo.net` URLs,
   `og:image` is the first image), `project-intro` and the `media-item` list
3. Each `media-item` is a `<figure>`, with the caption in a `<figcaption>`. Use an empty `alt` only when the
   caption already describes the image
4. Set `width` and `height` on each image and video, `fetchpriority="high"` on the first image,
   and `loading="lazy"` on all the others
5. Add the entry at the top of the `media-list` in `docs/index.html`
6. Update the `project-nav` of the new page and of its two neighbours: the prev/next order follows the homepage
7. Run `npm run check`

## Editing the header

The header is repeated in every page, including `404.html`: use find and replace across `docs/`.

## Old URLs

The stubs in `docs/albums/` redirect old URLs to `/work/<slug>/`. After about a year they can be deleted,
adding a small old-to-new lookup in `404.html` so that old links keep working for people.

Keep page text exactly as written, unless asked to change it.
