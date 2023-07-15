import { ChevronDoubleUpIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
/*
 * Footer component for the website.
 * Renders 2023 .Web3Deals All rights reserved.
 */
function Footer() {
    const Router = useRouter();
    return (
      <footer className="h-4 sm:py-4 md:py-6 px-[8rem] w-full relative bottom-0 border-t-2 border-[#F2F2F2]">
        <button onClick={() => {window.scrollTo({ top: 0, behavior: 'smooth' });}} className="absolute -top-12 right-6 z-10 w-min md:mt-0 text-[#BDBDBD] hover:text-black focus:outline-none">
            <ChevronDoubleUpIcon className="h-9"/>
        </button>
        <div className="w-full  flex flex-col md:flex-row items-center justify-between px-2">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold tracking-widest">.Web3Deals</h2>
            <p className="text-gray-600 mt-1 text-sm hidden md:inline-block"> An open aggregator aimed at creating an accessible and transparent <br/> platform for the latest developments in the Web3 space, focusing <br/> primarily on raises, fundings, and investments.</p>
            <p className="text-gray-600 mt-2 text-sm whitespace-nowrap">&copy; {new Date().getFullYear()} Web3Deals.tn All rights reserved.</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-8 md:space-x-12 tracking-wide">
           <div>
                <h2 className="font-semibold mb-1">About Web3Deals</h2>
                <ul className="flex flex-col space-y-1">
                    <li>
                        <p onClick={() => Router.push("/help#terms-of-service")} className="text-[#BDBDBD] cursor-pointer hover:underline hover:text-black">Terms of Service</p>
                    </li>
                    <li>
                        <p onClick={() => Router.push("/help#privacy-policy")} className="text-[#BDBDBD] cursor-pointer hover:underline hover:text-black">Privacy Policy</p>
                    </li>
                    <li>
                        <p onClick={() => Router.push("/help#faq")} className="text-[#BDBDBD] cursor-pointer hover:underline hover:text-black">FAQ</p>
                    </li>
                </ul>
            </div>
            <div> 
                <h2 className="font-semibold mb-1">Social Media</h2>
                <ul className="flex flex-col space-y-1">
                    <li>
                        <a href="" className="text-[#BDBDBD] hover:underline hover:text-black">Facebook</a>
                    </li>
                    <li>
                        <a href="" className="text-[#BDBDBD] hover:underline hover:text-black">Twitter</a>
                    </li>
                    <li>
                        <a href="" className="text-[#BDBDBD] hover:underline hover:text-black">Reddit</a>
                    </li>
                </ul>
            </div>
            <div> 
                <h2 className="font-semibold mb-1">Support Us</h2>
                <ul className="flex flex-col space-y-1">
                    <li>
                        <a href="" className="text-[#BDBDBD] hover:underline hover:text-black">Donate</a>
                    </li>
                    <li>
                        <a href="" className="text-[#BDBDBD] hover:underline hover:text-black">Feedback</a>
                    </li>
                </ul>
            </div> 
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;