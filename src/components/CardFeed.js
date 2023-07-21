import { useState,useEffect} from 'react';
import Card from '@/components/Card';
import Select from 'react-select';

async function fetchStats(timeframe) {
  const res = await fetch(`/api/stats?timeframe=${timeframe.value}`);
  if (!res.ok) {
    throw new Error(`The server responded with an error: ${res.status}`);
  }
  return await res.json();
}

const Options = [
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' }]

const CardFeed = ({theme}) => {
  const [timeframe, setTimeframe] = useState(Options[0]);
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


  const handleTimeframeChange = (e) => {
    setTimeframe(e);
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      border: state.isFocused ?  (theme === 'dark' ? '1.5px solid white' : '1.5px solid black')  : '1.5px solid lightgray',
      boxShadow: 'none',
      borderRadius: 0,
      Width:'100px',
      minWidth: '100px',
      overflow:'hidden',
      whiteSpace: 'nowrap',
      '&:hover': {
        cursor: 'pointer'
      },
      backgroundColor: theme === 'dark' ? 'black' : 'white',
      textColor: theme === 'dark' ? 'white' : 'black',
      fontSize: '0.875rem',
      transition: 'background-color 0.5s, color 0.5s', // Added transition
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      fontSize: '0.875rem',
      cursor: 'pointer',
      backgroundColor: isSelected ? (theme === 'dark' ? 'darkgray' : 'lightgray') : (theme === 'dark' ? 'black' : 'white'),
      color: theme === 'dark' ? 'white' : 'black',
      whiteSpace: 'nowrap',
      transition: 'background-color 0.5s, color 0.5s', // Added transition
    }),
    menu: base => ({
      ...base,
      boxShadow: theme === 'dark' ? '-9px 11px 13px -9px rgba(0,0,0,0.5)' : '-9px 11px 13px -9px rgba(0,0,0,0.16)',
      padding : '0.25rem',
      borderRadius: 'none',
      width: 'auto',  // set width to auto to match width of longest option
      backgroundColor: theme === 'dark' ? 'black' : 'white',
      color: theme === 'dark' ? 'white' : 'black',
      transition: 'background-color 0.5s, color 0.5s, box-shadow 0.5s', // Added transition
    }),
    singleValue: base => ({
      ...base,
      color: theme === 'dark' ? 'white' : 'black',
      transition: 'color 0.5s', // Added transition
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
  };

  return (
    <div className=" mt-5 space-y-4 mx-8">
      <Select
      styles={customStyles}
      options={Options}
      value={timeframe}
      onChange={handleTimeframeChange}
      placeholder="This Week"
    />
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
        {stats.map((cardData,index) => (
            <Card
              key={index}
              title={cardData.title}
              icon={cardData.icon}
              mainStat={cardData.mainStat}
              comparisonStat={cardData.comparisonStat}
              theme={theme}
            />
        ))}
      </div>
    </div>
  );
};

export default CardFeed;