## 2025-05-14 - [HashRouter and Skip-to-content]
**Learning:** Standard anchor links (e.g., `href="#main-content"`) can conflict with `HashRouter` as the browser might interpret the hash change as a route change, leading to active link states being incorrectly cleared or unexpected navigation.
**Action:** Use an `onClick` handler with `e.preventDefault()` on "Skip to content" links in projects using `HashRouter` to manually focus and scroll to the target element without changing the URL hash.

## 2025-05-14 - [Accessible Navigation States]
**Learning:** Relying solely on color to indicate the active navigation state is insufficient for users with color vision deficiencies.
**Action:** Always combine color changes with additional visual cues, such as a `border-b-2` or an underline, to clearly indicate the active page in navigation menus.
