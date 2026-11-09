// Read-only `use_figma` script: prints one frame of a component's `Docs` section in
// cx.components.UI as ordered lines, with what the MDX needs and generated code loses:
// exact text, dimmed values (opacity), bold defaults, and the flag of every token.
//
// Set PAGE (the `figmaPage` of the component's index.json) and FRAME (`Variants`, `Props`,
// `Props - Form Input`, `Specs` or `Tokens`), then pass the whole file as `code`.
// It skips hidden nodes and the component previews. It changes nothing in the file.

const PAGE = 'Badge'
const FRAME = 'Tokens'

const page = figma.root.children.find((p) => p.name === PAGE)
if (!page) throw new Error(`No page named "${PAGE}"`)
await figma.setCurrentPageAsync(page)
const docs = page.children.find((n) => n.type === 'SECTION' && n.name === 'Docs')
if (!docs) throw new Error(`Page "${PAGE}" has no Docs section`)
const frame = docs.children.find((n) => n.name === FRAME)
if (!frame) {
  throw new Error(`No frame "${FRAME}"; Docs has: ${docs.children.map((n) => n.name).join(', ')}`)
}

// A flag is a `circle-solid` icon whose `Color` layer is bound to a context color of the
// `theme` collection. The context names the flag, whatever color a brand or mode gives it; the
// site's legend uses the same contexts (site/src/scss/docs.scss).
const FLAGS = {
  success: ':granular:',
  info: ':shared:',
  warning: ':semantic:',
  danger: ':base:',
  default: ':value:'
}
const BLOCKS = [
  'Spec Header',
  'Spec Meta',
  'Spec Callout',
  'Section',
  'Component Sample',
  'Component Prop Card',
  'Component Spec Card',
  'Component Theming',
  'Token Meta',
  'Heading'
]
const SKIP = ['Component Showroom', 'Page Footer', 'Document Info']

const opacity = (n) => {
  let o = 1
  for (let p = n; p && p !== frame; p = p.parent) o *= p.opacity
  const f = n.fills !== figma.mixed && n.fills[0]
  if (f && f.opacity !== undefined) o *= f.opacity
  return Math.round(o * 100) / 100
}
const flag = async (asset) => {
  const layer = asset.findOne((n) => n.name === 'Color')
  const alias = layer && layer.fills !== figma.mixed && layer.fills[0]?.boundVariables?.color
  if (!alias) return '?flag: the Color layer has no variable, read the screenshot'
  const variable = await figma.variables.getVariableByIdAsync(alias.id)
  const context = variable?.name.match(/^color\/context\/([^/]+)\//)?.[1]
  return FLAGS[context] ? `${FLAGS[context]} (${variable.name})` : `?flag: ${variable?.name}`
}

const out = []
const walk = async (node, depth) => {
  if (!node.visible || SKIP.includes(node.name)) return
  const pad = '  '.repeat(depth)
  if (node.name === 'Flag Asset') return out.push(`${pad}FLAG ${await flag(node)}`)
  if (node.type === 'TEXT') {
    const style = node.fontName === figma.mixed ? 'mixed' : node.fontName.style
    const op = opacity(node)
    const marks = [/Bold/.test(style) ? style.toLowerCase() : '', op < 1 ? `opacity ${op}` : '']
      .filter(Boolean)
      .join(', ')
    return out.push(`${pad}${node.name}${marks ? ` (${marks})` : ''}: ${node.characters}`)
  }
  if (BLOCKS.includes(node.name)) out.push(`${pad}<${node.name}>`)
  if ('children' in node) {
    for (const child of node.children) {
      await walk(child, BLOCKS.includes(node.name) ? depth + 1 : depth)
    }
  }
}
await walk(frame, 0)
return out.join('\n')
