import { useState, useEffect, useRef } from "react";
import { Project, columns } from "./columns"
import { DataTable } from "./data-table"
import { useRouter } from "next/router";
import { isEqual } from "lodash";

const ITEMS_PER_PAGE = 40; // Define how many items you want to fetch per API call

async function getData(query, pageIndex = 0): Promise<{ projects: Project[], total_pages: number }> {
  const start = pageIndex ; // adjust start to fetch two "pages" at once
  const sortParts = query.sort ? query.sort.split(".") : [];
  const sortField = sortParts[0] == 'amount' ? 'fundamount' : 'funddate';
  const sortOrder = sortParts[1];
  // define a helper function to make a request with a given start index
  async function fetchPage(startIndex) {
    let apiUrl = `/api/data?start=${startIndex+1}`;
    if (query.cat) apiUrl += `&category=${query.cat === 'misc.' ? 'others' : query.cat}`;
    if (query.amount) apiUrl += `&fundRange=${query.amount}`;
    if (query.stage) apiUrl += `&fundstagename=${query.stage}`;
    if (query.date) apiUrl += `&year=${query.date}`;

    if (query.search) apiUrl += `&projectname=${encodeURIComponent(query.search)}`;
     // append sort field and order to the API url
     if (sortField) apiUrl += `&sortField=${sortField}`;
     if (sortOrder) apiUrl += `&sortOrder=${sortOrder}`;

    const response = await fetch(apiUrl);
    return await response.json();
  }

  // fetch two "pages" of data
  const responses = await Promise.all([fetchPage(start)]);
  
  // combine the project data from both responses
  // combine the project data from both responses
const allProjects = responses.flatMap(response => {
  if (response && Array.isArray(response)) {
    return response.map((project) => ({
      id: project.projectcode,
      amount: project.fundamount,
      project: project.projectname,
      date: project.funddate,
      count: project.investorcount,
      logo: project.logo,
      stage: project.fundstagename,
      categories: project.categorylist.map(category => category.name).join(', '),
      investors: project.investorlist.map(investor => investor.investorname).join(', ')
    }));
  } else {
    return [];
  }
});


  // for total_pages, use the total count from the first response
  const total_pages = Math.ceil(responses[0].recordsfiltered / (ITEMS_PER_PAGE ));
  console.log(allProjects);
  return { projects: allProjects, total_pages };
}

export default function DemoPage({theme}) {
  const router = useRouter();
  const [data, setData] = useState<Project[]>([]);
  const [pageIndex, setPageIndex] = useState(0); // Add state for page index
  const [pageCount, setPageCount] = useState(-1); // Add state for total pages
  const [loading, setLoading] = useState(false);

  const prevQuery = useRef(router.query);

  // Compare the current query with the previous one
  const isQueryChanged = !isEqual(prevQuery.current, router.query);

  // Update page index on query change
useEffect(() => {
  if (isQueryChanged) {
    setPageIndex(0);
    prevQuery.current = router.query;
  }
}, [isQueryChanged]);

// Fetch data on page index or query change
useEffect(() => {
  setLoading(true);
  getData(router.query, pageIndex).then(result => {
    setData(result.projects);
    setPageCount(result.total_pages);
    setLoading(false);
  });
}, [router.query, pageIndex]);


  return (
    <div className="container mx-auto py-6">
      {loading ? (
  <div>Loading...</div>
) : (
      <DataTable columns={columns} data={data} pageIndex={pageIndex} setPageIndex={setPageIndex} pageCount={pageCount} theme={theme} />
 )} </div>
  )
}
