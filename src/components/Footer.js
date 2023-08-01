import { ChevronDoubleUpIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

function Footer() {
    const Router = useRouter();
    return (
      <footer className="flex flex-col py-6  px-[8rem] w-full  border-t-2 border-[#F2F2F2]">
        
        <div className="w-full  flex flex-col md:flex-row items-center justify-between px-2">
            <div className="text-center md:text-left">
                <h1 onClick={() => { Router.push("/") }} className="cursor-pointer text-2xl font-bold tracking-widest">.Web3Deals</h1>
                <p className="text-gray-600 mt-1 text-sm hidden md:inline-block"> An open aggregator aimed at creating an accessible and transparent <br/> platform for the latest developments in the Web3 space, focusing <br/> primarily on raises, fundings, and investments.</p>
                <p className="text-gray-600 mt-2 text-sm whitespace-nowrap">&copy; {new Date().getFullYear()} Web3Deals.tn All rights reserved.</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-12 md:space-x-12 tracking-wide items-start">
                <div>
                    <h2 className="font-semibold mb-1">About Web3Deals</h2>
                    <ul className="flex flex-col space-y-1">
                        <li>
                            <p onClick={() => Router.push("/help#terms-of-service")} className="text-[#BDBDBD] cursor-pointer hover:text-gray-500">Terms of Service</p>
                        </li>
                        <li>
                            <p onClick={() => Router.push("/help#privacy-policy")} className="text-[#BDBDBD] cursor-pointer hover:text-gray-500">Privacy Policy</p>
                        </li>
                        <li>
                            <p onClick={() => Router.push("/help#faq")} className="text-[#BDBDBD] cursor-pointer hover:text-gray-500">FAQ</p>
                        </li>
                    </ul>
                </div>
                <div> 
                    <h2 className="font-semibold mb-1">Social Media</h2>
                    <ul className="flex flex-col space-y-1">
                        <li>
                            <a href="" className="text-[#BDBDBD] hover:text-gray-500">Facebook</a>
                        </li>
                        <li>
                            <a href="" className="text-[#BDBDBD] hover:text-gray-500">Twitter</a>
                        </li>
                        <li>
                            <a href="" className="text-[#BDBDBD] hover:text-gray-500">Reddit</a>
                        </li>
                    </ul>
                </div>
                <div> 
                    <h2 className="font-semibold mb-1">Support Us</h2>
                    <ul className="flex flex-col space-y-1">
                        <li>
                            <a href="" className="text-[#BDBDBD] hover:text-gray-500">Donate</a>
                        </li>
                        <li>
                            <a href="" className="text-[#BDBDBD] hover:text-gray-500">Feedback</a>
                        </li>
                    </ul>
                </div> 
                <button id="scroll-top" aria-label="scroll-top" onClick={() => {window.scrollTo({ top: 0, behavior: 'smooth' });}} className=" pt-2 w-min hidden sm:block text-[#BDBDBD] hover:text-gray-500 focus:outline-none">
            <ChevronDoubleUpIcon className="h-9"/>
        </button>
            </div>
            
        </div>
    </footer>
    );
}
  
export default Footer;
