'use client';
import { SummaryCards } from '@/components/analytics/SummaryCards';
import SalesChart from '@/components/analytics/SalesChart';
import { AnalyticsTable } from '@/components/analytics/AnalyticsTable';

export default function AnalyticsPage() {
  return (
    <div className='p-6 space-y-6'>
      <SalesChart />
      <SummaryCards />
      <AnalyticsTable />
    </div>
  );
}
