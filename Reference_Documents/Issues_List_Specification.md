# Issues List Specification

## Overview
The **Issues List** module captures organizational concerns during risk planning. It serves as a pre-risk repository, where stakeholders can raise, review, group, and prioritize issues. Accepted issues may be escalated into the formal Risk Register.

This module integrates tightly with the **Project Planning**, **Working Groups**, and **Risk Register** workflows in accordance with the SPOiRMM framework.

---

## Purpose
- Document stakeholder-raised issues during project planning
- Classify and group issues by context and stakeholder relevance
- Enable structured promotion of validated issues to the Risk Register
- Ensure transparency and traceability of concerns raised during planning

---

## Fields

| Field Name               | Type            | Mandatory | Description |
|--------------------------|------------------|-----------|-------------|
| Issue ID                | Auto-generated   | Yes       | Unique system ID |
| Issue Description       | Text             | Yes       | Description of the concern/issue |
| Raised By               | Dropdown (Members) | Yes    | User who raised the issue |
| Associated Players      | Multi-select (Recipient, Provider, Staff, Supplier, Regulator, Representative) | Yes | Stakeholders related to the issue |
| Associated Tools        | Multi-select (Jurisdiction, Market, Enterprise, Organisation, Agreements, Resources) | Yes | SPOiRMM tools involved |
| Internal Function Level | Dropdown (L1, L2, L3) | Yes    | Level 1 (Governance), Level 2 (Exchange), Level 3 (Delivery) |
| Category                | Dropdown (Governance, Business, Operational) | Yes | Classification of the issue |
| Date Raised             | Date (auto-set)  | Yes       | Default: Current date |
| Current Status          | Dropdown (New, In Review, Accepted as Risk, Rejected) | Yes | Lifecycle status |
| Comments/Notes          | Text             | No        | Optional observations or rationale |

---

## User Actions

- **Add New Issue**
- **Edit Existing Issue**
- **Group with Related Issues**
- **Promote to Risk Register**
- **Change Status**
- **Categorize and Tag**
- **Filter and Search**

---

## Workflow Integration

### Linked Modules
- `PP_Working_Groups`: Members contribute issues as part of group discussions
- `PP_Assessment`: Used to check issue resolution post-project
- `Risk Register`: Issues promoted with retained metadata

### Promotion Rules
- Only issues marked as “Accepted as Risk” can be promoted
- Category, player, and tool assignments are required before promotion
- Issue status automatically updates post-promotion

---

## UI/UX Notes

- **List View**: sortable by status, category, date
- **Detail View**: slide-out panel for editing
- **Color Coding**:
  - Blue: Recipients
  - Red: Providers
  - Green: Benefit Enablers (Staff)
  - Yellow: Regulators/Representatives
- **Badges**: Visual indicators for Tools (e.g., Market = Orange, Resources = Brown)

---

## Business Rules

- No issue may be promoted unless:
  - Player and Tool are specified
  - Description and Category are set
- Duplicate warning on identical issue + player + tool
- Issues must be associated with at least one **Working Group**
- Audit trail required for all edits and status changes

---

## Security & Roles

| Role               | Create | Edit | Approve | Promote |
|--------------------|--------|------|---------|---------|
| Working Group      | Yes    | Yes  | No      | No      |
| Risk Plan Coordinator | Yes | Yes  | Yes     | Yes     |
| Risk Plan Sponsor  | View   | No   | Yes (Plan) | No  |

---

## Reporting & Export

- CSV export of issue data
- Dashboard pie charts: Issues by category, player, tool
- Timeline of open vs. resolved issues per project

---

## Future Enhancements

- Affinity mapping with drag-and-drop grouping
- Weighted voting to prioritize issues
- Machine learning-based duplicate detection and classification
- Multi-project issue clustering

---

## Integration Summary

- **Players Chart** → Populates dropdowns for "Associated Players"
- **Risk Register** → Accept and promote issues directly
- **PP_Assessment** → Used to determine whether issues were resolved or escalated
