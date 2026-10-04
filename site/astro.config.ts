import { defineConfig } from 'astro/config'
import { loadConfig } from '@chassis-ui/docs'
import { chassisDocs } from '@chassis-ui/docs/integration'
import { remarkDefinitionList, defListHastHandlers } from 'remark-definition-list'
import { chassis } from './src/libs/astro'
import { remarkCxSpec } from './src/libs/remark'
import { rehypeCxSpec, rehypeCxVariant, rehypeCxToken, rehypeCxProp } from './src/libs/rehype'

const root = import.meta.dirname
const config = loadConfig({ root })

// https://astro.build/config
export default defineConfig({
  outDir: '../_site',
  build: {
    // The files of the build are written to _site/figma/static/astro/ and requested as
    // /figma/static/astro/…, which chassis-ui.com routes to this site by path. Under /static
    // it routes by the `Referer` header, and that of a script another script imports names no
    // site. The shared files stay on /static. Keep this folder in every name pattern below.
    assets: `figma/static/astro`
  },
  integrations: [
    chassisDocs({
      config,
      markdown: {
        remarkPlugins: [remarkCxSpec, remarkDefinitionList],
        rehypePlugins: [rehypeCxSpec, rehypeCxVariant, rehypeCxToken, rehypeCxProp],
        remarkRehype: {
          handlers: defListHastHandlers
        }
      }
    }),
    ...chassis({ config, root })
  ],
  vite: {
    environments: {
      client: {
        build: {
          rolldownOptions: {
            output: {
              entryFileNames: `figma/static/astro/docs.[hash].js`,
              chunkFileNames: 'figma/static/astro/docs.[hash].js'
              // assetFileNames: 'figma/static/astro/docs.[hash][extname]'
            }
          }
        }
      }
    },
    // Required for CSS files
    build: {
      rolldownOptions: {
        output: {
          assetFileNames: 'figma/static/astro/docs.[hash][extname]'
        }
      }
    }
    // The integration adds the fallback `_chassis-tokens.scss` of `@chassis-ui/css` as a Sass
    // load path. For a custom override in `src/scss`, add that folder:
    // css: { preprocessorOptions: { scss: { loadPaths: [path.resolve(root, 'src/scss')] } } }
  }
})
