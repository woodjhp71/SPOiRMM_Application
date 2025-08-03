
# Departments Page - Product Specification

## Overview
The **Departments Page** enables organizations to define, structure, and analyze their internal departments based on the SPOiRMM framework. It provides a categorized view of internal functions using the Levels 1–3 structure (Decision-making, Exchanging, Satisfying) and aligns departmental structure with risk management processes.

## Purpose
Ensure that each internal department is properly classified, structured, and represented within the organization’s risk management framework. This structure directly supports risk identification, accountability, and evaluation.

---

## Modules

### 1. DEPT_Workflow Module
- **Function:** Navigation and contextual linking.
- **Actions:**
  - Link to Players Chart, Organisation Tool, and Agreements Tool
  - Access department-specific risk views

### 2. DEPT_Registry Module
- **Function:** Register and manage departments.
- **Fields:**
  - `Department Name` (Text, Mandatory)
  - `Department Code` (Text, Optional)
  - `Parent Department` (Dropdown, Optional)
  - `Department Head` (Dropdown, Mandatory)
  - `Department Status` (Active | Inactive)
  - `Level Classification` (Level 1 | Level 2 | Level 3)
  - `Functions Description` (Text, Mandatory)

### 3. DEPT_InternalFunctions Module
- **Function:** Assign functions within each department.
- **Fields:**
  - `Function Name` (Text, Mandatory)
  - `Function Level` (L1 | L2 | L3)
  - `Owner` (Dropdown, Optional)
  - `Related Cost Centre` (Text, Optional)
  - `Linked Agreements` (Multi-select, Optional)

### 4. DEPT_PerformanceMetrics Module
- **Function:** Capture department performance details.
- **Fields:**
  - `Time to Deliver Outcome` (Duration, Optional)
  - `Staff Consumed` (Number, Optional)
  - `Supplies Consumed` (Number, Optional)
  - `Performance Comments` (Text, Optional)

---

## Business Rules
- Each department must be assigned a primary Level (1, 2, or 3).
- Departments can be nested hierarchically using the Parent Department field.
- Only users with Coordinator or Admin roles can create or modify departments.
- Departments must be linked to at least one internal function to be marked as “Active.”

## Integration
- Pulls Player Role information from the Players Chart.
- Feeds structure into Organisation Tool and Resources Tool.
- Used in Agreements Tool to align internal functions with external needs and services.
- Optional linkage with Risk Register for assigning internal accountability.

## Security & Compliance
- Role-based access control:
  - Admin: Full CRUD access
  - Coordinator: Edit assigned departments
  - Viewer: Read-only
- Tracks changes for audit (compliance with ISO 31000 and ISO 9001)
- WCAG 2.1 AA accessible interface

---

## Future Enhancements
- Visual departmental hierarchy (tree diagram)
- Export structure to PDF and Excel
- Real-time indicators of performance metrics and risk exposure

---

## UI Color Scheme

### Department Level Indicators
| Level Function         | Color        | UI Usage                         |
|------------------------|--------------|----------------------------------|
| Level 1: Decision-making | Purple      | Header bars, tags                |
| Level 2: Exchanging      | Orange      | Border accents, highlight icons  |
| Level 3: Satisfying      | Green       | Background shading, info icons   |

### Additional Contextual Colors
- Organisation Tool Linkage: Light Blue
- Agreements Reference: Dark Blue
- Resource View Tags: Brown
- Regulatory Notes: Yellow
- Community Background: Grey Outline

Design must follow SPOiRMM visual standards and accessibility compliance.
