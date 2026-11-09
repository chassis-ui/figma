# MDX format of the component tabs

How `variants.mdx`, `props.mdx`, `specs.mdx` and `tokens.mdx` in
`site/content/figma/{component}/` are written. `scripts/check.mjs` checks the rules marked ✓.

## All tabs

- ✓ No frontmatter and no `#` heading. The title, description and `toc` of every tab come from
  the component's `index.json`.
- ✓ No `---` (or `***`, `___`) horizontal rules. Headings separate the sections.
- A tab starts with its intro paragraph, then `##` sections.
- Text is copied from Figma word for word, including its punctuation.
- **Definition lists** ✓: a term line ending in `:`, then the value on the next line after
  `: `. No blank line between them, a blank line after.

  ```markdown
  minHeight:
  : size.badge.[size]-main
  ```

- **Variant indicators** ✓: a definition whose term starts with `@`. It says which variant the
  content after it applies to. The site renders it as a chip.

  ```markdown
  @context:
  : default
  ```

- **Images**: `<ExampleImage img="..." />` and `<CxVariant img="...">` take an image name
  without extension. ✓ The image must exist as
  `site/public/static/images/figma/components/{component}/{light,dark}/{img}.png` (after
  `pnpm vendor`). Images come from a release of `chassis-ui/website-assets`; never invent a
  name, use one that exists in that folder. Names follow `{component}-{group}-{value}`
  (`badge-type-basic`) and `{component}-{tab}` (`badge-props`, `badge-specs`).
- ✓ Shortcode attributes: `<CxVariant>` takes `img`, `alt`, `wide`, `large`, `neutral`;
  `<ExampleImage>` takes `img`, `alt`, `neutral`. Any other attribute is ignored by the site.
- **Callouts**: `<Callout>` or `<Callout type="warning">`, from a `Spec Callout` in Figma.

## variants.mdx

```markdown
## Badges

Section paragraph.

### Type Variants

Group paragraph.

<CxVariant img="badge-type-basic">

#### Basic

Variant description.

</CxVariant>
```

- Variant groups (Type, Style, Context, Size, ...) differ per component. Take the groups, their
  order and their names from Figma.
- **Nested components**: when the sample contains another component, end the `<CxVariant>`
  with the nested component's name in bold and the variant it shows:

  ```markdown
  <CxVariant img="alert-screen-size-large" wide>

  #### Large

  Description text.

  **Alert Window**

  @size:
  : large

  </CxVariant>
  ```

## props.mdx

```markdown
<CxProp>

### size: variant

Description.

- large
- **medium**
- small

### icon-instance: instance-swap

@has-icon:
: true

Description.

- **Icon Placeholder**

</CxProp>
```

- Heading: `### name: type`, with the type `variant`, `boolean`, `text`, `instance-swap` or
  `slot`.
- Values as a list, the default in bold.
- A property that applies only when another has a value gets that as a variant indicator
  right after its heading (`@has-icon:` / `: true`).
- Only real component properties. When styles (Solid, Smooth, Outline) are separate Figma
  components, there is no `style` property.

## specs.mdx

```markdown
<SpecsLegend />

## Badges

Section paragraph.

<ExampleImage img="badge-specs" />

<CxSpec>

### 1. Badge

...

</CxSpec>
```

- Elements are `### N. Name`, numbered from 1 in each `<CxSpec>`, in the order of the
  `Component Spec Card`s. ✓ (warning) The numbers match the callouts in the spec image, so when
  the check warns, compare with Figma before renumbering.
- A short description under an element heading in Figma is kept, word for word, between the
  heading and the first property:

  ```markdown
  ### 3. Label Frame

  Text only buttons require additional spacing.

  horizontalPadding:
  : space.button.[size]-nudge
  ```

- Property values are token paths without flags. ✓ No `:granular:` etc. in specs.
- A placeholder in brackets (`[size]`, `[context]`, `[state]`) covers the variation; such a
  token needs no variant indicator.
- **Variant blocks**: when an element's values differ by variant in a way a placeholder doesn't
  cover, repeat the element's properties once per variant value, each block opened with an
  indicator. In the first block list every property. In the later blocks, write the properties
  that are the same as in the first block as `_property:_` (dimmed on the site) and the ones
  that change normally:

  ```markdown
  ### 2. Icon

  @style:
  : solid

  height:
  : size.badge.[size]-icon

  fill:
  : color.context.[context].fg-solid

  @style:
  : smooth

  _height:_
  : size.badge.[size]-icon

  fill:
  : color.context.[context].fg-main
  ```

## tokens.mdx

```markdown
<TokensLegend />

<CxToken>

### Colors

@context:
: default

@style:
: solid

<CxTable>
| Component Token | Base Token |
| --- | --- |
| :semantic: color.context.default.fg-solid | :base: \{color.base.palette.light.black.base\} |
</CxTable>

### Typography

<CxTable>
| Component Token | Base Token |
| --- | --- |
| :granular: font.badge.large | :base: \{font.text.large.strong\} |
</CxTable>

</CxToken>
```

- One `###` per `Component Theming` group, with the group's title.
- The yellow dependency chips above a table become variant indicators before that `<CxTable>`.
- The second column is headed as in Figma: `Base Token`, `Token Value` or `Value`.
- Every cell starts with a flag, except a raw value that has no flag in Figma either (the SVG
  of an icon token). ✓ Only `:granular:`, `:shared:`, `:semantic:`, `:base:` and `:value:`
  exist. Take each flag from the context variable of the flag in Figma (see
  [figma-structure.md](./figma-structure.md#token-flags)), never from the token name.
- Escape the braces of references: `\{size.unit.32\}`.
