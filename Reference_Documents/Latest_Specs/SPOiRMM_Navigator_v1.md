# SPOiRMM Navigator Spec

## Purpose
Frontend UI component that guides users visually through the risk planning workflow.

## Features
- Stage-by-stage navigation based on role and project state
- Shows status per module (color-coded)
- Displays reminders and blockers
- Links to valid modules only

## Placement
- Embedded in Welcome Page
- Optionally available in sidebar or top bar of each module

## Props
- projectId
- userRole
- moduleStatus (from Engine)