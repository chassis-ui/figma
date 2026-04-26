---
name: sync-figma-docs
description: 'Sync component MDX documentation files with Figma designs. Use for updating component docs from Figma, syncing variants/props/specs/tokens, ensuring MDX files match Figma content, or fixing documentation formatting.'
argument-hint: 'component-name or Figma URL'
---

# Sync Figma Component Documentation

Synchronizes component MDX documentation files (variants, props, specs, tokens) with their source Figma designs, ensuring content accuracy and consistent formatting.

## Quick Start

**Simplest usage:**
```
/sync-figma-docs badge
```

The skill looks up "badge" in [figma-file-mapping.json](./figma-file-mapping.json), navigates to the Documentation page in Figma, and syncs all MDX files.

## When to Use

- Updating component documentation after Figma design changes
- Creating new component documentation from Figma
- Verifying MDX files match their Figma source
- Fixing documentation content or formatting inconsistencies

## References

For detailed information, see:
- [Component Mapping](./references/component-mapping.md) - How to use component names instead of URLs
- [Figma Structure](./references/figma-structure.md) - Documentation page organization in Figma files

## Prerequisites

Figma MCP tools must be available. The workflow uses `mcp_figma_get_design_context`, `mcp_figma_get_metadata`, and `mcp_figma_use_figma` — call these directly as needed.

## Procedure

### 1. Identify Component and Automatically Discover Documentation

**Load component fileKey:**
- Check [figma-file-mapping.json](./figma-file-mapping.json) for the component's Figma fileKey
- Example: `"form-floating": "vp376sNUX96hxaQMRfXegy"`

**Automatically discover Documentation structure** using `mcp_figma_use_figma`:

- Find the page named `Documentation` or containing `📖`
- Get the top-level `SECTION` inside it, then list its `FRAME` children
- Map frame names `"Variants"`, `"Props"`, `"Specs"`, `"Tokens"` to their node IDs
- Use discovered node IDs directly — **do NOT cache them** (IDs change when Figma is reorganized)

→ See [figma-structure.md](./references/figma-structure.md) for the full discovery script and node ID format notes.

**If `mcp_figma_use_figma` reports no frames in the Documentation page:** Do NOT stop — try `mcp_figma_get_metadata` on the Documentation page node as a fallback. The frames may exist but not be returned by the discovery script. Extract frame node IDs from the metadata XML and proceed normally. Only stop and report to the user if both methods find no frames.

### 2. Retrieve Design Context from Figma

**CRITICAL: Call `mcp_figma_get_design_context` DIRECTLY - never use subagents for content extraction**

Use `mcp_figma_get_design_context` for each documentation section:
- **Variants** page: Type, Style, Context, Size etc.
- **Props** page: Configurable properties (variant, boolean, instance-swap)
- **Specs** page: Technical specifications for each component element
- **Tokens** page: Color, Typography, Sizing, Spacing, Border Radius, etc.

**Why direct calls are required:**
- Subagents may fabricate or misinterpret content
- Direct `get_design_context` returns actual React/Tailwind code from Figma
- You can verify exact property names, token paths, and values
- Large specs pages: call `get_design_context` on individual spec cards (not the entire page)

**For large Specs pages:**
1. Use `mcp_figma_get_metadata` to get the full XML structure
2. Extract individual spec card node IDs from the metadata
3. Call `mcp_figma_get_design_context` on EACH spec card individually
4. This ensures you get exact content for each specification

**Extract critical data from Figma output:**
- **Variant indicators**: Note when a component element's spec block shows different token values for different variants (e.g., `fill` changes per style). Tokens using `[size]`, `[context]`, etc. as placeholders do NOT need variant indicators — those placeholders encode the variation inline.
- **Token references**: Extract exact token paths from className attributes
- **Property values**: Parse React/Tailwind code for correct values

Store the nodeId for each page to retrieve separately.

### 3. Analyze MDX File Structure

Read existing component MDX files in `site/content/figma/{component}/`:
- `variants.mdx` - Component variations
- `props.mdx` - Properties configuration
- `specs.mdx` - Technical specifications
- `tokens.mdx` - Design token mappings

