# Variants

Different configurations and states available for pagination components to accommodate various navigation requirements, content density, and user interaction patterns. These variants provide flexibility in appearance, behavior, and functionality while maintaining design consistency across different pagination contexts and data presentation scenarios.

## Page Number Component

Individual clickable numeric elements that represent specific page positions within pagination interfaces. These components serve as the core interactive building blocks for numbered pagination systems, adapting their visual state based on user interaction and current page status to provide clear navigation feedback and maintain consistent user experience across all page selection scenarios.

### State Variants

Interactive states that affect user interaction capabilities and visual feedback based on current user activity and page status. These variants communicate the page number's availability and current selection state while guiding users through successful navigation.

#### Idle

Standard appearance of a page number when not being interacted with and not representing the current page. Neutral styling indicates the page is available for navigation and provides clear clickable target.

#### Hover

Enhanced visual feedback when a user hovers over a page number, indicating interactive availability. Elevated styling signals potential navigation action and guides user attention to available page options.

#### Active

Highlighted state indicating the currently selected or active page within the pagination sequence. Distinct styling provides clear feedback about current location and maintains positional awareness within content navigation.

#### Disabled

Non-interactive state for page numbers that are not currently accessible due to loading, restrictions, or system conditions. Reduced visual prominence indicates unavailability while maintaining interface structure and layout consistency.

## Page Arrow Component

Directional navigation elements that provide previous and next page functionality within pagination interfaces. These components serve as essential navigation controls for sequential page browsing, adapting their visual state based on user interaction and navigation availability to provide clear directional feedback and maintain consistent user experience across all pagination scenarios.

### State Variants

Interactive states that affect user interaction capabilities and visual feedback based on current user activity and navigation availability. These variants communicate the arrow's functionality and current interaction state while guiding users through successful page navigation.

#### Idle

Standard appearance of a navigation arrow when not being interacted with and navigation is available. Neutral styling indicates directional navigation is accessible and provides clear interactive target for page movement.

#### Hover

Enhanced visual feedback when a user hovers over a navigation arrow, indicating interactive availability. Elevated styling signals potential navigation action and guides user attention to available directional movement.

#### Press

Active feedback state indicating a navigation arrow is currently being activated or pressed. Immediate tactile response provides user confirmation during navigation interaction and maintains responsive interface behavior.

#### Disabled

Non-interactive state for navigation arrows when directional movement is not available, such as first/last page boundaries. Reduced visual prominence indicates unavailability while maintaining interface structure and navigation context.


## Simple Pagination Component

Navigation elements that provide numbered page selection through clickable page buttons. These components serve as the standard pagination interface for content navigation, adapting their appearance and button states based on current page position and total page count to provide clear navigation feedback and maintain consistent user experience across all paginated content.

### State Variants

Position-based configurations that determine the visual state and navigation capabilities of pagination elements based on their location within the overall page sequence. These variants control the active state and contextual styling to provide clear positional feedback.

#### First

Initial page state with forward navigation options and disabled previous controls. Use for first page navigation, initial content display, or when users begin browsing paginated content from the starting position.

#### Middle

Standard page state with full bidirectional navigation capabilities and balanced control access. Use for intermediate page navigation, standard content browsing, or when users require access to both previous and next page options.

#### Last

Final page state with backward navigation options and disabled next controls. Use for last page navigation, content completion indication, or when users reach the final page of paginated content.

## Advanced Pagination Component

Enhanced navigation elements that provide comprehensive pagination controls including page selection, item count configuration, and status information. These components serve as feature-rich pagination interfaces for complex data presentation, adapting their size and functionality based on content complexity and user control requirements.

### Size Variants

Dimensional configurations that control the pagination scale and content presentation to optimize usability across different screen sizes and interface contexts. These variants determine the spatial organization and control accessibility for various display environments.

#### Large

Expanded pagination dimensions optimized for desktop environments and comprehensive data interfaces. Use for detailed data tables, admin interfaces, content management systems, or when providing extensive pagination controls with enhanced visibility and interaction areas.

#### Small

Compact pagination dimensions optimized for mobile devices and space-constrained interfaces. Use for mobile layouts, embedded pagination, summary views, or when screen space requires efficient use while maintaining clear navigation functionality.

## Dot Pagination Component

Minimal navigation elements that provide position indication through visual dot indicators. These components serve as subtle pagination interfaces for image galleries, carousels, and slideshow content, adapting their dot states based on current position to provide clear positional awareness with minimal visual impact.

### State Variants

Position-based configurations that determine the visual state and navigation feedback of dot pagination elements based on their location within the content sequence. These variants control the active dot styling and positional indication across all possible positions.

#### Active Position

Dynamic state that highlights the current position within the dot sequence while maintaining visibility of all available positions. Use for any position within sequential content navigation, slideshow browsing, gallery viewing, or when users navigate through content items requiring clear positional awareness and sequence context.

