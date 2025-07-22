import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Settings, UserCircle2, Menu } from 'lucide-react';

export default function TopNav({ toggleSidebar }: { toggleSidebar: () => void }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const storedEmail = localStorage.getItem('admin-email');
    if (storedEmail) {
      setAdminEmail(storedEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('role');
    router.push('/');
  };

  return (
    <div className='w-full h-14 bg-white flex items-center justify-between px-4 shadow-sm sticky top-0 z-50'>
      <div className='flex items-center gap-3'>
        <button
          onClick={toggleSidebar}
          className='lg:hidden text-gray-700 hover:text-gray-900 focus:outline-none'
          aria-label='Toggle sidebar'
        >
          <Menu className='w-6 h-6' />
        </button>
        <h1 className='text-2xl font-extrabold text-blue-600'>Nexus Desktop</h1>
      </div>

      <div className='flex items-center gap-4'>
        <div className='relative' ref={dropdownRef}>
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className='flex items-center gap-2 text-gray-700 hover:text-gray-900'>
            <UserCircle2 className='w-6 h-6' />
            <span className='hidden sm:inline text-sm'>{adminEmail || 'Admin'}</span>
          </button>

          {isDropdownOpen && (
            <div className='absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg z-50'>
              <button className='flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                <UserCircle2 className='w-4 h-4 mr-2' />
                Profile
              </button>
              <button className='flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                <Settings className='w-4 h-4 mr-2' />
                Settings
              </button>
              <button className='flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100' onClick={handleLogout}>
                <LogOut className='w-4 h-4 mr-2' />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
