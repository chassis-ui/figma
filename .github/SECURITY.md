# Security Policy

## Supported versions

Chassis Figma is pre-1.0. Only the latest version, the one deployed at
[chassis-ui.com/figma](https://chassis-ui.com/figma/), gets fixes; there are no maintenance
branches for older versions.

The repository holds the documentation site of the Chassis Figma libraries. Nothing of it is
published to npm, and it runs no code in your app. The site is static: its build runs on
contributors' machines, in CI and on Vercel.

## Reporting a vulnerability

**Please don't open a public GitHub issue for a security vulnerability.**

Instead, use GitHub's private vulnerability reporting for this repository:
[github.com/chassis-ui/figma/security/advisories/new](https://github.com/chassis-ui/figma/security/advisories/new).
This opens a private thread visible only to you and the maintainers, so a fix can be released
before any public write-up.

If you can't use GitHub's private reporting, open a regular issue asking a maintainer to reach out
for a private channel, without including any details of the vulnerability.

We'll acknowledge new reports and keep you updated while we investigate and fix a confirmed issue.
Please give us reasonable time to release a fix before any public disclosure.
