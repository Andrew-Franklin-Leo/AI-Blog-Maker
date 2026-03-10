## 2025-02-12 - [Skip to Content with HashRouter]
**Learning:** In applications using HashRouter, standard anchor links (e.g., href="#main-content") can conflict with routing, potentially leading to incorrect navigation or broken skip-link behavior.
**Action:** Use an onClick handler with e.preventDefault() to manually manage focus and scrolling to the target element. Ensure the target has tabIndex={-1} and focus:outline-none to receive programmatic focus cleanly.
