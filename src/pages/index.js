import Head from "next/head";
import Header from '../components/Header';
import Footer from "@/components/Footer";
import Search from "@/components/Search";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Web3deals</title>
      </Head>
      <div>
        <Header />
        <Search />
        <Footer />
      </div>
    </div>
  );
}