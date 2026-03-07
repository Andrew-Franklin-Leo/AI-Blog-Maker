## 2025-05-14 - [Sticky Nav & Skip Link]
**Learning:** Combining a sticky navbar with a "Skip to content" link requires careful z-index management. The skip link must have a higher z-index (e.g., z-[60]) than the sticky navbar (e.g., z-50) to remain visible when focused.
**Action:** Always verify focus visibility for skip links against sticky or fixed headers.

## 2025-05-14 - [PostCard Interactivity]
**Learning:** Adding `focus-within:ring-2` to a card that contains a `Link` ensures that keyboard users receive the same level of interactive feedback as mouse users (who see the `hover` state).
**Action:** Use `focus-within` on container elements to improve keyboard accessibility for complex clickable components.
