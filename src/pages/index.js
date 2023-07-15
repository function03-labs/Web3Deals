import Head from "next/head";
import DemoPage from '@/components/rayen';
import Header from '@/components/Header';
import Footer from "@/components/Footer";
import Search from "@/components/Search";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Web3deals</title>
      </Head>
      <div className="relative">
        <Header />
        <div className="px-32 pb-64">
          <DemoPage />
        </div>
        <Footer />
      </div>
    </div>
  );
}