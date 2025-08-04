# Firebase ER Diagram for SPOiRMM Application

## Overview
This document provides a comprehensive Entity-Relationship (ER) diagram representation of the SPOiRMM Firebase data model, based on the actual Firebase Data Model Design documentation and implemented code.

## Database Schema Overview

### Core Collections (Top-Level)

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   organizations │    │      users      │    │ systemConfigs   │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ orgId (PK)      │    │ userId (PK)     │    │ configId (PK)   │
│ name            │    │ email           │    │ type            │
│ description     │    │ displayName     │    │ name            │
│ timezone        │    │ organizationId  │    │ description     │
│ standards[]     │    │ roles[]         │    │ data            │
│ jurisdictional  │    │ activeProjects[]│    │ isActive        │
│ scope[]         │    │ isActive        │    │ sortOrder       │
│ defaultRisk     │    │ createdAt       │    │ createdAt       │
│ Matrix          │    │ updatedAt       │    └─────────────────┘
│ createdAt       │    │ lastLoginAt     │
│ updatedAt       │    │ createdBy       │
│ status          │    └─────────────────┘
└─────────────────┘              │
         │                       │
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│     players     │    │   departments   │
├─────────────────┤    ├─────────────────┤
│ playerId (PK)   │    │ departmentId(PK)│
│ organizationId  │    │ organizationId  │
│ name            │    │ name            │
│ playerType      │    │ code            │
│ playerRole      │    │ parentDeptId    │
│ entityNature    │    │ departmentHeadId│
│ linkedDepts[]   │    │ levelClass      │
│ notes           │    │ functionsDesc   │
│ influenceLevel  │    │ costCenterCode  │
│ marketPart[]    │    │ status          │
│ createdAt       │    │ createdAt       │
│ updatedAt       │    │ updatedAt       │
│ status          │    └─────────────────┘
└─────────────────┘
```

### Project-Related Collections

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     projects    │    │      issues     │    │      risks      │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ projectId (PK)  │    │ issueId (PK)    │    │ riskId (PK)     │
│ organizationId  │    │ organizationId  │    │ organizationId  │
│ title           │    │ projectId       │    │ projectId       │
│ description     │    │ title           │    │ riskId          │
│ startDate       │    │ description     │    │ title           │
│ endDate         │    │ dateRaised      │    │ description     │
│ projectManagerId│    │ raisedById      │    │ status          │
│ riskPlanSponsor │    │ relatedPlayerIds│    │ likelihood      │
│ riskPlanCoord   │    │ moduleContext   │    │ consequence     │
│ status          │    │ status          │    │ riskScore       │
│ planApproved    │    │ priority        │    │ riskType        │
│ approvalDate    │    │ notes           │    │ externalStake   │
│ whyNeeded       │    │ convertedToRisk │    │ internalDepts   │
│ objectives      │    │ createdAt       │    │ mitigationPlan  │
│ createdAt       │    │ updatedAt       │    │ ownerId         │
│ updatedAt       │    └─────────────────┘    │ reviewDate      │
└─────────────────┘                           │ approvalRequired│
         │                                    │ approvalStatus  │
         │                                    │ relatedIssueIds │
         ▼                                    │ createdAt       │
┌─────────────────┐                           │ updatedAt       │
│ Project         │                           └─────────────────┘
│ Subcollections  │
├─────────────────┤
│ actionPlan/     │
│ workingGroups/  │
│ assessment/     │
│ projectPlayers/ │
└─────────────────┘
```

### Organization Subcollections

