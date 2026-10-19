# Changelog

Changes to the documentation of the Chassis Figma libraries at
[chassis-ui.com/figma](https://chassis-ui.com/figma/) and to the tooling of this repository, by
date. The site has no version, and nothing of the repository is published.

## 2026-10-19

### Changed

- The site is built with `@chassis-ui/docs` 0.10, `@chassis-ui/css` 0.10 and
  `@chassis-ui/tokens` 0.10. `vendor/assets` moves to 4382de9 of `app/docs`: the pages link one
  font stylesheet, `/static/fonts/fonts.css`, and load `ui-latin.woff2` where they loaded
  `text-latin.woff2`. The navigation bar and the footer inline the new Chassis logo, in the colors
  of the theme, and the search of the header is narrower between 1024 and 1280 px.
- Headings and titles are in the display family, Montserrat, the default tokens have new base
  colors, and buttons, badges and the other components lose their background gradient.
- The styles of the site read the `--cx-*-ui-*` custom properties, which css 0.10 names in place
  of `--cx-*-text-*`, and the "On this page" label of a component page uses `.font-h6`.

## 2026-10-12

### Changed

- The site is built with `@chassis-ui/docs` 0.8, and its pages load their fonts from
  `/static/fonts/`, the docs build of chassis-assets, no longer from Google Fonts: no page requests
  `fonts.googleapis.com` or `fonts.gstatic.com`. `vendor/assets` moves to 784d885, chassis-assets
  0.3.1, and `pnpm vendor` and `pnpm sync-submodules` build its fonts with
  `--subset latin --subset latin-ext --subset symbols2 --split`. A page loads `text-latin.woff2`
  and `code-latin.woff2`, with `code-symbols2.woff2` for the box drawing characters of the file
  trees in code blocks, which a fallback font draws narrower than the code around them. Text in
  Inter has the width it had. Italic text is drawn with the italic of Inter, where the upright
  font was slanted.
- **Code**: code is 2.6% wider. The Fira Code of chassis-assets, version 6.002, has an advance of
  0.615 em, where that of Google Fonts has 0.6 em, and a lower line. A line with inline code is
  half a pixel taller: the tokens pages are 4 to 23 px taller, and the guides with code blocks up
  to 18 px, or 75 px on a phone, where more inline code wraps.

## 2026-10-08

### Changed

- The site is built with `@chassis-ui/css` 0.7 and `@chassis-ui/tokens` 0.7. The navigation bar,
  the footer and the sections of the home page have a page margin of 1rem, and 1.5rem from
  768 px, where it was 0.75rem. The gap of a grid is 1rem, and 1.5rem from 768 px, where it grew
  with the screen from 0.5rem to 2.5rem: the footer columns and the section headers of the home
  page move by up to 21 px, and the home page is 20 to 28 px taller. Subtle text is a little
  stronger, and the dark theme has lighter inline code and lighter warning and info callouts. The
  guides and the pages of a component are where they were.

## 2026-10-07

### Changed

- The site is built with `@chassis-ui/css` 0.6 and `@chassis-ui/docs` 0.7, and its own pages use
  the CSS grid, `.grid` with `col-span-*`, in place of the flexbox grid that css 0.7 removes. The
  section headers of the home page are a few pixels narrower from 1024 px, and the footer columns
  move by up to 20 px.
- **Component Libraries**: the components are listed in two columns from 576 px, with a gap
  between the cards. The page named classes that Chassis CSS no longer has, so the cards were in
  one column and touched each other.

### Fixed

- **Component pages**: the pages of a component have the page margin of 1rem below 1024 px, as the
  guides have. Their text touched the edge of the screen, and the properties and specifications
  pages scrolled sideways by 16 px on a phone.
- **Component pages**: the close button of the sidebar drawer closes it. It did nothing on the
  pages of a component.

## 2026-10-05

### Changed

- The repository releases nothing. The release workflow, the Changeset job of CI, the changesets
  and the scripts of a release are gone, and `package.json` is private. A change goes to
  `develop`, then the same commit to `staging` and `main`, and Vercel deploys the site. See
  [Deploying the site](.github/CONTRIBUTING.md#deploying-the-site).
- The images of the examples have alt text made from the name of the image, such as "Alert screen
  size large". It read "undefined example image".
- The home page is titled "Chassis - Figma · Tokenized Components for Scalable Design Systems",
  the title and the subtitle of `config.yml`, with `@chassis-ui/docs` 0.6.3. It was "Chassis
  Figma - Tokenized Figma Component System · Chassis - Figma".

### Fixed

- **Images**: `vendor/assets` moves to def4a90, which has `list-item-text-input-active` and
  `table-row-type-odd`, the two images that the list and table variants pages named without a
  file. Every image name of the content now has a file. The commit removes
  `table-row-type-data`, which no page names, and changes `list-item-text-input-inactive`
  (light) and `table-row-type-edit` (dark).
- **Alert**: the specifications page shows the images of the alert window and the alert screen,
  `alert-window-specs` and `alert-screen-specs`. It named `alert-window`, a file that is not
  part of the library images, and `alert-screen`, which has no file.

## 2026-10-04

### Added

- The first release of the documentation of the Chassis Figma libraries, 0.1.0, at
  [chassis-ui.com/figma](https://chassis-ui.com/figma/):
  - **Getting Started**: an introduction, the library setup, and the tokens, asset, component and guide libraries
  - **Design with Chassis**: working with themes, using page templates, updating the libraries and exporting assets
  - **Components**: 37 components, each with its variants, properties, specifications and tokens
  - **Site**: built with `@chassis-ui/docs` 0.6, with a Pagefind index under `/figma/pagefind/` that the search of chassis-ui.com reads
