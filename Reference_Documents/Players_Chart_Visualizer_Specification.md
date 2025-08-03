
# Players Chart Visualizer Specification

## Overview
The **Players Chart Visualizer** is an interactive module within the SPOiRMM Risk Management application designed to capture, organize, and visualize external stakeholders ("Players") in a structured and intuitive way. It supports understanding market roles, identifying risks, and integrating with related tools for risk planning and stakeholder analysis.

---

## Objectives
- Provide visual and data-driven representation of market stakeholders (Players)
- Allow classification by Role and Nature (Individual vs. Organisation)
- Support traceability to risks, agreements, and jurisdictions
- Enable interaction (drag-and-drop, filtering, linking)
- Maintain consistent SPOiRMM visual standards

---

## Key Features

### 1. Interactive Diagram Canvas
- Draggable shapes: Circles (Individuals) and Rectangles (Organisations)
- Color-coded by Player role
- Visual guide lines:
  - Horizontal Time Line (benefit flow)
  - Vertical Centre Line (market focus)
  - Gradient Line (effort/payment direction)
- Hover tooltips for role and description
- Click to view Player details in side panel

### 2. Player Classification

#### By Role (Color Coding)
| Role                        | Color   |
|-----------------------------|---------|
| Recipient of Benefit        | Blue    |
| Provider of Benefit         | Red     |
| Benefit Enablers (Staff)    | Green   |
| Regulators                  | Yellow  |
| Representatives             | Yellow  |
| Community (background)      | Grey    |

#### By Nature (Shape)
- Circle: Individual
- Rectangle: Organisation

### 3. Player Details Side Panel
- Name
- Role
- Nature (Individual/Organisation)
- Linked Risks (with hyperlinks to Risk Register)
- Related Agreements
- Associated Tools (e.g., Enterprise Tool)

### 4. Filters and Controls
- Filter by Role, Nature, Risk Tag, Project ID
- Show/Hide arrows: Benefit, Payment, Communication
- Zoom, Pan, Export (SVG, PDF)

### 5. Integration Points
- **Risk Register**: Players linked to identified external risks
- **Agreements Tool**: Contracts and SLAs involving Players
- **Jurisdiction Tool**: Regulatory bodies and compliance mapping
- **Enterprise Tool**: Players involved in market contracts

---

## Data Model

```json
{
  "id": "string",
  "name": "string",
  "role": "Recipient | Provider | Enabler | Regulator | Representative",
  "type": "Individual | Organisation",
  "linkedRisks": ["risk_id_1", "risk_id_2"],
  "agreements": ["agreement_id_1"],
  "toolTags": ["Enterprise", "Jurisdiction"]
}
```

---

## Accessibility & Standards
- WCAG 2.1 AA compliant color and contrast ratios
- Keyboard navigation support
- Screen reader labels for all diagram elements

---

## Tech Stack Recommendation
- Frontend: React.js with D3.js or Cytoscape.js
- Backend: Node.js API or integration with existing SPOiRMM backend
- Export/Reporting: jsPDF or HTML2Canvas for printable formats

---

## Future Enhancements
- AI-assisted stakeholder mapping
- Dynamic risk overlays on diagram
- Real-time collaboration support

---

## Appendix: SPOiRMM Visual References
| Tool            | Color     |
|------------------|-----------|
| Jurisdiction     | Purple    |
| Market           | Orange    |
| Enterprise       | Teal      |
| Organisation     | Light Blue|
| Agreements       | Dark Blue |
| Resources        | Brown     |
