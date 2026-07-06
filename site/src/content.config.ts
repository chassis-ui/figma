import { defineCollection } from 'astro:content'
import { z } from 'zod'
import { glob } from 'astro/loaders'

const docsSchema = z.object({
  added: z
    .object({
      show_badge: z.boolean().optional(),
      version: z.string()
    })
    .optional(),
  aliases: z.string().or(z.string().array()).optional(),
  description: z.string(),
  extra_js: z
    .object({
      async: z.boolean().optional(),
      src: z.string()
    })
    .array()
    .optional(),
  sections: z
    .object({
      description: z.string(),
      title: z.string(),
      slug: z.string().optional()
    })
    .array()
    .optional(),
  thumbnail: z.string().optional(),
  title: z.string(),
  toc: z.boolean().optional()
})

const figmaSchema = z.object({
  aliases: z.string().or(z.string().array()).optional(),
  description: z.string(),
  link: z.string(),
  title: z.string(),
  toc: z.boolean().optional()
})

const figmaComponentSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  toc: z.boolean().optional(),
  added: z
    .object({
      show_badge: z.boolean().optional(),
      version: z.string()
    })
    .optional()
})

const docsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/docs' }),
  schema: docsSchema.partial()
})

const figmaCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/figma' }),
  schema: figmaSchema.partial()
})

const figmaComponentsCollection = defineCollection({
  loader: glob({ pattern: '*/index.json', base: './content/figma' }),
  schema: figmaComponentSchema
})
const calloutsSchema = z.object({})

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
