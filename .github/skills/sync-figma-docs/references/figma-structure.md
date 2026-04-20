# Figma Documentation Page Structure

Reference for navigating component documentation structure in Figma using MCP tools.

## Discovering the Documentation Page

Use `mcp_figma_use_figma` to find the Documentation page and its frames:

```javascript
// Get all pages in the file
const pages = figma.root.children;
const docPage = pages.find(p => p.name.includes('Documentation') || p.name.includes('📖'));

// Get the section (Documentation page has one top-level SECTION)
const section = docPage.children.find(n => n.type === 'SECTION');

// Get all frames inside the section
const frames = section.children
  .filter(n => n.type === 'FRAME')
  .map(f => ({ id: f.id, name: f.name }));
// Returns: [{ id: "162:3944", name: "Specs" }, { id: "162:3945", name: "Variants" }, ...]
```

**Do not use cached node IDs** — discover them fresh every time. IDs change when Figma files are reorganized.

## Standard Frame Structure

```
Documentation (page)
└── Section
    ├── Variants          → variants.mdx
    ├── Props             → props.mdx
    ├── Specs             → specs.mdx
    └── Tokens            → tokens.mdx
```

Additional Guidelines frame may exists which is not in scope of this workflow.

## Frame → MDX Mapping

| Figma Frame | MDX File | Content |
|-------------|----------|---------|
| Variants | `variants.mdx` | Type, Style, Context, Size variations |
| Props | `props.mdx` | Component properties (variant, boolean, instance-swap) |
| Specs | `specs.mdx` | Technical specs per component element |
| Tokens | `tokens.mdx` | Token names, values, and scope flags |

## Retrieving Frame Content

Pass the node ID to `mcp_figma_get_design_context`:
- Node IDs from `mcp_figma_use_figma` are in `X:Y` format (e.g., `162:3944`) — use as-is
- Node IDs from Figma URLs use `X-Y` format — convert hyphens to colons before passing to API

**For large Specs frames:** `get_design_context` on the whole frame may return sparse data. In that case:
1. Call `mcp_figma_get_metadata` on the Specs frame node ID
2. Extract child frame IDs (look for frames named "Component Spec Card")
3. Call `mcp_figma_get_design_context` on each child individually

## Frame Contents

### Variants
Contains visual examples of the component's variant groups. Each component defines its own groups — read the actual Figma content to discover what exists. Common groups include:
- **Type**: e.g., Basic, Advanced, Icon Button
- **Style**: e.g., Solid, Smooth, Outline, Link
- **Context**: e.g., Default, Primary, Secondary, Neutral, Danger, Success, Warning, Info, Black, White
- **Size**: e.g., Large, Medium, Small

Not every component has all of these groups, and some components may have different group names entirely. Always derive the actual groups from `mcp_figma_get_design_context` output — do not assume.

**Nested component variant indicators:** When a variant example visually contains another component (e.g., an Alert Screen that embeds an Alert Window), document which variant of the nested component is rendered. At the end of the `<CxVariant>` block (before the closing tag), add a bold component name followed by `@property:\n: value` indicators:

```markdown
<CxVariant img="alert-screen-size-large" wide>

#### Large

Description text.

**Alert Window**

@size:
: large

</CxVariant>
```

Read the Figma Variants frame to identify which nested components appear and what variant they represent — do not assume.

### Props
Component with its property panel. Each property has: name, type (variant/text/boolean/instance-swap/slot), available values, default value.

Some properties have dependency indicators — they only apply when another property has a specific value. For example, `icon-instance` may require `has-icon: true`. In `props.mdx`, these are expressed as variant indicators after the property heading, before its description:

```markdown
### icon-instance: instance-swap

@has-icon:
: true
```

Read the actual Figma Props frame to identify which properties have dependencies — do not assume.

### Specs
A set of "Component Spec Card" frames — one per component element. Each card contains:
- Element name (e.g., "Icon Frame", "Label Text")
- Token references for fill, typography, spacing, border, etc.
- When an element's properties differ per variant, the element block repeats once per variant — each opened with an `@variant-name: value` indicator, with unchanged properties italicized in subsequent blocks

### Tokens Frames
Token name → value table with color-coded scope flags:
- Green → `:granular:` (component-specific token)
- Blue → `:shared:` (references a shared token)
- Yellow → `:semantic:` (semantic alias)
- Red → `:base:` (primitive/base value)
- Black/dark → `:value:` (raw numeric or string value)

Extract the flag from the actual color in Figma — do not assume based on token name.

## Frame Naming Rules

- Single-concept frames: `"Variants"`, `"Props"`, `"Specs"`, `"Tokens"` (exact casing)
- Matching is case-sensitive when using `mcp_figma_use_figma` to find frames
