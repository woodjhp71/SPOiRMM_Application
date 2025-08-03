# WorkflowEngine Component

## Overview
The WorkflowEngine component provides a visual representation of the SPOiRMM risk management workflow. It displays the current status of project planning, issues list, and risk register modules, along with reminders and alerts for upcoming or overdue actions.

## Features

### Visual Workflow Representation
- **Project Planning**: Define project scope, stakeholders, and objectives
- **Issues List**: Track and manage potential risks and concerns  
- **Risk Register**: Manage validated risks with analysis and treatment

### Status Indicators
- **Grey**: Not Started
- **Blue**: In Progress  
- **Green**: Completed
- **Red**: Blocked (prerequisites not met)

### Reminders & Alerts
- Overdue project planning
- Pending issues review
- High-priority risks requiring attention

### Navigation
- Clickable workflow steps that navigate to appropriate modules
- Blocked steps show reason and prevent navigation
- Visual connection lines between workflow stages

## Props

```typescript
interface WorkflowEngineProps {
  userRole?: string;           // User's role (default: 'Risk Plan Coordinator')
  activeProjectId?: string;    // Current project ID
  showReminders?: boolean;     // Show reminders section (default: true)
}
```

## Usage

```tsx
import WorkflowEngine from '../WorkflowEngine/WorkflowEngine';

// Basic usage
<WorkflowEngine />

// With custom props
<WorkflowEngine 
  userRole="Risk Plan Sponsor"
  activeProjectId="project-123"
  showReminders={true}
/>
```

## Integration

The WorkflowEngine component is integrated into the Welcome page and provides:

1. **State Awareness**: Tracks progress across all linked modules
2. **Action Routing**: Directs users to correct modules based on workflow state
3. **Prerequisites Validation**: Ensures workflow steps are completed in order
4. **Audit Logging**: Tracks transitions for compliance (when backend support exists)

## Dependencies

- React Router for navigation
- ProjectContext for project data
- Heroicons for status icons
- Tailwind CSS for styling

## Workflow Logic

### Prerequisites
- Issues List and Risk Register require Project Planning approval
- All modules can be accessed independently once prerequisites are met

### Status Determination
- **Project Planning**: Based on plan approval and project status
- **Issues List**: Based on issue count and status
- **Risk Register**: Based on risk count and status

### Blocking Conditions
- Steps are blocked when project plan is not approved
- Visual indicators show why steps are blocked
- Clicking blocked steps shows alert with reason 