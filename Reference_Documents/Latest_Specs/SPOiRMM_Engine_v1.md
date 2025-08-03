# SPOiRMM Engine Spec

## Purpose
Backend logic controller for managing the lifecycle of SPOiRMM workflows.

## Responsibilities
- Enforce valid transitions across modules
- Check preconditions for workflow steps
- Handle project/module state updates
- Provide audit logging and notification triggering

## API Endpoints
- GET /workflow/:projectId
- POST /workflow/transition
- POST /workflow/notify

## Dependencies
- Project Planning, Issues List, Risk Register modules