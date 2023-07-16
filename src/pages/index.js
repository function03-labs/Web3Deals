import Head from "next/head";
import DemoPage from '@/components/rayen';
import Header from '@/components/Header';
import Footer from "@/components/Footer";
import CardFeed from '@/components/CardFeed';

const data = [
  { title: 'Funding Rounds', icon: <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeLinecap="round"
  strokeLinejoin="round"
  strokeWidth="2"
  className="h-4 w-4 text-muted-foreground"
>
  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
</svg>, stat: '$45,231.89', description: '+20.1% from last month' },
  { title: 'Total Funding Amount', icon: <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeLinecap="round"
  strokeLinejoin="round"
  strokeWidth="2"
  className="h-4 w-4 text-muted-foreground"
>
  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
  <circle cx="9" cy="7" r="4" />
  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
</svg>, stat: '+2350', description: '+180.1% from last month' },
  { title: 'Biggest Funding Round Weekly', icon: <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeLinecap="round"
  strokeLinejoin="round"
  strokeWidth="2"
  className="h-4 w-4 text-muted-foreground"
>
  <rect width="20" height="14" x="2" y="5" rx="2" />
  <path d="M2 10h20" />
</svg>, stat: '+12,234', description: '+19% from last month' },
  { title: 'Biggest Movers', icon:  <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeLinecap="round"
  strokeLinejoin="round"
  strokeWidth="2"
  className="h-4 w-4 text-muted-foreground"
>
  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
</svg>, stat: '+573', description: '+201 since last hour' },
];


export default function Home() {
  return (
    <div>
      <Head>
        <title>Web3deals</title>
      </Head>
      <div className="relative">
        <Header />
        <div className="lg:px-32 md:px-26 sm:px-12">
         <CardFeed data={data} />
          <DemoPage />
        </div>
        <Footer />
      </div>
    </div>
  );
}