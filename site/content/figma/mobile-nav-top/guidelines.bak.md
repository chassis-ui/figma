# Guidelines

Design and implementation principles for creating effective, accessible, and consistent mobile navigation experiences. These guidelines ensure mobile navigation components serve their functional purpose while maintaining platform conventions, usability standards, and visual harmony across all mobile interface contexts.

## Platform Conventions

Guidelines for maintaining platform-specific design patterns and user expectations across iOS and Android implementations.

### iOS Navigation Patterns

Follow iOS Human Interface Guidelines for navigation bar styling, title positioning, and action placement. Use center-aligned titles for most implementations, large titles for primary content screens, and iOS-style back buttons with appropriate parent context.

#### Do

Use center-aligned titles with balanced left and right action placement for standard iOS navigation patterns.

#### Do

Implement large titles for primary content screens to establish clear content hierarchy and improve readability.

#### Don't

Mix Android-style navigation patterns within iOS-designed interfaces or applications.

### Android Navigation Patterns

Adhere to Material Design principles for app bar styling, title positioning, and action organization. Use left-aligned titles for compact layouts, incorporate overflow menus for additional actions, and maintain Material Design elevation and shadow standards.

#### Do

Use left-aligned titles with trailing action placement for standard Android navigation patterns.

#### Do

Implement tab navigation for horizontal content organization following Material Design tab specifications.

#### Don't

Apply iOS-specific navigation styling within Android-designed interfaces or applications.

## Content Strategy

Guidelines for navigation labeling, title hierarchy, and content organization that enhance user understanding and successful navigation completion.

### Clear Title Hierarchy

Create descriptive page titles that immediately communicate current location and content context. Avoid ambiguous titles that leave users uncertain about their position within the application structure.

#### Do

Use specific, descriptive titles that clearly identify the current screen or content section.

#### Don't

Use generic titles like "Page" or "Content" that don't provide meaningful navigation context.

### Action Label Clarity

Write clear, action-oriented labels for navigation actions that describe the expected outcome. Back buttons should indicate destination context, while utility actions should clearly communicate their functionality.

#### Do

Use descriptive action labels that communicate the specific function or destination.

#### Don't

Rely solely on icons without accompanying labels for complex navigation actions.

### Progressive Disclosure

Organize navigation complexity through progressive disclosure patterns. Use utility components for advanced functionality while maintaining clear primary navigation paths for essential user tasks.

#### Do

Present primary navigation options prominently while organizing secondary functions within utility interfaces.

#### Don't

Overwhelm users with too many navigation options in the primary interface without logical organization.

## Visual Consistency

Standards for maintaining cohesive navigation appearance and behavior patterns across all mobile interface contexts and user interactions.

### Design Token Usage

Apply standardized design tokens for all navigation styling properties. Consistent token usage ensures visual harmony across navigation components and enables efficient theme customization throughout the mobile application.

#### Do

Use predefined design tokens for colors, typography, spacing, and sizing properties across all navigation elements.

#### Don't

Create custom navigation styling that deviates from established design system values.

### Component Hierarchy

Establish clear visual hierarchy through appropriate component selection and variant usage. Container components provide structure, header components organize content, and action components enable interaction.

#### Do

Use navigation components systematically with clear hierarchy from container to actions.

#### Don't

Mix navigation component variants inconsistently within the same interface or user flow.

### State Consistency

Maintain consistent visual treatment across all navigation states including idle, focus, active, and disabled conditions. State changes should be immediately recognizable while maintaining overall design harmony.

#### Do

Apply consistent state indicators across all navigation action types and variants.

#### Don't

Use different state styling patterns for similar navigation elements within the same interface.

## Layout Patterns

Best practices for navigation structure, component arrangement, and user flow that enhance navigation efficiency and reduce cognitive load.

### Single Navigation Context

Maintain one primary navigation context per screen to avoid competing navigation systems. Multiple navigation bars or conflicting navigation patterns can confuse users and reduce navigation efficiency.

#### Do

