# Changelog

Changes to the documentation of the Chassis Figma libraries at
[chassis-ui.com/figma](https://chassis-ui.com/figma/) and to the tooling of this repository, by
date. The site has no version, and nothing of the repository is published.

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
