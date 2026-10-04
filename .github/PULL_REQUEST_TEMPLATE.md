## What this changes

<!-- One or two sentences. If it fixes an open issue, add "Fixes #123". -->

## Why

<!-- The problem this solves. For a page, what in the Figma library it describes. -->

## How to check it

<!--
The quickest way for a reviewer to see it: the pages to look at on the site, or the check
that fails without the change.
-->

---

See [CONTRIBUTING.md](https://github.com/chassis-ui/figma/blob/develop/.github/CONTRIBUTING.md#what-a-pull-request-needs-before-merge)
for the details behind each of these.

- [ ] The pull request targets `develop`
- [ ] **Changeset** (`pnpm changeset`) if `site/content/` changed, naming the components or
      pages that are added, renamed or removed; an empty one (`pnpm changeset --empty`) if it
      changed but nothing is released
- [ ] `pnpm site:lint`, `pnpm check:astro` and `pnpm site:build` pass
- [ ] `pnpm site:lint:html` and `pnpm site:lint:vnu` pass on the built site, if a page or a
      component of the site changed
