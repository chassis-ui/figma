import { getCollection } from 'astro:content'

export const tabs = ['props', 'specs', 'tokens', 'variants'] as const
export type TabType = (typeof tabs)[number]

export type ComponentType = string

export function sortTabs(tabs: string[]): TabType[] {
  const order: TabType[] = ['variants', 'props', 'specs', 'tokens']
  return tabs
    .filter((tab): tab is TabType => order.includes(tab as TabType))
    .sort((a, b) => order.indexOf(a) - order.indexOf(b))
}

export async function getFigmaSidebarData() {
  const allFigma = await getCollection('figma')
  const componentMap = new Map<string, Set<TabType>>()

  allFigma.forEach((entry) => {
    const [component, tab] = entry.id.split('/')
    if (!componentMap.has(component)) {
      componentMap.set(component, new Set())
    }
    componentMap.get(component)?.add(tab as TabType)
  })

  return Array.from(componentMap.entries())
    .map(([name, tabSet]) => ({
      name,
      tabs: sortTabs(Array.from(tabSet))
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export async function getAllComponents(): Promise<string[]> {
  const allFigma = await getCollection('figma')
  const components = new Set<string>()

  allFigma.forEach((entry) => {
    const [component] = entry.id.split('/')
    components.add(component)
  })

  return Array.from(components).sort()
}
