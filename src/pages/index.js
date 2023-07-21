import React from "react";
import Head from "next/head";
import Header from '@/components/Header';
import Footer from "@/components/Footer";
import CardFeed from "../components/CardFeed";
import DemoPage from '@/components/rayen';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Web3Deals</title>
      </Head>
      <div className="relative">
        <Header />
        <div className="lg:px-32 md:px-26 sm:px-12">
            <CardFeed />
            <DemoPage />
        </div>
        <Footer />
      </div>
    </div>
  );
}