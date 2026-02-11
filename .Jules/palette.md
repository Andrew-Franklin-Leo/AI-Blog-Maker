## 2025-05-22 - Navbar Accessibility and UX Improvements
**Learning:** To improve perceivability for users with color vision deficiencies, color-based active states should be combined with additional visual cues like borders or underlines. Additionally, a "Skip to content" link is essential for keyboard-only users to bypass navigation.
**Action:** Use `NavLink` for automatic `aria-current` support and implement a consistent `navLinkClass` that includes a `border-b-2` for active states and `border-transparent` for inactive states to prevent layout shifts.
