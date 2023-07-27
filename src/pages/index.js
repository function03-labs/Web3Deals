import { useState } from "react";
import Header from '@/components/Header';
import Footer from "@/components/Footer";
import CardFeed from "@/components/CardFeed";
import DemoPage from '@/components/DemoPage';

export default function Home() {
  const [theme, setTheme] = useState('light');
  return (
    <div>
      <Header theme={theme} setTheme={setTheme} />
      <main className="relative">
        <div className="lg:px-32 md:px-22 sm:px-12">
          <CardFeed theme={theme} />
          <DemoPage theme={theme} />
        </div>
        <Footer/>
      </main>
    </div>   
  );
}
