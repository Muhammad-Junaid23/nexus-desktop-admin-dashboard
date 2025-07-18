'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Image from 'next/image';

type User = {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
};

const usersPerPage = 5;

export default function Table({
  users,
  onApprove,
  onReject,
}: {
  users: User[];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = users.filter(
    (user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <input
          type='text'
          placeholder='Search by name or email...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full max-w-md rounded-lg border bg-white border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none'
        />
      </div>

      <div className='overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-md'>
        <table className='w-full border-separate border-spacing-0 text-sm text-gray-700'>
          <thead className='bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500'>
            <tr>
              <th className='px-6 py-4'>ID</th>
              <th className='px-6 py-4'>Name</th>
              <th className='px-6 py-4'>Email</th>
              <th className='px-6 py-4'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, i) => (
              <tr key={user.id} className='group border-t border-gray-100 transition hover:bg-gray-50'>
                <td className='px-6 py-4 text-gray-500'>{startIndex + i + 1}</td>
                <td className='px-6 py-4 font-medium text-gray-900 flex items-center gap-3'>
                  <Image
                    src={user.avatarUrl || '/images/default-avatar.jpg'}
                    alt={user.name}
                    width={32}
                    height={32}
                    className='rounded-full'
                  />
                  {user.name}
                </td>
                <td className='px-6 py-4'>{user.email}</td>
                <td className='px-6 py-4 space-x-2'>
                  <Button
                    onClick={() => onApprove(user.id)}
                    variant='outline'
                    className='border-green-500 text-green-600 hover:bg-green-50'
                  >
                    Approve
                  </Button>
                  <Button onClick={() => onReject(user.id)} variant='danger'>
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex justify-end items-center space-x-2 text-sm'>
        <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} variant='outline'>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          variant='outline'
        >
          Next
        </Button>
      </div>
    </div>
  );
}
