import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';
import {ChevronRightIcon,ChevronLeftIcon} from '@heroicons/react/outline';

// Define an object with categories as keys and colors as values
const colors = {
    'DeFi': '#748DA6', // Light Green
    'Web3': '#D3CEDF', // Light Red
    'NFTs': '#F2D7D9', // Light Purple
    'Infrastructure': '#CDF0EA', // Yellow
    'CeFi': '#9CB4CC', // Light Blue
    'Others': '#EFF8EF', // Off-White
  };  

const Table = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPages,setnumberOfPages]=useState(0);
  const [numberOfProjects,setnumberOfProjects] = useState(0);
  const Router = useRouter();

  const handleNext = () => setPage(prevPage => prevPage < numberOfPages ? prevPage + 1: numberOfPages);
  const handlePrevious = () => setPage(prevPage => prevPage > 1 ? prevPage - 1 : 1);

  useEffect(() => {
    let apiUrl = `https://sapi.coincarp.com/api/v1/market/fundraising/list?lang=en-US&start=${(page-1)*20}`;
    const { cat, amount, stage, date } = Router.query;

    if (cat) apiUrl += `&cat=${cat}`;
    if (amount) apiUrl += `&amount=${amount}`;
    if (stage) apiUrl += `&stage=${stage}`;
    if (date) apiUrl += `&date=${date}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {setData(data.data.list);setnumberOfProjects(data.recordsfiltered); setnumberOfPages(Math.floor(data.recordsfiltered/20)+1);})
      .catch(err => console.error(err));
    }, [Router.query, page]);

  return (
    <div>
    <table className="min-w-full pt-3 divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Project
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Categories
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Funding Stage
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Fund Amount
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Investor Names
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <div className="flex items-center">
                <img className="w-10 h-10 rounded-full mr-4" src={`https://s1.coincarp.com/${item.logo}`} alt={item.projectname} />
                {item.projectname}
            </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {item.categorylist.map((cat, catIndex) => (
          <div 
            key={catIndex}
            style={{
              color:'black',
              backgroundColor: colors[cat.name], // Here we fetch the color from our object using the category name
              borderRadius: '5px',
              padding: '3px 6px',
              margin: '3px',
              display: 'inline-block'
            }}
                    >
                        {cat.name}
                    </div>
                ))}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.fundstagename}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.fundamount ? '$'+(item.fundamount / 1000000).toFixed(2).replace('.', ',') + 'M': '--'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.investornames}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="flex justify-between mt-4 items-center">
        <div className="text-sm text-gray-500">{numberOfProjects} entries</div>
        <div className="flex text-sm">
            <button onClick={handlePrevious} className="p-1 mr-2 border-2 border-gray-600 rounded w-fit hover:bg-blue-400"><ChevronLeftIcon className='h-6'/></button>
            <button onClick={()=>setPage(1)} className={`px-4 mr-2 border-2 hover:bg-blue-400 ${page === 1 ? 'border-blue-400' : 'border-gray-600'} rounded`}>1</button>

            {(page === 1) && (
                <>
                <button onClick={()=>setPage(2)} className="px-4  mr-2 border-2 hover:bg-blue-400 border-gray-600 rounded">2</button>
                <button onClick={()=>setPage(3)} className="px-4  mr-2 border-2 hover:bg-blue-400 border-gray-600 rounded">3</button>
                </>
            )}

            {page > 3 && <button className="px-4  mr-2 border-2 cursor-default border-gray-600 rounded disabled:bg-gray-300">...</button>}
            {page > 2 && page!=numberOfPages && <button onClick={()=>setPage(page-1)} className="px-4 mr-2 border-2 hover:bg-blue-400 border-gray-600 rounded">{page-1}</button>}

            {page !== 1 && page !== numberOfPages && <button onClick={()=>setPage(page)} className="px-4 mr-2 border-2 hover:bg-blue-400 border-blue-400 rounded">{page}</button>}

            {page < numberOfPages - 1 && page!=1 && <button onClick={()=>setPage(page+1)} className="px-4 mr-2 border-2 hover:bg-blue-400 border-gray-600 rounded">{page+1}</button>}
            {page < numberOfPages - 2 && <button className="px-4  mr-2 border-2 cursor-default border-gray-600 rounded disabled:bg-gray-300">...</button>}

            {(page === numberOfPages) && (
                <>
                <button onClick={()=>setPage(numberOfPages-2)} className="px-4  mr-2 border-2 hover:bg-blue-400 border-gray-600 rounded">{numberOfPages-2}</button>
                <button onClick={()=>setPage(numberOfPages-1)} className="px-4  mr-2 border-2 hover:bg-blue-400 border-gray-600 rounded">{numberOfPages-1}</button>
                </>
            )}

            <button onClick={()=>setPage(numberOfPages)} className={`px-4  mr-2 border-2 hover:bg-blue-400 ${page === numberOfPages ? 'border-blue-400' : 'border-gray-600'} rounded`}>{numberOfPages}</button>
            <button onClick={handleNext} className="p-1 border-2 border-gray-600 rounded w-fit hover:bg-blue-400"><ChevronRightIcon className='h-6'/></button>
        </div>
    </div>
    </div>
  );
}

export default Table;
