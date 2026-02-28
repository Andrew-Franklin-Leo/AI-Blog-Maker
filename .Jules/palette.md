## 2026-02-28 - [Accessible Skip-to-Content Link with HashRouter]
**Learning:** In applications using `HashRouter`, standard anchor links like `href="#main-content"` for "Skip to content" can conflict with routing. Programmatically handling the focus shift is more reliable.
**Action:** Use an `onClick` handler with `e.preventDefault()` to manually scroll and focus the target element (ensuring `tabindex="-1"` is set) to avoid route disruption.

## 2026-02-28 - [Enhanced NavLink Perceiverability]
**Learning:** To improve perceivability for users with color vision deficiencies, color-based active states should be combined with additional visual cues.
**Action:** Use the `NavLink` component's `isActive` state to apply both a color change and a bottom border (`border-b-2`) to navigation links.
