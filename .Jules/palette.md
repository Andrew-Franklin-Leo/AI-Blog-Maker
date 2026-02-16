## 2025-05-14 - [Navigation UX & Accessibility Polish]
**Learning:** For multi-page applications, using `NavLink` with `aria-current="page"` and a secondary visual cue (like a border or underline) beyond just color improves perceivability for all users, especially those with color vision deficiencies.
**Action:** Always combine color-based active states with structural visual indicators like `border-b-2`.

## 2025-05-14 - [Skip to Content Link Implementation]
**Learning:** A "Skip to content" link must be the first focusable element and should be styled to be prominently visible when focused, using a high z-index to avoid being obscured by sticky headers.
**Action:** Use `sr-only focus:not-sr-only` and ensure a target ID (e.g., `#main-content`) exists on the main content area.
