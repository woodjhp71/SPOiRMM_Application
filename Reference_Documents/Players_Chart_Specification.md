# Players Chart - Product Specification

## Overview
The **Players Chart** component provides a structured method for identifying and managing external stakeholders ("Players") involved in the market as defined by the SPOiRMM framework. This tool is essential to the risk planning workflow and supports issue identification, stakeholder analysis, and risk contextualization.

## Purpose
To ensure a comprehensive understanding of all external entities (individuals or organizations) involved in the delivery or receipt of benefit, so risks can be identified, categorized, and analyzed with appropriate stakeholder context.

---

## Integration Points

- **Project Planning Tab > PP_Workflow Module**: Direct navigation link
- **Issues List**: Used to prompt and organize stakeholder-related issues
- **Risk Register**: Used to associate Players with risks during analysis
- **Agreements Tool (future)**: For service-level and contractual relationship mapping

---

## Data Model & Fields

| Field Name               | Type             | Description |
|--------------------------|------------------|-------------|
| `Player Name`            | Text (Required)   | Name of the individual or organization |
| `Player Type`            | Enum (Required)   | One of: Recipient, Provider, Supplier, Regulator, Representative |
| `Player Role`            | Enum (Required)   | Recipient of Benefit, Provider of Benefit, Cost Minimiser, Benefit Maximiser, Staff, Supplier |
| `Entity Nature`          | Enum (Required)   | One of: Individual, Organisation |
| `Relationship to Project`| Text (Optional)   | Description of how the Player is involved in the project |
| `Risk Impacted`          | Multi-select Link | Optional association with Risk Register entries |
| `Notes`                  | Text (Optional)   | Additional qualitative or contextual details |

---

## Functional Requirements

- Add/Edit/Delete Players
- Filter Players by type, role, or nature
- Full-text search
- Exportable view (CSV or PDF)
- Optional graphical visualization of Market Model

---

## UI & Visual Design

Follows SPOiRMM color conventions:

| Player Category | Color         |
|------------------|---------------|
| Recipient        | Blue          |
| Provider         | Red           |
| Staff / Supplier | Green         |
| Regulator / Rep  | Yellow        |
| Community        | Grey (outline)|

- List view: Sortable, filterable table
- Graph view (optional future): Node diagram (SPOiRMM-style)

---

## Business Rules

- `Player Name + Role + Nature` must be unique
- Regulators and Representatives are view-only in risk context
- Providers of Benefit must have at least one associated Staff and Supplier

---

## Security & Permissions

| Role               | Permissions                 |
|--------------------|-----------------------------|
| Risk Plan Coordinator | Full access (CRUD)       |
| Working Group Member  | View & Suggest Edits     |
| Sponsor               | Read-only                |

- All data must be scoped to organizational tenant
- Changes logged for audit

---

## Compliance & Standards

- Aligned to ISO 31000 and ISO 9001
- WCAG 2.1 AA color and contrast compliance

---

## Future Enhancements

- Graphical Players Diagram integration
- AI-assisted Player classification based on project context
- Linkage with Agreements Tool and Resources Tool
- Player import via template upload