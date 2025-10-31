# Guidelines

Component-specific usage principles and best practices for implementing mobile navigation top components effectively within design systems. These guidelines focus on proper component structure, hierarchy decisions, and visual styling approaches to achieve optimal navigation experiences.

## Navigation Hierarchy Guidelines

Best practices for organizing navigation structure and component hierarchy based on content depth and user context within the application.

### Hide control bar

Remove the control bar component and implement large title presentation for primary application sections and top-level navigation contexts.

**Implementation**: Use Nav Container (Basic) with large title enabled, without Nav Header component integration.

**Use cases**: Home screens, main feature landing pages, primary content sections, or any top-level navigation context where maximum title prominence is required.

**Benefits**: Creates clear visual hierarchy, maximizes content focus, reduces interface complexity, and provides iOS-aligned large title experience.

### Control bar only

Implement standard control bar without large title for tertiary sections and deep navigation contexts where space efficiency is prioritized.

**Implementation**: Use Nav Container (Basic) with Nav Header (Center or Left) focusing on functional navigation rather than title prominence.

**Use cases**: Settings screens, detailed configuration pages, nested content views, or any deep navigation context where functionality takes precedence over title display.

**Benefits**: Maximizes content area, provides efficient navigation controls, maintains clear hierarchy indication through reduced title emphasis.

### Avoid title conflicts

Avoid combining center-aligned title positioning with large title presentation as these approaches conflict in visual hierarchy and platform conventions.

**Reasoning**: Center-aligned titles and large titles represent different iOS navigation paradigms that should not be mixed within the same interface context.

**Correct approaches**: Use center-aligned titles with standard sizing, or use large titles with appropriate title positioning (typically left-aligned for large title contexts).

**Benefits**: Maintains platform consistency, prevents visual hierarchy conflicts, ensures proper iOS design pattern alignment.

### Limit primary actions

Maintain one primary action per navigation interface to prevent competing interaction hierarchy and user decision complexity.

**Implementation**: Use one Nav Action Item (Major) or Nav Action Item (Primary Text) per navigation structure with supporting secondary actions.

**Benefits**: Creates clear interaction hierarchy, reduces user cognitive load, maintains focused action guidance.

### Contextual back navigation

Implement appropriate back navigation that provides clear destination context and follows platform-specific back button conventions.

**Implementation**: Use Nav Action Item (Back Arrow) for standard back functionality, or Nav Action Item (Parent) for iOS-style contextual back navigation.

**Platform considerations**: Follow iOS back button conventions for iOS interfaces, Material Design conventions for Android interfaces.

### Subtitle context

Implement subtitle variants when additional context or categorization information enhances navigation understanding.

**Implementation**: Use Nav Title Item (Center Subtitle) or Nav Title Item (Chat) for contextual information display.

**Use cases**: Content categorization, user context display, status information, or any navigation requiring supplementary title information.

### Dropdown titles

Apply dropdown title variants when title area functions as a selection interface or category switcher.

**Implementation**: Use Nav Title Item (Center Dropdown) with clear dropdown affordances and selection functionality.

**Use cases**: Category selection, filter interfaces, content switching, or any navigation where title functions as interactive selection element.

## Glass Styling Guidelines

Specific implementation practices for glass visual treatment and modern iOS aesthetic integration within navigation components.

### Remove backgrounds

Eliminate solid backgrounds and visual separators when implementing glass aesthetic treatment to achieve proper translucent visual effects.

**Implementation**: Apply glass variant with transparent backgrounds, remove separator elements, and ensure proper content layering beneath navigation elements.

**Technical requirements**: Disable background fills, remove border elements, ensure underlying content provides appropriate visual foundation for glass effects.

**Benefits**: Achieves authentic glass aesthetic, maintains iOS 26 design alignment, creates modern translucent interface experience.

### Add extra shadow

Apply additional shadow styling to glass navigation components when used over complex backgrounds or high-contrast content areas.

**Implementation**: Increase shadow depth, adjust shadow opacity, or add additional shadow layers to glass navigation elements when content requires enhanced definition.

**Use cases**: Navigation over maps, photo galleries, video content, high-contrast backgrounds, or any context where glass elements need enhanced visual separation.

**Benefits**: Maintains glass element visibility, ensures proper contrast separation, preserves interface legibility over complex content.

## Container Type Guidelines

Best practices for selecting appropriate container types based on interface context and modal presentation requirements.

### Modal containers

Implement modal container variants for fullscreen presentations, temporary interface states, and overlay navigation contexts.

**Implementation**: Use Nav Container (Modal) with appropriate dismissal actions and clear modal context indicators.

**Use cases**: Form presentations, content creation interfaces, settings overlays, or any temporary interface requiring clear context separation.

### Stack containers

Apply stack container variants for multi-level modal presentations and progressive disclosure workflows.

**Implementation**: Use Nav Container (Stack) with proper back navigation and hierarchical action organization.

**Use cases**: Multi-step forms, progressive onboarding, nested modal workflows, or any interface requiring layered modal context.

## Utility Component Guidelines

Best practices for integrating utility components and extended functionality within navigation structures.

### Search utility

Implement search utility components when primary interface function involves content discovery, filtering, or query-based navigation.

**Implementation**: Combine Nav Utility (Search) with appropriate action elements and clear search affordances.

**Use cases**: Content browsing, product discovery, contact search, or any interface prioritizing search functionality.

### Segmented controls

Apply segmented utility components for iOS-aligned content filtering and category-based navigation patterns.

**Implementation**: Use Nav Utility (Segmented) with clear selection states and iOS design pattern alignment.

**Use cases**: Content filtering, category browsing, settings organization, or any iOS interface requiring clear content categorization.

### Tab navigation

Implement tab utility components for Android-aligned section navigation and horizontal content organization.

**Implementation**: Use Nav Utility (Tabs) with Material Design alignment and horizontal scrolling support where needed.

**Use cases**: Content sections, feature organization, dashboard navigation, or any Android interface requiring tab-based organization.

### Chip shortcuts

Apply chip utility components for search shortcuts and quick selection options that enhance content discovery workflows.

**Implementation**: Use Nav Utility (Chips) with preset options and horizontal scrolling support for efficient shortcut access.

**Use cases**: Favorite destinations, preset search keywords, recent selections, quick filters, or any interface requiring rapid access to common search terms and shortcuts.

### Calendar navigation

Implement calendar utility components for date-based navigation with weekly layout and event indication functionality.

**Implementation**: Use Nav Utility (Calendar) with 7-day weekly display and event indicators for dates containing scheduled activities.

**Use cases**: Event scheduling, booking interfaces, calendar browsing, date selection with event context, or any interface requiring temporal navigation with activity awareness.

