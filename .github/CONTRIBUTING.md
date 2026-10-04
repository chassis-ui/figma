# Contributing to Chassis Figma

Thanks for taking the time to contribute. This doc covers dev setup, conventions, and what a pull
request needs before it can be merged. For an overview of the project it links to the
[README](../README.md), rather than repeating it.

## Dev setup

You need Node.js 22.12 or later (`.nvmrc` names the version that CI uses, 24), pnpm (the version
in `packageManager` of `package.json`; `corepack enable` picks it up), Git and
[Git LFS](https://git-lfs.com).

```sh
git clone https://github.com/chassis-ui/figma.git chassis-figma
cd chassis-figma
pnpm install
```

The repository is the documentation site of the Chassis Figma libraries. Nothing of it is
published to npm:

- [`site/content/figma/`](../site/content/figma/) holds one folder per component, with a page
  per tab (`variants.mdx`, `props.mdx`, `specs.mdx`, `tokens.mdx` and, for some,
  `guidelines.mdx`) and an `index.json` with what the tabs share.
- [`site/content/docs/`](../site/content/docs/) holds the guides: the setup of the libraries
  and how to design with them. [`site/data/sidebar.yml`](../site/data/sidebar.yml) lists them.
- [`site/src/`](../site/src/) holds the site's own pages, layout, shortcodes and styles.
- [`build/`](../build/) holds the scripts of a release.
- [`vendor/assets`](../vendor/) is the chassis-assets submodule, with the fonts and images of
  the site, the pictures of the components among them. `pnpm site:build` checks it out at the
  pinned commit and builds it, which needs Git LFS. `pnpm sync-submodules` moves the pin to the
  latest `app/docs`.

Run every command from the root. `pnpm dev` builds the submodule and starts the site on port 4326.

## Branch and commit conventions

`develop` is the integration branch: branch from it, and open pull requests against it. `main`
holds released versions only; pushing it deploys the site and releases the version (see
[Releases](#releases)). `staging` is for previews of the site: a maintainer pushes `develop` to
it when one is wanted, and no workflow runs on it.

Commits follow a loose `<type>(<scope>): <description>` convention:

- **Types in use**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`.
- **Scopes**: `content` for the pages of the components and the guides, `site` for the site's
  code; omitted for changes that span both or neither.

Branch names aren't templated; name yours descriptively (for example `docs/tooltip-specs`).

## Changing the pages

1. Add or change the page in `site/content/figma/<component>/` or `site/content/docs/`. A new
   guide also gets a line in `site/data/sidebar.yml`; a new component needs none, the sidebar
   lists every folder of `site/content/figma/`.
2. A picture of a component is a file of chassis-assets, in
   `source/default/docs/images/figma/components/<component>/`, in a `light` and a `dark`
   folder. Add it there, then move the submodule with `pnpm sync-submodules`. A page that names
   a picture the submodule does not have shows a broken image.
3. Link another page of this site with `[[docsref:/getting-started/library-setup/]]`: the build
   fails when the page does not exist. A relative link such as `./library-setup` does not
   resolve, since every page is served with a trailing slash.
4. Look at the result with `pnpm dev`.
5. Commit the pages with a [changeset](#changesets).

## Changing the site

The site uses the layouts and components of
[`@chassis-ui/docs`](https://github.com/chassis-ui/website/tree/main/packages/docs). Its own
pages, components and styles are in `site/src/`, and its settings in `site/config.yml`.

```sh
pnpm site:lint             # ESLint, unused Sass variables, Stylelint and Prettier
pnpm check:astro           # Types
pnpm site:build            # The same build as Vercel: vendor/assets, Astro and Pagefind
pnpm site:lint:html        # html-validate, on the built site
pnpm site:lint:vnu         # The Nu Html Checker, on the built site. Needs Java
pnpm astro:preview         # The built site, as it is deployed
```

The files that Astro builds are written to `_site/figma/static/astro/` and requested from that
path, and the shared CSS, fonts and icons from `/static/`. Keep `build.assets` and the name
patterns of `site/astro.config.ts` on the same folder.

## What a pull request needs before merge

CI runs these jobs on every pull request, and on every push to `develop`:

- **Lint**: `pnpm build:lint`, `pnpm site:lint:eslint`, `pnpm site:lint:fusv`,
  `pnpm site:lint:stylelint` and `pnpm site:lint:prettier`.
- **Type Check**: `pnpm check:astro`.
- **Site**: `pnpm site:build`, then `pnpm site:lint:html` and `pnpm site:lint:vnu`.
- **Changeset**: a change to `site/content/` has a changeset.
- **Audit**: `pnpm check:pnpm`.
- **Dependency Review**, on pull requests: no added dependency has a known vulnerability of
  moderate severity or higher.

## Changesets

A pull request that changes `site/content/`, the documentation that the version stands for, adds
a changeset:

```sh
pnpm changeset
```

It asks for the bump (patch, minor or major) and the text of the CHANGELOG entry, and writes a
Markdown file to `.changeset/`. Commit it with the change. Name the components or pages that
are added, renamed or removed.

A change that releases nothing, such as a corrected typing error, adds an empty changeset:
`pnpm changeset --empty`. A change to the site's code or to the tooling needs none.

## Releases

A release is a version commit on `develop` that reaches `main`. The checks of a commit run
once, on `develop`; pushing the same commit to `staging` or `main` doesn't run them again.

1. On `develop`, a maintainer runs `pnpm changeset:version`. It removes the changesets, bumps
   the version in `package.json`, writes the CHANGELOG entry, and copies the version to the
   badge of `README.md` and to `currentVersion` in `site/config.yml`. The maintainer reviews
   the result, commits it and pushes `develop`.
2. CI runs on that commit. The Changeset job skips the push, since it changes the version.
3. When CI has passed, the maintainer pushes the same commit to `main`. The ruleset of `main`
   requires the checks `Lint`, `Type Check` and `Site` on the commit, and blocks a force push
   and a deletion.
4. Vercel deploys the site from `main`, and the push runs `.github/workflows/release.yml`, in
   three jobs:
   - **Detect Version** reads the version and asks GitHub whether the tag `v<version>` exists.
     When it does, the workflow stops: a push to `main` without a new version releases nothing.
   - **Checks Passed** reads the check-runs of the commit by name. It stops unless `Lint`,
     `Type Check` and `Site` passed on it.
   - **Release** creates the tag and the GitHub release `v<version>`, with the CHANGELOG entry
     as its body.

`develop` and `main` are at the same commit after a release, so nothing is merged back.

A version without a CHANGELOG entry is not released. A version with a prerelease part, such as
`0.2.0-next.0`, is marked as a prerelease on GitHub.

The workflow can also be run by hand, on `main` only: a run on another branch stops in its
first job. The job names `Lint`, `Type Check` and `Site` are the required checks of the ruleset
of `main`, and they are in the `REQUIRED` list of `release.yml`: change them together.

## Using the issue tracker

The [issue tracker](https://github.com/chassis-ui/figma/issues) is for bug reports, component
requests and documentation problems of this repository. A problem with a token, a style, an
icon or an asset belongs in [that project's repository](https://github.com/chassis-ui). Report
a security vulnerability privately, as [SECURITY.md](SECURITY.md) describes.
