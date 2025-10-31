# Guidelines

Component-specific usage principles and best practices for implementing mobile navigation bottom components effectively within design systems. These guidelines focus on proper component structure, navigation context decisions, and visual styling approaches to achieve optimal bottom navigation experiences.

## Container Configuration Guidelines

Best practices for configuring bottom navigation containers and selecting appropriate navigation types based on user context, interface requirements, and additional functionality integration.

### Navigation type selection

Choose appropriate container types based on primary interface requirements and user workflow contexts.

**Implementation**: Use Bottom Navigation Container (Tabs) for section navigation, (Action Bar) for task workflows, or (Progress Info) for process communication.

**Use cases**: Match container type to primary interface purpose - tabs for navigation, action bars for workflows, progress info for status communication.

**Benefits**: Provides appropriate interface foundation, matches user expectations, enables proper functionality organization.

### Home indicator spacing

Enable home indicator accommodation for devices requiring bottom screen space management.

**Implementation**: Use has-home-bar property to provide appropriate spacing for iOS home indicator requirements.

**Use cases**: iPhone X and later devices, full-screen interfaces, gesture-based navigation, or any interface requiring home indicator accommodation.

**Benefits**: Prevents interface conflicts, maintains proper touch zones, ensures compatibility with modern iOS devices.

### Content slot integration

Implement additional content slots when bottom navigation requires extended functionality beyond standard navigation.

**Implementation**: Use has-slot property with slot-instance configuration for custom content integration.

**Use cases**: Dynamic content display, contextual information, extended functionality, or any interface requiring flexible content integration.

**Benefits**: Provides interface flexibility, enables dynamic content, supports custom functionality without disrupting navigation structure.

### Visual separation

Hide separator elements and background colors when bottom navigation doesn't require visual distinction from main content areas.

**Implementation**: Disable has-separator property and background fills when clean integration is preferred over visual boundaries.

**Use cases**: Minimal designs, seamless layouts, modern aesthetics, or any interface where visual separation creates unnecessary complexity.

**Benefits**: Creates cleaner interface integration, reduces visual noise, enhances modern aesthetic with seamless content flow.

## Tab Navigation Guidelines

Best practices for implementing tab-based navigation and emphasized action patterns within bottom navigation structures.

### Standard tab navigation

Use tab-based bottom navigation for primary section switching and main application area navigation.

**Implementation**: Use Bottom Navigation Container (Tabs) with Nav Tab Component (Standard) for balanced section access.

**Use cases**: Main app sections, primary feature areas, dashboard navigation, or any interface requiring persistent section access.

**Benefits**: Provides clear section organization, maintains navigation context, enables quick section switching with familiar interaction patterns.

### Floating action emphasis

Use floating action integration when one primary action requires significant visual emphasis within tab navigation.

**Implementation**: Use Nav Tab Component (Floating Action) to replace center tab with prominent action button.

**Use cases**: Content creation, primary app function, featured action, or any interface where one action requires maximum prominence.

**Benefits**: Creates clear action hierarchy, maintains tab navigation benefits while emphasizing primary functionality.

## Glass Styling Guidelines

Specific implementation practices for glass visual treatment and modern iOS aesthetic integration within bottom navigation components.

### Remove backgrounds

Eliminate solid backgrounds and visual separators when implementing glass aesthetic treatment to achieve proper translucent visual effects.

**Implementation**: Apply glass style variant with transparent backgrounds, remove separator elements, and ensure proper content layering above navigation elements.

**Technical requirements**: Disable background fills, remove border elements, ensure main content provides appropriate visual foundation for glass effects.

**Benefits**: Achieves authentic glass aesthetic, maintains iOS 26 design alignment, creates modern translucent interface experience.

### Add shadow elevation

Apply additional shadow styling to glass bottom navigation components when used over complex content or variable backgrounds.

**Implementation**: Increase shadow depth, adjust shadow opacity, or add additional shadow layers when content requires enhanced navigation definition.

**Use cases**: Navigation over scrolling content, variable background colors, complex layouts, or any context where glass elements need enhanced visual separation.

**Benefits**: Maintains navigation visibility, ensures proper contrast separation, preserves interface legibility over dynamic content.

## Action Component Guidelines

Best practices for organizing action elements and selecting appropriate action arrangements within bottom navigation workflows.

### Stacked actions

Use vertical action arrangement for multiple action organization and comprehensive workflow control.

**Implementation**: Use Nav Action Component (Stacked) when providing 3 or more actions or when actions have different priority levels.

**Use cases**: Multi-step forms, complex workflows, hierarchical actions, or any interface requiring comprehensive action access with clear priority.

**Benefits**: Accommodates multiple actions, provides clear hierarchy, maximizes touch target accessibility with vertical spacing.

### Side by side

Apply horizontal action arrangement for paired actions and balanced decision-making workflows.

**Implementation**: Use Nav Action Component (Side by Side) for binary choices, confirmation workflows, or equally weighted actions.

**Use cases**: Confirm/cancel dialogs, save/discard workflows, accept/decline processes, or any interface requiring balanced action presentation.

**Benefits**: Creates equal action emphasis, fits familiar interaction patterns, provides efficient horizontal space usage.

### Secondary actions

Hide secondary action visibility when workflows only require primary actions to maintain interface simplicity.

**Implementation**: Disable has-2nd-action property when workflows don't require additional options beyond primary actions.

**Use cases**: Simple workflows, single-action processes, minimal interfaces, or any workflow where additional actions would create unnecessary complexity.

**Benefits**: Maintains interface simplicity, reduces cognitive load, provides focused action experience without progressive disclosure complexity.

## Progress Component Guidelines

Best practices for selecting appropriate progress component types and communicating process status effectively within bottom navigation.

### Purchase summary

Use transaction-focused progress for e-commerce workflows and purchase completion processes.

**Implementation**: Use Nav Progress Component (Purchase Summary) with pricing information, item counts, and checkout functionality.

**Use cases**: Shopping cart interfaces, payment processes, transaction reviews, or any e-commerce workflow requiring purchase context.

**Benefits**: Maintains purchase awareness, provides transaction transparency, enables quick purchase review and modification.

### Step progress

Apply process-focused progress for multi-step workflows and guided task completion.

**Implementation**: Use Nav Progress Component (Step Progress) with step indicators, current position, and workflow navigation.

**Use cases**: Onboarding sequences, setup processes, form completion, or any multi-step workflow requiring progress awareness.

**Benefits**: Maintains user orientation, communicates completion progress, provides clear workflow navigation and status.
