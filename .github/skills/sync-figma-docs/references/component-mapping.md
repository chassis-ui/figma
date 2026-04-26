# Component to Figma File Mapping

Technical reference for `figma-file-mapping.json` — the file that maps short component names to Figma fileKeys.

## File Location

```
.github/skills/sync-figma-docs/figma-file-mapping.json
```

## File Format

```json
{
  "component-name": "figmaFileKey",
  "badge": "bbIiF7Z7E9syMAihomDMfO",
  "button-solid": "NAmGtSx4GjBbLYJc9616O7",
  "accordion": "OiVphIikHzUeicbtSChwpj"
}
```

- **Key**: Component name — must match the folder name under `site/content/figma/`
- **Value**: Figma file key — the segment between `/design/` and the next `/` in a Figma URL

## How to Add a New Component

1. Open the Figma file and copy the fileKey from the URL:
   - URL: `https://www.figma.com/design/xyz123abc/cx.comp.newcomp?node-id=1-100`
   - fileKey: `xyz123abc`

2. Add an entry to `figma-file-mapping.json` using the MDX folder name as the key:
   ```json
   { "new-component": "xyz123abc" }
   ```
   → MDX files must live at `site/content/figma/new-component/`

3. Commit the change so all team members can use the short name.

## Fallback: Full URL

If a component is not in the mapping, pass the full Figma URL directly:

```
/sync-figma-docs https://figma.com/design/xyz123abc/cx.comp.newcomp?node-id=1-100
```
