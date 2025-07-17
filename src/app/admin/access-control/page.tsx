'use client';

import Table from '@/components/ui/Table';

const dummyUsers = [
  { id: 1, name: 'Ali Khan', email: 'ali@example.com' },
  { id: 2, name: 'Sara Ahmed', email: 'sara@example.com' },
  { id: 3, name: 'Ahmed', email: 'ahmed@example.com' },
  { id: 4, name: 'Usama', email: 'usama@example.com' },
  { id: 5, name: 'Zain', email: 'zain@example.com' },
  { id: 6, name: 'Khan', email: 'khan@example.com' },
  { id: 7, name: 'Sana', email: 'sana@example.com' },
  { id: 8, name: 'Zubair', email: 'zubair@example.com' },
  { id: 9, name: 'Usman', email: 'usman@example.com' },
  { id: 10, name: 'Zahid', email: 'zahid@example.com' },
];

export default function AccessControlPage() {
  const handleApprove = (id: number) => {
    alert(`Approved user with id ${id}`);
  };

  const handleReject = (id: number) => {
    alert(`Rejected user with id ${id}`);
  };

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Access Control</h1>
      <Table users={dummyUsers} onApprove={handleApprove} onReject={handleReject} />
    </div>
  );
}
