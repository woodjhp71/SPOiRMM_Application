
# Organization Page - Product Specification

## Overview
The **Organization Page** is a central workspace for managing shared enterprise-level data used across all projects within the SPOiRMM risk management application. It enables setup and governance of Players, Departments, Agreements, Policies, and Configuration settings.

## Purpose
Provide a centralized, role-based interface to configure reusable organizational entities that support multiple concurrent projects. Ensures standardization, traceability, and compliance.

---

## Modules

### 1. Org_Players Module
- **Function:** Create and maintain the master list of Players.
- **Fields:**
  - `Player Name` (Text, Mandatory)
  - `Player Type` (Dropdown)
  - `Player Role` (Dropdown - filtered by Type)
  - `Entity Nature` (Individual | Organization - filtered by Type)
  - `Notes` (Text, Optional)
- **Business Rules:**
  - Player Role and Entity Nature are conditionally validated based on Player Type.
  - Players cannot be deleted if linked to active projects.

### 2. Org_Departments Module
- **Function:** Define internal structure of the organization.
- **Fields:**
  - `Department Name` (Text, Mandatory)
  - `Level` (Dropdown: L1 - Decision-Making, L2 - Exchange, L3 - Satisfying)
  - `Associated Functions` (Text, Optional)
  - `Linked Cost Center` (Dropdown or Code)
- **Business Rules:**
  - Department list integrates with Internal Functions and Agreements Tools.

### 3. Org_Agreements Module
- **Function:** Maintain reusable contract templates and service-level expectations.
- **Fields:**
  - `Agreement Name` (Text)
  - `Provider` (Dropdown - from Players)
  - `Recipient` (Dropdown - from Players)
  - `Service Scope` (Text)
  - `Level` (Dropdown: Decision | Exchange | Satisfaction)
  - `Status` (Draft | Active | Retired)

### 4. Org_Policies Module
- **Function:** Manage governance rules and criteria.
- **Fields:**
  - `Policy Title`
  - `Purpose`
  - `Evaluation Criteria`
  - `Uploaded Documents`

### 5. Org_Settings Module
- **Function:** Configure core system parameters.
- **Fields:**
  - `Time Zone`
  - `Standards Used` (e.g., ISO 31000)
  - `Jurisdictional Scope`
  - `Default Risk Evaluation Matrix`

---

## Access Control
- Admin and Risk Plan Coordinators can access/edit.
- Project Managers can view.
- Projects pull data from Organization Page but cannot overwrite it.

## Navigation
- Accessible via **Welcome Page** as a top-level tile: "Organization Setup"
- Appears only to users with Admin or Coordinator roles.

---

## Integration
- Provides source data for: Players Chart, Internal Functions, Agreements, Risk Register, and Assessments.
- Ensures consistency across project planning modules.

---
