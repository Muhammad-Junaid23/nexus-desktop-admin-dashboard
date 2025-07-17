'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', users: 120 },
  { name: 'Feb', users: 180 },
  { name: 'Mar', users: 220 },
  { name: 'Apr', users: 260 },
  { name: 'May', users: 310 },
  { name: 'Jun', users: 400 },
];

export default function AnalyticsPage() {
  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold text-gray-800'>Analytics Overview</h1>

      <div className='bg-white rounded-xl shadow-md p-6'>
        <h2 className='text-xl font-semibold mb-4'>Monthly Active Users</h2>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Line type='monotone' dataKey='users' stroke='#3b82f6' strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
