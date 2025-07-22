'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/layout/AdminSidebar';
import Navbar from '@/components/layout/Navbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  // Close sidebar when screen size changes to large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // lg breakpoint
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Only on mobile/tablet screens
      if (window.innerWidth < 1024 && sidebarOpen) {
        // Check if the click is outside the sidebar area
        const target = e.target as HTMLElement;
        if (!target.closest('aside') && !target.closest('button[aria-label="Toggle sidebar"]')) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

  if (!authorized) return null;

  return (
    <div className='flex flex-col min-h-screen bg-gray-50'>
      {/* Navbar at the top across all screen sizes */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Main content area with sidebar */}
      <div className='flex flex-1 overflow-hidden'>
        <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main className='flex-1 overflow-y-auto p-4'>{children}</main>
      </div>
    </div>
  );
}
