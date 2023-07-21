import Head from "next/head";
import { useState } from "react";
import Header from '@/components/Header';
import Footer from "@/components/Footer";
import CardFeed from "../components/CardFeed";
import DemoPage from '@/components/DemoPage';

export default function Home() {
  const [theme, setTheme] = useState('light');
  return (
    <div>
      <Head>
        <title>Web3Deals</title>
      </Head>
      <div className="relative">
        <Header theme={theme} setTheme={setTheme} />
        <div className="lg:px-32 md:px-26 sm:px-12">
          <CardFeed />
          <DemoPage theme={theme} />
        </div>
        <Footer />
      </div>
    </div>
  );
}