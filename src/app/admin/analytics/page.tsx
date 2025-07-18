'use client';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import SalesChart from '@/components/dashboard/SalesChart';
import { AnalyticsTable } from '@/components/dashboard/AnalyticsTable';

export default function AnalyticsPage() {
  return (
    <div className='p-6 space-y-6'>
      <SalesChart />
      <SummaryCards />
      <AnalyticsTable />
    </div>
  );
}
