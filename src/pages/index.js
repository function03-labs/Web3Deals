import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CardFeed from "@/components/CardFeed";
import DemoPage from "@/components/DemoPage";
import LoadForm from "./loadForm";

export default function Home() {
  const [theme, setTheme] = useState("light");
  return (
    <div className="flex flex-col min-h-screen">
      <Header theme={theme} setTheme={setTheme} />
      <main className="relative flex-grow">
        <div className="lg:px-32 md:px-16 sm:px-6">
          <CardFeed theme={theme} />
          <LoadForm />
          <DemoPage theme={theme} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
