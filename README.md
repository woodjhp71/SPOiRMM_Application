# SPOiRMM Project Planning Module

A comprehensive React TypeScript implementation of the SPOiRMM (Stakeholder Perspectives on Integrated Risk Management Methodology) Project Planning module.

## Features

### 🎯 Core Modules
- **PP_Workflow**: Navigation and workflow control for SPOiRMM methodology
- **PP_Details**: Project metadata and governance structure
- **PP_Action_Plan**: Task planning with assignment and tracking
- **PP_Working_Groups**: Stakeholder group management and meeting scheduling
- **PP_Assessment**: Project evaluation and sign-off functionality

### 🎭 Players Chart Integration
- **PlayersChart**: External stakeholder management with SPOiRMM color coding
  - Add, edit, and delete players with full CRUD operations
  - Filter and search by player type, role, and nature
  - Color-coded badges based on SPOiRMM methodology
  - Risk impact association with multi-select options
  - Validation for unique player combinations
  - Responsive design with accessibility compliance

### 🎨 Design Features
- **SPOiRMM Color Scheme**: Implements the official SPOiRMM visual conventions
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: WCAG 2.1 AA compliant color contrasts
- **Modern UI**: Clean, professional interface with smooth interactions

### ⚡ Technical Features
- **TypeScript**: Full type safety and IntelliSense support
- **React 18**: Latest React features with functional components
- **Tailwind CSS**: Utility-first styling with custom SPOiRMM theme
- **Headless UI**: Accessible, unstyled UI components
- **Heroicons**: Beautiful, consistent iconography

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd spoirmm-project-planning
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── ProjectPlanning/
│   │   ├── ProjectPlanning.tsx          # Main component
│   │   └── modules/
│   │       ├── PPWorkflow.tsx           # Workflow navigation
│   │       ├── PPDetails.tsx            # Project metadata
│   │       ├── PPActionPlan.tsx         # Task management
│   │       ├── PPWorkingGroups.tsx      # Stakeholder groups
│   │       └── PPAssessment.tsx         # Evaluation & sign-off
│   └── PlayersChart/
│       └── PlayersChart.tsx             # External stakeholder management
├── contexts/
│   └── ProjectContext.tsx               # Project state management
├── utils/
│   └── classNames.ts                   # Utility functions
├── App.tsx                             # Main app component
├── main.tsx                           # React entry point
└── index.css                          # Global styles
```

## Module Details

### PP_Workflow
- **Purpose**: Navigation and workflow control
- **Features**: 
  - Visual workflow steps with status indicators
  - Quick action buttons for related modules
  - SPOiRMM methodology guidance

### PP_Details
- **Purpose**: Project metadata and governance
- **Features**:
  - Project title, dates, and description
  - Role assignments (Manager, Sponsor, Coordinator)
  - Plan approval workflow with auto-date setting
  - Form validation and error handling

### PP_Action_Plan
- **Purpose**: Task planning and management
- **Features**:
  - CRUD operations for tasks
  - Assignment tracking with team members
  - Status management (New, In Progress, Completed)
  - Due date tracking with overdue indicators
  - Progress summary dashboard

### PP_Working_Groups
- **Purpose**: Stakeholder group management
- **Features**:
  - Create and manage working groups
  - Multi-select member assignment
  - Meeting date scheduling
  - Group summary statistics

### PP_Assessment
- **Purpose**: Project evaluation and sign-off
- **Features**:
  - Needs satisfaction assessment
  - Objectives achievement evaluation
  - Conditional field requirements
  - Project manager sign-off with auto-date
  - Business rule validation (project must be "Closed")

## Business Rules

### Auto-Set Logic
- **Approval Date**: Automatically set when plan is approved
- **Sign-off Date**: Automatically set when project manager signs off
- **Task Numbers**: Auto-incremented when tasks are added/removed

### Validation Rules
- **Required Fields**: Enforced with visual indicators and error messages
- **Date Validation**: End dates must be after start dates
- **Status Dependencies**: Assessment sign-off requires "Closed" project status
- **Conditional Fields**: Description required when needs/objectives not met

### SPOiRMM Compliance
- **Color Coding**: Implements official SPOiRMM color scheme
- **Role-based Access**: Different permissions for different roles
- **Audit Trail**: All actions are tracked and timestamped

## Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Technology Stack
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom SPOiRMM theme
- **UI Components**: Headless UI for accessibility
- **Icons**: Heroicons for consistency
- **Build Tool**: Vite for fast development

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with React-specific rules
- **Prettier**: Code formatting (recommended)
- **Accessibility**: WCAG 2.1 AA compliance

## SPOiRMM Methodology Integration

This implementation follows the SPOiRMM methodology for integrated risk management:

### Color Scheme
| Role/Function | Color | Usage |
|---------------|-------|-------|
| Recipient of Benefit | Blue | Text, backgrounds, icons |
| Provider of Benefit | Red | Text, borders, active elements |
| Benefit Enablers | Green | Icons, labels, highlights |
| Regulators | Yellow | Informational banners |
| Jurisdiction Tool | Purple | Section indicators |
| Market Tool | Orange | Section indicators |
| Enterprise Tool | Teal | External role containers |
| Organisation Tool | Light Blue | Internal structure |
| Agreements Tool | Dark Blue | Matrix headers |
| Resources Tool | Brown | Timeline indicators |

### Workflow Integration
The module integrates with the broader SPOiRMM workflow:
1. **Players Chart** → Stakeholder identification
2. **Issues List** → Issue tracking
3. **Project Planning** → Current module
4. **Risk Register** → Formal risk documentation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or support regarding the SPOiRMM methodology or this implementation, please refer to the official SPOiRMM documentation or contact the development team. 