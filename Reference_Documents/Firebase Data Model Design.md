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

// Validate required environment variables
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Connect to emulators in development
if (process.env.NODE_ENV === 'development') {
  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectStorageEmulator(storage, 'localhost', 9199);
    console.log('Connected to Firebase emulators');
  } catch (error) {
    console.log('Firebase emulators not running, using production Firebase');
  }
}

export { db, auth, storage };
```

#### 5.2.2 Environment Variables Template
```bash
# .env.local
VITE_FIREBASE_API_KEY=AIzaSyDFMm6CpAYcKECrK_AArNu3scEoPbSRYyc
VITE_FIREBASE_AUTH_DOMAIN=spoirmm.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=spoirmm
VITE_FIREBASE_STORAGE_BUCKET=spoirmm.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=622607729589
VITE_FIREBASE_APP_ID=1:622607729589:web:c8ef4216c5aa2bcf8acffc
```

#### 5.2.3 Environment Variables for Vercel Deployment
```bash
# Set these in Vercel Dashboard → Settings → Environment Variables
VITE_FIREBASE_API_KEY=AIzaSyDFMm6CpAYcKECrK_AArNu3scEoPbSRYyc
VITE_FIREBASE_AUTH_DOMAIN=spoirmm.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=spoirmm
VITE_FIREBASE_STORAGE_BUCKET=spoirmm.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=622607729589
VITE_FIREBASE_APP_ID=1:622607729589:web:c8ef4216c5aa2bcf8acffc
```

#### 5.2.4 Security Configuration
- Environment variables are stored in `.env.local` (ignored by git)
- Vercel deployment uses dashboard environment variables
- `vercel-env-setup.md` contains setup instructions (ignored by git and Vercel)
- Environment variable validation implemented in Firebase config

#### 5.2.5 Primary Admin User Setup
**Admin User Configuration:**
- **Email:** spoirmmitc2@gmail.com
- **Firebase Auth UID:** inUB6cwPmZTU49DZe949eLnT7wo1
- **Role:** Primary admin user with full permissions
- **Status:** ✅ Firebase Auth user created and Firestore document synchronized
- **Access Level:** Full administrative privileges

**Firestore User Document:**
```javascript
users/inUB6cwPmZTU49DZe949eLnT7wo1
{
  uid: "inUB6cwPmZTU49DZe949eLnT7wo1",
  email: "spoirmmitc2@gmail.com",
  displayName: "SPOiRMM Admin",
  organizationId: null, // Superuser can access all organizations
  role: "admin",
  permissions: {
    canAccessAllOrganizations: true,
    canExportAuditLogs: true,
    canManageSystemConfig: true,
    canManageUsers: true,
    canManageProjects: true,
    canManageIssues: true,
    canManageRisks: true
  },
  createdAt: timestamp,
  updatedAt: timestamp,
  status: "active"
}
```

**Notes:**
- ✅ Firebase Auth UID matches Firestore document ID
- ✅ Admin role and permissions configured
- ✅ Security rules properly enforce admin access
- ✅ Ready for authentication testing
- Consider upgrading to `superuser` role for system-wide access if needed

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

## 7. Complete Setup Process

### 7.1 Prerequisites
- Node.js installed (v16 or higher)
- Firebase CLI installed globally (`npm install -g firebase-tools`)
- Firebase project created in Firebase Console
- Git repository initialized

### 7.2 Step-by-Step Setup Process

#### 7.2.1 Install Dependencies
```bash
# Install Firebase packages
npm install firebase firebase-admin dotenv

# Verify Firebase CLI
firebase --version
```

#### 7.2.2 Environment Configuration
```bash
# Create environment files
echo "VITE_FIREBASE_API_KEY=AIzaSyDFMm6CpAYcKECrK_AArNu3scEoPbSRYyc" > .env.local
echo "VITE_FIREBASE_AUTH_DOMAIN=spoirmm.firebaseapp.com" >> .env.local
echo "VITE_FIREBASE_PROJECT_ID=spoirmm" >> .env.local
echo "VITE_FIREBASE_STORAGE_BUCKET=spoirmm.firebasestorage.app" >> .env.local
echo "VITE_FIREBASE_MESSAGING_SENDER_ID=622607729589" >> .env.local
echo "VITE_FIREBASE_APP_ID=1:622607729589:web:c8ef4216c5aa2bcf8acffc" >> .env.local

# Create .env.example template
cp .env.local .env.example
# Edit .env.example to remove actual values
```

#### 7.2.3 Firebase Configuration Files
```bash
# Create firebase.json
echo '{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "storage": {
    "rules": "storage.rules"
  },
  "emulators": {
    "auth": {
      "port": 9099
    },
    "firestore": {
      "port": 8080
    },
    "storage": {
      "port": 9199
    },
    "ui": {
      "enabled": true,
      "port": 4000
    }
  }
}' > firebase.json

