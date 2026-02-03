# Palette's Journal - UX & Accessibility Learnings

## 2025-05-14 - Navigation Perceivability & Active States
**Learning:** Using only color to indicate active states in navigation is insufficient for users with color vision deficiencies. Combining color with a secondary visual cue like a border or underline significantly improves perceivability. Additionally, `NavLink` with the `end` prop is essential for correct active state handling on root paths in React Router.
**Action:** Always use `NavLink` for site navigation and combine color changes with a `border-b-2` or similar visual indicator for active states. Use the `end` prop for the home link.
