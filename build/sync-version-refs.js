#!/usr/bin/env node

/*!
 * Version Reference Sync Script
 *
 * Copies the version of package.json into the places that show it and that
 * `changeset version` does not update: the badge of README.md and `currentVersion` of
 * site/config.yml.
 *
 * Runs as part of `pnpm changeset:version`, after `changeset version` has bumped package.json,
 * which is the source of the version.
 *
 * Copyright 2025-2026 Ozgur Gunes
 * Licensed under MIT
 */

import fs from 'node:fs/promises'
import path from 'node:path'

const SEMVER = String.raw`\d+\.\d+\.\d+(?:-[0-9A-Za-z-.]+)?`
const SEMVER_RE = new RegExp(`^${SEMVER}$`)

// A file, the text around the version in it, and how the version is written there.
const REFERENCES = [
  {
    file: 'README.md',
    pattern: new RegExp(`(\\[!\\[Version: )${SEMVER}(\\]\\()`),
    format: (version) => version
  },
  {
    file: 'README.md',
    // A dash separates the parts of a shields.io badge, so one in the version is doubled
    pattern: /(img\.shields\.io\/badge\/Version-)[^)]+?(-blue\.svg)/,
    format: (version) => version.replaceAll('-', '--')
  },
  {
    file: 'site/config.yml',
    pattern: new RegExp(`^(currentVersion:\\s*")${SEMVER}(")`, 'm'),
    format: (version) => version
  }
]

async function readVersion() {
  const pkg = JSON.parse(await fs.readFile(path.resolve('package.json'), 'utf8'))

  if (!pkg.version || !SEMVER_RE.test(pkg.version)) {
    console.error(`❌ Invalid or missing version in package.json: "${pkg.version}"`)
    process.exit(1)
  }

  return pkg.version
}

/**
 * Writes the version into one reference
 * @param {(typeof REFERENCES)[number]} reference - The file and where the version is in it
 * @param {string} version - The package version
 * @returns {Promise<boolean>} True if the file was changed
 */
async function syncReference({ file, pattern, format }, version) {
  const original = await fs.readFile(file, 'utf8')

  if (!pattern.test(original)) {
    console.error(`❌ No version reference that matches ${pattern} in ${file}`)
    process.exit(1)
  }

  const updated = original.replace(
    pattern,
    (_match, before, after) => `${before}${format(version)}${after}`
  )

  if (updated === original) {
    return false
  }

  await fs.writeFile(file, updated, 'utf8')
  console.log(`📄 Updated ${file} → ${version}`)
  return true
}

async function main() {
  const version = await readVersion()
  console.log(`🔄 Syncing version references to v${version}`)

  const results = []

  for (const reference of REFERENCES) {
    results.push(await syncReference(reference, version))
  }

  const updatedCount = results.filter(Boolean).length

  console.log(
    updatedCount > 0
      ? `✅ Synced ${updatedCount} of ${results.length} references`
      : 'ℹ️  Already in sync, nothing to update'
  )
}

main().catch((error) => {
  console.error(`❌ Unexpected error: ${error.message}`)
  process.exit(1)
})
