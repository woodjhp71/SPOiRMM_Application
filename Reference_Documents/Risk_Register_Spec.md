# Risk Register - Specification

## Purpose
To capture, analyze, rank, and evaluate risks identified in the course of project execution, using SPOiRMM tools and stakeholder context from the Organization.

---

## Fields

- `Risk ID` (Auto-generated)
- `Risk Title` (Text, Mandatory)
- `Description` (Text, Mandatory)
- `Status` (Open | Mitigating | Resolved | Archived)
- `Likelihood` (1–5)
- `Consequence` (1–5)
- `Risk Score` (Auto-calculated: Likelihood × Consequence)
- `Risk Type` (Dropdown based on SPOiRMM Tools — Jurisdiction, Market, Enterprise, etc.)
- `External Stakeholders Affected` (Multi-select, sourced from Org-level Players Chart)
- `Internal Departments Affected` (Multi-select, from Org-level Org Structure)
- `Mitigation Plan` (Text)
- `Owner` (Dropdown, project members)
- `Review Date` (Date)
- `Approval Required?` (Yes | No)
- `Approval Status` (Pending | Approved | Rejected)
- `Related Issues` (Links to Issues List)

---

## Risk Ranking Matrix

- Use visual matrix to color-code risk severity

---

## Integration

- Pulls stakeholder data from Organization-level **Players Chart**
- Pulls internal structure from Organization-level **Org Chart**
- Links to Issues List

---

## Security & Compliance

- Coordinators and Sponsors can create/edit risks
- View-only access for general stakeholders
