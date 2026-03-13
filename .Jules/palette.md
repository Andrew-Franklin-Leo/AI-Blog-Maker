## 2025-05-15 - [Toast Notification State Sync]
**Learning:** In a React application, isolated state in a notification component and its associated hook leads to silent failures where notifications are "added" but never displayed.
**Action:** Always use a Context Provider or a global state management solution to synchronize notifications between the trigger (hook) and the display (Toaster component).
