#!/usr/bin/env node
// Checks the Figma component docs in `site/content/figma/` against the rules of the
// sync-figma-docs skill. Run it from the repository root:
//
//   node .agents/skills/sync-figma-docs/scripts/check.mjs            every component
//   node .agents/skills/sync-figma-docs/scripts/check.mjs badge chip some components
//
// Errors exit with status 1. Warnings are printed and do not fail the run.

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const CONTENT = 'site/content/figma'
const TABS = ['variants', 'props', 'specs', 'tokens']
const FLAGS = new Set([':granular:', ':shared:', ':semantic:', ':base:', ':value:'])
const SHORTCODES = ['CxVariant', 'CxProp', 'CxSpec', 'CxToken', 'CxTable', 'Callout']
// What site/src/components/shortcodes/{CxVariant,ExampleImage}.astro read from their props.
const SHORTCODE_ATTRIBUTES = {
  CxVariant: ['img', 'alt', 'wide', 'large', 'neutral'],
  ExampleImage: ['img', 'alt', 'neutral']
}
// Images come from a release of chassis-ui/website-assets: `pnpm vendor` copies them to
// `site/public`, and `vendor/assets` holds the unpacked release.
const IMAGE_ROOTS = [
  'site/public/static/images/figma/components',
  'vendor/assets/dist/web/docs/chassis/images/figma/components'
]

const problems = []
const report = (level, where, message) => problems.push({ level, where, message })

if (!existsSync(CONTENT)) {
  console.error(`Run this from the repository root: ${CONTENT} was not found.`)
  process.exit(2)
}

const allComponents = readdirSync(CONTENT)
  .filter((name) => statSync(join(CONTENT, name)).isDirectory())
  .sort()
const requested = process.argv.slice(2)
for (const name of requested) {
  if (!allComponents.includes(name)) report('error', name, `no folder ${CONTENT}/${name}`)
}
const components = requested.length
  ? requested.filter((name) => allComponents.includes(name))
  : allComponents

const imageRoot = IMAGE_ROOTS.find((root) => existsSync(root))
if (!imageRoot) {
  report('warn', '(images)', 'no images found; run `pnpm vendor` to check image names')
}

for (const component of components) {
  checkIndex(component)
  for (const tab of TABS) {
    const file = join(CONTENT, component, `${tab}.mdx`)
    if (!existsSync(file)) {
      report('warn', `${component}/${tab}.mdx`, 'missing')
      continue
    }
    checkMdx(component, tab, readFileSync(file, 'utf8'))
  }
}

function checkIndex(component) {
  const where = `${component}/index.json`
  const file = join(CONTENT, component, 'index.json')
  if (!existsSync(file)) return report('error', where, 'missing')
  let data
  try {
    data = JSON.parse(readFileSync(file, 'utf8'))
  } catch (error) {
    return report('error', where, `invalid JSON: ${error.message}`)
  }
  if (typeof data.title !== 'string' || !data.title) report('error', where, 'no "title"')
  if (typeof data.figmaPage !== 'string' || !data.figmaPage) {
    report('warn', where, 'no "figmaPage": a sync needs the name of the Figma page instead')
  }
}

function checkMdx(component, tab, text) {
  const lines = text.split('\n')
  const at = (index) => `${component}/${tab}.mdx:${index + 1}`
  let inFence = false
  let specBlock = null // the `### N.` numbers of the current <CxSpec> block

  if (lines[0]?.trim() === '---') report('error', at(0), 'frontmatter: it belongs in index.json')

  lines.forEach((line, i) => {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence
    if (inFence) return
    const trimmed = line.trim()

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed) && i > 0) {
      report('error', at(i), 'horizontal rule: use headings to separate sections')
    }
    if (/^# /.test(line)) report('error', at(i), 'level-1 heading: the title comes from index.json')

    // Definition lists: `term:` on one line, `: value` on the next.
    if (/^: /.test(line)) {
      const previous = lines[i - 1] ?? ''
      if (!/:_?$/.test(previous.trim()) || /^: /.test(previous)) {
        report('error', at(i), '`: value` without a `term:` line right above it')
      }
    }
    if (/^@[\w-]+:$/.test(trimmed) && !/^: \S/.test(lines[i + 1] ?? '')) {
      report('error', at(i), `variant indicator "${trimmed}" without a \`: value\` line below it`)
    }

    // Token flags.
    for (const [flag] of line.matchAll(/(?<![\w\\{}.:]):[a-z]+:(?=\s|$)/g)) {
      if (tab === 'specs') report('error', at(i), `token flag ${flag}: flags belong in tokens.mdx`)
      else if (!FLAGS.has(flag)) report('error', at(i), `unknown token flag ${flag}`)
    }

    // Element numbering in specs: `### 1.`, `### 2.`, ... in each <CxSpec> block.
    if (tab === 'specs') {
      if (/^<CxSpec\b/.test(trimmed)) specBlock = []
      if (/^<\/CxSpec>/.test(trimmed)) specBlock = null
      const numbered = /^### (\d+)\. /.exec(line)
      if (numbered && specBlock) {
        const expected = specBlock.length + 1
        if (Number(numbered[1]) !== expected) {
          report(
            'warn',
            at(i),
            `element numbered ${numbered[1]}, expected ${expected}: check the numbers in Figma`
          )
        }
        specBlock.push(Number(numbered[1]))
      } else if (/^### /.test(line) && specBlock) {
        report('warn', at(i), 'element heading without a number')
      }
    }

    // Attributes the shortcodes read: any other one is silently ignored by the site.
    for (const [, name, attrs] of line.matchAll(/<(CxVariant|ExampleImage)\b([^>]*?)\/?>/g)) {
      for (const [, attr] of attrs.matchAll(/\s([\w-]+)(?==|\s|$)/g)) {
        if (!SHORTCODE_ATTRIBUTES[name].includes(attr)) {
          report(
            'error',
            at(i),
            `<${name}> has no "${attr}" attribute (${SHORTCODE_ATTRIBUTES[name].join(', ')})`
          )
        }
      }
    }

    // Images.
    if (imageRoot) {
      for (const [, img] of line.matchAll(/<(?:CxVariant|ExampleImage)\b[^>]*\bimg="([^"]+)"/g)) {
        for (const theme of ['light', 'dark']) {
          const path = join(imageRoot, component, theme, `${img}.png`)
          if (!existsSync(path)) report('error', at(i), `image "${img}" not found: ${path}`)
        }
      }
    }
  })

  for (const name of SHORTCODES) {
    const open = (text.match(new RegExp(`<${name}\\b[^/]*?>`, 'g')) ?? []).length
    const close = (text.match(new RegExp(`</${name}>`, 'g')) ?? []).length
    if (open !== close) {
      report('error', `${component}/${tab}.mdx`, `${open} <${name}> but ${close} </${name}>`)
    }
  }
}

const errors = problems.filter((p) => p.level === 'error')
const warnings = problems.filter((p) => p.level === 'warn')
for (const p of [...errors, ...warnings])
  console.log(`${p.level.padEnd(5)} ${p.where}  ${p.message}`)
console.log(
  `\n${components.length} component(s) checked: ${errors.length} error(s), ${warnings.length} warning(s).`
)
process.exit(errors.length ? 1 : 0)
