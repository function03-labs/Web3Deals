import Header from "@/components/Header";
import Footer from "@/components/Footer"
import { useState,useEffect} from "react";

const Help = ()=> {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTheme(localStorage.getItem('theme'));
    }
  }, []);
  return (
    <div>
      <Header theme={theme} setTheme={setTheme} />
      <div className="flex flex-col items-center gap-8 mt-6 mb-12 px-8 md:px-0 mx-auto">
        <section id="terms-of-service" className="">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Terms of use</h2>
          <p className="text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod, nunc nec pellentesque lacinia, risus lorem vehicula diam, vitae consectetur ante lorem nec nisi.</p>
        </section>
        <section id="privacy-policy" className="">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Privacy policy</h2>
          <p className="text-gray-600  dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod, nunc nec pellentesque lacinia, risus lorem vehicula diam, vitae consectetur ante lorem nec nisi.</p>
        </section>
        <section id="contact-us" className="">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Contact Us</h2>
          <p className="text-gray-600  dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod, nunc nec pellentesque lacinia, risus lorem vehicula diam, vitae consectetur ante lorem nec nisi.</p>
        </section>
      </div>
      <Footer />
    </div>
    );
}
export default Help;