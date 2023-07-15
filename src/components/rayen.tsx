import { useState, useEffect, useRef } from "react";
import { Project, columns } from "./columns"
import { DataTable } from "./data-table"
import { useRouter } from "next/router";
import { isEqual } from "lodash";

const ITEMS_PER_PAGE = 20; // Define how many items per page you want

async function getData(query, pageIndex = 0): Promise<{ projects: Project[], total_pages: number }> {
  const { cat, amount, stage, date } = query;
  const start = pageIndex * ITEMS_PER_PAGE;
  
  let apiUrl = `https://sapi.coincarp.com/api/v1/market/fundraising/list?lang=en-US&start=${start}`;
  
  if (cat) {
    apiUrl += `&cat=${cat}`;
  }
  if (amount) {
    apiUrl += `&amount=${amount}`;
      }
  if (stage) {
    apiUrl += `&stage=${stage}`;

  }
  if (date) {
    apiUrl += `&date=${date}`;

  }

  const response = await fetch(apiUrl);
  const data = await response.json();

  let projects: Project[] = [];
  // Process data
  if (data && data.data && data.data.list) {
    projects = data.data.list.map((project) => {
      return {
        id: project.projectcode,
        amount: project.fundamount,
        project: project.projectname,
        logo: project.logo,
        stage: project.fundstagename,
        categories: project.categorylist.map(category => category.name).join(', '),
        investors: project.investorlist.map(investor => investor.investorname).join(', ')
      };
    });
  }
  console.log(projects)
  // Assume API gives you total count, calculate total pages
  const total_pages = Math.ceil(data.recordsfiltered / ITEMS_PER_PAGE);

  return { projects, total_pages };
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
    <div className="container mx-auto py-10">
      {loading ? (
  <div>Loading...</div>
) : (
      <DataTable columns={columns} data={data} pageIndex={pageIndex} setPageIndex={setPageIndex} pageCount={pageCount} />
 )} </div>
  )
}
