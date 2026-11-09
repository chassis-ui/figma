# Agent instructions

This repository is the documentation site of the Chassis Figma libraries. Setup, layout,
commands, commit conventions and what CI checks are in
[.github/CONTRIBUTING.md](.github/CONTRIBUTING.md); follow it.

## Skills

Project skills live in [`.agents/skills/`](.agents/skills/). `.claude/skills/` links to the
same folders for Claude Code.

- [`sync-figma-docs`](.agents/skills/sync-figma-docs/SKILL.md): updating, checking or creating
  the tabs of a component in `site/content/figma/{component}/` from its page in the Figma file cx.components.UI. Read the
  skill before you edit those files, even if your agent doesn't load skills by itself.

A new skill goes in `.agents/skills/<name>/`, with a link to it from `.claude/skills/<name>`:

```sh
ln -s ../../.agents/skills/<name> .claude/skills/<name>
```
