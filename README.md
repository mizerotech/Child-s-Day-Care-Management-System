<<<<<<< HEAD
# Little Stars — Child Daycare Management System

## Setup

```bash
cd daycare-app
npm install
npm run dev
```

Then open http://localhost:5173

## Stack
- React 18 + Vite
- Material UI v5 + MUI X DataGrid
- React Router v6
- Recharts
- Sass (SCSS)

## Features

### Authentication
- Landing page with modern UI
- Login/Signup with validation
- Protected routes (redirect to login if not authenticated)
- Persistent sessions via localStorage
- User profile menu with logout

### Dashboard
- 4 stat cards showing key metrics
- Bar chart (weekly attendance)
- Line chart (attendance trends)
- Pie chart (group distribution)

### Children Module
- DataGrid with sorting, filtering, pagination
- Add/Edit/View/Delete operations
- Image upload with preview (JPG/PNG, max 2MB)
- Full validation (name, age, email, phone, etc.)
- View dialog with complete profile

### Staff Module
- DataGrid with full CRUD
- Role and group management
- Status tracking (Active/On Leave)
- Form validation

### Attendance
- Quick check-in/out panel for all children
- Duplicate prevention (can't check in twice)
- Timestamp recording
- Attendance logs with DataGrid

### Activities
- Card-based grid view
- Add/Edit/Delete activities
- Group and schedule management

### Parents Portal
- Child selector dropdown
- Tabs: Attendance / Activities / Meals
- View child-specific data

### Theme
- Dark/Light mode toggle
- Persistent via localStorage
- Available in header and sidebar

## Routes

**Public:**
- `/` → Landing page
- `/login` → Login
- `/signup` → Signup

**Protected (requires login):**
- `/dashboard` → Dashboard
- `/children` → Children management
- `/staff` → Staff management
- `/activities` → Activities
- `/attendance` → Attendance tracking
- `/parents` → Parents portal

## Test Credentials
Use any email/password to login (simulated auth)
=======
# Child-s-Day-Care-Management-System
Full Child Day Care Management System built with React.js, Material UI, SCSS, React Router, and Recharts. Includes authentication, attendance tracking, dashboards, and parent portal.
>>>>>>> da02d92a6d952c7759eb5e7909cd1041e96def1f
