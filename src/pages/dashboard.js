import { useSession, signOut } from "next-auth/react";
import { useEffect,useState} from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import DashboardHeader from "../components/DashboadHeader";
import SidebarNav from "../components/SidebarNav";
import ProductFeed from "../components/PostFeed";
import { redirect } from "next/navigation"
import SettingsForm from "../components/Settings";
import BillingForm from "../components/Billing";

export default function Dashboard({ user }) {
  const { data: session, status } = useSession();
  const router = useRouter()
  const [theme, setTheme] = useState(null);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTheme(localStorage.getItem('theme'));
    }
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  if (!session) {
    redirect("/week=31");
  }

  return (
    <div >
      <DashboardHeader theme={theme} setTheme={setTheme}/>
      <div className="flex gap-4">
      <SidebarNav />
      {router.asPath === "/dashboard" ? <ProductFeed /> : router.asPath === "/dashboard?show=billing" ? <BillingForm />: <SettingsForm /> }
      </div>
    </div>
  );
}
