
# Top Navigation Page Specification

## Page Name
Top_Navigation

## Purpose
Serves as the primary entry point into the risk management application, allowing users to navigate to core modules: Dashboard, Planning, Reports, and Admin/Settings.

---

## Navigation Options

### 1. Dashboard
- **Type:** Button
- **Label:** `Dashboard`
- **Destination:** Existing `Dashboard` page
- **Action:** Directs user to the previously built Dashboard view

### 2. Planning
- **Type:** Button
- **Label:** `Planning`
- **Destination:** Existing `Planning` page
- **Action:** Directs user to the Project Planning module

### 3. Reports
- **Type:** Button
- **Label:** `Reports`
- **Destination:** Placeholder `Reports_Page`
- **Action:** Navigates to a temporary page with a return button to Top_Navigation

### 4. Admin / Settings
- **Type:** Button
- **Label:** `Admin / Settings`
- **Destination:** Placeholder `Admin_Settings_Page`
- **Action:** Navigates to a temporary page with a return button to Top_Navigation

---

## Placeholder Pages

### Reports_Page

```jsx
<Page name="Reports_Page">
  <h1>Reports Module (Coming Soon)</h1>
  <Button label="Back to Main Menu" navigateTo="Top_Navigation" />
</Page>
```

---

### Admin_Settings_Page

```jsx
<Page name="Admin_Settings_Page">
  <h1>Admin / Settings Module (Coming Soon)</h1>
  <Button label="Back to Main Menu" navigateTo="Top_Navigation" />
</Page>
```

---

## UI Design Notes
- Use a 2x2 grid layout with soft borders and colored icons matching SPOiRMM role palette:
  - Blue (Dashboard)
  - Red (Planning)
  - Teal (Reports)
  - Yellow (Admin / Settings)
- Include a heading: `Main Navigation`
- Ensure all buttons are equally sized and accessible (keyboard + screen reader)

---

## Accessibility
- All buttons must meet WCAG 2.1 AA contrast standards
- Ensure buttons are focusable via Tab key
- Use semantic labels for assistive technology (e.g., `aria-label="Go to Dashboard"`)

---

## Component Summary

| Component       | Type   | Props                                |
|----------------|--------|--------------------------------------|
| Navigation Btns| Button | label, navigateTo, colorScheme       |
| Heading        | Text   | "Main Navigation", style="h1"        |
| Return Btns    | Button | label="Back to Main Menu"            |

---