```
┌─────────────────┐
│ organizations   │
│ {orgId}         │
├─────────────────┤
│ name            │
│ description     │
│ timezone        │
│ standards[]     │
│ jurisdictional  │
│ scope[]         │
│ defaultRisk     │
│ Matrix          │
│ createdAt       │
│ updatedAt       │
│ status          │
└─────────────────┘
         │
         ├─────────────────┬─────────────────┬─────────────────┐
         ▼                 ▼                 ▼                 ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ agreements/     │ │ policies/       │ │ settings/       │ │ auditLogs/      │
│ {agreementId}   │ │ {policyId}      │ │ {settingId}     │ │ {logId}         │
├─────────────────┤ ├─────────────────┤ ├─────────────────┤ ├─────────────────┤
│ name            │ │ title           │ │ key             │ │ userId          │
│ providerId      │ │ purpose         │ │ value           │ │ action          │
│ recipientId     │ │ evaluation      │ │ updatedAt       │ │ resourceType    │
│ serviceScope    │ │ criteria        │ └─────────────────┘ │ resourceId      │
│ level           │ │ documentUrls[]  │                     │ oldValue        │
│ status          │ │ createdAt       │                     │ newValue        │
│ createdAt       │ │ updatedAt       │                     │ ipAddress       │
│ updatedAt       │ └─────────────────┘                     │ userAgent       │
└─────────────────┘                                         │ timestamp       │
                                                            └─────────────────┘
```

### Department Subcollections

```
┌─────────────────┐
│ departments     │
│ {departmentId}  │
├─────────────────┤
│ organizationId  │
│ name            │
│ code            │
│ parentDeptId    │
│ departmentHeadId│
│ levelClass      │
│ functionsDesc   │
│ costCenterCode  │
│ status          │
│ createdAt       │
│ updatedAt       │
└─────────────────┘
         │
         ├─────────────────┐
         ▼                 ▼
┌─────────────────┐ ┌─────────────────┐
│ internalFuncs/  │ │ performance     │
│ {functionId}    │ │ Metrics/        │
├─────────────────┤ │ {metricId}      │
│ name            │ ├─────────────────┤
│ functionLevel   │ │ timeToDeliver   │
│ ownerId         │ │ staffConsumed   │
│ relatedCost     │ │ suppliesConsumed│
│ Centre          │ │ performance     │
│ linkedAgreement │ │ Comments        │
│ Ids[]           │ │ measuredAt      │
│ createdAt       │ │ createdAt       │
│ updatedAt       │ └─────────────────┘
└─────────────────┘
```

### Project Subcollections

```
┌─────────────────┐
│ projects        │
│ {projectId}     │
├─────────────────┤
│ organizationId  │
│ title           │
│ description     │
│ startDate       │
│ endDate         │
│ projectManagerId│
│ riskPlanSponsor │
│ riskPlanCoord   │
│ status          │
│ planApproved    │
│ approvalDate    │
│ whyNeeded       │
│ objectives      │
│ createdAt       │
│ updatedAt       │
└─────────────────┘
         │
         ├─────────────────┬─────────────────┬─────────────────┬─────────────────┐
         ▼                 ▼                 ▼                 ▼                 ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ actionPlan/     │ │ workingGroups/  │ │ assessment/     │ │ projectPlayers/ │ │ workflow/       │
│ {taskId}        │ │ {groupId}       │ │ {assessmentId}  │ │ {playerId}      │ │ {workflowId}    │
├─────────────────┤ ├─────────────────┤ ├─────────────────┤ ├─────────────────┤ ├─────────────────┤
│ taskNumber      │ │ name            │ │ needsSatisfied  │ │ playerId        │ │ workflowType    │
│ description     │ │ memberIds[]     │ │ needsDesc       │ │ relationshipTo  │ │ currentStage    │
│ assignedToId    │ │ meetingDates[]  │ │ objectives      │ │ Project         │ │ stageData       │
│ dateDue         │ │ createdAt       │ │ Achieved        │ │ addedAt         │ │ lastUpdated     │
│ status          │ │ updatedAt       │ │ objectivesDesc  │ └─────────────────┘ │ createdAt       │
│ notes           │ └─────────────────┘ │ projectManager  │                     │ updatedAt       │
│ createdAt       │                     │ Signoff         │                     └─────────────────┘
│ updatedAt       │                     │ signoffDate     │
└─────────────────┘                     │ createdAt       │
                                        │ updatedAt       │
                                        └─────────────────┘
```

