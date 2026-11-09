# The Figma file

Every component is a page of one Figma file, **cx.components.UI**:
`https://www.figma.com/design/c40DHaakYrjCNK1ugIf1H2/cx.components.UI` (file key
`c40DHaakYrjCNK1ugIf1H2`). This page describes what a component page looks like through the
Figma MCP server, and what each part becomes in MDX. Checked on the Badge page.

## Finding a component's docs

`get_metadata` with only the file key lists the pages:

```
- 8:1326: Cover
- 2129:16840: Readme
- 10:2717: ❖ COMMON
- 10:23395: Accordion
- 10:27220: Alert
- 10:31985: Badge
...
- 35:169680: ❖ MOBILE
- 35:131319: Mobile Alert
...
- 10:2716: ❖ ASSETS
- 10:5656: App Icon
...
```

Take the page whose name is the `figmaPage` of the component's `index.json`. Page names don't
always match folder names (`Nav - Tab` is `tab`, `Datepicker` is `date-picker`). Pages under
`❖ ASSETS` are building blocks with no docs.

A component page has two top-level sections: the component sets, and a section named **`Docs`**
with a frame per tab:

```
canvas  Badge
├── section            → the components (not synced)
└── section "Docs"
    ├── frame "Variants"            → variants.mdx
    ├── frame "Props"               → props.mdx
    ├── frame "Props - Form Input"  → props.mdx too (Form Check, Form - Outline): match its
    │                                  `Spec Meta` titles with the `##` sections there
    ├── frame "Specs"               → specs.mdx
    └── frame "Tokens"              → tokens.mdx
```

`get_metadata` on a whole page is too large to read (over 100,000 characters for Badge). Read
the page's metadata only to find the `Docs` section and its frames, then call `get_metadata` on
each frame you sync. A frame that isn't there (Form Check and Form - Outline have no `Tokens`)
means its tab is left as it is; say so in the report.

Pages with a `Docs` section but no folder in `site/content/figma/` yet: `Nav - Segment` and
`Mobile Button`. Pages with no `Docs` section: `Map`, `Page Title`, `Toggle Button`,
`Mobile Section`, `Mobile Sheet`, `Mobile Keyboard`, `Mobile System`.

Node ids change when the file is reorganized. Find them each run, never store them. Node ids
from metadata are `X:Y`; ids in a URL are `X-Y`. Both work as `nodeId`.

**Skip every node with `hidden="true"`.** Pages keep old versions of cards as hidden siblings
of the visible ones, with the same names.

## Inside a frame

Every frame has a `Page Header` (with a `Spec Header`), a content frame and a `Page Footer`.
The content frame's name varies (`Page Content`, `Frame 46`, ...): it is the one between the
header and the footer. Only the content frame is synced, plus the intro paragraph if the
`Spec Header` has one.

The building blocks inside the content frame:

| Figma node                                                       | MDX                                                                                                                                                                                                                                               |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Spec Meta` (title + body)                                       | a heading and its paragraph, word for word: `##` for the first `Spec Meta` on the way down, `###` for one nested under it (Variants: the top one is `## Badges`, each `Section`'s is `### Type Variants`; Specs: each `Section`'s is `## Badges`) |
| `Component Showroom`                                             | the `<ExampleImage>` of that section                                                                                                                                                                                                              |
| `Section`                                                        | one section of the tab (a page with several components has one per component)                                                                                                                                                                     |
| `Component Sample`                                               | one `<CxVariant>`                                                                                                                                                                                                                                 |
| `Component Prop Card`                                            | one `### name: type` property                                                                                                                                                                                                                     |
| `Component Spec Card`                                            | one `### N. Element` of `<CxSpec>`                                                                                                                                                                                                                |
| `Component Theming`                                              | one `###` token category of `<CxToken>`                                                                                                                                                                                                           |
| `Dependency-1`, `Dependency-2` (yellow chip, `context: default`) | a variant indicator, `@context:` / `: default`                                                                                                                                                                                                    |
| `Spec Callout`                                                   | `<Callout>` with its text (`<Callout type="warning">` for a warning)                                                                                                                                                                              |
| `Item Separator`                                                 | nothing: never a `---`                                                                                                                                                                                                                            |

## Reading large frames

`get_design_context` on a whole frame can come back sparse (metadata only). Then call it on
the parts, in order:

- **Variants**: each `Section`, or each `Component Sample` in it.
- **Props**: the frame is usually small enough; otherwise each `Component Prop Card`.
- **Specs**: each `Component Spec Card`. Their order in the metadata is the element order.
- **Tokens**: each visible `Component Theming` group.

## Token flags

Each token row (`Token 01`, `Token 2`, ...) has two `Flag Asset` icons: one before the
component token and one before the base token. The flag is a `circle-solid` icon whose `Color`
layer is bound to a context color of the `theme` collection. **Name the flag by that context,
never by a color value**: the value changes with the brand and the mode of the page.

| `Color` layer bound to             | MDX flag     | Color in the default brand | Meaning (from `TokensLegend`)                     |
| ---------------------------------- | ------------ | -------------------------- | ------------------------------------------------- |
| `color/context/success/base-color` | `:granular:` | green                      | granular token that affects only this component   |
| `color/context/info/base-color`    | `:shared:`   | blue                       | granular token that affects other components too  |
| `color/context/warning/base-color` | `:semantic:` | yellow                     | semantic token that affects the whole application |
| `color/context/danger/base-color`  | `:base:`     | red                        | base token                                        |
| `color/context/default/base-color` | `:value:`    | black                      | a raw value                                       |

The site's legend uses the same contexts (`.granular` is `--cx-success`, and so on, in
`site/src/scss/docs.scss`). `scripts/read-docs-frame.js` reads the variable and prints the flag.
`get_design_context` gives neither the variable nor the color of the icon (it comes out as an
empty `div`): read the flag from its screenshot by the color names above, or `get_screenshot` on
the row.

## Specs: variant blocks

When an element's values differ by variant, its `Component Spec Card` repeats the element once
per variant value, each block opened by a variant chip. Values in later blocks that are the
same as in the first block are dimmed (opacity 0.25). In MDX they become `_property:_` (see
[mdx-format.md](./mdx-format.md#specsmdx)).

## Variants: nested components

When a `Component Sample` contains another component (an Alert Screen with an Alert Window in
it), Figma names which variant of the nested component it shows. Copy that into the
`<CxVariant>` (see [mdx-format.md](./mdx-format.md#variantsmdx)).
