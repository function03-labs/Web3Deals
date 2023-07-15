import { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import Select from 'react-select';

function Search() {
  const Router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState(null);
  const [round, setRound] = useState(null);
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState(null);

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
    { value: 'pre-seed', label: 'Pre-seed' },
    { value: 'seed', label: 'Seed' },
    { value: 'series-a', label: 'Series A' },
    { value: 'series-b', label: 'Series B' },
    { value: 'series-c', label: 'Series C' },
    { value: 'ico', label: 'ICO' },
    { value: 'ipo', label: 'IPO' },
    { value: 'crowdfunding', label: 'Crowdfunding' },
    { value: 'community-raise', label: 'Community Raise' },
    { value: 'undisclosed', label: 'Undisclosed' },
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
      border: 'none',
      border : state.isFocused ? '1.5px solid black' : '1.5px solid lightgray',
      boxShadow: 'none',
      borderRadius: 0,
      minWidth: '100px',
      overflow:'hidden',
      whiteSpace: 'nowrap',
      '&:hover': {
        cursor: 'pointer'
      }
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      fontSize: '0.875rem',
      cursor: 'pointer',
      background: isSelected ? 'lightgray' : 'white',
      whiteSpace: 'nowrap',
    }),
    menu: base => ({
        ...base,
        boxShadow: '-9px 11px 13px -9px rgba(0,0,0,0.16)',
        padding : '0.25rem',
        borderRadius: 'none',
        width: 'auto',  // set width to auto to match width of longest option
      }),
    singleValue: base => ({
      ...base,
      color: 'black'
    }),
    indicatorSeparator: () => ({
        display: 'none'
    }),
  }
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
    <div className="flex flex-col items-center space-y-2 mx-12 ">
      {/**<form onSubmit={(e) => e.preventDefault()} className="text-m border-[1px] border-black mx-7 mr-3 flex w-64 item-center h-[34px] cursor-pointer  text-black">
        <input onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for a project" value={searchTerm} type="text" className="p-2 w-full flex-grow focus:outline-none "/>
        <button type="submit" className='bg-blue-400'>
          <SearchIcon className="hover:text-white h-full p-[7px] focus:outline-none active:text-black"/>
        </button>
      </form> */}
      <div className="space-x-3 hidden sm:flex flex-row">
        <Select
          styles={customStyles}
          options={categoryOptions}
          value={category}
          onChange={handleCategoryChange}
          isClearable
          placeholder="Category"
        />
        <Select
          styles={customStyles}
          options={roundOptions}
          value={round}
          onChange={handleRoundChange}
          isClearable
          placeholder="Funding Round"
        />
        <Select
          styles={customStyles}
          options={amountOptions}
          value={amount}
          onChange={handleAmountChange}
          isClearable
          placeholder="Amount"
        />
        <Select
          styles={customStyles}
          options={years}
          value={date}
          onChange={handleDateChange}
          isClearable
          placeholder="Year"
        />
      </div>
    </div>
  );
}

export default Search;