## Key Relationships

### Primary Relationships

```
1. Organizations (1) ←→ (Many) Users
   - organizationId in users references organizations.orgId

2. Organizations (1) ←→ (Many) Players
   - organizationId in players references organizations.orgId

3. Organizations (1) ←→ (Many) Departments
   - organizationId in departments references organizations.orgId

4. Organizations (1) ←→ (Many) Projects
   - organizationId in projects references organizations.orgId

5. Organizations (1) ←→ (Many) Issues
   - organizationId in issues references organizations.orgId

6. Organizations (1) ←→ (Many) Risks
   - organizationId in risks references organizations.orgId

7. Projects (1) ←→ (Many) Issues
   - projectId in issues references projects.projectId

8. Projects (1) ←→ (Many) Risks
   - projectId in risks references projects.projectId

9. Users (1) ←→ (Many) Projects (as Project Manager)
   - projectManagerId in projects references users.userId

10. Users (1) ←→ (Many) Projects (as Risk Plan Sponsor)
    - riskPlanSponsorId in projects references users.userId

11. Users (1) ←→ (Many) Projects (as Risk Plan Coordinator)
    - riskPlanCoordinatorId in projects references users.userId

12. Users (1) ←→ (Many) Issues (as Raised By)
    - raisedById in issues references users.userId

13. Users (1) ←→ (Many) Risks (as Owner)
    - ownerId in risks references users.userId

14. Departments (1) ←→ (Many) Departments (as Parent)
    - parentDepartmentId in departments references departments.departmentId

15. Departments (1) ←→ (Many) Users (as Department Head)
    - departmentHeadId in departments references users.userId

16. Players (Many) ←→ (Many) Issues
    - relatedPlayerIds[] in issues references players.playerId

17. Players (Many) ←→ (Many) Risks
    - externalStakeholderIds[] in risks references players.playerId

18. Departments (Many) ←→ (Many) Risks
    - internalDepartmentIds[] in risks references departments.departmentId

19. Issues (1) ←→ (Many) Risks
    - relatedIssueIds[] in risks references issues.issueId

20. Issues (1) ←→ (1) Risks (when converted)
    - convertedToRiskId in issues references risks.riskId
```

### Subcollection Relationships

```
1. Organizations (1) ←→ (Many) Agreements
   - organizations/{orgId}/agreements/{agreementId}

2. Organizations (1) ←→ (Many) Policies
   - organizations/{orgId}/policies/{policyId}

3. Organizations (1) ←→ (Many) Settings
   - organizations/{orgId}/settings/{settingId}

4. Organizations (1) ←→ (Many) Audit Logs
   - organizations/{orgId}/auditLogs/{logId}

5. Departments (1) ←→ (Many) Internal Functions
   - departments/{departmentId}/internalFunctions/{functionId}

6. Departments (1) ←→ (Many) Performance Metrics
   - departments/{departmentId}/performanceMetrics/{metricId}

7. Projects (1) ←→ (Many) Action Plan Tasks
   - projects/{projectId}/actionPlan/{taskId}

8. Projects (1) ←→ (Many) Working Groups
   - projects/{projectId}/workingGroups/{groupId}

9. Projects (1) ←→ (Many) Assessments
   - projects/{projectId}/assessment/{assessmentId}

10. Projects (1) ←→ (Many) Project Players
    - projects/{projectId}/projectPlayers/{playerId}
```

## Data Types and Constraints

### Enumerated Types