# Create .firebaserc
echo '{
  "projects": {
    "default": "spoirmm"
  }
}' > .firebaserc
```

#### 7.2.4 Security Rules Setup
```bash
# Create firestore.rules (see section 3.1 for content)
# Create storage.rules (see section 3.2 for content)
# Create firestore.indexes.json (see section 4 for content)
```

#### 7.2.5 Firebase Configuration in App
```bash
# Create src/config/firebase.js (see section 5.2.1 for content)
mkdir -p src/config
# Add firebase.js with environment variable validation
```

#### 7.2.6 Admin User Setup
```bash
# 1. Create Firebase Auth user in Firebase Console
#    - Go to Authentication → Users → Add User
#    - Email: spoirmmitc2@gmail.com
#    - Password: [secure password]
#    - Note the generated UID

# 2. Create Firestore user document with matching UID
#    - Document ID must match Firebase Auth UID
#    - Set admin role and permissions
#    - Ensure security rules allow access
```

#### 7.2.7 Security Configuration
```bash
# Update .gitignore
echo ".env.local" >> .gitignore
echo ".env.example" >> .gitignore
echo "firebase-service-account.json" >> .gitignore
echo ".firebase/" >> .gitignore
echo "firebase-debug.log" >> .gitignore

# Create .vercelignore
echo ".env*" >> .vercelignore
echo ".firebase/" >> .vercelignore
echo "firebase-debug.log*" >> .vercelignore
echo "node_modules/" >> .vercelignore
echo "Reference_Documents/" >> .vercelignore
```

#### 7.2.8 Vercel Deployment Setup
```bash
# Create vercel-env-setup.md with deployment instructions
# Add environment variables to Vercel Dashboard:
# - VITE_FIREBASE_API_KEY
# - VITE_FIREBASE_AUTH_DOMAIN
# - VITE_FIREBASE_PROJECT_ID
# - VITE_FIREBASE_STORAGE_BUCKET
# - VITE_FIREBASE_MESSAGING_SENDER_ID
# - VITE_FIREBASE_APP_ID
```

### 7.3 Verification Steps
```bash
# 1. Test Firebase connection
npm run dev
# Check console for Firebase initialization messages

# 2. Test admin user authentication
# Use Firebase Auth in app to sign in with admin credentials

# 3. Test security rules
# Attempt to read/write data with different user roles

# 4. Test environment variables
# Verify all environment variables are loaded correctly
```

### 7.4 Troubleshooting Common Issues

#### 7.4.1 Java Not Found (Firebase Emulators)
```bash
# Install Java Runtime Environment (JRE)
# Windows: Download from Oracle or use Chocolatey
# macOS: brew install openjdk
# Linux: sudo apt-get install openjdk-11-jre
```

#### 7.4.2 Environment Variables Not Loading
```bash
# Check .env.local exists and has correct format
# Verify VITE_ prefix for client-side variables
# Restart development server after changes
```

#### 7.4.3 Firebase Auth UID Mismatch
```bash
# Ensure Firestore document ID matches Firebase Auth UID
# Update user document if UID was generated differently
# Verify security rules allow access with correct UID
```

---

## 8. Testing Strategy

### 8.1 Unit Tests
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

### 8.2 Integration Tests
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

### 8.3 Performance Tests
```javascript
// tests/performance/queryPerformance.test.js
describe('Query Performance', () => {
  test('should handle large datasets efficiently', async () => {
    // Test with large datasets
  });
});
```

---

## 9. Project File Structure

### 9.1 Firebase Configuration Files
```
SPOiRMM_Application/
├── firebase.json                 # Firebase project configuration
├── .firebaserc                   # Firebase project association
├── firestore.rules               # Firestore security rules
├── firestore.indexes.json        # Firestore indexes configuration
├── storage.rules                 # Firebase Storage security rules
├── .env.local                    # Local environment variables (ignored by git)
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules (includes Firebase files)
├── .vercelignore                 # Vercel ignore rules
├── vercel-env-setup.md           # Vercel deployment instructions (ignored)
└── firebase-auth-setup-guide.md  # Firebase Auth user setup guide
```

### 9.2 Application Configuration
```
SPOiRMM_Application/
├── src/
│   └── config/
│       └── firebase.js           # Firebase client configuration
├── package.json                  # Dependencies: firebase, firebase-admin, dotenv
└── package-lock.json
```

### 9.3 Security and Environment Files
```
# .env.local (not in git)
VITE_FIREBASE_API_KEY=AIzaSyDFMm6CpAYcKECrK_AArNu3scEoPbSRYyc
VITE_FIREBASE_AUTH_DOMAIN=spoirmm.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=spoirmm
VITE_FIREBASE_STORAGE_BUCKET=spoirmm.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=622607729589
VITE_FIREBASE_APP_ID=1:622607729589:web:c8ef4216c5aa2bcf8acffc

# .gitignore additions
.env.local
.env.example
firebase-service-account.json
.firebase/
firebase-debug.log*
vercel-env-setup.md

