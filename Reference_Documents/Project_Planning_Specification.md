# Project Planning Tab - Product Specification

## Overview
The **Project Planning** tab serves as the entry point for creating, managing, and approving risk management projects within the SPOiRMM framework. It facilitates project-level governance, task planning, stakeholder management, and assessment in accordance with integrated risk management methodology.

## Purpose
Enable organizations to define risk management plans by capturing essential project metadata, action plans, working groups, and assessments—ensuring regulatory alignment, stakeholder representation, and traceability.

---

## Modules

### 1. PP_Workflow Module
- **Function:** Navigation and workflow control.
- **Actions:**
  - Maximize module views
  - Navigate to related tabs (Players, Issues, Risk Register)

### 2. PP_Details Module
- **Function:** Capture project metadata and status.
- **Fields:**
  - `Project Title` (Text, Mandatory)
  - `Project Start Date` (Date, Mandatory)
  - `Project End Date` (Date, Mandatory)
  - `Project Manager` (Dropdown, Mandatory)
  - `Risk Plan Sponsor` (Dropdown, Mandatory)
  - `Risk Plan Coordinator` (Dropdown, Mandatory)
  - `Project Status` (New | In Progress | Closed)
  - `Plan Approved?` (Yes | No)
  - `Approval Date` (Date, Auto-set on approval)
  - `Project Description` (Text, Mandatory)
  - `Why is the project needed?` (Text, Optional)
  - `Objectives and Measurable Outcomes` (Text, Optional)

### 3. PP_Action_Plan Module
- **Function:** Define tasks and responsibilities.
- **Fields:**
  - `Task #` (Auto-numbered)
  - `Task Description` (Text, Mandatory)
  - `Who` (Dropdown of members, Mandatory)
  - `Date Due` (Date, Optional)
  - `Status` (New | In Progress | Completed)
  - `Notes` (Text, Optional)

### 4. PP_Working_Groups Module
- **Function:** Define working groups for planning.
- **Fields:**
  - `Group Name` (Text, Mandatory)
  - `Members` (Multi-select Dropdown, Mandatory)
  - `Meeting Dates` (Date, Optional)

### 5. PP_Assessment Module
- **Function:** Capture post-plan evaluation.
- **Fields:**
  - `Have the needs been satisfied?` (Yes | No)
  - `Describe how or why not` (Text, Optional)
  - `Were the objectives achieved?` (Yes | No)
  - `Describe what was achieved` (Text, Optional)
  - `Project Manager Signoff` (Yes | No)
  - `Signoff Date` (Auto-set on approval)

---

## Business Rules
- `Approval Date` is auto-populated when `Plan Approved?` is set to "Yes".
- Project status must be "Closed" before final assessment is signed off.
- Only Risk Plan Sponsor can approve the plan.

## Integration
- Links to:
  - **Players Chart**: Stakeholder overview
  - **Issues List**: Issue tracking
  - **Risk Register**: Formal risk documentation

## Security & Compliance
- Role-based access:
  - Only Sponsors can approve.
  - Only Coordinators can modify active plans.
- Compliance aligned with ISO 31000 & 9001.
- Audit trails for all actions.

---

## Future Enhancements
- Workflow automation (e.g., task reminders)
- Integration with external reporting tools
- Multi-language support
---

## UI Color Scheme

The Project Planning tab should follow the SPOiRMM visual conventions used in diagrams and tools:

### Color Assignments (Based on SPOiRMM Players and Tools)
| Role / Function            | Color      | Usage Context                      |
|---------------------------|------------|------------------------------------|
| Recipient of Benefit      | Blue       | Text, background, icons            |
| Provider of Benefit       | Red        | Text, borders, active UI elements  |
| Benefit Enablers (Staff)  | Green      | Icons, labels, highlights          |
| Regulators & Representatives | Yellow | Informational banners, tooltips    |
| Community (background)    | Grey (outline) | Background outlines               |
| Jurisdiction Tool         | Purple     | Section indicators or tab headers |
| Market Tool               | Orange     | Section indicators or tab headers |
| Enterprise Tool           | Teal       | UI containers for external roles  |
| Organisation Tool         | Light Blue | Internal structure containers      |
| Agreements Tool           | Dark Blue  | Matrix headers, agreement status   |
| Resources Tool            | Brown      | Timeline and process indicators    |

### Design Notes
- Use soft, complementary shades to avoid harsh contrasts.
- Maintain consistency across modules.
- Color-coded icons or badges should be used to distinguish Player roles and Tool contexts.
- All colors must meet WCAG 2.1 AA accessibility standards for contrast.


---

## Development Environment

The development of the Project Planning tab should be implemented using [**Cursor**](https://cursor.sh), an AI-native IDE.

### Requirements for Cursor-based Development

#### 1. Environment Setup
- Install Cursor locally or use the web-based version.
- Connect Cursor to your GitHub repository.
- Set up appropriate `.env` variables for secure environment access (e.g., API keys, org tokens).

#### 2. Component Design
- Use Cursor's Copilot capabilities to scaffold React/Tailwind UI components for:
  - PP_Workflow Navigator
  - Module Containers (Details, Action Plan, Working Groups, Assessment)
  - Form field validation and interactivity

#### 3. Workflow Logic
- Implement dynamic cursor placement into default entry fields using Cursor's React + AI integration.
  - e.g., `onClick` for "Action Plan" focuses cursor in `Task Description`
- Conditional module visibility via state toggles (maximize/minimize behavior).

#### 4. Data Handling
- Implement auto-fill and interlinked field logic using Cursor's server hooks or state models.
  - e.g., auto-set `Approval Date` when `Plan Approved?` toggled to “Yes”

#### 5. Collaboration & Auditability
- Use Cursor’s inline comments and commit summaries for peer review and version tracking.
- Generate documentation via Cursor snippets as markdown.

#### 6. Color & Accessibility
- Use Tailwind utility classes aligned with SPOiRMM's UI Color Scheme.
- Validate color contrast using Cursor’s accessibility checker to ensure WCAG 2.1 AA compliance.

#### 7. Testing & Preview
- Preview each module and state transition in Cursor’s embedded browser preview.
- Test dynamic form logic and validation per module specs.

---

