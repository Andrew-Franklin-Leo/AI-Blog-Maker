# Palette's Journal - Critical UX & Accessibility Learnings

## 2025-05-15 - [Skip to content with HashRouter]
**Learning:** In projects using `HashRouter`, standard anchor links like `href="#main-content"` for 'Skip to content' can conflict with routing, potentially causing unintended navigation.
**Action:** Use an `onClick` handler with `e.preventDefault()` to manually scroll and focus the target element to avoid route disruption while maintaining accessibility.

## 2025-05-15 - [Perceivability for Color Vision Deficiency]
**Learning:** To improve perceivability for users with color vision deficiencies, always combine color-based active states with additional visual cues like borders (`border-b-2`) or underlines in navigation elements.
**Action:** Implement `border-b-2` for active states in `Navbar` and use `border-transparent` for inactive states to prevent layout jumping.
