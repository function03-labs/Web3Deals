import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import Select from 'react-select';

function Search({theme}) {
  const Router = useRouter();
    // Define initial states for each filter based on router query
    const initCategory = Router.query.cat ? { value: Router.query.cat, label: Router.query.cat.charAt(0).toUpperCase() + Router.query.cat.slice(1) } : null;
    const initRound = Router.query.stage ? { value: Router.query.stage, label: Router.query.stage.charAt(0).toUpperCase() + Router.query.stage.slice(1) } : null;
    const mapAmountQueryParamToOption = (queryParam) => {
      const mapping = {
        'range-a': 'Less than $1M',
        'range-b': '$1M - $5M',
        'range-c': '$5M - $10M',
        'range-d': '$10M - $50M',
        'range-e': '$50M - $100M',
        'range-f': 'More than $100M',
      };
    
      return { value: queryParam, label: mapping[queryParam] };
    };
    
    const initAmount = Router.query.amount ? mapAmountQueryParamToOption(Router.query.amount) : null;
    const initDate = Router.query.date ? { value: Router.query.date, label: Router.query.date } : null;

   // Use these initial states to initialize your state
   const [category, setCategory] = useState(initCategory);
   const [round, setRound] = useState(initRound);
   const [amount, setAmount] = useState(initAmount);
   const [date, setDate] = useState(initDate);

     // Update the state when the router query changes
  useEffect(() => {
    setCategory(initCategory);
    setRound(initRound);
    setAmount(initAmount);
    setDate(initDate);
  }, [Router.query]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 10}, (_, i) => ({ value: currentYear - i, label: String(currentYear - i) }));

  const categoryOptions = [
    { value: 'web3', label: 'Web3' },
    { value: 'defi', label: 'DeFi' },
    { value: 'nfts', label: 'NFTs' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'cefi', label: 'CeFi' },
    { value: 'others', label: 'Others' },
  ];

  const roundOptions = [
    { value: 'Pre-seed', label: 'Pre-seed' },
    { value: 'Seed', label: 'Seed' },
    { value: 'Series-a', label: 'Series A' },
    { value: 'Series-b', label: 'Series B' },
    { value: 'Series-c', label: 'Series C' },
    { value: 'Ico', label: 'ICO' },
    { value: 'Ipo', label: 'IPO' },
    { value: 'Crowdfunding', label: 'Crowdfunding' },
    { value: 'Community-raise', label: 'Community Raise' },
    { value: 'Undisclosed', label: 'Undisclosed' },
  ];

  const amountOptions = [
    { value: 'range-a', label: 'Less than $1M' },
    { value: 'range-b', label: '$1M - $5M' },
    { value: 'range-c', label: '$5M - $10M' },
    { value: 'range-d', label: '$10M - $50M' },
    { value: 'range-e', label: '$50M - $100M' },
    { value: 'range-f', label: 'More than $100M' },
  ];

  const customStyles = {
    control: (base, state) => ({
      ...base,
      border: state.isFocused ? '1.5px solid black' : '1.5px solid lightgray',
      boxShadow: 'none',
      borderRadius: 0,
      minWidth: '100px',
      overflow:'hidden',
      whiteSpace: 'nowrap',
      '&:hover': {
        cursor: 'pointer'
      },
      backgroundColor: theme === 'dark' ? 'black' : 'white',
      textColor: theme === 'dark' ? 'white' : 'black',
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      fontSize: '0.875rem',
      cursor: 'pointer',
      backgroundColor: isSelected ? (theme === 'dark' ? 'darkgray' : 'lightgray') : (theme === 'dark' ? 'black' : 'white'),
      color: theme === 'dark' ? 'white' : 'black',
      whiteSpace: 'nowrap',
    }),
    menu: base => ({
      ...base,
      boxShadow: theme === 'dark' ? '-9px 11px 13px -9px rgba(0,0,0,0.5)' : '-9px 11px 13px -9px rgba(0,0,0,0.16)',
      padding : '0.25rem',
      borderRadius: 'none',
      width: 'auto',  // set width to auto to match width of longest option
      backgroundColor: theme === 'dark' ? 'black' : 'white',
      color: theme === 'dark' ? 'white' : 'black',
    }),
    singleValue: base => ({
      ...base,
      color: theme === 'dark' ? 'white' : 'black',
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
  };
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

  const handleCategoryChange = (e) => {
    setCategory(e);
    updateURL({
      ...Router.query,
      cat: e?.value,
    });
  };

  const handleRoundChange = (e) => {
    setRound(e);
    updateURL({
      ...Router.query,
      stage: e?.value,
    });
  };

  const handleAmountChange = (e) => {
    setAmount(e);
    updateURL({
      ...Router.query,
      amount: e?.value,
    });
  };

  const handleDateChange = (e) => {
    setDate(e);
    updateURL({
      ...Router.query,
      date: e?.value,
    });
  };
  
  return (
    <div className="flex  flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 md:mx-8 mt-2 md:mt-0">
    <Select
      styles={customStyles}
      options={categoryOptions}
      value={category}
      onChange={handleCategoryChange}
      isClearable
      placeholder="Category"
      className="w-full sm:w-auto"
    />
    <Select
      styles={customStyles}
      options={roundOptions}
      value={round}
      onChange={handleRoundChange}
      isClearable
      placeholder="Funding Round"
      className="w-full sm:w-auto"
    />
    <Select
      styles={customStyles}
      options={amountOptions}
      value={amount}
      onChange={handleAmountChange}
      isClearable
      placeholder="Amount"
      className="w-full sm:block hidden md:block sm:w-auto"
    />
    <Select
      styles={customStyles}
      options={years}
      value={date}
      onChange={handleDateChange}
      isClearable
      placeholder="Year"
      className="w-full sm:block hidden md:block sm:w-auto"
    />
  </div>
  );
}

export default Search;