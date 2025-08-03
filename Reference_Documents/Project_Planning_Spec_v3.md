
# Project Planning Tab - Product Specification

## Overview
The **Project Planning** tab serves as the entry point for creating, managing, and approving risk management projects within the SPOiRMM framework. It facilitates project-level governance, task planning, stakeholder management, and assessment in accordance with integrated risk management methodology.

## Purpose
Enable organizations to define risk management plans by capturing essential project metadata, action plans, working groups, and assessments—ensuring regulatory alignment, stakeholder representation, and traceability.

---

## Visual Sidebar Navigation (Implemented)

### Overview
A vertically-aligned visual navigation panel appears on the **left-hand side** of the Project Planning page. This component enables intuitive access to each planning module using clickable icons, color-coded by SPOiRMM Tool context and providing real-time status indicators.

### Design Elements
- **Location**: Fixed position left sidebar (width: 256px)
- **Layout**: Vertical stack of navigation items
- **Background**: White with subtle shadow
- **Scroll**: Vertical scrolling for overflow content

### Navigation Items
Each navigation item includes:
1. **Workflow** (PP_Workflow)
   - Icon: DocumentTextIcon
   - Color: Purple (bg-purple-500)
   - Status: In Progress
   - Description: Project workflow and navigation

2. **Project Details** (PP_Details)
   - Icon: DocumentTextIcon
   - Color: Blue (bg-blue-500)
   - Status: Completed
   - Description: Project information and metadata

3. **Action Plan** (PP_Action_Plan)
   - Icon: ClipboardDocumentListIcon
   - Color: Green (bg-green-500)
   - Status: In Progress
   - Description: Task management and action items

4. **Working Groups** (PP_Working_Groups)
   - Icon: UserGroupIcon
   - Color: Orange (bg-orange-500)
   - Status: New
   - Description: Team collaboration and meetings

5. **Assessment** (PP_Assessment)
   - Icon: ClipboardDocumentCheckIcon
   - Color: Yellow (bg-yellow-500)
   - Status: New
   - Description: Project evaluation and signoff

6. **Players Chart**
   - Icon: UsersIcon
   - Color: Indigo (bg-indigo-500)
   - Status: New
   - Description: Stakeholder mapping and roles

7. **Issues List**
   - Icon: ExclamationTriangleIcon
   - Color: Red (bg-red-500)
   - Status: New
   - Description: Issue tracking and management

8. **Risk Register**
   - Icon: ChartBarIcon
   - Color: Teal (bg-teal-500)
   - Status: New
   - Description: Risk documentation and assessment

### Visual Design Features
- **Icons**: SVG icons from Heroicons library
- **Color Coding**: Each module has a distinct color aligned with SPOiRMM Tool context
- **Status Indicators**: 
  - Blue dot: New
  - Yellow dot: In Progress
  - Green dot: Completed
- **Active State**: Blue background with semibold text and shadow
- **Hover Effects**: Scale transform and shadow on hover
- **Tooltips**: Detailed information on hover including name, description, and status

### Functionality
- **Click Navigation**: Each item routes to the corresponding module
- **Active Highlighting**: Current module is visually distinguished
- **Keyboard Navigation**: Full keyboard accessibility with arrow keys and Enter
- **Dynamic Status**: Status indicators update based on module completion
- **Responsive Design**: Maintains functionality across screen sizes

### Accessibility Features
- **ARIA Labels**: Each button has descriptive aria-label
- **Role Attributes**: Proper tab role and aria-selected states
- **Focus Management**: Clear focus indicators and keyboard navigation
- **Screen Reader Support**: Semantic HTML structure with proper labeling
- **WCAG 2.1 AA Compliance**: Color contrast meets accessibility standards

### Tooltip Design
- **Content**: Module name, description, and current status
- **Position**: Appears to the right of the sidebar
- **Styling**: Dark background with white text and arrow pointer
- **Animation**: Smooth fade-in/out transition

### Integration Section
- **Location**: Below main content area
- **Purpose**: Reference organization-level components
- **Components**: Players Chart and Organization Setup integration cards
- **Navigation**: Direct links to organization-level modules
- **Context**: Read-only information about project-level limitations

### Implementation Details
- **React Components**: Modular component structure
- **TypeScript**: Full type safety with interfaces
- **State Management**: Active tab tracking and navigation
- **Dynamic Rendering**: Component creation based on active selection
- **Data Flow**: Proper data passing to child components

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

## Updated Integration with Players Chart Logic

### Player Field Logic Alignment
The Players Chart module must enforce consistent and valid relationships between the following fields:
- `Player Type` (e.g., Individual, Organisation)
- `Player Role` (e.g., Provider, Recipient, Regulator)
- `Entity Nature` (e.g., Internal, External, Community)

Validation must ensure that the chosen combinations align with SPOiRMM principles and Tool responsibilities.

#### Business Rules
- If `Player Type` is "Organisation", then valid `Entity Natures` include "Internal" and "External".
- If `Player Type` is "Individual", then `Entity Nature` can be "Community" or "Internal".
- Certain `Player Roles` like "Regulator" or "Representative" must only be paired with "External" Entity Nature.
- The system must prevent invalid combinations using dropdown constraints or real-time validation prompts.

### Multi-Project Association
- A Player (individual or organisation) can be associated with **multiple projects** within the same organisation.
- Player records must be centrally stored at the organisation level and referenced per project.
- UI should allow selecting existing players or creating a new player scoped to the organisation.

### Impact on Planning Workflow
- Planning tools must reference shared player data at the organisation level.
- Changes to Players at the organisational level should cascade or notify linked projects.

### Organisation Workflow and Page
A new **Organisation Management Page** must be available from the Welcome Page. It will manage:
- Players (master list)
- Departments
- Organisation-wide risks and agreements

This page must be visually distinct from project pages (recommend using **Cadet Blue** or similar for icons and headers).

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
