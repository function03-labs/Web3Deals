import { useState,useEffect} from 'react';
import Card from '@/components/Card';

async function fetchStats(timeframe) {
  const res = await fetch(`/api/stats?timeframe=${timeframe}`);
  if (!res.ok) {
    throw new Error(`The server responded with an error: ${res.status}`);
  }
  return await res.json();
}

const CardFeed = () => {
  const [timeframe, setTimeframe] = useState('month');
  const [stats, setStats] = useState([]); 
  useEffect(() => {
    fetchStats(timeframe) 
    .then(data => {
        setStats([
          { title: 'Total Funding Amount', 
           icon:  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>, 
           mainStat: '$'+(parseInt(data.totalFundAmount) / 1000000000).toFixed(3)+ 'B', 
           comparisonStat: 'Across '+data.funds+ ' projects',
           subStat:"" },
           {
            title: 'Top Categories',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-gray-500"><rect width="20" height="14" x="2" y="5" rx="2" /><path d="M2 10h20" /></svg>,
            mainStat: <div>
              <p className="text-xl font-semibold mb-1">{data.topCategories[0]._id+' with '+ '$'+(parseInt(data.topCategories[0].sum) / 1000000).toFixed(2)+ 'M'+' ('+(parseInt(data.topCategories[0].sum) * 100 / parseInt(data.totalFundAmount) ).toFixed(1)+ '%)'}</p>
              <p className="text-sm text-gray-700 mb-1">{data.topCategories[1]._id+' with '+ '$'+(parseInt(data.topCategories[1].sum) / 1000000).toFixed(2)+ 'M'+' ('+(parseInt(data.topCategories[1].sum) * 100 / parseInt(data.totalFundAmount) ).toFixed(1)+ '%)'}</p>
              <p className="text-sm text-gray-500">{data.topCategories[2]._id+' with '+ '$'+(parseInt(data.topCategories[2].sum) / 1000000).toFixed(2)+ 'M'+' ('+(parseInt(data.topCategories[2].sum) * 100 / parseInt(data.totalFundAmount) ).toFixed(1)+ '%)'}</p>
            </div>
          },
          {
            title: 'Biggest Movers',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-gray-500"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
            mainStat: <div>
              <p className=" text-xl font-semibold mb-1"><img className="w-6 h-6 rounded mr-2 inline mb-1" src={`https://s1.coincarp.com${data.topProjects[0].logo}`}/> {data.topProjects[0]._id+' with '+'$'+(parseInt(data.topProjects[0].sum) / 1000000).toFixed(2)+ 'M'}</p>
              <p className="text-sm text-gray-700 mb-1"><img className="w-6 h-6 rounded mr-2 inline mb-1" src={`https://s1.coincarp.com${data.topProjects[1].logo}`}/>{data.topProjects[1]._id+' with $'+(parseInt(data.topProjects[1].sum) / 1000000).toFixed(2)+ 'M'}</p>
              <p className="text-sm text-gray-500"><img className="w-6 h-6 rounded mr-2 inline mb-1" src={`https://s1.coincarp.com${data.topProjects[2].logo}`}/> {data.topProjects[2]._id+'with $'+(parseInt(data.topProjects[2].sum) / 1000000).toFixed(2)+ 'M'}</p>
            </div>,
          },
          {
            title: 'Most Actif Investors',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-gray-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
            mainStat: <div>
              <p className="text-xl font-semibold mb-1"><img className="w-6 h-6 rounded mr-2 inline mb-1" src={`https://s1.coincarp.com${data.topInvestors[0].logo}`}/> {data.topInvestors[0]._id}</p>
              <p className="text-sm text-gray-700 mb-1"><img className="w-6 h-6 rounded mr-2 inline mb-1" src={`https://s1.coincarp.com${data.topInvestors[1].logo}`}/> {data.topInvestors[1]._id}</p>
              <p className="text-sm text-gray-500"><img className="w-6 h-6 rounded mr-2 inline mb-1" src={`https://s1.coincarp.com${data.topInvestors[2].logo}`}/> {data.topInvestors[2]._id}</p>
            </div>
          }
          ]);
        }) .catch(error => {
        console.error("Failed to fetch data:", error);
      });
  }, [timeframe]);


  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
    
  };

  return (
    <div className=" mt-10 space-y-4 mx-12">
      <select value={timeframe} onChange={handleTimeframeChange} className="p-2 border select-theme border-gray-300 focus:outline-none">
        <option value="year">This Year</option>
        <option value="month">This Month</option>
        <option value="week">This Week</option>
      </select>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
        {stats.map((cardData,index) => (
            <Card
              key={index}
              title={cardData.title}
              icon={cardData.icon}
              mainStat={cardData.mainStat}
              comparisonStat={cardData.comparisonStat}
              subStat={cardData.subStat}
            />
        ))}
      </div>
    </div>
  );
};

export default CardFeed;