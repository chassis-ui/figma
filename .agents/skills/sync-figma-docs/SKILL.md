---
name: sync-figma-docs
description: 'Sync the Chassis UI Figma component docs in site/content/figma/{component}/ (variants.mdx, props.mdx, specs.mdx, tokens.mdx) with the component''s page in the Figma file cx.components.UI. Use when asked to update, sync, check or create a component''s Figma docs, or to make its variants, props, specs or tokens match Figma. Takes a component name (badge, button-solid) or a Figma URL of its page, optionally followed by one tab.'
argument-hint: '<component | figma-url> [variants|props|specs|tokens]'
---

# Sync Figma component docs

Makes the MDX tabs of one component in `site/content/figma/{component}/` say exactly what the
`Docs` section of its page in **cx.components.UI** says. Figma is the source; the MDX files
follow it.

Every component is a page of that one file:
`https://www.figma.com/design/c40DHaakYrjCNK1ugIf1H2/cx.components.UI` (file key
`c40DHaakYrjCNK1ugIf1H2`). A component's `index.json` names its page in `figmaPage`.

## Rules

- **Write only what you read from Figma in this run.** Every heading, description, property,
  value, token and flag comes from Figma output you have in front of you. If something is
  unreadable or ambiguous, leave the existing MDX as it is and report it. Never fill a gap from
  a similar component or a pattern.
- **Read Figma yourself; don't hand it to a subagent.** A summary of Figma output loses the
  exact token paths and values the docs need.
- **Do not store Figma node ids** anywhere. Find them fresh each run; they change when the file
  is reorganized. Find a page by its name.
- Touch only `variants.mdx`, `props.mdx`, `specs.mdx` and `tokens.mdx` (and `index.json` for a
  new component). `guidelines.mdx` is out of scope.

## Tools

The Figma MCP server's `get_metadata`, `use_figma`, `get_design_context` and `get_screenshot`.
Each agent prefixes them in its own way (`mcp__figma__get_metadata`, `mcp_figma_get_metadata`,
...). Follow the server's own instructions: the remote server (`mcp.figma.com`) wants
`create_session` with the file key before the first file call, the `figma-use` skill loaded
before `use_figma`, and the `figma-design-to-code` skill before `get_design_context`. If no Figma
tools are available, stop and say so.

## Procedure

### 1. Resolve the component

- **A name** (`badge`): read `figmaPage` from `site/content/figma/badge/index.json`.
- **A Figma URL**: its `node-id` (`10-31985` is the node `10:31985`) is usually a page id from
  the page list (step 2). Find the folder whose `index.json` has that page's name as
  `figmaPage`. If the node isn't a page, ask for the component name. For a branch URL,
  `/design/:fileKey/branch/:branchKey/`, use the branch key as the file key.
- **No folder yet**: this is a new component. See
  [component-mapping.md](./references/component-mapping.md) for the folder name and the
  `index.json` to create.
- A tab after the name or URL limits the sync to that tab. Otherwise sync all four.

### 2. Find the Docs frames

1. `get_metadata` with the file key and no node id: it lists the pages. Take the one named
   like `figmaPage`.
2. `get_metadata` on that page. It is large (the output may be saved to a file for you to
   search): find the section named `Docs` and its frames `Variants`, `Props`, `Specs` and
   `Tokens`. Form Check and Form - Outline also have `Props - Form Input` and no `Tokens`.
3. Ignore every node with `hidden="true"`: Figma keeps old versions of cards there.

If your server can't list pages, ask the user for a link to the component's page. The
structure inside each frame, and how to split a large frame, is in
[figma-structure.md](./references/figma-structure.md).

### 3. Read each frame

**With `use_figma`** (preferred): run [scripts/read-docs-frame.js](./scripts/read-docs-frame.js)
once per frame, with `PAGE` and `FRAME` set at its top. It only reads. It prints the frame in
order: each block, its exact text, which values are dimmed (opacity below 1) or bold, and the
flag of every token, from the context variable its color is bound to.

**Without `use_figma`**: call `get_design_context` on the frames, or on their parts when a frame
is large (each `Section` of Variants, each `Component Spec Card` of Specs, each
`Component Theming` group of Tokens). Keep the screenshot: in this output **token flag colors
are only in the screenshot**, not in the code.

Then check what the cards may leave out:

- **Props**: a `Component Prop Card` may not show every value. Compare its values with the
  variant options and defaults of the component sets on the page
  (`componentPropertyDefinitions` of each `COMPONENT_SET`). When they disagree, keep the values
  the component has and report the card.
- **Placeholders**: text Figma left as a template (`dependency: condition-1, condition-2`) is not
  content. Keep what the MDX has and report it.

### 4. Update the MDX

Read the existing tab, compare it with what you read, and change only what differs. The
paragraph before the first `##` of a tab may not be in Figma (look in the frame's
`Spec Header`); when it isn't, keep the existing one. For a new component, start from the
templates in [assets/](./assets/).

The format of each tab is in [mdx-format.md](./references/mdx-format.md). Read it before
writing. `badge` is the reference for a page with one component, `alert` and `card` for a page
with several.

### 5. Check

Run both from the repository root, and fix every error they report in the tabs you changed:

```sh
node .agents/skills/sync-figma-docs/scripts/check.mjs {component}
pnpm exec prettier --write site/content/figma/{component}
```

`check.mjs` checks the rules in `mdx-format.md` that a script can: no frontmatter, `#` heading
or `---`; definition lists and variant indicators; token flags; spec numbering; shortcode
attributes and tags; and that every image exists. Image checks need `pnpm vendor` to have run.

### 6. Report

For each tab: what changed, and anything you left alone because Figma was unclear. List images
the docs need that don't exist; they come from a release of `chassis-ui/website-assets` and
can't be made here. If a reader of the site would notice the change, add a line to
`CHANGELOG.md` under the date, as `.github/CONTRIBUTING.md` asks.
