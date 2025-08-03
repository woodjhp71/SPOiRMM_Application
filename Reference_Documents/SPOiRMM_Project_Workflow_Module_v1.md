# Project Workflow Module (Deprecated)

## Status
❌ This module has been deprecated as of August 3, 2025, and replaced by the `SPOiRMM Navigator` and the `SPOiRMM Engine`.

---

## Replaced By
- `SPOiRMM_Navigator_v1.md`: Manages user navigation across the SPOiRMM Flow
- `SPOiRMM_Engine_v1.md`: Controls stage transitions, access, and audit
- `SPOiRMM_Flow_Definition_v1.md`: Defines valid stages, transitions, and permissions

---

## Reason for Deprecation
- The original Project Workflow module used static tabs and hardcoded sequences
- It lacked dynamic, role-aware, and state-driven behavior
- Navigator and Engine offer scalable, centralized, and rule-based control
- Supports multi-org, multi-project, and future SPOiRMM extensions

---

## Migration Notes
- Remove this module from the Project Planning UI
- Embed the `SPOiRMM Navigator` in the `Welcome Page` and/or `Project Detail` views
- Use the Engine to enforce workflow rules instead of UI logic
- Update routing and role access to reflect dynamic workflow visibility

---

## Reference (Historical)
- This spec remains archived for historical context and comparison only