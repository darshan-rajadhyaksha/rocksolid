---
"rocksolidjs": patch
---

### New Features
- **Alert:** Ability to remove the default icon.
- **Avatar:** Strings passed in children are now converted to avatar letters if `alt` is missing.
- **Divider:** Support for passing and aligning children.
- **Select:** Added `slotProps` to customize option slots.

### Improvements & Fixes
- **Accordion:** Improved error messages and fixed collapse transition when `defaultExpanded` is set.
- **Alert:** Fixed close button styles.
- **Avatar & Badge:** Prevented text selection on letters.
- **Button:** Blocked pointer events when disabled.
- **Chip:** Disabled chips no longer receive focus.
- **Select:** Fixed default value not setting.
- **Theme:** Updated tokens (`theme.colors.default.outlined.border`, `theme.disabled.state`, `theme.focus`, `theme.focusWithin`).
- **Types:** Improved types for props provided to slots via `slotProps`.
- **Tests:** Added unit tests for components.