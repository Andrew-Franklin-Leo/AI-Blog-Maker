## 2025-05-14 - Multi-cue active states for navigation
**Learning:** Color-only active states in navigation are insufficient for accessibility. Adding a secondary visual cue like a bottom border (`border-b-2`) ensures the active state is perceivable by users with color vision deficiencies.
**Action:** Use a `navLinkClass` helper to consistently apply both color and border styles to active `NavLink` components.

## 2025-05-14 - Keyboard accessibility with 'Skip to content'
**Learning:** For single-page applications with persistent headers, a 'Skip to content' link is essential for keyboard users to bypass repetitive navigation links.
**Action:** Implement a skip link as the first focusable element in the DOM, targeting a `main-content` ID on the primary content container.
