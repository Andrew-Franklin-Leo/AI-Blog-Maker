## 2025-02-07 - Skip to Content link visibility
**Learning:** Skip links should not only be functional but also prominently visible when focused. Using `focus:absolute focus:top-0 focus:left-0 focus:right-0 focus:text-center` with a solid background ensures they don't messy-overlay other elements and are clear to keyboard users.
**Action:** Always ensure skip links have a clear background and central positioning when focused to avoid visual clutter with branding.

## 2025-02-07 - Perceptibility in Navigation
**Learning:** Color-based active states are insufficient for users with color vision deficiencies. Combining color changes with a `border-b-2` provides a clear visual cue.
**Action:** Implement `navLinkClass` helper to consistently apply border-based active states in all navigation components.