**For new components**, start with templates from [./assets/](./assets/):
- [variants.template.mdx](./assets/variants.template.mdx)
- [props.template.mdx](./assets/props.template.mdx)
- [specs.template.mdx](./assets/specs.template.mdx)
- [tokens.template.mdx](./assets/tokens.template.mdx)

Check reference components for formatting patterns:
- `badge/` - Reference for general structure
- `alert/` - Reference for files containing multiple components

### 4. Compare and Update Content

For each MDX file, compare Figma content with current content:

#### Variants.mdx
- Verify all variant types match Figma structure
- Check section headings and descriptions
- Ensure image references are correct
- Add nested component variant indicators when a variant example contains another component → see [figma-structure.md](./references/figma-structure.md#variants)

#### Props.mdx
- **Critical**: Remove properties that are component variants (e.g., "style" when styles are separate components)
- Update property values to match Figma exactly
- Use `@context` and `@style` annotations where applicable
- Organize tokens in `<CxTable>` components
- **NO "---" horizontal rule separators** - use section headings only

#### Specs.mdx
- Number sections sequentially: `### 1. Component`, `### 2. Icon`, etc.
- Use definition list syntax:
  ```markdown
  propertyName:
  : token.path.[variant]
  ```
- **Element descriptions**: Some spec card elements include a short description paragraph between the heading and the first property. Preserve this text exactly as written in Figma:
  ```markdown
  ### 3. Label Frame

  Text only buttons require additional spacing.

  horizontalPadding:
  : space.button.[size]-nudge
  ```
- **Add variant indicators** when a component element's properties differ per variant — repeat the element's block once per variant value
  - Use `@variant-name:\n: value` to declare which variant the following properties apply to
  - On the first variant block, list all properties normally
  - On subsequent variant blocks, italicize properties that are unchanged (`_propertyName:_`) and list only changed properties normally
  - Example (Icon element where only `fill` changes per style):
    ```markdown
    ### 2. Icon

    @style:
    : solid

    height:
    : size.badge.[size]-icon

    width:
    : size.badge.[size]-icon

    fill:
    : color.context.[context].fg-solid

    @style:
    : smooth

    _height:_
    : size.badge.[size]-icon

    _width:_
    : size.badge.[size]-icon

    fill:
    : color.context.[context].fg-main
    ```
- Match the structure from Figma specs exactly, do not assume or fabricate content

#### Tokens.mdx
- Use token flags that match the flag icon color in Figma (not assumed)
- Token flags: `:granular:` (green), `:shared:` (blue), `:semantic:` (yellow), `:base:` (red), `:value:` (black)
- Group tokens by category: Typography, Sizing, Spacing, Border Radius, etc.
- Add variant indicators at the start of sections when tokens vary by state/size

### 5. Quality Checks

**CRITICAL**: Verify NO "---" horizontal rules in ANY MDX file (specs, tokens, props, variants)

**For Specs.mdx specifically:**
- ✓ Variant indicators added when spec values differ by variant without using a `[placeholder]` pattern
- ✓ Tokens using `[state]`, `[size]`, etc. do NOT get a separate variant indicator
- ✓ Variant indicators placed BEFORE the properties they apply to
- ✓ Definition list syntax correct: `propertyName:\n: value` (not just `: value`)

**For Tokens.mdx:**
- ✓ Token flags extracted from actual Figma flag colors (not assumed)
- ✓ Variant indicators added at start of sections (e.g., `@context:\n: default` before Color table)

**For Props.mdx:**
- ✓ Only true properties exist (no component variants like "style" when styles are separate components)
- ✓ Dependency indicators added for conditional properties (e.g., `@icon:\n: true` before icon-instance)

**General:**
- ✓ All token values are exact matches from Figma
- ✓ Do NOT store discovered node IDs — they change when components are updated

## Common Issues

> See the **Specs.mdx** section in Step 4 for syntax reference on definition lists, variant indicators, and element descriptions.

1. **CRITICAL: Always read actual Figma content - never fabricate**
   - **STOP and READ** actual Figma design context BEFORE writing any MDX content
   - **Call `mcp_figma_get_design_context` DIRECTLY** - DO NOT use subagents to extract Figma content
   - Subagents may misinterpret, summarize, or fabricate content - you must read the actual Figma output yourself
   - Use `mcp_figma_get_design_context` to retrieve actual design specs from Figma
   - Extract exact specifications from the returned React/Tailwind code and screenshots
   - For large pages: call `get_design_context` on individual elements (e.g., each spec card) instead of the entire page
   - Never assume or make up values - if Figma says padding is 4, use 4 (not 6)
   - Never assume content structure - read what's actually in Figma Documentation page
   - If you find yourself writing content without having the Figma output open, STOP immediately
   - For the large Specs page workflow, follow Step 2 above (metadata → individual spec card IDs → per-card `get_design_context`)

2. **Horizontal rules in MDX files**
   - **NEVER use "---" in ANY MDX file** (specs, tokens, props, variants)
   - We don't create horizontal rules in MDX anymore
   - Remove any existing "---" separators and rely on section headings (`###`) to structure the content

3. **Token flags in wrong file**
   - **CRITICAL**: specs.mdx should NOT have any token flags
   - Token flags (`:granular:`, `:shared:`, `:semantic:`, `:base:`, `:value:`) are ONLY for tokens.mdx
   - Specs.mdx should have plain token references without flags
   - Example in specs.mdx: `fill:\n: color.context.default.fg-main` (NO flag)
   - Example in tokens.mdx: `color.context.default.fg-main\n: :semantic: #1d1d1d` (WITH flag)

4. **Missing variant indicators in specs**
   - See the **Specs.mdx** section in Step 4 above for the full rules and example
   - See `badge/specs.mdx ### 2. Icon` for a real-world reference pattern

5. **Style property in props.mdx**
   - If styles/types are separate Figma components (Solid, Smooth, Outline), remove the "style/type" property
   - Only keep properties that are actual Figma component properties

6. **Missing component mapping**
   - Check [figma-file-mapping.json](./figma-file-mapping.json)
   - Get fileKey from Figma URL: `figma.com/design/:fileKey/...`

7. **Mismatched token values**
   - Extract exact numeric values from Figma (e.g., padding: 4 not 6)
   - Don't assume values match existing patterns

8. **Incorrect token flags**
   - Match flag colors to Figma's visual indicators
   - Extract from actual flag icon colors, never assume based on token type

## File Paths

- Component mapping: [figma-file-mapping.json](./figma-file-mapping.json)
- Component MDX files: `site/content/figma/{component}/`
- Reference components: `site/content/figma/button-solid/`, `site/content/figma/accordion/`, `site/content/figma/alert/`

## Figma File Structure

Each component's Figma file follows this structure:
```
Component File (e.g., cx.comp.badge)
├── Documentation (page)
│   ├── Variants (frame)
│   ├── Props (frame)
│   ├── Specs (frame)
│   └── Tokens (frame)
└── Other pages...
```

Always navigate to the **Documentation** page to find the frames for syncing.

## Component Mapping

The skill maintains a mapping file at [figma-file-mapping.json](./figma-file-mapping.json) that maps component names to Figma file keys:

```json
{
  "badge": "bbIiF7Z7E9syMAihomDMfO",
  "button-solid": "NAmGtSx4GjBbLYJc9616O7",
  "accordion": "OiVphIikHzUeicbtSChwpj"
}
```

**To add a new component:**
1. Get the fileKey from the Figma URL (`figma.com/design/:fileKey/...`)
2. Add entry to [figma-file-mapping.json](./figma-file-mapping.json)
3. Commit the change so team members can use the component name

## Example Invocations

**Using component name (recommended):**
```
@sync-figma-docs badge
Update all badge documentation from Figma

/sync-figma-docs tooltip
Sync tooltip MDX files
```

**Using full Figma URL:**
```
@sync-figma-docs https://www.figma.com/design/bbIiF7Z7E9syMAihomDMfO/cx.comp.badge?node-id=1-272 
Make sure all badge component MDX files match Figma content exactly
```
