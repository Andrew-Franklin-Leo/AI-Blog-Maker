## 2024-05-22 - [Stretched Link and NavLink Accessibility]
**Learning:** The "Stretched Link" pattern (using an absolute inset-0 span inside a semantic title link) significantly improves the clickable area of complex components like cards without breaking screen reader expectations. Additionally, using NavLink over standard Link provides built-in aria-current support which is crucial for navigation accessibility.
**Action:** Always favor semantic structure (e.g., link in heading) even for large interactive areas, and use specialized routing components (like NavLink) to manage active states automatically.

## 2024-05-22 - [ESLint and Fast Refresh]
**Learning:** React Fast Refresh requires components to be the only export in a file. Moving non-component exports (like custom hooks) to separate files prevents build warnings and improves code organization.
**Action:** Always define custom hooks in their own files (e.g., src/hooks/) rather than alongside the components that use them.