```
UserRole:
- 'Admin'
- 'Risk Plan Sponsor'
- 'Risk Plan Coordinator'
- 'Working Group Member'
- 'Risk Owner'
- 'Viewer'

PlayerType:
- 'recipient'
- 'provider'
- 'supplier'
- 'regulator'
- 'representative'

EntityNature:
- 'individual'
- 'organization'

DepartmentLevel:
- 'L1' (Decision-Making)
- 'L2' (Exchange)
- 'L3' (Satisfying)

ProjectStatus:
- 'new'
- 'inProgress'
- 'closed'

IssueStatus:
- 'new'
- 'underReview'
- 'convertedToRisk'
- 'closed'

RiskStatus:
- 'open'
- 'mitigating'
- 'resolved'
- 'archived'

AgreementLevel:
- 'decision'
- 'exchange'
- 'satisfaction'

AgreementStatus:
- 'draft'
- 'active'
- 'retired'

ApprovalStatus:
- 'pending'
- 'approved'
- 'rejected'

Priority:
- 'low'
- 'medium'
- 'high'

InfluenceLevel:
- 'high'
- 'medium'
- 'low'

SystemConfigType:
- 'regulatoryCategory'
- 'jurisdictionLevel'
- 'lawStandard'
- 'marketType'
- 'marketSegment'
- 'agreementType'
- 'contractType'
- 'processTemplate'
- 'departmentLevel'
- 'costCenter'
- 'playerType'
- 'playerRole'
```

### Field Constraints

```
Required Fields:
- All PK fields (orgId, userId, projectId, etc.)
- organizationId (in all organization-scoped collections)
- email (in users)
- displayName (in users)
- name (in organizations, players, departments)
- title (in projects, issues, risks)
- status (in all status-enabled collections)
- createdAt (in all collections)
- updatedAt (in all collections)

Optional Fields:
- description (in most collections)
- notes (in players, issues)
- lastLoginAt (in users)
- createdBy (in users)
- endDate (in projects)
- approvalDate (in projects)
- convertedToRiskId (in issues)
- reviewDate (in risks)

Array Fields:
- standards[] (in organizations)
- jurisdictionalScope[] (in organizations)
- roles[] (in users)
- activeProjects[] (in users)
- linkedDepartments[] (in players)
- marketParticipation[] (in players)
- relatedPlayerIds[] (in issues)
- externalStakeholderIds[] (in risks)
- internalDepartmentIds[] (in risks)
- relatedIssueIds[] (in risks)
- memberIds[] (in workingGroups)
- meetingDates[] (in workingGroups)
- documentUrls[] (in policies)
- linkedAgreementIds[] (in internalFunctions)

Numeric Constraints:
- likelihood: 1-5 (in risks)
- consequence: 1-5 (in risks)
- riskScore: calculated (in risks)
- taskNumber: number (in actionPlan)
- timeToDeliverOutcome: number (in performanceMetrics)
- staffConsumed: number (in performanceMetrics)
- suppliesConsumed: number (in performanceMetrics)
- sortOrder: number (in systemConfigs)
```

## Security Model

### Access Control Levels

```
1. Superuser (System-wide access)
   - Can access all organizations
   - Can manage system configurations
   - Can export audit logs

2. Admin (Organization-level access)
   - Can manage users within organization
   - Can manage all organization data
   - Can access admin settings

3. Coordinator (Project-level access)
   - Can manage projects and related data
   - Can create and edit issues/risks
   - Limited user management

4. Project Manager (Project-specific access)
   - Can manage assigned projects
   - Can edit project-related data
   - Cannot manage users

5. Working Group Member (Limited access)
   - Can create issues
   - Can view assigned projects
   - Cannot manage other users

6. Viewer (Read-only access)
   - Can view data based on permissions
   - Cannot create or edit data
```

### Security Rules Structure

```
Base Functions:
- isAuthenticated()
- isInOrganization(orgId)
- hasRole(roles)
- isSuperuser()
- isOwner(userId)
- isProjectMember(projectId)

Collection Rules:
- organizations: org-level access
- users: owner or admin access
- players: org-level access
- departments: org-level access
- projects: org-level access
- issues: org-level access
- risks: org-level access
- systemConfigs: read-all, write-superuser
```

