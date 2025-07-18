'use client';

import { useState, ReactNode } from 'react';
import Button from './Button';

type Column<T> = {
  header: string;
  accessor: (item: T, index: number) => ReactNode;
};

type PaginatedTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  itemsPerPage?: number;
};

export default function GenericTable<T>({ data, columns, itemsPerPage = 5 }: PaginatedTableProps<T>) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const paginated = data.slice(start, start + itemsPerPage);

  return (
    <div className='space-y-6'>
      <div className='overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-md'>
        <table className='w-full text-sm text-left text-gray-700'>
          <thead className='bg-gray-100 text-xs uppercase font-medium text-gray-600'>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className='px-6 py-4'>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((item, i) => (
              <tr key={i} className='hover:bg-gray-50 transition'>
                {columns.map((col, idx) => (
                  <td key={idx} className='px-6 py-4'>
                    {col.accessor(item, i + start)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex justify-end items-center space-x-2 text-sm'>
        <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1} variant='outline'>
          Previous
        </Button>

        <span>
          Page {page} of {totalPages}
        </span>

        <Button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages} variant='outline'>
          Next
        </Button>
      </div>
    </div>
  );
}
