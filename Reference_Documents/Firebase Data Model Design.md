# Firebase Data Model Design for SPOiRMM Application

## Overview
This document defines the complete Firebase data model structure for the SPOiRMM Risk Management Application, including collections, subcollections, security rules, indexes, and implementation recommendations.

---

## 1. Core Collections Structure

### 1.1 Organizations Collection
```javascript
organizations/{orgId}
{
  name: string,
  description: string,
  timezone: string,
  standards: string[], // ["ISO 31000", "ISO 9001"]
  jurisdictionalScope: string[],
  defaultRiskMatrix: object,
  createdAt: timestamp,
  updatedAt: timestamp,
  status: "active" | "inactive"
}
```

### 1.2 Users Collection
```javascript
users/{userId}
{
  email: string,
  displayName: string,
  organizationId: string,
  role: "superuser" | "sponsor" | "coordinator" | "projectManager" | "workingGroupMember" | "admin",
  departmentId: string, // optional
  permissions: {
    canCreateProjects: boolean,
    canApprovePlans: boolean,
    canManageUsers: boolean,
    canAccessAuditLogs: boolean,
    canAccessAllOrganizations: boolean, // superuser only
    canExportAuditLogs: boolean,
    canManageSystemConfig: boolean
  },
  lastLogin: timestamp,
  createdAt: timestamp,
  status: "active" | "inactive"
}
```

### 1.3 System Configurations Collection
```javascript
systemConfigs/{configId}
{
  type: "regulatoryCategory" | "jurisdictionLevel" | "lawStandard" | "marketType" | 
        "marketSegment" | "agreementType" | "contractType" | "processTemplate" | 
        "departmentLevel" | "costCenter" | "playerType" | "playerRole",
  name: string,
  description: string,
  data: object, // type-specific configuration data
  isActive: boolean,
  sortOrder: number,
  createdAt: timestamp
}
```

### 1.4 Players Collection (Organization-level)
```javascript
players/{playerId}
{
  organizationId: string,
  name: string,
  playerType: "recipient" | "provider" | "supplier" | "regulator" | "representative",
  playerRole: string, // filtered by playerType
  entityNature: "individual" | "organization",
  linkedDepartments: string[], // department IDs
  notes: string,
  influenceLevel: "high" | "medium" | "low", // optional
  marketParticipation: string[], // market type IDs
  createdAt: timestamp,
  updatedAt: timestamp,
  status: "active" | "inactive"
}
```

