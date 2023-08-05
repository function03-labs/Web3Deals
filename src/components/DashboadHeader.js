import { useEffect, useState, useRef } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { ChevronDownIcon } from "@heroicons/react/outline";
import Link from 'next/link';


function DashboardHeader({ theme, setTheme }) {
  const { data: session } = useSession();
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    if (dropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdown]);

  const handleDropdown = () => {
    if (dropdown) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  useEffect(() => {
    // Set the theme based on the value stored in localStorage
    document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
    setTheme(localStorage.getItem('theme'));
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      localStorage.setItem('theme', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      setTheme('dark');
    } else {
      localStorage.setItem('theme', 'light');
      document.documentElement.setAttribute('data-theme', 'light');
      setTheme('light');
    }
  };

  return (
    <header className="z-20 ease-linear flex flex-row px-8 justify-between items-center py-3 sm:py-4 md:px-[8rem] border-b border-[#F2F2F2]">
      <Link href="/?week=31">
        <button className="flex gap-2 items-center">
          <svg width="24px" height="24px" viewBox="0 0 0.72 0.72" xmlns="http://www.w3.org/2000/svg" version="1.1" transform="matrix(-1,0,0,-1,0,0)">
            <path fill='#fb2056' id="secondary" d="M0.45 0.57a0.03 0.03 0 0 1 -0.024 -0.012 0.03 0.03 0 0 1 0.006 -0.042L0.6 0.39l-0.168 -0.126a0.03 0.03 0 1 1 0.036 -0.048l0.168 0.127a0.06 0.06 0 0 1 0 0.095L0.468 0.564a0.03 0.03 0 0 1 -0.018 0.006Z"></path>
            <path fill="currentColor" id="primary" d="m0.491 0.365 -0.203 -0.15A0.03 0.03 0 0 0 0.24 0.24v0.056c-0.084 -0.021 -0.12 -0.125 -0.12 -0.126A0.03 0.03 0 0 0 0.085 0.15 0.03 0.03 0 0 0 0.06 0.18c0 0.23 0.102 0.287 0.18 0.298V0.54a0.03 0.03 0 0 0 0.017 0.027 0.03 0.03 0 0 0 0.03 -0.003l0.203 -0.15a0.03 0.03 0 0 0 0.012 -0.024 0.03 0.03 0 0 0 -0.011 -0.025Z"></path>
          </svg>
          Home
        </button>
      </Link>

      <div className="relative group">
        <div className={`cursor-pointer flex items-center hover:text-[#fb2056] gap-2 ${dropdown ? 'text-[#fb2056]' : ''}`} onClick={() => handleDropdown('services')}>
          <div className="flex items-center">
            <img
              src={session?.user.image || "/user-placeholder.png"}
              alt={session?.user.name || "User"}
              className="h-7 w-7 rounded-full object-cover mr-2"
            />
            <p className="text-sm font-medium dark:text-gray-300 text-gray-600">
              Welcome, {session?.user.name || "User"}!
            </p>
          </div>
          <ChevronDownIcon className="h-4 w-4" />
        </div>
        {dropdown && (
          <div ref={dropdownRef} className="absolute left-3 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-black dark:text-white border border-gray-200">
            <p className="block px-4 py-2 text-sm border-b  dark:border-gray-700 border-gray-300 ">{session?.user?.email}</p>
            <Link href="/dashboard?show=billing" className="block px-4 py-2 text-sm dark:hover:bg-gray-800 hover:cursor-pointer hover:bg-gray-100 hover:text-[#fb2056]">Billing</Link>
            <Link href="/dashboard?show=settings" className="block px-4 py-2 text-sm  dark:hover:bg-gray-800 hover:cursor-pointer hover:bg-gray-100 hover:text-[#fb2056]">Settings</Link>
            <p onClick={toggleTheme} className="block px-4 py-2 text-sm  hover:cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-100 hover:text-[#fb2056]">Theme: {theme}</p>
            <p onClick={() => signOut()} className="block px-4 py-2 text-sm border-t hover:cursor-pointer dark:border-gray-700 border-gray-300  dark:hover:bg-gray-800 hover:bg-gray-100 hover:text-[#fb2056]">Sign Out</p>
          </div>
        )}
      </div>
    </header>
  );
}

export default DashboardHeader;