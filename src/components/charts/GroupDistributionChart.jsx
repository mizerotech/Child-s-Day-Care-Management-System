import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useTheme } from '@mui/material'
import { groupDistribution } from '../../data/mockData'

const COLORS = ['#6C63FF', '#FF6584', '#43D9AD']

export default function GroupDistributionChart() {
  const theme = useTheme()
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie data={groupDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
          {groupDistribution.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ background: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 8 }}
        />
        <Legend iconType="circle" />
      </PieChart>
    </ResponsiveContainer>
  )
}
