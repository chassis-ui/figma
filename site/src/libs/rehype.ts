import type { Root } from 'hast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

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

            // Process paragraph elements - check for lines starting with "%" followed by a number
            if (childNode.tagName === 'p' && childNode.children) {
              const firstChild = childNode.children[0]
              if (firstChild?.type === 'text') {
                const match = firstChild.value.match(/^%(\d+)(.*)/)
                if (match) {
                  // Add a class to the paragraph instead of wrapping
                  if (!childNode.properties) {
                    childNode.properties = {}
                  }
                  const existingClass = childNode.properties.class
                  childNode.properties.class = existingClass ? `${existingClass} number` : 'number'
                  // Remove the "%" character
                  firstChild.value = firstChild.value.substring(1)
                }
              }
            }

            // Process h3 elements - wrap number in span if starts with number followed by dot
            if (childNode.tagName === 'h3' && childNode.children) {
              const firstChild = childNode.children[0]
              if (firstChild?.type === 'text') {
                const match = firstChild.value.match(/^(\d+)\.\s*(.*)/)
                if (match) {
                  const number = match[1]
                  const remainingText = match[2]
                  // Replace the first child with a span containing the number and the remaining text
                  childNode.children[0] = {
                    type: 'element',
                    tagName: 'span',
                    properties: { class: 'number' },
                    children: [{ type: 'text', value: number }]
                  }
                  // Add the remaining text if it exists
                  if (remainingText) {
                    childNode.children.splice(1, 0, { type: 'text', value: remainingText })
                  }
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
            if (childNode.tagName === 'h4' && childNode.children) {
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
