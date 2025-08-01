
# Risk Register Specification for SPOiRMM Application

## Overview
The **Risk Register** module is a structured system for capturing, evaluating, and tracking risks associated with projects in accordance with the SPOiRMM framework. It integrates with the **Project Planning** module and supports top-down risk management planning aligned with ISO 31000 and ISO 9001 standards.

---

## Purpose
To enable organizations to:
- Record all identified risks from issue analysis
- Analyze and rank those risks
- Assign accountability and plan mitigations
- Integrate with project workflows and action planning
- Provide evidence for governance, audit, and regulatory purposes

---

## Data Fields

| Field                        | Type             | Description |
|-----------------------------|------------------|-------------|
| Risk ID                     | Auto-generated   | Unique identifier for each risk |
| Project ID                  | Foreign key      | Links to associated project |
| Issue Description           | Text             | Initial concern raised by working groups |
| Risk Statement              | Text             | Formal articulation of the risk |
| Risk Category               | Enum             | Governance, Business, Operational |
| SPOiRMM Tool Context        | Enum             | Jurisdiction, Market, Enterprise, Organisation, Agreements, Resources |
| External Stakeholders       | Multi-select     | Players involved (Recipient, Provider, etc.) |
| Internal Departments        | Multi-select     | Based on L1 (Decision), L2 (Exchange), L3 (Satisfy) |
| Likelihood Rating           | Integer (1–5)    | Probability of occurrence |
| Consequence Rating          | Integer (1–5)    | Severity of impact |
| Risk Score                  | Integer          | Calculated: Likelihood × Consequence |
| Risk Evaluation             | Enum             | High, Medium, Low |
| Mitigation Strategy         | Text             | Proposed treatment plan |
| Accountable Person/Team     | Dropdown         | Assigned stakeholder responsible |
| Status                      | Enum             | New, Under Review, Approved, Treated, Closed |
| Review Date                 | Date             | When to reassess this risk |
| Attachments/Links           | File/URL         | Supporting documents or resources |
| Created By / Last Modified  | Audit Trail      | Metadata for tracking |

---

## Functional Requirements

- Add/Edit/Delete risk entries
- Auto-calculate `Risk Score` and determine `Risk Evaluation`
- Filter and sort risks by category, stakeholder, severity, status
- Visualize risks using:
  - Likelihood vs. Consequence Heatmap
  - SPOiRMM Star Chart (optional enhancement)
- Display and link related:
  - Action Plan tasks
  - Assessment module feedback

---

## Workflow Integration

- Sourced from: Issues List and Working Groups modules
- Assigned to: Project ID from PP_Details
- Connected to:
  - PP_Action_Plan (for task tracking)
  - PP_Assessment (for project outcome evaluation)

---

## UI & UX Specifications

- **Views**: Grid, expandable rows, and detail modals
- **Color Coding** (aligned with SPOiRMM Tools & Players):
  - Blue: Recipient
  - Red: Provider
  - Green: Staff (Benefit Enabler)
  - Yellow: Regulator/Representative
  - Purple: Jurisdiction Tool
  - Orange: Market Tool
  - Teal: Enterprise Tool
  - Light Blue: Organisation Tool
  - Dark Blue: Agreements Tool
  - Brown: Resources Tool
- **Accessibility**: WCAG 2.1 AA compliant
- **Responsiveness**: Desktop and mobile supported

---

## Governance & Permissions

- **Risk Plan Sponsor**: Can approve/close risks
- **Risk Plan Coordinator**: Can add/edit risks
- **Working Groups**: Can propose issues that become risks
- All changes logged for audit trail
- Compliance with ISO 31000, ISO 9001, and internal audit standards

---

## Future Enhancements

- Root Cause Analysis (RCA) integration
- Risk Treatment Effectiveness tracking
- Export to CSV/PDF
- Graph-based Risk Mapping
