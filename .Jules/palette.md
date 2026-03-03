## 2026-03-03 - Accessible Navigation in HashRouter
**Learning:** Standard anchor links like `href="#main-content"` can conflict with `HashRouter` navigation logic, potentially causing unexpected route changes or failing to shift focus correctly.
**Action:** Use a manual `onClick` handler for 'Skip to content' links to programmatically manage focus and scrolling, ensuring accessibility without interfering with the client-side router.
