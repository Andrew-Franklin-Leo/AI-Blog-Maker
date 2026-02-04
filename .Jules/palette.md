## 2024-02-04 - Combined visual cues for navigation active states
**Learning:** Using only color to indicate active navigation states is insufficient for users with color vision deficiencies. Combining color changes with a border or underline provides a clearer visual cue. Additionally, using `border-transparent` on inactive links prevents layout shifts when the active border is applied.
**Action:** Always combine color changes with borders/underlines for active states and use transparent borders on inactive elements to maintain consistent height.
