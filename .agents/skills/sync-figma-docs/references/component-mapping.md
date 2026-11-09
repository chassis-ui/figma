# Components and their Figma pages

Every component is a page of the Figma file cx.components.UI
(`c40DHaakYrjCNK1ugIf1H2`). Each component's `site/content/figma/{component}/index.json`
names its page in `figmaPage`:

```json
{
  "title": "Tab",
  "description": "Navigation components that organize content ...",
  "toc": true,
  "figmaPage": "Nav - Tab"
}
```

The page name is exactly as it appears in Figma's page list, including spaces and dashes.
`site/src/content.config.ts` declares the field. If a page is renamed in Figma, update
`figmaPage`.

## A new component

1. Check that the page has a `Docs` section (see
   [figma-structure.md](./figma-structure.md#finding-a-components-docs)). Without one there is
   nothing to sync.
2. Name the folder in lowercase with dashes, the way the existing folders are named
   (`Button - Solid` → `button-solid`, `Close Button` → `close-button`). Mobile components
   start with `mobile-`. Check the name with the user: some folders don't follow their page
   name (`Nav - Tab` is `tab`, `Datepicker` is `date-picker`, `Mobile Bottom Navigation` is
   `mobile-nav-bottom`).
3. Create `index.json` with `title`, `description` (one sentence on what the component is),
   `"toc": true` and `figmaPage`. Take the title and description from Figma if it has them, and
   have the user confirm them if it doesn't.
4. Create the tabs from the templates in [../assets/](../assets/) and sync them.
5. Nothing else registers the component: the sidebar lists every folder with tabs.
