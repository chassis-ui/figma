# Sync Figma Component Documentation Skill

A workflow skill for synchronizing component MDX documentation files with their source Figma designs.

## Structure

```
.github/skills/sync-figma-docs/
├── SKILL.md                      # Main workflow instructions
├── README.md                     # Quick reference guide
├── figma-file-mapping.json       # Component name → Figma fileKey mapping
├── assets/                       # MDX templates for new components
│   ├── variants.template.mdx
│   ├── props.template.mdx
│   ├── specs.template.mdx
│   └── tokens.template.mdx
└── references/                   # Detailed documentation
    ├── component-mapping.md
    └── figma-structure.md
```

## Usage

### Invoke with component name (simplest)
```
/sync-figma-docs badge

@sync-figma-docs Update tooltip docs from Figma
```

The skill uses the component name to look up the Figma file key from its internal mapping file.

### Invoke with Figma URL
```
/sync-figma-docs https://figma.com/design/FILE_KEY/name?node-id=1-272
Sync badge component with Figma
```

### Mention in chat
```
@sync-figma-docs Make sure all badge component MDX files match Figma content
```

### Auto-loaded when keywords detected
The agent will automatically load this skill when you mention:
- "sync with Figma"
- "update from Figma"  
- "Figma documentation"
- "MDX files match Figma"
- Component names from the skill's mapping file

## Component Mapping

The skill maintains an internal mapping file that maps component names to Figma file keys. This allows you to use simple component names instead of full URLs:

```json
{
  "badge": "bbIiF7Z7E9syMAihomDMfO",
  "button-solid": "NAmGtSx4GjBbLYJc9616O7"
}
```

To add a new component, edit [figma-file-mapping.json](.github/skills/sync-figma-docs/figma-file-mapping.json) to add the component name and its Figma fileKey.

## What It Does

1. **Resolves component reference** from name or URL using internal mapping
2. **Navigates to Documentation page** in the Figma file where all doc frames exist
3. **Retrieves design context** from Figma for variants, props, specs, and tokens
4. **Analyzes MDX structure** by reading existing files or using templates
5. **Compares content** between Figma and MDX files
6. **Updates files** to match Figma exactly:
   - Removes properties that are component variants
   - Updates token values and flag colors
   - Fixes specs formatting (removes separators, uses definition lists)
   - Matches reference component patterns
7. **Validates** all changes with error checking

## Key Features

- **Component mapping**: Use simple names like "badge" instead of full Figma URLs
- **Token flag system**: Automatically maps Figma color indicators to token flags (`:granular:`, `:shared:`, `:semantic:`, `:base:`, `:value:`)
- **Specs formatting**: Ensures proper structure with no "---" separators between sections
- **Templates**: Includes starter templates for creating new component documentation
- **Quality checks**: Built-in validation steps to catch common errors

## Common Use Cases

- Updating component docs after design changes in Figma
- Creating new component documentation from Figma files
- Fixing formatting inconsistencies in existing docs
- Verifying MDX files accurately reflect Figma designs

