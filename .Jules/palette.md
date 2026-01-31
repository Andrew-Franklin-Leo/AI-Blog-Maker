## 2025-02-12 - Improve Navigation Accessibility with NavLink
**Learning:** The application's navigation was using a manual `isActive` check with standard `Link` components, which lacked the `aria-current="page"` attribute necessary for screen readers. Using `NavLink` from `react-router-dom` automates this and improves semantic accessibility.
**Action:** Always check if navigation components use `NavLink` and have proper `aria-current` attributes.
