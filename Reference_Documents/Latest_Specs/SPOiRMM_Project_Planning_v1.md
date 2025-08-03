# Project Planning Module Specification (v2)

## Purpose
Defines the scope, stakeholders, objectives, and timeline for a risk management project. Initiates the workflow and acts as the first stage in the SPOiRMM Flow.

---

## Key Enhancements in v2
- ❌ Removed embedded Issues List and Risk Register modules
- ✅ Workflow-aware: Controlled by the SPOiRMM Engine
- ✅ Stage 1 in SPOiRMM Flow, unlocking future stages upon approval
- ✅ Role-based approval enforced
- ✅ Supports organization-level scoping

---

## Fields

### Metadata
- `organizationId` (UUID, Required) — Parent organization reference
- `projectId` (UUID, Auto-generated) — Unique identifier across modules
- `projectTitle` (Text, Required)
- `projectDescription` (Text, Required)
- `startDate` (Date, Required)
- `endDate` (Date, Required)

### Stakeholders
- `projectManager` (User, Required)
- `riskPlanSponsor` (User, Required)
- `riskPlanCoordinator` (User, Required)

### Status & Workflow
- `workflowStage` (Enum: Draft | In Progress | Approved | Rejected | Closed)
- `planApproved` (Boolean, Controlled by Engine)
- `approvalDate` (Date, Auto-set on approval)

### Objectives
- `whyIsTheProjectNeeded` (Text, Optional)
- `objectivesAndMeasurableOutcomes` (Text, Optional)

---

## Role-Based Access

| Field/Action             | Role Allowed          |
|--------------------------|-----------------------|
| Approve Plan             | Risk Plan Sponsor     |
| Edit Project Metadata    | Risk Plan Coordinator |
| View Only                | All assigned users    |
| Trigger Next Stage       | SPOiRMM Engine only   |

---

## Integration

- First stage in the SPOiRMM Flow
- Controlled via the Workflow Engine
- Unlocks Issues List and Risk Register upon plan approval
- Appears in the SPOiRMM Navigator as “Project Planning”
- Shared `projectId` used across Issues and Risks

---

## UI Behavior

- Navigator shows current stage as “In Progress” while editing
- "Submit for Approval" triggers transition via Engine
- "Plan Approved" state unlocks access to downstream modules

---

## Status Transitions (Managed by Engine)

| From        | To           | Condition                           |
|-------------|--------------|--------------------------------------|
| Draft       | In Progress  | Project started                     |
| In Progress | Approved     | Sponsor approves via Navigator      |
| In Progress | Rejected     | Sponsor rejects                     |
| Approved    | Closed       | All assessments complete            |

---

## Notes

- All status transitions and approvals are enforced through the SPOiRMM Engine
- No manual changes allowed to workflowStage or approvalDate outside the Engine