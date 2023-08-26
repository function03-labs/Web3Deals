import { useState,useEffect} from 'react';
import Card from '@/components/Card';
import Select from 'react-select';
import { useRouter } from 'next/router';

async function fetchStats(timeframe) {
  const res = await fetch(`/api/stats?timeframe=${timeframe.value}`);
  if (!res.ok) {
    throw new Error(`The server responded with an error: ${res.status}`);
  }
  return await res.json();
}

function formatAmount(n) {
  if (n >= 1e9) {
    return (n / 1e9).toFixed(3) + 'B';
  } else {
    return (n / 1e6).toFixed(2) + 'M';
  }
}

function formatAmountForPercentage(total, n) {
  return (n * 100 / total).toFixed(1);
}

const Options = [
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
  { value:'all', label: 'All Time'}]

const CardFeed = ({theme}) => {
  const Router = useRouter();
  const [timeframe, setTimeframe] = useState(Options[0]);
  const [stats, setStats] = useState([]); 


  const updateURL = (newQuery) => {
    for(let key in newQuery) {
      if(newQuery[key] === undefined) {
        delete newQuery[key];
      }
    }

    Router.push({
      pathname: '/',
      query: newQuery,
    });
  };

  useEffect(()=>{

    let newQueryParams = { ...Router.query };
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const currentWeek = Math.ceil(dayOfYear / 7);

    // Add the 'week' parameter
    newQueryParams.week = currentWeek;
    updateURL(newQueryParams);
  },[])

  useEffect(() => {
    fetchStats(timeframe) 
    .then(data => {
      setStats([
        {
          title: 'Total Funding', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground mb-2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>, 
          mainStat: '$' + formatAmount(parseInt(data.totalFundAmount)), 
          comparisonStat: 'Across '+data.funds+ ' funding raises'
        },
        {
          title: 'Top Categories',
          icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground mb-2"><rect width="20" height="14" x="2" y="5" rx="2" /><path d="M2 10h20" /></svg>,
          mainStat: 
          <div>
            <p className="text-base font-semibold mb-1">{(data.topCategories[0]._id === 'Others' ? 'Misc.' : data.topCategories[0]._id) + ' - $' + formatAmount(parseInt(data.topCategories[0].sum))+' ('+formatAmountForPercentage(parseInt(data.totalFundAmount), parseInt(data.topCategories[0].sum)) + '%)'}</p>
            <p className="text-sm font-medium text-gray-500 mb-2">{(data.topCategories[1]._id === 'Others' ? 'Misc.' : data.topCategories[1]._id) + ' - $'+formatAmount(parseInt(data.topCategories[1].sum))+' ('+formatAmountForPercentage(parseInt(data.totalFundAmount), parseInt(data.topCategories[1].sum)) + '%)'}</p>
            <p className="text-xs font-medium text-gray-500">{(data.topCategories[2]._id === 'Others' ? 'Misc.' : data.topCategories[2]._id) + ' - $'+formatAmount(parseInt(data.topCategories[2].sum))+' ('+formatAmountForPercentage(parseInt(data.totalFundAmount), parseInt(data.topCategories[2].sum)) + '%)'}</p>
          </div>
        },          
        {
          title: 'Biggest Raises',
          icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground mb-2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
          mainStat: 
          <div>
            <p className="text-base font-semibold mb-[6px]"><img width={24} height={24} loading='lazy' className="w-6 h-6 mr-2 rounded-full inline mb-1" alt="" src={`https://s1.coincarp.com${data.topProjects[0].logo}`}/>{data.topProjects[0]._id+' - '+'$'+formatAmount(parseInt(data.topProjects[0].sum))}</p>
            <p className="text-sm font-medium text-gray-500 mb-[6px]"><img width={24} height={24} loading='lazy' className="w-6 h-6 rounded-full mr-2 inline mb-1" alt="" src={`https://s1.coincarp.com${data.topProjects[1].logo}`}/>{data.topProjects[1]._id+' - $'+formatAmount(parseInt(data.topProjects[1].sum))}</p>
            <p className="text-xs font-medium text-gray-500 whitespace-nowrap"><img width={24} height={24} loading='lazy' className="w-6 h-6  rounded-full mr-2 inline mb-1" alt="" src={`https://s1.coincarp.com${data.topProjects[2].logo}`}/>{data.topProjects[2]._id+' - $'+formatAmount(parseInt(data.topProjects[2].sum))}</p>
          </div>,
        },
        {
          title: 'Most Active Investors',
          icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground mb-2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
          mainStat: 
          <div>
            <p className="text-base font-semibold mb-[6px]"><img width={24} height={24} loading='lazy' className="w-6 h-6 rounded-full mr-2 inline mb-1" alt="" src={`https://s1.coincarp.com${data.topInvestors[0].logo}`}/>{data.topInvestors[0]._id}</p>
            <p className="text-sm font-medium text-gray-500 mb-[6px]"><img width={24} height={24} loading='lazy' className="w-6 h-6 rounded-full  mr-2 inline mb-1" alt="" src={`https://s1.coincarp.com${data.topInvestors[1].logo}`}/>{data.topInvestors[1]._id}</p>
            <p className="text-xs font-medium text-gray-500"><img width={24} height={24} loading='lazy' className="w-6 h-6 mr-2 rounded-full inline mb-1" alt="" src={`https://s1.coincarp.com${data.topInvestors[2].logo}`}/>{data.topInvestors[2]._id}</p>
          </div>
        }]);
      }) 
      .catch(error => {
        console.error("Failed to fetch data:", error);
      });
  }, [timeframe]);


  const handleTimeframeChange = (e) => {
    setTimeframe(e);
    console.log(e);
  
    // Copy existing query parameters
    let newQueryParams = { ...Router.query };
  
    // Remove existing time-related parameters
    delete newQueryParams.week;
    delete newQueryParams.month;
    delete newQueryParams.date;
  
    if (e.value === 'week') {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);
      const currentWeek = Math.ceil(dayOfYear / 7);
  
      // Add the 'week' parameter
      newQueryParams.week = currentWeek;
    }
  
    if (e.value === 'month') {
      const currentMonth = new Date().getMonth();
  
      // Add the 'month' parameter
      newQueryParams.month = currentMonth;
    }
  
    if (e.value === 'year') {
      const currentYear = new Date().getFullYear();
  
      // Add the 'year' parameter
      newQueryParams.date = currentYear;
    }
  
    // Update the URL with the new query parameters
    updateURL(newQueryParams);
  };
  

  const customStyles = {
    control: (base, state) => ({
      ...base,
      border: state.isFocused ?  (theme === 'dark' ? '1.5px solid lightgray' : '1.5px solid black')  : '1.5px solid lightgray',
      boxShadow: 'none',
      borderRadius: 3,
      width: '130px',
      minWidth: '130px',
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
      backgroundColor: isSelected ? (theme === 'dark' ? '#1F2937' : '#E5E7EB') : (theme === 'dark' ? 'black' : 'white'),
      color: theme === 'dark' ? 'white' : 'black',
      whiteSpace: 'nowrap',
      transition: 'background-color 0.5s, color 0.5s', // Added transition
      '&:hover': {
        backgroundColor: (theme === 'dark' ? '#1F2937' : '#E5E7EB'),
      },
    }),
    menu: base => ({
      ...base,
      boxShadow: theme === 'dark' ? '-9px 11px 13px -9px rgba(0,0,0,0.5)' : '-9px 11px 13px -9px rgba(0,0,0,0.16)',
      padding : '0.25rem',
      borderRadius: 3,
      border : theme === 'dark' ? '1.5px solid white' : '1.5px solid black',
      width: '130px',
      minWidth: '130px',  // set width to auto to match width of longest option
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
    <div className="mt-4 space-y-3 mx-7">
      <Select id="timeframe" styles={customStyles} options={Options} value={timeframe} onChange={handleTimeframeChange} placeholder="This Week"/>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-4">
        {stats.map((cardData,index) => (
            <Card key={cardData.title} title={cardData.title} icon={cardData.icon} mainStat={cardData.mainStat} comparisonStat={cardData.comparisonStat} theme={theme} />)
            )
        }
      </div>
    </div>
  );
};

export default CardFeed;