Use one primary navigation structure per screen with consistent component hierarchy.

#### Don't

Implement multiple competing navigation systems that create confusion about primary navigation paths.

### Utility Integration

Integrate utility components thoughtfully to extend navigation functionality without overwhelming primary navigation tasks. Utility components should complement rather than compete with essential navigation elements.

#### Do

Use utility components to provide enhanced functionality while maintaining clear primary navigation.

#### Don't

Allow utility components to overshadow or interfere with essential navigation tasks.

### Modal Navigation Context

Apply appropriate navigation styling for modal presentations and overlay interfaces. Modal navigation should provide clear context separation while maintaining consistent interaction patterns.

#### Do

Use modal navigation variants for overlay interfaces to signal context separation.

#### Don't

Use standard navigation styling for modal interfaces without clear contextual differentiation.

## Interaction Patterns

Best practices for navigation behavior, state management, and user feedback that enhance the overall navigation experience and system reliability.

### Back Navigation Behavior

Implement predictable back navigation that follows platform conventions and user expectations. Back actions should provide clear destination context and maintain navigation state appropriately.

#### Do

Provide contextual back navigation with clear destination indication and consistent behavior patterns.

#### Don't

Implement unexpected back navigation behavior that violates platform conventions or user expectations.

### State Preservation

Maintain appropriate navigation state across user sessions and application lifecycle events. Navigation context should be preserved and restored according to platform guidelines and user expectations.

#### Do

Preserve navigation state appropriately during application lifecycle events and user session management.

#### Don't

Lose navigation context unexpectedly or restore navigation state inconsistently.

### Loading and Transition States

Provide clear visual feedback during navigation transitions and content loading. Navigation elements should maintain their structure and accessibility during loading states while providing appropriate progress indication.

#### Do

Maintain navigation structure during loading states with appropriate progress indicators.

#### Don't

Remove navigation elements during loading, leaving users without orientation or escape options.

## Implementation Examples

Practical visualization examples and configuration scenarios that demonstrate effective mobile navigation implementations across different application contexts and user flows.

## Standard App Navigation

Create typical mobile application navigation using basic container with center-aligned header and balanced action placement.

### iOS Standard Configuration

Use **Nav Container (Basic)** with **Nav Header (Center)** and **Nav Title Item (Center)**. Add **Nav Action Item (Back Arrow)** on the left and **Nav Action Item (Menu Icon)** on the right for balanced navigation control.

**Use case**: Main application screens, content browsing, settings pages, or any standard iOS navigation requiring clear hierarchy and familiar interaction patterns.

### Android Material Configuration

Use **Nav Container (Basic)** with **Nav Header (Left)** and **Nav Title Item (Left Aligned)**. Add **Nav Action Item (Back Arrow)** on the left and **Nav Action Item (Menu Icon)** on the right for Material Design compliance.

**Use case**: Android applications following Material Design guidelines, content-heavy interfaces, or when optimizing for left-to-right reading patterns.

## Content-Focused Navigation

Create prominent content navigation with large title emphasis for enhanced readability and content hierarchy.

### Large Title Implementation

Use **Nav Container (Basic)** with **Nav Header (Large Title)** and **Nav Title Item (Large)**. Combine with minimal actions to maintain focus on content presentation.

**Use case**: Article reading, blog posts, documentation, or any content-focused interface where title prominence improves user engagement and readability.

**Best practice**: Reserve large titles for primary content screens and avoid using with complex utility components that compete for attention.

## Modal and Overlay Navigation

Implement modal-specific navigation that provides clear context separation and appropriate dismissal patterns.

### Fullscreen Modal Configuration

Use **Nav Container (Modal)** with **Nav Header (Center)** and **Nav Action Item (Close Icon)** positioned on the right. Add **Nav Action Item (Primary Text)** on the left for confirmation actions.

**Use case**: Form submissions, content creation, onboarding flows, or any fullscreen modal requiring clear entry and exit points.

### Stacked Modal Implementation