# .vercelignore
.env*
.firebase/
firebase-debug.log*
node_modules/
Reference_Documents/
```

### 9.4 Firebase Project Details
- **Project ID:** spoirmm
- **Project Name:** SPOiRMM Risk Management Application
- **Region:** Default (us-central1)
- **Services Enabled:** Firestore, Authentication, Storage
- **Admin User:** spoirmmitc2@gmail.com (UID: inUB6cwPmZTU49DZe949eLnT7wo1)

---

## 10. Monitoring & Maintenance

### 10.1 Firebase Monitoring
- Set up Firebase Performance Monitoring
- Configure Cloud Functions for automated tasks
- Implement error tracking and alerting
- Monitor database usage and costs

### 10.2 Cloud Functions Deployment

#### Required Cloud Functions for User Management

**Function: `deleteUserCompletely`**
- **Type:** HTTPS Callable Function
- **Purpose:** Deletes user from both Firestore and Firebase Authentication
- **Security:** Only accessible by users with 'Admin' role
- **Features:**
  - Prevents self-deletion
  - Deletes from Firestore `users` collection
  - Deletes from Firebase Authentication
  - Logs action to `auditLogs` collection
  - Includes error handling and fallback mechanisms

**Function: `onUserDocumentDeleted`**
- **Type:** Firestore Trigger Function
- **Purpose:** Automatically attempts to delete Firebase Auth user when Firestore document is deleted
- **Trigger:** Fires when document is deleted from `users` collection
- **Features:**
  - Attempts to delete corresponding Firebase Auth user
  - Logs success/failure to `auditLogs` collection
  - Provides backup deletion mechanism

#### Deployment Requirements
- **Node.js Version:** 18+
- **Firebase CLI:** Latest version
- **Dependencies:** `firebase-admin`, `firebase-functions`
- **Build Process:** TypeScript compilation required
- **Deployment Command:** `firebase deploy --only functions`

#### Current Status
- **Functions Created:** ✅ (in `functions/src/index.ts`)
- **Functions Deployed:** ❌ (deployment blocked by TypeScript compilation issues)
- **Workaround:** User deletion currently only removes from Firestore
- **Manual Cleanup:** Firebase Auth users must be deleted manually via Firebase Console

#### Deployment Steps (When Ready)
1. Navigate to `functions` directory
2. Run `npm install` to install dependencies
3. Run `npm run build` to compile TypeScript
4. Run `firebase deploy --only functions` to deploy
5. Verify functions are accessible in Firebase Console

### 10.3 Data Maintenance
- Regular backup procedures
- Data archival strategies
- Index optimization
- Security rule reviews

### 10.4 Cost Optimization
- Monitor read/write operations
- Optimize queries to reduce costs
- Implement caching strategies
- Regular cost analysis and optimization

---

---

## 11. Complete System Reproducibility Checklist

### 11.1 Prerequisites Verification
- [ ] Node.js v16+ installed
- [ ] Firebase CLI installed (`npm install -g firebase-tools`)
- [ ] Firebase project created in console (spoirmm)
- [ ] Git repository initialized
- [ ] Java Runtime Environment (for emulators)

### 11.2 Dependencies Installation
```bash
npm install firebase firebase-admin dotenv
```

### 11.3 Configuration Files Required
- [ ] `firebase.json` - Project configuration
- [ ] `.firebaserc` - Project association
- [ ] `firestore.rules` - Security rules
- [ ] `storage.rules` - Storage security rules
- [ ] `firestore.indexes.json` - Database indexes
- [ ] `src/config/firebase.js` - Client configuration
- [ ] `.env.local` - Environment variables
- [ ] `.env.example` - Environment template
- [ ] `.gitignore` - Git ignore rules
- [ ] `.vercelignore` - Vercel ignore rules

### 11.4 Environment Variables Required
```bash
VITE_FIREBASE_API_KEY=AIzaSyDFMm6CpAYcKECrK_AArNu3scEoPbSRYyc
VITE_FIREBASE_AUTH_DOMAIN=spoirmm.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=spoirmm
VITE_FIREBASE_STORAGE_BUCKET=spoirmm.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=622607729589
VITE_FIREBASE_APP_ID=1:622607729589:web:c8ef4216c5aa2bcf8acffc
```

### 11.5 Admin User Configuration
- **Email:** spoirmmitc2@gmail.com
- **Firebase Auth UID:** inUB6cwPmZTU49DZe949eLnT7wo1
- **Role:** admin
- **Permissions:** Full administrative access
- **Status:** Active

### 11.6 Security Configuration
- [ ] Firestore security rules implemented
- [ ] Storage security rules implemented
- [ ] Environment variables secured
- [ ] Git ignore rules configured
- [ ] Vercel ignore rules configured

### 11.7 Verification Steps
- [ ] Firebase connection test
- [ ] Admin user authentication test
- [ ] Security rules enforcement test
- [ ] Environment variables loading test
- [ ] Vercel deployment configuration test

### 11.8 Troubleshooting Resources
- Firebase Auth setup guide: `firebase-auth-setup-guide.md`
- Vercel deployment guide: `vercel-env-setup.md`
- Common issues documented in section 7.4

---

This comprehensive Firebase data model design provides all the necessary components to build a robust, scalable, and secure SPOiRMM application with proper separation of concerns, security, and performance considerations. The complete setup process is documented and reproducible from scratch. 