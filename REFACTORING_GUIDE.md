# SCSS Refactoring Guide

## ✅ Completed Files
- Login.jsx
- Signup.jsx
- StatCard.jsx
- ConfirmDialog.jsx
- Children.jsx
- ChildActions.jsx
- ChildForm.jsx
- ChildViewDialog.jsx
- Staff.jsx
- StaffForm.jsx

## 🔄 Remaining Files to Refactor

### Pattern to Follow

**Step 1:** Add import at top
```jsx
import '../../styles/global.scss'
```

**Step 2:** Replace `sx` props with `className`

### Activities.jsx
Replace:
- `sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}` → `className="activity-card"`
- `sx={{ flex: 1 }}` → `className="activity-content"`
- `sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}` → `className="activity-header"`
- `sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1.5 }}` → `className="activity-time"`
- `sx={{ px: 2, pb: 1.5 }}` → `className="activity-actions"`
- `sx={{ pt: 1 }}` → `className="activity-form-content"`
- `sx={{ px: 3, pb: 2 }}` → `className="activity-form-actions"`

### Attendance.jsx
Replace:
- `sx={{ mb: 3 }}` → `className="attendance-title"`
- `sx={{ mb: 3 }}` on Card → `className="quick-checkin-card"`
- `sx={{ mb: 2 }}` on title → `className="checkin-title"`
- `sx={{ p: 1.5, border: '1px solid', ... }}` → `className="checkin-item"`
- `sx={{ display: 'flex', gap: 0.5 }}` → `className="checkin-buttons"`
- `sx={{ minWidth: 0, px: 1, fontSize: 11 }}` → `className="checkin-button"`
- `sx={{ mb: 1.5 }}` on logs title → `className="logs-title"`
- `sx={{ height: 400 }}` → `className="datagrid-container attendance-grid"`

### ParentsPortal.jsx
Replace:
- `sx={{ mb: 3 }}` on title → `className="portal-title"`
- `sx={{ mb: 3 }}` on Card → `className="child-selector-card"`
- `sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}` → `className="selector-content"`
- `sx={{ bgcolor: 'primary.main', width: 52, height: 52 }}` → `className="selector-avatar"`
- `sx={{ flex: 1, minWidth: 200 }}` → `className="selector-dropdown"`
- `sx={{ minWidth: 200, mt: 0.5 }}` → `className="dropdown-field"`
- `sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}` → `className="child-chips"`
- `sx={{ mb: 1 }}` on Tabs → `className="portal-tabs"`
- `sx={{ pt: 2 }}` in TabPanel → `className="tab-panel"`
- `sx={{ borderRadius: 3 }}` on TableContainer → `className="portal-table"`
- `sx={{ mt: 1, display: 'flex', gap: 1 }}` → `className="activity-chips"`

### Dashboard.jsx
Already uses SCSS via pages.scss - just add import:
```jsx
import '../../styles/global.scss'
```

### Landing.jsx
Replace all `sx` props with classes:
- Main container → `className="landing-page"`
- Navbar → `className="landing-navbar"`
- Logo section → `className="navbar-logo"`
- Actions → `className="navbar-actions"`
- Hero section → `className="landing-hero"`
- Title → `className="hero-title"`
- Subtitle → `className="hero-subtitle"`
- Buttons → `className="hero-actions"`
- Image box → `className="hero-image"`
- Features section → `className="landing-features"`
- CTA section → `className="landing-cta"`
- Footer → `className="landing-footer"`

### Header.jsx
Replace:
- `sx={{ width: { md: ... }, bgcolor: ..., borderBottom: ... }}` → Remove, use MUI defaults
- `sx={{ gap: 1 }}` on Toolbar → `className="header-toolbar"`
- `sx={{ display: { md: 'none' } }}` → Keep (responsive utility)
- `sx={{ flex: 1 }}` → `className="header-title"`
- `sx={{ display: 'flex', alignItems: 'center', gap: 1 }}` → `className="header-actions"`
- `sx={{ display: { xs: 'none', sm: 'block' } }}` → `className="user-info"`
- `sx={{ bgcolor: 'primary.main', width: 36, height: 36, fontSize: 14 }}` → `className="user-avatar"`
- `sx={{ px: 2, py: 1 }}` → `className="menu-header"`
- `sx={{ mr: 1 }}` → `className="menu-item-icon"`

### Sidebar.jsx
Replace:
- `sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}` → `className="sidebar-content"`
- `sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}` → `className="sidebar-logo"`
- `sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}` → `className="logo-avatar"`
- `sx={{ flex: 1, px: 1.5, pt: 1 }}` → `className="sidebar-nav"`
- `sx={{ mb: 0.5 }}` → `className="nav-item"`
- `sx={{ borderRadius: 2, bgcolor: ..., color: ... }}` → `className="nav-button"` + conditional `active`
- `sx={{ color: ..., minWidth: 40 }}` → `className="nav-icon"`
- `sx={{ fontWeight: ..., fontSize: 14 }}` → `className="nav-text"`
- `sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}` → `className="sidebar-footer"`

## Quick Replace Commands

For each file, follow this pattern:

1. Add import: `import '../../styles/global.scss'`
2. Find all `sx={` and replace with appropriate `className=`
3. Use classes from `styles/components.scss`
4. Keep responsive utilities like `display: { xs: 'none', md: 'block' }` if needed

## Testing

After refactoring each file:
1. Check the browser for visual regressions
2. Ensure all spacing and layout matches original
3. Test responsive behavior
4. Verify dark/light mode still works

## Notes

- Some MUI responsive utilities (`sx={{ display: { xs: 'none', md: 'block' } }}`) can stay as they're hard to replicate in pure SCSS
- Color values from theme (like `bgcolor: 'primary.main'`) should use inline `style` prop or CSS variables
- All structural layout (flex, grid, spacing) must be in SCSS
