
# Top Navigation Page Specification

## Page Name
Top_Navigation

## Purpose
Serves as the primary entry point into the risk management application, allowing users to navigate to core modules: Dashboard, Planning, Reports, and Admin/Settings.

---

## Logo Implementation

### Navigation Header Logo
- **File:** `SPOiRMM Logo White Transparent_cr.png`
- **Location:** `src/assets/`
- **Component:** `src/components/Header/Header.tsx`
- **Size:** `h-16 w-auto` (64px height, auto width)
- **Positioning:** Left side of navigation header
- **Background:** Blue gradient (`from-sky-500 to-sky-600`)
- **Notes:** Cropped white transparent version for better visibility against blue background

### Login Page Logo
- **File:** `SPOiRMM Logo Transparent.png`
- **Location:** `src/assets/`
- **Component:** `src/components/Auth/LoginPage.tsx`
- **Size:** `w-auto max-w-[50%]` (50% of container width, auto height)
- **Positioning:** Centered above "Sign in to SPOiRMM" text
- **Background:** Light blue gradient (`from-blue-50 to-indigo-100`)
- **Notes:** Original transparent version, sized at 50% of container width

### Asset Management
- **Assets Directory:** `src/assets/`
- **TypeScript Declarations:** `src/types/images.d.ts`
- **Import Pattern:** `import logoImage from '../../assets/[filename]'`

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
- **Logo Implementation:** SPOiRMM logo prominently displayed in navigation header and login page

---

## Accessibility
- All buttons must meet WCAG 2.1 AA contrast standards
- Ensure buttons are focusable via Tab key
- Use semantic labels for assistive technology (e.g., `aria-label="Go to Dashboard"`)
- **Logo Accessibility:** All logos include proper `alt` text for screen readers

---

## Component Summary

| Component       | Type   | Props                                |
|----------------|--------|--------------------------------------|
| Navigation Btns| Button | label, navigateTo, colorScheme       |
| Heading        | Text   | "Main Navigation", style="h1"        |
| Return Btns    | Button | label="Back to Main Menu"            |
| Header Logo    | Image  | src, alt="SPOiRMM Logo", className   |
| Login Logo     | Image  | src, alt="SPOiRMM Logo", className   |

---

## Technical Implementation Notes

### Logo Files
- `SPOiRMM Logo Transparent.png` - Original transparent logo (176KB)
- `SPOiRMM Logo White Transparent.png` - White transparent version (214KB)
- `SPOiRMM Logo White Transparent_cr.png` - Cropped white transparent version (202KB)

### Development Requirements
- Server restart required when adding new logo files
- TypeScript declarations needed for image imports
- Vite handles asset optimization and serving

---
