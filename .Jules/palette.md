## 2024-03-12 - [Accessible Card Interactivity]
**Learning:** Using the "stretched link" pattern (absolute inset-0 on a span inside a title link) allows the entire card to be clickable while maintaining a single, clear target for screen readers and search engines.
**Action:** Use this pattern instead of wrapping the entire card in a Link to improve semantic structure and accessibility.

## 2024-03-12 - [Skip to Content in SPA with HashRouter]
**Learning:** Standard anchor links (href="#main-content") can interfere with client-side routing in SPAs using HashRouter.
**Action:** Use an onClick handler to manually scroll and focus the target element, preventing unintended route changes while ensuring accessibility for keyboard users.
