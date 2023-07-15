import { useState, useEffect, useRef } from "react";
import { Project, columns } from "./columns"
import { DataTable } from "./data-table"
import { useRouter } from "next/router";
import { isEqual } from "lodash";

const ITEMS_PER_PAGE = 40; // Define how many items you want to fetch per API call

async function getData(query, pageIndex = 0): Promise<{ projects: Project[], total_pages: number }> {
  const start = pageIndex * ITEMS_PER_PAGE; // adjust start to fetch two "pages" at once
  
  // define a helper function to make a request with a given start index
  async function fetchPage(startIndex) {
    let apiUrl = `https://sapi.coincarp.com/api/v1/market/fundraising/list?lang=en-US&start=${startIndex}`;
    if (query.cat) apiUrl += `&cat=${query.cat}`;
    if (query.amount) apiUrl += `&amount=${query.amount}`;
    if (query.stage) apiUrl += `&stage=${query.stage}`;
    if (query.date) apiUrl += `&date=${query.date}`;

    const response = await fetch(apiUrl);
    return await response.json();
  }

  // fetch two "pages" of data
  const responses = await Promise.all([fetchPage(start), fetchPage(start + ITEMS_PER_PAGE/2)]);
  
  // combine the project data from both responses
  const allProjects = responses.flatMap(response => {
    if (response && response.data && response.data.list) {
      return response.data.list.map((project) => ({
        id: project.projectcode,
        amount: project.fundamount,
        project: project.projectname,
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

export default function DemoPage() {
  const router = useRouter();
  const [data, setData] = useState<Project[]>([]);
  const [pageIndex, setPageIndex] = useState(0); // Add state for page index
  const [pageCount, setPageCount] = useState(-1); // Add state for total pages
  const [loading, setLoading] = useState(false);

  const prevQuery = useRef(router.query);

  // Compare the current query with the previous one
  const isQueryChanged = !isEqual(prevQuery.current, router.query);

  useEffect(() => {
    setLoading(true);
    if (isQueryChanged) {
      setPageIndex(0);
      prevQuery.current = router.query;
    }
    getData(router.query, pageIndex).then(result => {
      setData(result.projects);
      setPageCount(result.total_pages);
      setLoading(false);
    });
  }, [router.query, pageIndex, isQueryChanged]);

  return (
    <div className="container mx-auto py-6">
      {loading ? (
  <div>Loading...</div>
) : (
      <DataTable columns={columns} data={data} pageIndex={pageIndex} setPageIndex={setPageIndex} pageCount={pageCount} />
 )} </div>
  )
}
