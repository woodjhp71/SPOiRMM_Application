# Issue List Module - Specification with Players Chart Integration

## Purpose
Capture, track, and assess issues that may impact organizational performance or evolve into formal risks. Aligned with SPOiRMM methodology, each issue is linked to one or more Players to ensure stakeholder context is preserved.

---

## Issue_Creation_Form

| Field Name            | Type                   | Description                                                                 |
|----------------------|------------------------|-----------------------------------------------------------------------------|
| Issue Title           | Text (Mandatory)       | Brief descriptive title of the issue                                        |
| Issue Description     | Text Area (Mandatory)  | Detailed explanation of the issue                                           |
| Date Raised           | Date (Auto-set)        | Captures the date the issue was logged                                      |
| Raised By             | Dropdown (User List)   | Select from system users                                                    |
| Related Player(s)     | Multi-select Dropdown  | **Pulled from Players Chart**; includes Player Type + Entity Nature in label |
| Module/Tool Context   | Dropdown (Optional)    | Optional tag for relevant SPOiRMM Tool (e.g. Organisation, Enterprise, etc.)|
| Status                | Dropdown               | New | Under Review | Converted to Risk | Closed                            |
| Priority              | Dropdown (Optional)    | Low | Medium | High                                                   |
| Notes                 | Text Area (Optional)   | Free-form commentary or updates                                             |

---

## Integration with Players Chart

- Field `Related Player(s)` is dynamically populated from the Players Chart in the Project Planning module.
- Each item in the dropdown includes:
  - Player Name
  - Player Role (Recipient, Provider, Supplier, etc.)
  - Entity Nature (Person, Organisation)

**Example Entries:**
- `Dr. Jane Doe (Benefit Maximiser | Person)`
- `HealthSecure Ltd (Supplier | Organisation)`

---

## Business Rules

- At least one Related Player **should** be selected (validation optional based on implementation).
- On conversion to a Risk, the Related Player(s) are **carried forward** to the Risk Register.
- Tool context helps direct analysis using the relevant SPOiRMM Tool.

---

## Compliance

- Ensures stakeholder representation and traceability
- Supports downstream integration with Enterprise Tool, Agreements Tool, and Organisation Tool

---