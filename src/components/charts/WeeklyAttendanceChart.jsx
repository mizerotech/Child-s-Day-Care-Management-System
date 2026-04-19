import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts'
import { useTheme } from '@mui/material'
import { weeklyAttendance } from '../../data/mockData'

const CustomTooltip = ({ active, payload, label, theme }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 10,
      padding: '10px 14px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      fontSize: 13,
    }}>
      <p style={{ fontWeight: 700, marginBottom: 6, color: theme.palette.text.primary }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.fill, margin: '2px 0' }}>
          {p.name}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  )
}

export default function WeeklyAttendanceChart() {
  const theme = useTheme()

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={weeklyAttendance} margin={{ top: 5, right: 10, left: -10, bottom: 5 }} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
        <XAxis
          dataKey="day"
          tick={{ fill: theme.palette.text.secondary, fontSize: 12, fontWeight: 500 }}
          axisLine={false} tickLine={false}
        />
        <YAxis
          tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
          axisLine={false} tickLine={false}
        />
        <Tooltip content={<CustomTooltip theme={theme} />} cursor={{ fill: 'rgba(108,99,255,0.05)' }} />
        <Legend
          wrapperStyle={{ fontSize: 12, fontWeight: 600, paddingTop: 12 }}
          iconType="circle" iconSize={8}
        />
        <Bar dataKey="present" name="Present" fill="#6C63FF" radius={[6, 6, 0, 0]} maxBarSize={40} />
        <Bar dataKey="absent"  name="Absent"  fill="#FF6584" radius={[6, 6, 0, 0]} maxBarSize={40} />
      </BarChart>
    </ResponsiveContainer>
  )
}
