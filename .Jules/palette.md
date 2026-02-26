## 2025-02-26 - Skip Link Interaction with Automation
**Learning:** "Skip to content" links positioned absolutely (even off-screen) can unexpectedly intercept pointer events in automated testing environments like Playwright, blocking clicks on underlying navigation elements.
**Action:** Always combine off-screen positioning (`-top-16`) with `pointer-events-none` when inactive, and `pointer-events-auto` when focused, to ensure both accessibility and testability.

## 2025-02-26 - HashRouter Skip Link Compatibility
**Learning:** Standard anchor links like `href="#main-content"` can conflict with `HashRouter` routing in React, potentially causing route disruptions when used for skip links.
**Action:** Use an `onClick` handler with `e.preventDefault()` to manually manage focus and scroll for skip links in projects using `HashRouter`.
