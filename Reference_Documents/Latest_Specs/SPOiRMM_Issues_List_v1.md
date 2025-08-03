# Issues List Module

## Purpose
Standalone module to capture and triage issues that may become risks.

## Features
- Raise new issues
- Classify by SPOiRMM Tool and Stakeholder
- Link to Project by ID
- Promote to Risk Register (if conditions met)

## Fields
- Issue Title, Description
- Project ID (mandatory)
- Source, Status (New | Reviewed | Promoted | Closed)
- Classification (Tool, Stakeholder, Type)
- Promoted to Risk? (Yes/No)

## Integration
- Linked to Project Planning via Project ID
- Workflow gate: active only when Project Planning is “In Progress”