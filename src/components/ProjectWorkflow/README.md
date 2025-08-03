# ProjectWorkflow Component

## Overview
The ProjectWorkflow component provides a dedicated page for managing and tracking the SPOiRMM risk management workflow. It combines the WorkflowEngine with detailed project information, statistics, and quick actions.

## Features

### Project Information Header
- **Project Title & Description**: Displays current project details
- **Project Status**: Visual status indicators (New, In Progress, Closed)
- **Plan Approval Status**: Shows if the project plan has been approved
- **Key Personnel**: Project Manager, Risk Plan Sponsor, Risk Plan Coordinator

### Enhanced Workflow Engine
- **Visual Workflow Steps**: Project Planning → Issues List → Risk Register
- **Status Indicators**: Color-coded status (Not Started, In Progress, Completed, Blocked)
- **Prerequisites Validation**: Ensures workflow steps are completed in order
- **Reminders & Alerts**: Shows overdue tasks and pending actions

### Statistics Sidebar
- **Issues Overview**: 
  - Total Issues count
  - Breakdown by status (New, In Review, Accepted as Risk, Rejected)
- **Risks Overview**:
  - Total Risks count
  - Breakdown by status (New, Under Review, Approved, Treated, Closed)

### Quick Actions
- **Go to Project Planning**: Direct navigation to planning module
- **Manage Issues**: Quick access to issues list
- **View Risk Register**: Direct access to risk register

## Layout

```
┌─────────────────────────────────────────────────────────────┐
│                    Project Information                      │
│  Title | Description | Status | Approval | Key Personnel  │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────┬─────────────────────────┐
│                                 │                         │
│        Workflow Engine          │    Statistics Sidebar   │
│                                 │                         │
│  • Project Planning             │  • Issues Overview      │
│  • Issues List                  │  • Risks Overview       │
│  • Risk Register                │  • Quick Actions        │
│                                 │                         │
└─────────────────────────────────┴─────────────────────────┘
```

## Props

```typescript
interface ProjectWorkflowProps {
  userRole?: string;  // User's role (default: 'Risk Plan Coordinator')
}
```

## Usage

```tsx
import ProjectWorkflow from '../ProjectWorkflow/ProjectWorkflow';

// Basic usage
<ProjectWorkflow />

// With custom user role
<ProjectWorkflow userRole="Risk Plan Sponsor" />
```

## Navigation

- **Route**: `/workflow`
- **Access**: Via Welcome page navigation button
- **Back Navigation**: Returns to Welcome page

## Integration

The ProjectWorkflow component integrates with:

1. **ProjectContext**: For project data and state management
2. **WorkflowEngine**: For workflow visualization and navigation
3. **React Router**: For navigation between modules
4. **Heroicons**: For status and action icons

## Dependencies

- React Router for navigation
- ProjectContext for project data
- WorkflowEngine component
- Heroicons for icons
- Tailwind CSS for styling

## Features Summary

### Visual Elements
- Project status badges with icons
- Color-coded workflow steps
- Statistics cards with breakdowns
- Quick action buttons with hover effects

### Data Integration
- Real-time project data from context
- Dynamic statistics calculation
- Status-based workflow blocking
- Reminder generation based on project state

### User Experience
- Responsive layout (mobile-friendly)
- Keyboard navigation support
- Hover effects and transitions
- Clear visual hierarchy 