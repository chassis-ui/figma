import type { Root } from 'hast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

// Helper function to process dl and dt elements
function processDlDt(childNode: any) {
  // Process <dl> elements - add "row" class
  if (childNode.tagName === 'dl') {
    if (!childNode.properties) {
      childNode.properties = {}
    }
    // childNode.properties.class = existingClass ? `${existingClass} row` : 'row'
  }

  // Process <dt> elements - add "variant" class if text starts with "@"
  if (childNode.tagName === 'dt' && childNode.children) {
    const firstChild = childNode.children[0]
    if (firstChild?.type === 'text' && firstChild.value.startsWith('@')) {
      if (!childNode.properties) {
        childNode.properties = {}
      }
      const existingClass = childNode.properties.class
      childNode.properties.class = existingClass ? `${existingClass} variant` : 'variant'
      // Remove the "@" character
      firstChild.value = firstChild.value.substring(1)
    }
  }
}

// A rehype plugin to apply custom formatting to content within `<cxSpec>` or `<CxSpec>` tags
export const rehypeCxSpec: Plugin<[], Root> = function () {
  return function rehypeCxSpecPlugin(ast) {
    visit(
      ast,
      (node) => {
        // Check if we're entering a cxSpec component (any case variation)
        const isCxSpec =
          node.type === 'mdxJsxFlowElement' &&
          (node.name === 'cxSpec' || node.name === 'CxSpec' || node.name === 'cxspec')

        if (isCxSpec) {
          // Process all children of cxSpec
          visit(node, 'element', (childNode) => {
            processDlDt(childNode)
          })
        }
      },
      true
    )
  }
}

// A rehype plugin to apply custom formatting to content within `<CxVariant>` tags
export const rehypeCxVariant: Plugin<[], Root> = function () {
  return function rehypeCxVariantPlugin(ast) {
    visit(
      ast,
      (node) => {
        // Check if we're entering a CxVariant component (any case variation)
        const isCxVariant =
          node.type === 'mdxJsxFlowElement' &&
          (node.name === 'CxVariant' || node.name === 'cxVariant' || node.name === 'cxvariant')

        if (isCxVariant) {
          // Process all children of CxVariant
          visit(node, 'element', (childNode) => {
            processDlDt(childNode)
          })
        }
      },
      true
    )
  }
}

// A rehype plugin to convert :pattern: to icon spans within `<CxToken>` tags
export const rehypeCxToken: Plugin<[], Root> = function () {
  return function rehypeCxTokenPlugin(ast) {
    visit(
      ast,
      (node) => {
        // Check if we're entering a CxToken component (any case variation)
        const isCxToken =
          node.type === 'mdxJsxFlowElement' &&
          (node.name === 'CxToken' || node.name === 'cxToken' || node.name === 'cxtoken')

        if (isCxToken) {
          // Process all children of CxToken
          visit(node, 'element', (childNode) => {
            processDlDt(childNode)

            if (!childNode.children) return

            // Process text nodes that contain :pattern:
            for (let i = 0; i < childNode.children.length; i++) {
              const child = childNode.children[i]
              if (child.type === 'text' && child.value.includes(':')) {
                // Match :word: patterns
                const parts = []
                let lastIndex = 0
                const regex = /:([a-zA-Z0-9-_]+):/g
                let match

                while ((match = regex.exec(child.value)) !== null) {
                  // Add text before the match
                  if (match.index > lastIndex) {
                    parts.push({
                      type: 'text' as const,
                      value: child.value.substring(lastIndex, match.index)
                    })
                  }

                  // Add the icon span
                  parts.push({
                    type: 'element' as const,
                    tagName: 'span',
                    properties: {
                      class: `icon icon-small icon-circle-solid ${match[1]}`
                    },
                    children: []
                  })

                  lastIndex = regex.lastIndex
                }

                // Add remaining text after the last match
                if (lastIndex < child.value.length) {
                  parts.push({
                    type: 'text' as const,
                    value: child.value.substring(lastIndex)
                  })
                }

                // Replace the text node with the parts if we found any matches
                if (parts.length > 0) {
                  childNode.children.splice(i, 1, ...parts)
                  i += parts.length - 1 // Adjust index for added elements
                }
              }
            }
          })
        }
      },
      true
    )
  }
}

// A rehype plugin to format h4 elements within `<CxProp>` tags
// Wraps content after ":" with <span class="type"> and removes ":"
export const rehypeCxProp: Plugin<[], Root> = function () {
  return function rehypeCxPropPlugin(ast) {
    visit(
      ast,
      (node) => {
        // Check if we're entering a CxProp component (any case variation)
        const isCxProp =
          node.type === 'mdxJsxFlowElement' &&
          (node.name === 'CxProp' || node.name === 'cxProp' || node.name === 'cxprop')

        if (isCxProp) {
          // Process all h4 children of CxProp
          visit(node, 'element', (childNode) => {
            processDlDt(childNode)

            if (childNode.tagName === 'h3' && childNode.children) {
              const firstChild = childNode.children[0]
              if (firstChild?.type === 'text' && firstChild.value.includes(':')) {
                const colonIndex = firstChild.value.indexOf(':')
                const beforeColon = firstChild.value.substring(0, colonIndex)
                const afterColon = firstChild.value.substring(colonIndex + 1).trim()

                // Replace children with: text before colon + space + span with type
                childNode.children = [
                  {
                    type: 'text',
                    value: beforeColon
                  },
                  {
                    type: 'text',
                    value: ' '
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: { class: 'type' },
                    children: [
                      {
                        type: 'text',
                        value: afterColon
                      }
                    ]
                  }
                ]
              }
            }
          })
        }
      },
      true
    )
  }
}
