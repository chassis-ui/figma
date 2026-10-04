import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { calloutsSchema, docsSchema, z } from '@chassis-ui/docs/schema'

// A tab of a component: `variants.mdx`, `props.mdx`, `specs.mdx`, `tokens.mdx` or `guidelines.mdx`.
const figmaSchema = z
  .object({
    aliases: z.string().or(z.string().array()).optional(),
    description: z.string(),
    link: z.string(),
    title: z.string(),
    toc: z.boolean().optional()
  })
  .partial()

// What the tabs of a component share, in its `index.json`.
const figmaComponentSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  toc: z.boolean().optional(),
  added: docsSchema.shape.added
})

const docsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/docs' }),
  schema: docsSchema
})

const figmaCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/figma' }),
  schema: figmaSchema
})

const figmaComponentsCollection = defineCollection({
  loader: glob({ pattern: '*/index.json', base: './content/figma' }),
  schema: figmaComponentSchema
})

const calloutsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/callouts' }),
  schema: calloutsSchema
})

export const collections = {
  docs: docsCollection,
  figma: figmaCollection,
  figmaComponents: figmaComponentsCollection,
  callouts: calloutsCollection
}
