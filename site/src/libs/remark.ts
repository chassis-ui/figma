import type { Root } from 'mdast'
// Adds the MDX JSX nodes, such as `mdxJsxFlowElement`, to the types of mdast.
import type {} from 'mdast-util-mdx-jsx'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

// A remark plugin to strip numbers from h3 headings within CxSpec components
// This must run before IDs are generated to prevent invalid CSS selectors like #1-heading
export const remarkCxSpec: Plugin<[], Root> = function () {
  return function remarkCxSpecPlugin(ast) {
    visit(ast, 'mdxJsxFlowElement', (node) => {
      // Check if this is a CxSpec component
      const isCxSpec = node.name === 'cxSpec' || node.name === 'CxSpec' || node.name === 'cxspec'

      if (isCxSpec && node.children) {
        // Collect transformations to avoid issues with tree modification during iteration
        const insertions: Array<{ index: number; pNode: any }> = []

        // Find heading nodes within CxSpec
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i]
          if (child.type === 'heading' && child.depth === 3 && child.children?.length > 0) {
            const firstChild = child.children[0]
            if (firstChild?.type === 'text') {
              // Match "1. Heading Text" pattern
              const match = firstChild.value.match(/^(\d+)\.\s*(.*)/)
              if (match) {
                const number = match[1]
                const remainingText = match[2]

                // Create a paragraph node with the number
                const pNode = {
                  type: 'paragraph',
                  children: [{ type: 'text', value: number }],
                  data: {
                    hProperties: {
                      class: 'number'
                    }
                  }
                }

                // Update heading text (remove the number)
                firstChild.value = remainingText

                // Store insertion (will be applied in reverse order)
                insertions.push({ index: i, pNode })
              }
            }
          }
        }

        // Apply insertions in reverse order to maintain correct indices
        for (let i = insertions.length - 1; i >= 0; i--) {
          const { index, pNode } = insertions[i]
          node.children.splice(index, 0, pNode)
        }
      }
    })
  }
}
