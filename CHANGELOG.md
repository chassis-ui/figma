# Changelog

Changes to the documentation of the Chassis Figma libraries at
[chassis-ui.com/figma](https://chassis-ui.com/figma/) and to the tooling of this repository, by
date. The site has no version, and nothing of the repository is published.

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
