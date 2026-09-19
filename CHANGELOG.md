# rocksolidjs

## 0.1.3

### Patch Changes

- [#9](https://github.com/darshan-rajadhyaksha/rocksolid/pull/9) [`9083114`](https://github.com/darshan-rajadhyaksha/rocksolid/commit/9083114492a739cb69eef1fe47c17b84e8db9c9e) Thanks [@darshan-rajadhyaksha](https://github.com/darshan-rajadhyaksha)! - ### New Features
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

## 0.1.2

### Patch Changes

- [#3](https://github.com/darshan-rajadhyaksha/rocksolid/pull/3) [`450b10f`](https://github.com/darshan-rajadhyaksha/rocksolid/commit/450b10f9239d81b1fdb6e9fd1caa03eb80cbb03d) Thanks [@darshan-rajadhyaksha](https://github.com/darshan-rajadhyaksha)! - ## Fixes
  - `AccordionDetails`: Collapse transition on Firefox
  - `Avatar`:  Shrinking of avatar when wrapped inside flex layout
  - `Chip`: Label wrapping, Vertical padding
  - `Switch`: Handle position on RTL direction
  - `Tab`: Disabled tab color in light mode
  - Named imports for component
  
  ## Chore
  - Moved `tailwind-variants` from peerDependency to dependency
  - Excluded `tailwind-variants` from build
  - Added `homepage` key in package.json
  - Updated `version` script in package.json
  
  ## Documentation
   - CONTRIBUTING
   - CODE_OF_CONDUCT
   - PULL_REQUEST_TEMPLATE
   - ISSUE_TEMPLATE/bug_report
   - ISSUE_TEMPLATE/feature_request
   - README

## 0.1.1

### Patch Changes

- [`caeb1dc`](https://github.com/darshan-rajadhyaksha/rocksolid/commit/caeb1dcd5a33042256f25058d72be9d143b96135) Thanks [@darshan-rajadhyaksha](https://github.com/darshan-rajadhyaksha)! - Updated README document
