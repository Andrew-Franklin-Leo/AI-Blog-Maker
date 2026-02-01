## 2025-02-01 - [Navigation Accessibility and Visual Feedback]
**Learning:** Using `NavLink` instead of `Link` for navigation is a major win for accessibility as it provides `aria-current="page"` automatically. Adding a visual indicator like a bottom border in addition to color changes ensures that active states are perceivable by users with color vision deficiencies.
**Action:** Always prefer `NavLink` for main site navigation and combine color changes with other visual cues (like borders or underlines).