## Indexes and Performance

### Composite Indexes

```
Projects:
- organizationId + status + createdAt
- organizationId + projectManagerId + status
- organizationId + riskPlanSponsorId + status

Issues:
- organizationId + projectId + status
- organizationId + raisedById + dateRaised
- organizationId + relatedPlayerIds + status

Risks:
- organizationId + projectId + status
- organizationId + riskScore + status
- organizationId + ownerId + status
- organizationId + externalStakeholderIds + status

Players:
- organizationId + playerType + status
- organizationId + entityNature + status
- organizationId + marketParticipation + status

Departments:
- organizationId + levelClassification + status
- organizationId + parentDepartmentId + status

Users:
- organizationId + role + status
- organizationId + departmentId + status
```

### Collection Group Indexes

```
actionPlan: organizationId + status + dateDue
workingGroups: organizationId + memberIds
assessment: organizationId + projectManagerSignoff
```

## Audit Trail Structure

```
Audit Log Fields:
- userId: string (who performed the action)
- action: string (create, update, delete, approve, reject)
- resourceType: string (collection name)
- resourceId: string (document ID)
- oldValue: any (previous state)
- newValue: any (new state)
- ipAddress: string (client IP)
- userAgent: string (client browser)
- timestamp: timestamp (when action occurred)
- organizationId: string (organization context)
- retentionDate: timestamp (30-day retention)
```

## File Attachment Structure

```
File Attachment Fields:
- organizationId: string
- resourceType: string (risk, issue, project, policy)
- resourceId: string
- fileName: string
- fileSize: number (max 10MB)
- mimeType: string
- fileExtension: string
- storagePath: string
- uploadedById: string
- uploadedAt: timestamp
- validationStatus: string (valid, invalid, pending)
```

## Export/Import Structure

```
Export Jobs:
- organizationId: string
- requestedById: string
- exportType: string (risks, projects, players, full, audit)
- format: string (csv, json, pdf, excel)
- filters: object
- schedule: object
- status: string (pending, processing, completed, failed)
- fileUrl: string
- createdAt: timestamp
- completedAt: timestamp
```

## Implementation Notes

### Current Implementation Status

```
✅ Implemented:
- User authentication and authorization
- Basic user management (create, read, update)
- Role-based access control (RBAC)
- Permission checking utilities
- Firebase configuration and security rules

🔄 In Progress:
- Organization management (partially implemented)
- Project management (basic structure)
- User creation form (organization ID optional)

⏳ Pending:
- Full organization management system
- Project subcollections implementation
- Advanced audit logging
- File attachment system
- Export/import functionality
- Real-time collaboration features
```

### Data Migration Considerations

```
1. Existing Users:
   - May not have organizationId set
   - Need migration script to assign default organization
   - Consider superuser role for existing admin users

2. Organization Setup:
   - Default organization creation needed
   - Organization ID assignment for existing data
   - Department structure setup

3. Permission Updates:
   - Existing users may need role updates
   - Permission system alignment
   - Access control verification
```

## References

### Related Documents
- [Firebase Data Model Design](./Firebase%20Data%20Model%20Design.md)
- [Firebase Implementation Plan](./Firebase%20Implementation%20Plan.md)
- [Understanding the Role-Based Access Model](./Understanding%20the%20Role-Based%20Access%20Model.md)
- [Add New User Procedure](./Add%20New%20User%20Procedure.md)

### Code References
- `src/types/user.ts` - User and permission types
- `src/services/userService.ts` - User management service
- `src/contexts/AuthContext.tsx` - Authentication context
- `firestore.rules` - Security rules
- `firestore.indexes.json` - Database indexes

---

**Note**: This ER diagram is based on the actual Firebase data model documentation and implemented code. It represents the current state of the system and planned architecture. The diagram shows all collections, subcollections, relationships, and key constraints as defined in the Firebase Data Model Design document. 