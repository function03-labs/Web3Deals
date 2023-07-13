import { useRouter } from 'next/router';
import Image from 'next/image';

/*
 * Header component for the website.
 * Renders the header with a logo and navigation links.
 */
function Header() {
    const Router = useRouter();
  return (
    <header className="z-20 ease-linear flex flex-col md:flex-row justify-between items-center py-2 sm:py-3 md:py-4 px-[8rem] border-b-2 border-[#F2F2F2]">
      <h1 onClick={() => { Router.push("/") }} className="cursor-pointer text-2xl font-bold tracking-widest">.Web3Deals</h1>
      {/*<Image onClick={() => Router.push("/")} src="/Assets/logo.png" alt="Logo" width={120} height={40} style={{ objectFit: 'contain' }} className="cursor-pointer" />*/}
      <nav>
        <ul className="flex space-x-6 md:space-x-10 tracking-tight font-medium md:tracking-wider">
          <li>
            <p onClick={() => { Router.push("/") }} className={`cursor-pointer hover:underline ${Router.pathname === "/" ? "text-black" : "text-[#BDBDBD]"}`}>
              Dashboard
            </p>
          </li>
          <li>
            <p onClick={() => { Router.push("/about") }} className={`cursor-pointer whitespace-nowrap hover:underline ${Router.pathname === "/about" ? "text-black" : "text-[#BDBDBD]"}`}>
              About Us
            </p>
          </li>
          <li>
            <p onClick={() => { Router.push("/contact") }} className={`cursor-pointer whitespace-nowrap hover:underline ${Router.pathname === "/contact" ? "text-black" : "text-[#BDBDBD]"}`}>
              Contact Us
            </p>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;