## 2025-05-15 - Accessibility-First Sticky Navigation & Skip Link

**Learning:** Implementing a "Skip to content" link is critical for keyboard users to bypass navigation. When using client-side routers like `HashRouter`, standard fragment identifiers (e.g., `#main-content`) can interfere with routing logic or fail to shift focus properly. A manual `onClick` handler that programmatically calls `.focus()` and `.scrollIntoView()` on a target element with `tabIndex={-1}` is the most reliable way to ensure accessibility without disrupting the application state.

**Action:** Always pair a sticky navbar with a "Skip to content" link. Use manual focus management for skip links in SPA environments. Ensure the target element (e.g., `<main id="main-content">`) has `tabIndex={-1}` to be programmatically focusable and `focus:outline-none` to prevent unintentional visual outlines during navigation.
