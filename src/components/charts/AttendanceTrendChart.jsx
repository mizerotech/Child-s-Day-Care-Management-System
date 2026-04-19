import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { useTheme } from '@mui/material'
import { attendanceTrends } from '../../data/mockData'

export default function AttendanceTrendChart() {
  const theme = useTheme()
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={attendanceTrends} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
        <XAxis dataKey="week" tick={{ fill: theme.palette.text.secondary, fontSize: 13 }} />
        <YAxis domain={[60, 100]} tick={{ fill: theme.palette.text.secondary, fontSize: 13 }} unit="%" />
        <Tooltip
          formatter={v => [`${v}%`, 'Attendance Rate']}
          contentStyle={{ background: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 8 }}
        />
        <ReferenceLine y={85} stroke="#FF9F43" strokeDasharray="4 4" label={{ value: 'Target 85%', fill: '#FF9F43', fontSize: 12 }} />
        <Line type="monotone" dataKey="rate" stroke="#6C63FF" strokeWidth={3} dot={{ r: 5, fill: '#6C63FF' }} activeDot={{ r: 7 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
