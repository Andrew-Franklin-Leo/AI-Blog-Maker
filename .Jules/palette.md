## 2025-05-14 - [Stretched Link for Accessibility and UX]
**Learning:** Using the "stretched link" pattern (wrapping the title in a `Link` and adding `after:absolute after:inset-0`) makes an entire card clickable while ensuring screen readers identify the link by its title. This is superior to wrapping the whole card in a `Link`, which can result in verbose and confusing screen reader output.
**Action:** Use the `after:inset-0` pattern for clickable cards to improve accessibility and provide a larger hit target.

## 2025-05-14 - [Apostrophes in JSX]
**Learning:** Unescaped apostrophes in JSX (e.g., "Li Xia's Blog") trigger ESLint `react/no-unescaped-entities` errors.
**Action:** Always use `&apos;` or `&rsquo;` for apostrophes within JSX text content.
