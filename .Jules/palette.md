## 2025-05-14 - Skip to Content with HashRouter
**Learning:** In projects using `HashRouter`, standard anchor links like `href="#main-content"` for 'Skip to content' can conflict with routing.
**Action:** Use an `onClick` handler with `e.preventDefault()` to manually scroll and focus the target element to avoid route disruption.

## 2025-05-14 - Visual Cues for Active Nav States
**Learning:** To improve perceivability for users with color vision deficiencies, always combine color-based active states with additional visual cues like borders (`border-b-2`) or underlines in navigation elements.
**Action:** Use `NavLink` with a className callback to apply both color and border styles consistently.
