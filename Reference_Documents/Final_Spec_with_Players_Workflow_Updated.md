# Project Planning Tab - Product Specification

## Overview
The **Project Planning** tab serves as the entry point for creating, managing, and approving risk management projects within the SPOiRMM framework. It facilitates project-level governance, task planning, stakeholder management, and assessment in accordance with integrated risk management methodology.

## Purpose
Enable organizations to define risk management plans by capturing essential project metadata, action plans, working groups, and assessments—ensuring regulatory alignment, stakeholder representation, and traceability.

---

## Modules

### Updated Notes for PP_Workflow Module

- **Function:** Navigation and workflow control.
- **Actions:**
  - Maximize module views
  - Navigate to related tabs (Players, Issues, Risk Register)
  - **Select Players for this project from the organization-wide master Player list**

#### Workflow Update Based on Player Scope

With Players now defined at the organizational level, the PP_Workflow Module must include a step to:
- Search and select relevant Players from the shared Player pool
- Save project-specific associations (using a `ProjectPlayer` link)
- Only allow selection — not creation — of new Players during project setup
- Provide quick filtering by Player Type, Role, or Entity Nature

This ensures consistency, prevents duplication, and enables shared analysis of risks and issues across projects involving the same stakeholders.

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

### 6. PP_Players_Chart Module- **Function**: Define and visualize all stakeholders (external Players) involved in the organization's market, per SPOiRMM’s market model.
- **Purpose**:
  - Clarify roles of individuals and organizations in the supply chain
  - Identify external risk relationships
  - Serve as input triggers for risk identification, issue detection, agreements, and resource needs
- **Fields**:
  - `Player Name` (Text, Mandatory)
  - `Player Type` (Dropdown: Recipient, Provider, Staff, Supplier, Cost Minimiser, Benefit Maximiser, Regulator, Representative)
  - `Player Nature` (Dropdown: Individual, Organization)
  - `Linked Department(s)` (Multi-select Dropdown)
  - `Notes` (Text, Optional)
- **Functions**:
  - Add / edit / remove Players
  - View relationships visually
  - Filter by Player Type or Nature
  - Link to Issues List, Risk Register, Agreements Tool
- **UI Design**:
  - Uses SPOiRMM color standards for each Player role
  - Includes diagram view and list view toggle
  - Supports drag-and-drop layout for visual clarity
- **Business Rules**:
  - Players must be defined before entering risks or issues
  - Only Coordinators or above can edit Players once plan is “In Progress”
- **Integration**:
  - Used by: Issues List, Risk Register, Agreements Tool, Resources Tool

#### Conditional Business Rules for Player Role Selection

- The available roles in the `Player Role` (Player Type) dropdown should be filtered based on the selected high-level category:
  
| Selected Player Type     | Allowed Player Roles                                       |
|--------------------------|-------------------------------------------------------------|
| `Recipient`              | `Recipient of Benefit`, `Purchaser (Cost Minimiser)`        |
| `Provider`               | `Provider of Benefit`                                       |
| `Staff`                  | `Staff Member (Benefit Enabler)`                            |
| `Supplier`               | `Supplier (Benefit Enabler)`                                |
| `Benefit Maximiser`      | `Clinician`, `Salesperson`, `Advisor`                       |
| `Cost Minimiser`         | `Purchaser`, `Broker`, `Insurer`                            |
| `Regulator`              | `Government Agency`, `Accreditation Body`                   |
| `Representative`         | `Union`, `Professional Association`, `Consumer Group`       |

- If a Player Type is changed, any previously selected Player Role must be cleared and re-selected to match valid values.
- Validation must ensure that Player Role and Player Type are consistent prior to saving.

#### Conditional Business Rules for Entity Nature Selection

- The available values in the `Entity Nature` dropdown (Individual or Organization) must be restricted based on the selected `Player Type`:

| Selected Player Type     | Allowed Entity Nature(s) | Notes |
|--------------------------|---------------------------|-------|
| `Recipient`              | `Individual`, `Organization` | Can be a person or a purchasing org |
| `Provider`               | `Organization`            | Always an enterprise |
| `Staff`                  | `Individual`              | Always a person delivering benefit |
| `Supplier`               | `Organization`            | Vendors or external contributors |
| `Benefit Maximiser`      | `Individual`              | E.g., clinician, adviser |
| `Cost Minimiser`         | `Organization`            | E.g., insurer, broker |
| `Regulator`              | `Organization`            | Government agency or standards body |
| `Representative`         | `Organization`            | Unions, professional or consumer groups |

- If the Player Type is changed, the Entity Nature must be revalidated.
- Saving is blocked if the Entity Nature conflicts with the Player Type.

### Cross-Validation Logic: Player Type, Player Role, and Entity Nature

The following table outlines the valid combinations of `Player Type`, `Player Role`, and `Entity Nature` based on the SPOiRMM framework. These combinations must be enforced to maintain data integrity and alignment with the underlying market model:

| Player Type         | Player Role                          | Entity Nature   | Valid | Notes |
|---------------------|---------------------------------------|------------------|--------|-------|
| Recipient           | Recipient of Benefit                  | Individual       | ✅     | A patient or individual customer |
| Recipient           | Purchaser (Cost Minimiser)           | Organization     | ✅     | A health insurer, broker, etc. |
| Provider            | Provider of Benefit                  | Organization     | ✅     | Central service-delivering organization |
| Staff               | Benefit Enabler (Staff)              | Individual       | ✅     | Internal human resources |
| Supplier            | Benefit Enabler (Supplier)           | Organization     | ✅     | External supply chain participant |
| Benefit Maximiser   | Clinician / Adviser / Salesperson    | Individual       | ✅     | Engaged by recipient to guide benefit |
| Cost Minimiser      | Insurer / Broker / Govt Purchaser    | Organization     | ✅     | Manages recipient cost exposure |
| Regulator           | Government Agency / Standards Body   | Organization     | ✅     | Oversees market behavior |
| Representative      | Union / Industry / Consumer Group    | Organization     | ✅     | Represents stakeholders’ interests |

#### Invalid Combinations (for Validation Testing)

| Player Type       | Player Role           | Entity Nature   | ❌ Reason |
|-------------------|------------------------|------------------|-----------|
| Provider          | Staff                  | Organization     | Staff must be an Individual |
| Benefit Maximiser | Supplier               | Individual       | Suppliers are Organizations |
| Regulator         | Clinician              | Individual       | Regulators are Organizations |
| Staff             | Purchaser              | Individual       | Cost Minimisers must be Organizations |
| Representative    | Staff                  | Organization     | Representatives are not operational roles |

All forms must validate that the selected `Player Role` and `Entity Nature` match the constraints defined by the chosen `Player Type` before allowing the record to be saved.

### Player Scope Clarification

#### Are Players Project-Specific?

No. In the SPOiRMM framework, Players represent external stakeholders within an organization's overall market context—not just within a single project. They are tied to the organization as a whole.

#### Key Principles

- **Players are organization-level entities** (e.g., customers, suppliers, regulators, insurers).
- **The Players Chart should be defined once per organization**, and reused across all risk planning projects.
- **Projects may link to a subset of Players** relevant to their specific scope via tags or a project-player association mechanism.
- **This allows for reuse**, consistency, and consolidated reporting across multiple projects involving the same stakeholders.

#### Recommended Implementation

- Players are stored as master records at the organizational level.
- A `ProjectPlayer` join model may be used to associate Players with specific projects.
- When viewing or editing a project, the application should allow filtering or selecting from the organization's Player pool.

This ensures data integrity, avoids duplication, and supports accurate risk planning and stakeholder accountability across the enterprise.