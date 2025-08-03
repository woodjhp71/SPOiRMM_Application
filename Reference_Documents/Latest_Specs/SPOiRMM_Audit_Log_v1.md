# Audit & Logging Module Spec

## Purpose
To track and record all user actions, workflow transitions, and system events for compliance, accountability, and troubleshooting.

---

## Logged Events
- User activity (create/edit/delete)
- State transitions (e.g., project approved, issue promoted)
- Login/logout and session events
- System-generated changes (e.g., auto-escalations)

---

## Fields
- `timestamp`
- `userId`
- `actionType`
- `affectedEntity` (e.g., projectId, issueId)
- `oldValue`, `newValue` (if applicable)
- `sourceModule` (e.g., Navigator, Risk Register)

---

## Features
- Read-only access by Admin and Auditors
- Filter by date, action, user, or entity
- Export to CSV or external log system
- Retention period configurable in Admin settings

---

## Integration
- Logging hooks inside the SPOiRMM Engine and UI actions
- Admin access via Settings module