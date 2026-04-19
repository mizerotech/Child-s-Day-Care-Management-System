import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useTheme } from '@mui/material'
import { weeklyAttendance } from '../../data/mockData'

export default function WeeklyAttendanceChart() {
  const theme = useTheme()
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={weeklyAttendance} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
        <XAxis dataKey="day" tick={{ fill: theme.palette.text.secondary, fontSize: 13 }} />
        <YAxis tick={{ fill: theme.palette.text.secondary, fontSize: 13 }} />
        <Tooltip
          contentStyle={{ background: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 8 }}
        />
        <Legend />
        <Bar dataKey="present" name="Present" fill="#6C63FF" radius={[6, 6, 0, 0]} />
        <Bar dataKey="absent" name="Absent" fill="#FF6584" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
