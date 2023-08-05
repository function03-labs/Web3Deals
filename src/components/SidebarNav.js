import Link from 'next/link'
import { useRouter } from "next/router";

const SidebarNav = () => {
    const router = useRouter();
    return (
      <aside className="sm:w-[200px] gap-2 pr-2 h-full sm:border-r font-semibold text-xl sm:flex-col flex sm:mt-10 mt-5 sm:ml-14 mx-auto sm:mx-5">
          <Link href="/dashboard">
            <span  className={`group font-normal text-base flex items-center rounded px-3 py-2 dark:hover:bg-gray-800 hover:cursor-pointer hover:bg-gray-100 hover:text-[#fb2056] ${
              router.asPath === "/dashboard" ? "dark:bg-gray-800  bg-gray-100 text-[#fb2056]" : "transparent"
            }`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
            <span>Feed</span></span>
          </Link>
          <Link href="/dashboard?show=billing">
            <span  className={`group font-normal text-base flex items-center rounded px-3 py-2 dark:hover:bg-gray-800 hover:cursor-pointer hover:bg-gray-100 hover:text-[#fb2056] ${
              router.asPath === "/dashboard?show=billing" ? "dark:bg-gray-800 bg-gray-100 text-[#fb2056]" : "transparent"
            }`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg><span>Billing</span>
            </span>
          </Link>
          <Link href="/dashboard?show=settings">
            <span className={`group font-normal text-base flex items-center rounded px-3 py-2 dark:hover:bg-gray-800 hover:cursor-pointer hover:bg-gray-100 hover:text-[#fb2056] ${
              router.asPath === "/dashboard?show=settings" ? "dark:bg-gray-800 bg-gray-100 text-[#fb2056]" : "transparent"
            }`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2 h-4 w-4"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg><span>Settings</span>
            </span>
          </Link>

      </aside>
    );
  };
export default SidebarNav;  