Use **Nav Container (Stack)** for nested modal presentations with **Nav Action Item (Back Arrow)** for hierarchical navigation and **Nav Action Item (Close Icon)** for complete dismissal.

**Use case**: Multi-step workflows, progressive disclosure interfaces, or nested modal flows requiring both step-back and complete exit options.

## Search and Discovery Navigation

Create search-focused navigation interfaces that prioritize content discovery and filtering capabilities.

### Basic Search Configuration

Use **Nav Utility Component (Search)** with **Nav Action Item (Back Arrow)** for easy return navigation. Position search input prominently with clear query affordances.

**Use case**: Content search, product discovery, contact finding, or any interface prioritizing search functionality over traditional navigation.

### Advanced Search with Filters

Combine **Nav Utility Component (Search)** with **Nav Utility Component (Chips)** for preset filters and quick selection options. Maintain clear action hierarchy.

**Use case**: E-commerce filtering, content categorization, advanced search interfaces, or when providing multiple discovery pathways.

## Travel and Location Navigation

Implement specialized navigation for travel and location-based applications with clear origin-destination relationships.

### Trip Planning Configuration

Use **Nav Title Item (Trip Route)** with departure and arrival display, combined with **Nav Utility Component (Trip Search)** for location selection and modification.

**Use case**: Travel booking, ride-sharing, delivery apps, or any interface requiring clear location context and route management.

### Date-Based Travel Navigation

Combine **Nav Utility Component (Calendar)** with trip title components for temporal travel planning and date-specific navigation.

**Use case**: Hotel booking, flight selection, event planning, or when travel decisions depend on specific date ranges and availability.

## Communication and Chat Navigation

Create conversation-focused navigation that emphasizes user context and communication features.

### Chat Header Configuration

Use **Nav Title Item (Chat)** with left-aligned positioning, subtitle support, and **Nav Action Item (User Avatar)** for participant identification and profile access.

**Use case**: Messaging applications, customer support chat, video calling interfaces, or any communication-focused interface requiring clear participant context.

### Group Chat Implementation

Combine **Nav Title Item (Chat)** with **Nav Action Item (Menu Icon)** for group management and **Nav Action Item (User Avatar)** for individual user actions.

**Use case**: Group messaging, team communication, collaborative interfaces, or when managing multiple participants within conversation contexts.

## Utility and Tool Navigation

Implement specialized utility interfaces that extend basic navigation with enhanced functionality.

### Segmented Control Navigation

Use **Nav Utility Component (Segmented)** for iOS-style content categorization with clear selection states and smooth transitions between categories.

**Use case**: Content filtering, category browsing, settings organization, or when providing clear content categorization with iOS design patterns.

### Tab Navigation Implementation

Use **Nav Utility Component (Tabs)** for Android-style section navigation with horizontal scrolling support and clear content organization.

**Use case**: Content sections, feature organization, dashboard navigation, or when implementing Android-aligned tab patterns with extensive content categories.

## Brand and Marketing Navigation

Create brand-focused navigation that maintains corporate identity while providing functional navigation capabilities.

### Logo-Centric Configuration

Use **Nav Title Item (Brand Logo)** for company identification combined with minimal actions to maintain brand prominence and visual focus.

**Use case**: Marketing websites, branded applications, corporate interfaces, or when brand visibility takes priority over traditional navigation patterns.

**Best practice**: Balance brand prominence with functional navigation needs, ensuring logo placement doesn't interfere with essential user tasks.

## Responsive and Adaptive Navigation

Implement navigation that adapts to different screen sizes and content requirements while maintaining consistent interaction patterns.

### Compact Screen Navigation

Use flush spacing variants and compact action arrangements for small screen optimization while maintaining touch target accessibility.

**Use case**: Small mobile devices, dense content interfaces, or when maximizing content area while preserving essential navigation functionality.

### Content-Adaptive Navigation

Adjust navigation complexity based on content requirements, using progressive disclosure to reveal advanced options only when needed.

**Use case**: Variable content complexity, user-specific customization, or when navigation requirements change based on user context and task complexity.
