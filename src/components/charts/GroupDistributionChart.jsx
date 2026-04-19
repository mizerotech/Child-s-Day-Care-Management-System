import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useTheme, Box, Typography } from '@mui/material'
import { groupDistribution } from '../../data/mockData'

const COLORS = ['#6C63FF', '#FF6584', '#22C55E']

const CustomTooltip = ({ active, payload, theme }) => {
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
      <p style={{ fontWeight: 700, color: payload[0].payload.fill || COLORS[0] }}>
        {payload[0].name}
      </p>
      <p style={{ color: theme.palette.text.primary }}>
        Children: <strong>{payload[0].value}</strong>
      </p>
    </div>
  )
}

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
      fontSize={12} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default function GroupDistributionChart() {
  const theme = useTheme()
  const total = groupDistribution.reduce((s, d) => s + d.value, 0)

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={groupDistribution}
          cx="50%" cy="50%"
          innerRadius={55} outerRadius={90}
          paddingAngle={3}
          dataKey="value"
          labelLine={false}
          label={renderCustomLabel}
        >
          {groupDistribution.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip theme={theme} />} />
        <Legend
          iconType="circle" iconSize={8}
          wrapperStyle={{ fontSize: 12, fontWeight: 600, paddingTop: 8 }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
