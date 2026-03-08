## 2026-03-08 - Skip to content implementation in HashRouter
**Learning:** In projects using HashRouter, standard anchor links like `href="#main-content"` for 'Skip to content' can conflict with routing.
**Action:** Use an `onClick` handler with `e.preventDefault()` to manually focus and scroll to the target element. Additionally, ensure the target element (like `<main>`) has `tabIndex={-1}` and `focus:outline-none` for a smooth programmatic focus experience.
