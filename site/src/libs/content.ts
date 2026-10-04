import { getCollection } from 'astro:content'

export const docsPages = await getCollection('docs')
export const figmaPages = await getCollection('figma')

export const aliasedDocsPages = await getCollection('docs', ({ data }) => {
  return data.aliases !== undefined
})
