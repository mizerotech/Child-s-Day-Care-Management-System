import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import Landing    from '../pages/Landing/Landing'
import Login      from '../pages/Login/Login'
import Signup     from '../pages/Signup/Signup'
import Dashboard  from '../pages/Dashboard/Dashboard'
import Children   from '../pages/Children/Children'
import Staff      from '../pages/Staff/Staff'
import Activities from '../pages/Activities/Activities'
import Attendance from '../pages/Attendance/Attendance'
import ParentsPortal from '../pages/ParentsPortal/ParentsPortal'
import { useAuth } from '../context/AuthContext'

function AuthRedirect() {
  const { isAuthenticated, homeRoute } = useAuth()
  return isAuthenticated ? <Navigate to={homeRoute} replace /> : <Navigate to="/login" replace />
}

export default function AppRouter() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/"        element={<Landing />} />
      <Route path="/login"   element={<Login />} />
      <Route path="/signup"  element={<Signup />} />

      {/* Protected — each route wrapped individually for role checks */}
      <Route path="/" element={<Layout />}>
        <Route path="dashboard"  element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="children"   element={<ProtectedRoute><Children /></ProtectedRoute>} />
        <Route path="staff"      element={<ProtectedRoute><Staff /></ProtectedRoute>} />
        <Route path="activities" element={<ProtectedRoute><Activities /></ProtectedRoute>} />
        <Route path="attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
        <Route path="parents"    element={<ProtectedRoute><ParentsPortal /></ProtectedRoute>} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<AuthRedirect />} />
    </Routes>
  )
}