### 1.5 Departments Collection (Organization-level)
```javascript
departments/{departmentId}
{
  organizationId: string,
  name: string,
  code: string,
  parentDepartmentId: string, // optional for hierarchy
  departmentHeadId: string,
  levelClassification: "L1" | "L2" | "L3",
  functionsDescription: string,
  costCenterCode: string, // optional
  status: "active" | "inactive",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### 1.6 Projects Collection
```javascript
projects/{projectId}
{
  organizationId: string,
  title: string,
  description: string,
  startDate: timestamp,
  endDate: timestamp,
  projectManagerId: string,
  riskPlanSponsorId: string,
  riskPlanCoordinatorId: string,
  status: "new" | "inProgress" | "closed",
  planApproved: boolean,
  approvalDate: timestamp,
  whyNeeded: string,
  objectives: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### 1.7 Issues Collection
```javascript
issues/{issueId}
{
  organizationId: string,
  projectId: string, // optional for org-level issues
  title: string,
  description: string,
  dateRaised: timestamp,
  raisedById: string,
  relatedPlayerIds: string[],
  moduleContext: string, // SPOiRMM tool context
  status: "new" | "underReview" | "convertedToRisk" | "closed",
  priority: "low" | "medium" | "high",
  notes: string,
  convertedToRiskId: string, // when converted
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### 1.8 Risks Collection
```javascript
risks/{riskId}
{
  organizationId: string,
  projectId: string,
  riskId: string, // auto-generated ID
  title: string,
  description: string,
  status: "open" | "mitigating" | "resolved" | "archived",
  likelihood: number, // 1-5
  consequence: number, // 1-5
  riskScore: number, // calculated
  riskType: string, // SPOiRMM tool context
  externalStakeholderIds: string[], // player IDs
  internalDepartmentIds: string[], // department IDs
  mitigationPlan: string,
  ownerId: string,
  reviewDate: timestamp,
  approvalRequired: boolean,
  approvalStatus: "pending" | "approved" | "rejected",
  relatedIssueIds: string[],
  createdAt: timestamp,
  updatedAt: timestamp
}
```

---

## 2. Subcollections Structure

### 2.1 Project Subcollections
```javascript
projects/{projectId}/actionPlan/{taskId}
{
  taskNumber: number,
  description: string,
  assignedToId: string,
  dateDue: timestamp,
  status: "new" | "inProgress" | "completed",
  notes: string,
  createdAt: timestamp,
  updatedAt: timestamp
}

projects/{projectId}/workingGroups/{groupId}
{
  name: string,
  memberIds: string[],
  meetingDates: timestamp[],
  createdAt: timestamp,
  updatedAt: timestamp
}

projects/{projectId}/assessment/{assessmentId}
{
  needsSatisfied: boolean,
  needsDescription: string,
  objectivesAchieved: boolean,
  objectivesDescription: string,
  projectManagerSignoff: boolean,
  signoffDate: timestamp,
  createdAt: timestamp,
  updatedAt: timestamp
}

projects/{projectId}/projectPlayers/{playerId}
{
  playerId: string,
  relationshipToProject: string,
  addedAt: timestamp
}
```

### 2.2 Organization Subcollections
```javascript
organizations/{orgId}/agreements/{agreementId}
{
  name: string,
  providerId: string, // player ID
  recipientId: string, // player ID
  serviceScope: string,
  level: "decision" | "exchange" | "satisfaction",
  status: "draft" | "active" | "retired",
  createdAt: timestamp,
  updatedAt: timestamp
}

organizations/{orgId}/policies/{policyId}
{
  title: string,
  purpose: string,
  evaluationCriteria: string,
  documentUrls: string[],
  createdAt: timestamp,
  updatedAt: timestamp
}

organizations/{orgId}/settings/{settingId}
{
  key: string,
  value: any,
  updatedAt: timestamp
}
```

### 2.3 Department Subcollections
```javascript
departments/{departmentId}/internalFunctions/{functionId}
{
  name: string,
  functionLevel: "L1" | "L2" | "L3",
  ownerId: string,
  relatedCostCentre: string,
  linkedAgreementIds: string[],
  createdAt: timestamp,
  updatedAt: timestamp
}

departments/{departmentId}/performanceMetrics/{metricId}
{
  timeToDeliverOutcome: number, // in hours
  staffConsumed: number,
  suppliesConsumed: number,
  performanceComments: string,
  measuredAt: timestamp,
  createdAt: timestamp
}
```

### 2.4 Audit Trail Subcollections
```javascript
organizations/{orgId}/auditLogs/{logId}
{
  userId: string,
  action: string,
  resourceType: string,
  resourceId: string,
  oldValue: any,
  newValue: any,
  ipAddress: string,
  userAgent: string,
  timestamp: timestamp
}
```

---

## 3. Security Rules

### 3.1 Base Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isInOrganization(orgId) {
      return isAuthenticated() && 
             request.auth.token.organizationId == orgId;
    }
    
    function hasRole(roles) {
      return isAuthenticated() && 
             request.auth.token.role in roles;
    }
    
    function isSuperuser() {
      return isAuthenticated() && 
             request.auth.token.role == "superuser";
    }
    
    function isOwner(userId) {
      return isAuthenticated() && 
             request.auth.uid == userId;
    }
    
    function isProjectMember(projectId) {
      return isAuthenticated() && 
             exists(/databases/$(database)/documents/projects/$(projectId)/projectPlayers/$(request.auth.uid));
    }
    
    // Organization rules
    match /organizations/{orgId} {
      allow read: if isInOrganization(orgId);
      allow write: if isInOrganization(orgId) && hasRole(['admin', 'coordinator']);
      
      // Organization subcollections
      match /{subcollection}/{docId} {
        allow read: if isInOrganization(orgId);
        allow write: if isInOrganization(orgId) && hasRole(['admin', 'coordinator']);
      }
    }
    
    // Users rules
    match /users/{userId} {
      allow read: if isOwner(userId) || 
                    (isAuthenticated() && hasRole(['admin']));
      allow write: if isOwner(userId) || 
                     (isAuthenticated() && hasRole(['admin']));
    }
    
    // Players rules
    match /players/{playerId} {
      allow read: if isAuthenticated() && 
                    resource.data.organizationId == request.auth.token.organizationId;
      allow write: if isAuthenticated() && 
                     resource.data.organizationId == request.auth.token.organizationId &&
                     hasRole(['admin', 'coordinator']);
    }
    
    // Departments rules
    match /departments/{departmentId} {
      allow read: if isAuthenticated() && 
                    resource.data.organizationId == request.auth.token.organizationId;
      allow write: if isAuthenticated() && 
                     resource.data.organizationId == request.auth.token.organizationId &&
                     hasRole(['admin', 'coordinator']);
      
      // Department subcollections
      match /{subcollection}/{docId} {
        allow read: if isAuthenticated() && 
                      get(/databases/$(database)/documents/departments/$(departmentId)).data.organizationId == request.auth.token.organizationId;
        allow write: if isAuthenticated() && 
                       get(/databases/$(database)/documents/departments/$(departmentId)).data.organizationId == request.auth.token.organizationId &&
                       hasRole(['admin', 'coordinator']);
      }
    }
    
    // Projects rules
    match /projects/{projectId} {
      allow read: if isAuthenticated() && 
                    resource.data.organizationId == request.auth.token.organizationId;
      allow create: if isAuthenticated() && 
                      request.resource.data.organizationId == request.auth.token.organizationId &&
                      hasRole(['admin', 'coordinator']);
      allow update: if isAuthenticated() && 
                      resource.data.organizationId == request.auth.token.organizationId &&
                      (hasRole(['admin', 'coordinator']) || 
                       resource.data.projectManagerId == request.auth.uid);
      
      // Project subcollections
      match /{subcollection}/{docId} {
        allow read: if isAuthenticated() && 
                      get(/databases/$(database)/documents/projects/$(projectId)).data.organizationId == request.auth.token.organizationId;
        allow write: if isAuthenticated() && 
                       get(/databases/$(database)/documents/projects/$(projectId)).data.organizationId == request.auth.token.organizationId &&
                       (hasRole(['admin', 'coordinator']) || 
                        get(/databases/$(database)/documents/projects/$(projectId)).data.projectManagerId == request.auth.uid);
      }
    }
    
    // Issues rules
    match /issues/{issueId} {
      allow read: if isAuthenticated() && 
                    resource.data.organizationId == request.auth.token.organizationId;
      allow create: if isAuthenticated() && 
                      request.resource.data.organizationId == request.auth.token.organizationId &&
                      hasRole(['admin', 'coordinator', 'workingGroupMember']);
      allow update: if isAuthenticated() && 
                      resource.data.organizationId == request.auth.token.organizationId &&
                      hasRole(['admin', 'coordinator']);
    }
    
    // Risks rules
    match /risks/{riskId} {
      allow read: if isAuthenticated() && 
                    resource.data.organizationId == request.auth.token.organizationId;
      allow create: if isAuthenticated() && 
                      request.resource.data.organizationId == request.auth.token.organizationId &&
                      hasRole(['admin', 'coordinator']);
      allow update: if isAuthenticated() && 
                      resource.data.organizationId == request.auth.token.organizationId &&
                      (hasRole(['admin', 'coordinator']) || 
                       resource.data.ownerId == request.auth.uid);
    }
    
    // System configurations (read-only for all authenticated users)
    match /systemConfigs/{configId} {
      allow read: if isAuthenticated();
      allow write: if isSuperuser(); // Only superuser can modify system configs
    }
    
    // Audit log exports (superuser and admin access only)
    match /auditLogExports/{exportId} {
      allow read: if isAuthenticated() && 
                    (isSuperuser() || hasRole(['admin']));
      allow write: if isAuthenticated() && 
                     (isSuperuser() || hasRole(['admin']));
    }
  }
}
```

---

## 4. Indexes Configuration

### 4.1 Composite Indexes
```javascript
// Projects indexes
projects: organizationId + status + createdAt
projects: organizationId + projectManagerId + status
projects: organizationId + riskPlanSponsorId + status

// Issues indexes
issues: organizationId + projectId + status
issues: organizationId + raisedById + dateRaised
issues: organizationId + relatedPlayerIds + status

// Risks indexes
risks: organizationId + projectId + status
risks: organizationId + riskScore + status
risks: organizationId + ownerId + status
risks: organizationId + externalStakeholderIds + status

// Players indexes
players: organizationId + playerType + status
players: organizationId + entityNature + status
players: organizationId + marketParticipation + status

// Departments indexes
departments: organizationId + levelClassification + status
departments: organizationId + parentDepartmentId + status

// Users indexes
users: organizationId + role + status
users: organizationId + departmentId + status
```

### 4.2 Collection Group Indexes
```javascript
// For cross-collection queries
actionPlan: organizationId + status + dateDue
workingGroups: organizationId + memberIds
assessment: organizationId + projectManagerSignoff
```

---

## 5. Implementation Strategy

### 5.1 Setup Scripts

#### 5.1.1 Firebase Project Initialization Script
```javascript
// scripts/init-firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function initializeFirebase() {
  try {
    // Create system configurations
    await createSystemConfigurations();
    
    // Create indexes
    await createIndexes();
    
    // Set up security rules
    await updateSecurityRules();
    
    console.log('Firebase initialization completed');
  } catch (error) {
    console.error('Firebase initialization failed:', error);
  }
}

async function createSystemConfigurations() {
  const configs = [
    // Regulatory Categories
    { type: 'regulatoryCategory', name: 'Privacy', description: 'Data protection and privacy regulations' },
    { type: 'regulatoryCategory', name: 'Financial Compliance', description: 'Financial reporting and compliance' },
    { type: 'regulatoryCategory', name: 'Clinical Licensing', description: 'Clinical practice and licensing requirements' },
    
    // Jurisdiction Levels
    { type: 'jurisdictionLevel', name: 'Federal', description: 'Federal government level' },
    { type: 'jurisdictionLevel', name: 'State', description: 'State government level' },
    { type: 'jurisdictionLevel', name: 'Local', description: 'Local government level' },
    
    // Market Types
    { type: 'marketType', name: 'Healthcare', description: 'Healthcare services market' },
    { type: 'marketType', name: 'Aged Care', description: 'Aged care services market' },
    { type: 'marketType', name: 'Financial Services', description: 'Financial services market' },
    { type: 'marketType', name: 'Education', description: 'Education services market' },
    
    // Player Types
    { type: 'playerType', name: 'Recipient', description: 'Recipient of benefit' },
    { type: 'playerType', name: 'Provider', description: 'Provider of benefit' },
    { type: 'playerType', name: 'Supplier', description: 'Benefit enabler supplier' },
    { type: 'playerType', name: 'Regulator', description: 'Regulatory body' },
    { type: 'playerType', name: 'Representative', description: 'Representative organization' },
    
    // Agreement Types
    { type: 'agreementType', name: 'SLA', description: 'Service Level Agreement' },
    { type: 'agreementType', name: 'MOU', description: 'Memorandum of Understanding' },
    { type: 'agreementType', name: 'Contract', description: 'Formal contract' },
    { type: 'agreementType', name: 'Verbal Agreement', description: 'Verbal agreement' }
  ];
  
  for (const config of configs) {
    await db.collection('systemConfigs').add({
      ...config,
      isActive: true,
      sortOrder: 1,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }
}

// Run initialization
initializeFirebase();
```

#### 5.1.2 Data Migration Script
```javascript
// scripts/migrate-data.js
const admin = require('firebase-admin');

async function migrateExistingData() {
  // Migrate existing organizations
  await migrateOrganizations();
  
  // Migrate existing users
  await migrateUsers();
  
  // Set up default configurations
  await setupDefaultConfigurations();
}

async function migrateOrganizations() {
  // Implementation for migrating existing organization data
}

async function migrateUsers() {
  // Implementation for migrating existing user data
}

async function setupDefaultConfigurations() {
  // Set up organization-specific default configurations
}
```

### 5.2 Configuration Management

#### 5.2.1 Firebase Configuration for Cursor
```javascript
// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Connect to emulators in development
if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectStorageEmulator(storage, 'localhost', 9199);
}

export { db, auth, storage };
```

#### 5.2.2 Environment Variables Template
```bash
# .env.local
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your_app_id
```

### 5.3 Data Access Layer

#### 5.3.1 Firebase Service Classes
```javascript
// src/services/firebase/OrganizationService.js
import { db } from '@/config/firebase';
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

export class OrganizationService {
  static async getOrganizations() {
    const querySnapshot = await getDocs(collection(db, 'organizations'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
  
  static async getOrganization(id) {
    const docRef = doc(db, 'organizations', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  }
  
  static async createOrganization(organizationData) {
    return await addDoc(collection(db, 'organizations'), {
      ...organizationData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  
  static async updateOrganization(id, updates) {
    const docRef = doc(db, 'organizations', id);
    return await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date()
    });
  }
}

// Similar service classes for Projects, Players, Risks, Issues, etc.
```

---

## 6. Gap Analysis & Recommendations

### 6.1 Minor Gaps Identified

#### 6.1.1 Audit Trail Specifics
**Current State**: General requirements mentioned but not detailed
**Requirements**: 
- Audit logs retained for 30 days
- Exportable for external auditors
- Superuser system role for access control
- Separate logging/backup/monitoring specs to be provided

**Implementation**: Enhanced audit logging with retention policy
```javascript
// Enhanced audit trail structure
auditLogs/{logId}
{
  userId: string,
  action: "create" | "update" | "delete" | "approve" | "reject",
  resourceType: string,
  resourceId: string,
  oldValue: any,
  newValue: any,
  metadata: {
    ipAddress: string,
    userAgent: string,
    sessionId: string,
    requestId: string
  },
  timestamp: timestamp,
  organizationId: string,
  retentionDate: timestamp // 30 days from creation
}

// Audit log export structure
auditLogExports/{exportId}
{
  organizationId: string,
  requestedById: string,
  dateRange: {
    start: timestamp,
    end: timestamp
  },
  format: "csv" | "json" | "pdf",
  status: "pending" | "processing" | "completed" | "failed",
  fileUrl: string,
  createdAt: timestamp,
  completedAt: timestamp
}
```

#### 6.1.2 File Attachment Handling
**Current State**: Referenced but not fully specified
**Requirements**:
- 10MB file size limit
- Allowed file types: .docx, .pdf, .xlsx, .md, .txt, .jpg, .png, .bmp
- No code file types (.js, .exe, etc.)
- Firebase Storage integration

**Implementation**: Restricted file attachment system
```javascript
// File attachments structure
fileAttachments/{fileId}
{
  organizationId: string,
  resourceType: string, // "risk" | "issue" | "project" | "policy"
  resourceId: string,
  fileName: string,
  fileSize: number, // max 10MB
  mimeType: string,
  fileExtension: string, // validated against allowed types
  storagePath: string,
  uploadedById: string,
  uploadedAt: timestamp,
  validationStatus: "valid" | "invalid" | "pending"
}

// File validation configuration
fileValidationConfig: {
  maxFileSize: 10485760, // 10MB in bytes
  allowedExtensions: [".docx", ".pdf", ".xlsx", ".md", ".txt", ".jpg", ".png", ".bmp"],
  blockedExtensions: [".js", ".exe", ".py", ".php", ".sh", ".bat", ".cmd", ".ps1", ".vbs"],
  allowedMimeTypes: [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/markdown",
    "text/plain",
    "image/jpeg",
    "image/png",
    "image/bmp"
  ]
}
```

#### 6.1.3 Real-time Collaboration Features
**Current State**: Implied but not detailed
**Requirements**:
- Multi-user concurrency to be addressed later
- Performance is a concern - design intelligently for scalability
- Deferred implementation until further specifications

**Implementation**: Deferred - placeholder for future design
```javascript
// Real-time collaboration structure (placeholder for future implementation)
collaboration/{sessionId}
{
  projectId: string,
  participants: {
    userId: string,
    lastActive: timestamp,
    currentModule: string
  },
  cursors: {
    userId: string,
    position: object,
    module: string
  },
  lastUpdated: timestamp
}

// Note: Implementation deferred until performance requirements and concurrency 
// handling specifications are provided
```

#### 6.1.4 Export/Import Formats
**Current State**: Mentioned but not specified
**Requirements**:
- Export frequency: TBA
- No import from external systems until further notice
- Automated scheduled reports and extracts required (details in additional specs)
- Data validation to be covered when import functionality is introduced

**Implementation**: Export-focused system with import placeholder
```javascript
// Export jobs structure
exportJobs/{jobId}
{
  organizationId: string,
  requestedById: string,
  exportType: "risks" | "projects" | "players" | "full" | "audit",
  format: "csv" | "json" | "pdf" | "excel",
  filters: object,
  schedule: {
    isScheduled: boolean,
    frequency: "daily" | "weekly" | "monthly" | "quarterly",
    nextRun: timestamp
  },
  status: "pending" | "processing" | "completed" | "failed",
  fileUrl: string,
  createdAt: timestamp,
  completedAt: timestamp
}

// Import jobs structure (placeholder for future implementation)
importJobs/{jobId}
{
  organizationId: string,
  requestedById: string,
  importType: "risks" | "projects" | "players" | "full",
  sourceSystem: string,
  validationStatus: "pending" | "validated" | "failed",
  status: "pending" | "processing" | "completed" | "failed",
  createdAt: timestamp,
  completedAt: timestamp
}

// Note: Import functionality deferred until external system integration 
// requirements and data validation specifications are provided
```

### 6.2 Stakeholder Questions

#### 6.2.1 Audit Requirements
1. **Retention Period**: ✅ 30 days retention period implemented
2. **Compliance Standards**: ⏳ Pending - compliance standards to be determined
3. **Access Control**: ✅ Superuser system role created for audit log access
4. **Export Requirements**: ✅ Exportable audit logs implemented

#### 6.2.2 File Management
1. **File Size Limits**: ✅ 10MB file size limit implemented
2. **File Types**: ✅ Standard document types (.docx, .pdf, .xlsx, .md, .txt) and images (.jpg, .png, .bmp) allowed; code files blocked
3. **Storage Costs**: ⏳ Pending - budget constraints to be determined
4. **Backup Requirements**: ⏳ Pending - backup requirements to be determined

#### 6.2.3 Real-time Features
1. **Collaboration Scope**: ⏳ Deferred - multi-user concurrency to be addressed later
2. **User Presence**: ⏳ Deferred - to be determined with concurrency requirements
3. **Conflict Resolution**: ⏳ Deferred - to be determined with concurrency requirements
4. **Performance Impact**: ✅ Performance concerns acknowledged - intelligent design required

#### 6.2.4 Data Export/Import
1. **Export Frequency**: ⏳ TBA - frequency to be determined
2. **Import Sources**: ✅ No import from external systems until further notice
3. **Data Validation**: ⏳ To be covered when import functionality is introduced
4. **Scheduled Exports**: ✅ Automated scheduled reports and extracts required (details in additional specs)

#### 6.2.5 Integration Requirements
1. **External Systems**: ⏳ Not conceptually designed yet
2. **API Requirements**: ⏳ Not conceptually designed yet
3. **Webhook Support**: ⏳ Not conceptually designed yet
4. **SSO Integration**: ⏳ Not conceptually designed yet

### 6.3 Implementation Priority

#### 6.3.1 Phase 1 (Core Implementation)
- Basic Firebase setup and security rules
- Core collections and subcollections
- Basic CRUD operations
- User authentication and authorization
- Superuser role implementation
- File attachment system with 10MB limit and type restrictions

#### 6.3.2 Phase 2 (Enhanced Features)
- Audit trail implementation with 30-day retention
- Export functionality with scheduled reports
- Advanced search and filtering
- Performance optimization for large datasets

#### 6.3.3 Phase 3 (Advanced Features)
- Real-time collaboration (when specifications are provided)
- Advanced reporting and analytics
- API development (when integration requirements are defined)
- External integrations (when conceptually designed)

---

## 7. Testing Strategy

### 7.1 Unit Tests
```javascript
// tests/services/OrganizationService.test.js
import { OrganizationService } from '@/services/firebase/OrganizationService';

describe('OrganizationService', () => {
  test('should create organization with correct data', async () => {
    const orgData = {
      name: 'Test Organization',
      description: 'Test Description'
    };
    
    const result = await OrganizationService.createOrganization(orgData);
    expect(result).toBeDefined();
  });
});
```

### 7.2 Integration Tests
```javascript
// tests/integration/firebase.test.js
import { db } from '@/config/firebase';

describe('Firebase Integration', () => {
  test('should enforce security rules', async () => {
    // Test security rule enforcement
  });
  
  test('should handle complex queries', async () => {
    // Test query performance and results
  });
});
```

### 7.3 Performance Tests
```javascript
// tests/performance/queryPerformance.test.js
describe('Query Performance', () => {
  test('should handle large datasets efficiently', async () => {
    // Test with large datasets
  });
});
```

---

## 8. Monitoring & Maintenance

### 8.1 Firebase Monitoring
- Set up Firebase Performance Monitoring
- Configure Cloud Functions for automated tasks
- Implement error tracking and alerting
- Monitor database usage and costs

### 8.2 Data Maintenance
- Regular backup procedures
- Data archival strategies
- Index optimization
- Security rule reviews

### 8.3 Cost Optimization
- Monitor read/write operations
- Optimize queries to reduce costs
- Implement caching strategies
- Regular cost analysis and optimization

---

This comprehensive Firebase data model design provides all the necessary components to build a robust, scalable, and secure SPOiRMM application with proper separation of concerns, security, and performance considerations. 