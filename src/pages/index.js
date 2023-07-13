import Head from "next/head";
import Header from '@/components/Header';
import Footer from "@/components/Footer";
import Search from "@/components/Search";
import Table from "@/components/Table";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Web3deals</title>
      </Head>
      <div className="relative">
        <Header />
        <Search />
        <div className="px-32 pb-64">
        <Table />
        </div>
        <Footer />
      </div>
    </div>
  );
}