import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import Landing from '../pages/Landing/Landing'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'
import Dashboard from '../pages/Dashboard/Dashboard'
import Children from '../pages/Children/Children'
import Staff from '../pages/Staff/Staff'
import Activities from '../pages/Activities/Activities'
import Attendance from '../pages/Attendance/Attendance'
import ParentsPortal from '../pages/ParentsPortal/ParentsPortal'

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="children" element={<Children />} />
        <Route path="staff" element={<Staff />} />
        <Route path="activities" element={<Activities />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="parents" element={<ParentsPortal />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
