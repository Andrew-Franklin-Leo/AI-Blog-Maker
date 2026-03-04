## 2025-05-14 - Skip to Content & Navbar UX
**Learning:** In a `HashRouter` environment, implementing a "Skip to content" link requires both a target `id` and a `tabIndex={-1}` on the main content element to ensure focus is correctly moved and accessible to screen readers, while using `focus:outline-none` on the container prevents an unstyled blue box from appearing on the entire main area when the skip link is clicked.
**Action:** Always pair `id` with `tabIndex={-1}` and `focus:outline-none` for non-interactive focus targets like `<main>`.
