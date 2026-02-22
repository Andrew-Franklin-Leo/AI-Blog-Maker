# Palette's Journal

## 2025-05-14 - Navigation Accessibility and Visual Feedback
**Learning:** Using `NavLink` with the `end` prop is crucial for the home link (/) to avoid it being marked as active for all sub-routes. Additionally, combining color-based active states with visual cues like borders improves perceivability for users with color vision deficiencies.
**Action:** Always use `NavLink` for navigation, use the `end` prop for root routes, and include non-color visual indicators for active states.

## 2025-05-14 - Skip Link pointer-events interaction
**Learning:** A "Skip to content" link that is `fixed` and covers the top of the page when focused can intercept pointer events and block interactions with elements underneath (like other navbar links) during automated testing or for users who use both keyboard and mouse.
**Action:** Be mindful of the skip link's layout and ensure it doesn't unnecessarily block other elements. Use `pointer-events-none` when not focused if it's not already clipped.
