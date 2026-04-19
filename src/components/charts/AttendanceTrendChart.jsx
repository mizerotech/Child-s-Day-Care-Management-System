import React from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart
} from 'recharts'
import { useTheme } from '@mui/material'
import { attendanceTrends } from '../../data/mockData'

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
      <p style={{ fontWeight: 700, marginBottom: 4, color: theme.palette.text.primary }}>{label}</p>
      <p style={{ color: '#6C63FF' }}>Rate: <strong>{payload[0]?.value}%</strong></p>
    </div>
  )
}

export default function AttendanceTrendChart() {
  const theme = useTheme()

  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={attendanceTrends} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
        <defs>
          <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#6C63FF" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
        <XAxis
          dataKey="week"
          tick={{ fill: theme.palette.text.secondary, fontSize: 12, fontWeight: 500 }}
          axisLine={false} tickLine={false}
        />
        <YAxis
          domain={[60, 100]}
          tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
          axisLine={false} tickLine={false}
          tickFormatter={v => `${v}%`}
        />
        <Tooltip content={<CustomTooltip theme={theme} />} cursor={{ stroke: 'rgba(108,99,255,0.2)', strokeWidth: 2 }} />
        <ReferenceLine
          y={85} stroke="#F59E0B" strokeDasharray="5 4" strokeWidth={1.5}
          label={{ value: 'Target 85%', fill: '#F59E0B', fontSize: 11, fontWeight: 600, position: 'insideTopRight' }}
        />
        <Area
          type="monotone" dataKey="rate"
          stroke="#6C63FF" strokeWidth={2.5}
          fill="url(#trendGrad)"
          dot={{ r: 4, fill: '#6C63FF', strokeWidth: 2, stroke: '#fff' }}
          activeDot={{ r: 6, fill: '#6C63FF', stroke: '#fff', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
