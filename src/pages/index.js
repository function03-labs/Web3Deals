import React from "react";
import Head from "next/head";
import DemoPage from '@/components/rayen';
import Header from '@/components/Header';
import Footer from "@/components/Footer";
import CardFeed from '@/components/CardFeed';

async function fetchStats() {
  try {
    const res = await fetch('/api/stats');

    // Check if the request was successful
    if (!res.ok) {
      console.error("The server responded with an error", res.status);
      return;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}



export default function Home() {
  const [stats, setStats] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchStats().then(data => {
      setStats([
        { title: 'Total Funding Amount This Month', icon:  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>, stat: '$'+(parseInt(data.totalFundAmountThisMonth) / 1000000).toFixed(2)+ 'M', description: "+20.1% from last month" },
        { title: 'Funding Rounds This Month', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>, stat:  data.fundsThisMonth, description: '+180.1% from last month' },
        { title: 'Most Active Investor This Month ', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><rect width="20" height="14" x="2" y="5" rx="2" /><path d="M2 10h20" /></svg>, stat:  data.mostFrequentInvestorsThisMonth, description: '+19% from last month' },
        { title: 'Biggest Mover This Month', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>, stat:<p><img className="w-6 h-6 rounded mr-2 inline mb-1" src={`https://s1.coincarp.com${data.topProjectsThisMonth[0].logo}`}/> {data.topProjectsThisMonth[0]._id} </p>, description: '$'+(parseInt(data.topProjectsThisMonth[0].total) / 1000000).toFixed(2)+ 'M'},
      ]);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <Head>
        <title>Web3deals</title>
      </Head>
      <div className="relative">
        <Header />
        <div className="lg:px-32 md:px-26 sm:px-12">
        {isLoading ? <p>Loading...</p> : <CardFeed data={stats} />}
          <DemoPage />
        </div>
        <Footer />
      </div>
    </div>
  );
}