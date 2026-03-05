## 2025-05-14 - Skip to Content & Navbar UX

**Learning:** In a `HashRouter` environment, standard anchor links for "Skip to content" (e.g., `#main-content`) can sometimes conflict with the routing or fail to shift focus properly to non-interactive elements like `<main>`.

**Action:** Use an `onClick` handler with `e.preventDefault()` to manually call `.focus()` and `.scrollIntoView()` on the target element. Ensure the target has `tabIndex={-1}` and `focus:outline-none` to receive focus without a visual ring if desired, and that the skip link itself has a high `z-index` to appear above sticky headers.
