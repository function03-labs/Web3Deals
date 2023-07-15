import { useState, useEffect } from "react";
import { Project, columns } from "./columns"
import { DataTable } from "./data-table"
import { useRouter } from "next/router";

async function getData(query): Promise<Project[]> {
  let apiUrl = `https://sapi.coincarp.com/api/v1/market/fundraising/list?lang=en-US`;
  let apiUrl2 = `https://sapi.coincarp.com/api/v1/market/fundraising/list?lang=en-US&start=20`;
  const { cat, amount, stage, date } = query;

  if (cat) {
    apiUrl += `&cat=${cat}`;
    apiUrl2 += `&cat=${cat}`;
  }
  if (amount) {
    apiUrl += `&amount=${amount}`;
    apiUrl2 += `&amount=${amount}`;
  }
  if (stage) {
    apiUrl += `&stage=${stage}`;
    apiUrl2 += `&stage=${stage}`;
  }
  if (date) {
    apiUrl += `&date=${date}`;
    apiUrl2 += `&date=${date}`;
  }

  const response1 = fetch(apiUrl).then(response => response.json());
  const response2 = fetch(apiUrl2).then(response => response.json());

  return Promise.all([response1, response2])
    .then(([data1, data2]) => {
      const projects: Project[] = [];

      // Process data from the first URL
      if (data1 && data1.data && data1.data.list) {
        const projects1 = data1.data.list.map((project) => {
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
        projects.push(...projects1);
      }

      // Process data from the second URL
      if (data2 && data2.data && data2.data.list) {
        const projects2 = data2.data.list.map((project) => {
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
        projects.push(...projects2);
      }

      return projects;
    })
    .catch(err => {
      console.error(err);
      return []; // return empty array on error
    });
}

export default function DemoPage() {
  const router = useRouter();
  const [data, setData] = useState<Project[]>([]);

  useEffect(() => {
    getData(router.query).then(projects => setData(projects));
  }, [router.query]);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
