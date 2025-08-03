
# User Access Specification for SPOiRMM Risk Management Application

## Overview
This document outlines the roles, permissions, and access controls for users interacting with the SPOiRMM Risk Management Application. It defines the functional access for each role to ensure secure and structured collaboration across organizations.

---

## Roles and Permissions

### 1. Risk Plan Sponsor
- **Description:** Executive responsible for overall risk governance.
- **Permissions:**
  - Approve and sign off Risk Management Plans
  - Allocate resources for risk mitigation
  - Appoint Risk Plan Coordinator
  - Access all project-level reporting

### 2. Risk Plan Coordinator
- **Description:** Project-level manager of the risk planning process.
- **Permissions:**
  - Create and edit Risk Management Plans
  - Form and manage Working Groups
  - Conduct and document risk analysis, ranking, and evaluation
  - Submit plans for approval

### 3. Working Group Member
- **Description:** Stakeholder or subject-matter expert participating in risk planning.
- **Permissions:**
  - Contribute to issue identification and risk characterization
  - Participate in Working Group meetings and workshops
  - View assigned project data

### 4. Project Manager
- **Description:** Oversees execution of the risk plan and validates final outcomes.
- **Permissions:**
  - Review and update task status and assessments
  - Final sign-off for project completion
  - Access project dashboards and summaries

### 5. System Administrator
- **Description:** Manages platform-wide configurations and user access.
- **Permissions:**
  - Create and manage user accounts and roles
  - Configure system settings (security, audit trails, integrations)
  - Maintain organizational data separation and access control

---

## Access Control Matrix

| Feature / Action                     | Sponsor | Coordinator | Project Manager | Working Group | Admin |
|-------------------------------------|:-------:|:-----------:|:---------------:|:-------------:|:-----:|
| Create/Edit Project Plan            |   ❌    |     ✅      |        ❌       |       ❌      |  ✅   |
| Approve/Sign-off Plan               |   ✅    |     ❌      |        ❌       |       ❌      |  ✅   |
| Assign Coordinator                  |   ✅    |     ❌      |        ❌       |       ❌      |  ✅   |
| Form Working Groups                 |   ✅    |     ✅      |        ❌       |       ❌      |  ✅   |
| Input Risk Identification           |   ❌    |     ✅      |        ❌       |       ✅      |  ✅   |
| Conduct Risk Analysis & Ranking     |   ❌    |     ✅      |        ❌       |       ✅      |  ✅   |
| Access Project Assessment Module    |   ✅    |     ✅      |        ✅       |       ❌      |  ✅   |
| Final Project Completion Signoff    |   ❌    |     ❌      |        ✅       |       ❌      |  ✅   |
| View Full Project Reports           |   ✅    |     ✅      |        ✅       |       ❌      |  ✅   |
| Manage Organizations & Separation   |   ❌    |     ❌      |        ❌       |       ❌      |  ✅   |
| Configure System Settings           |   ❌    |     ❌      |        ❌       |       ❌      |  ✅   |
| Access Audit Logs                   |   ❌    |     ❌      |        ❌       |       ❌      |  ✅   |

---

## Security Considerations
- All actions are logged and auditable.
- Data access is restricted to the user's organization.
- Role-based access is enforced at both UI and API levels.
- Compliance with ISO 31000 and ISO 9001 standards.

---

## Future Enhancements
- Role customization per organization
- Multi-tenancy dashboards for Sponsors
- MFA and SSO integration

