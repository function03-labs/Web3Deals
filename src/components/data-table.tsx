import { useEffect, useCallback, useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Search from "@/components/Search";
import debounce from "lodash/debounce";
import Modal from 'react-modal';
import {ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getPaginationRowModel, getFilteredRowModel, getSortedRowModel, useReactTable} from "@tanstack/react-table"
import {DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "./ui/table"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageIndex: number
  setPageIndex: (pageIndex: number) => void
  pageCount: number
  theme : string
}

interface ProjectDetails {
  logo_img_src: string;
  fundraising_name: string;
  funds_info: string;
  projects_info: string;
  website_links: string[]; 
  // Add other properties as needed
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageIndex,
  setPageIndex,
  pageCount,
  theme
}: DataTableProps<TData, TValue>) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sort = searchParams?.get("sort")
  const [column, order] = sort?.split(".") ?? []
  const searchTerm = searchParams?.get("search")
  useEffect(() => {
    if (sort && (column !== sorting[0]?.id || order !== (sorting[0]?.desc ? "asc" : "desc"))) {
      setSorting([
        {
          id: column ?? "",
          desc: order === "desc",
        },
      ]);
    }
  }, [column, order]);
  
  // Create query string
  const createQueryString = useCallback((params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }
      return newSearchParams.toString()},[searchParams]
  )
  const [sorting, setSorting] = useState<SortingState>([{id: column ?? "",desc: order === "asc"}])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})


  useEffect(() => {
    const sortParam = sorting[0]?.id
      ? `${sorting[0]?.id}.${sorting[0]?.desc ? "asc" : "desc"}`
      : 'date.desc';
    if (sort !== sortParam) {
      router.push(
        `${pathname}?${createQueryString({
          sort: sortParam,
        })}`
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);

  useEffect(() => {
    const currentSearchValue = table.getColumn("project")?.getFilterValue() as string;
    if (searchTerm !== currentSearchValue) {
      table.getColumn("project")?.setFilterValue(searchTerm ?? "")
    }
  }, [searchTerm])

  const debouncedUpdateUrl = useCallback(
    debounce((value) => {
      router.push(
        `${pathname}?${createQueryString({
          search: value,
        })}`
      );
    }, 1000), // wait 500ms after the last invocation before calling the function
    [pathname, createQueryString, router]
  );

  async function fetchProjectDetails(name) {
    try {
      // Send a GET request to the API endpoint
      const response = await fetch(`/api/info?name=${name}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Parse the JSON response
      const data = await response.json();
  
      // Store the data in state variable and open the modal
      setProjectDetails(data);
      setModalIsOpen(true);
    } catch (error) {
      console.error('Failed to fetch project details:', error);
    }
  }

  function closeModal() {
    setModalIsOpen(false);
  }
  
  const handleRowClick = (rowData) => {
    console.log("Row Clicked:", rowData);
    fetchProjectDetails(rowData.project + ' - '  + rowData.stage );
    // Do whatever you want with the clicked row data here...
  };

  // Update search parameter when search field value changes
  const updateSearchValue = (value: string) => {
    if (value.length > 2 || value=="") {
      debouncedUpdateUrl(value);}
      table.getColumn("project")?.setFilterValue(value);
  }
 
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    manualSorting: true,
    manualFiltering: true, 
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  useEffect(() => {
    table.setPageSize(15);
  }, []);
  
  return (
    <div className="relative">
  <div className="flex flex-wrap items-center pb-2">
    <div className="w-full sm:w-auto mb-1 sm:mb-0">
      <Input
        id='myInput'
        placeholder="Filter Projects..."
        value={(table.getColumn("project")?.getFilterValue() as string) ?? ""}
        className={theme ==='light' ? "border rounded text-gray-500 border-gray-400 p-2":"border rounded border-gray-400 text-gray-400 p-2" }
        onChange={(event) => { 
          updateSearchValue(event.target.value);}  
        }
      />
    </div>
    <div className="flex-grow sm:flex-grow-0">
      <Search theme={theme}  />
    </div>
    <div className="ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto hidden rounded xl:block text-gray-400 border-gray-400 whitespace-nowrap dark:border-gray-600">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 inline h-4 w-4"><path d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM3 5C3.01671 5 3.03323 4.99918 3.04952 4.99758C3.28022 6.1399 4.28967 7 5.5 7C6.71033 7 7.71978 6.1399 7.95048 4.99758C7.96677 4.99918 7.98329 5 8 5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H8C7.98329 4 7.96677 4.00082 7.95048 4.00242C7.71978 2.86009 6.71033 2 5.5 2C4.28967 2 3.28022 2.86009 3.04952 4.00242C3.03323 4.00082 3.01671 4 3 4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H3ZM11.9505 10.9976C11.7198 12.1399 10.7103 13 9.5 13C8.28967 13 7.28022 12.1399 7.04952 10.9976C7.03323 10.9992 7.01671 11 7 11H1.5C1.22386 11 1 10.7761 1 10.5C1 10.2239 1.22386 10 1.5 10H7C7.01671 10 7.03323 10.0008 7.04952 10.0024C7.28022 8.8601 8.28967 8 9.5 8C10.7103 8 11.7198 8.8601 11.9505 10.0024C11.9668 10.0008 11.9833 10 12 10H13.5C13.7761 10 14 10.2239 14 10.5C14 10.7761 13.7761 11 13.5 11H12C11.9833 11 11.9668 10.9992 11.9505 10.9976ZM8 10.5C8 9.67157 8.67157 9 9.5 9C10.3284 9 11 9.67157 11 10.5C11 11.3284 10.3284 12 9.5 12C8.67157 12 8 11.3284 8 10.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mytheme rounded dark:border-gray-600 border-black ">
          {table
            .getAllColumns()
            .filter(
              (column) => column.getCanHide()
            )
            .map((column) => {
              return (
                <div className="hover:bg-gray-100 dark:hover:bg-gray-800"><DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize cursor-pointer"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                  
                >
                  {column.id}
                </DropdownMenuCheckboxItem></div>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>

  <div className="overflow-x-auto  rounded border border-gray-400 dark:border-white">
    <Table className="w-full relative ">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="text-gray-500 dark:border-white ">
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className="text-star whitespace-nowrap font-normal text-gray-500 dark:text-gray-400 dark:font-normal">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody className="text-gray-500 ">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              onClick={() => handleRowClick(row.original)}
              className="text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors duration-200 dark:hover:bg-gray-800 dark:text-gray-100"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="text-start">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-start text-gray-500">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>

  <div className="flex flex-wrap items-center justify-between pt-3 text-gray-500">
    <div className="w-full sm:w-auto text-center sm:text-left mb-2 sm:mb-0">
      <p>Page {pageIndex+1} of {pageCount}</p>
    </div>
    <div className="flex w-full sm:w-fit items-center space-x-2 justify-center sm:justify-start">
        <Button
        className="w-full sm:w-fit flex-grow sm:flex-grow-0 bg-gray-200 text-black hover:bg-gray-300 transition-colors duration-200"
        variant="outline"
        size="sm"
        onClick={() => setPageIndex(0)}
        disabled={pageIndex === 0}
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" aria-hidden="true"><path d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
      </Button>
      <Button
        className="w-full sm:w-fit flex-grow sm:flex-grow-0 bg-gray-200 text-black hover:bg-gray-300 transition-colors duration-200"
        variant="outline"
        size="sm"
        onClick={() => setPageIndex(pageIndex - 1)}
        disabled={pageIndex === 0}
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" aria-hidden="true"><path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
      </Button>
      <Button
        className="w-full sm:w-fit flex-grow sm:flex-grow-0 bg-gray-200 text-black hover:bg-gray-300 transition-colors duration-200"
        variant="outline"
        size="sm"
        onClick={() => setPageIndex(pageIndex + 1)}
        disabled={pageIndex >= pageCount - 1}
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" aria-hidden="true"><path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
      </Button>
      <Button
      className="w-full sm:w-fit flex-grow sm:flex-grow-0 bg-gray-200 text-black hover:bg-gray-300 transition-colors duration-200"
      variant="outline"
      size="sm"
      onClick={() => setPageIndex(pageCount - 1)}
      disabled={pageIndex >= pageCount - 1}
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" aria-hidden="true"><path d="M2.14645 11.1464C1.95118 11.3417 1.95118 11.6583 2.14645 11.8536C2.34171 12.0488 2.65829 12.0488 2.85355 11.8536L6.85355 7.85355C7.04882 7.65829 7.04882 7.34171 6.85355 7.14645L2.85355 3.14645C2.65829 2.95118 2.34171 2.95118 2.14645 3.14645C1.95118 3.34171 1.95118 3.65829 2.14645 3.85355L5.79289 7.5L2.14645 11.1464ZM8.14645 11.1464C7.95118 11.3417 7.95118 11.6583 8.14645 11.8536C8.34171 12.0488 8.65829 12.0488 8.85355 11.8536L12.8536 7.85355C13.0488 7.65829 13.0488 7.34171 12.8536 7.14645L8.85355 3.14645C8.65829 2.95118 8.34171 2.95118 8.14645 3.14645C7.95118 3.34171 7.95118 3.65829 8.14645 3.85355L11.7929 7.5L8.14645 11.1464Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
      </Button>
    </div>
  </div>
  <Modal
  className="z-40 relative h-fit w-4/5 m-auto mt-24 sm:mt-36 2xl:mt-96 focus:outline-none "
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Project Details Modal"
>
  {projectDetails &&  (
    <div className="bg-white dark:bg-black border dark:border-gray-200 border-black text-black dark:text-white  p-5 rounded">
      <div className="flex items-center space-x-4 mb-2">
      <img width={32} height={32} className="rounded" src={projectDetails.logo_img_src} alt="Project Logo" />
      <h2 className="text-md font-semibold">{projectDetails.fundraising_name}</h2>
      </div>
      
      <h2 className="flex items-center gap-2 font-semibold text-sm mb-1">Fund's Details :</h2>
      <p className="mb-2 text-sm dark:text-gray-400 text-gray-700">{projectDetails.funds_info}</p>
      <h2 className="flex items-center gap-2 font-semibold text-sm mb-1"><svg width="18" height="18" viewBox="0 0 0.96 0.96" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0.48 0c0.265 0 0.48 0.215 0.48 0.48s-0.215 0.48 -0.48 0.48S0 0.745 0 0.48 0.215 0 0.48 0zm0 0.06C0.248 0.06 0.06 0.248 0.06 0.48s0.188 0.42 0.42 0.42 0.42 -0.188 0.42 -0.42S0.712 0.06 0.48 0.06zm0.039 0.555v0.078h-0.078v-0.078zM0.48 0.27a0.12 0.12 0 0 1 0.03 0.236V0.57h-0.06v-0.12h0.03a0.06 0.06 0 1 0 -0.06 -0.065L0.42 0.39h-0.06a0.12 0.12 0 0 1 0.12 -0.12z"/></svg>Project's Details :</h2>
      <p className="text-sm dark:text-gray-400 flex items-center justify-between  text-gray-700">{projectDetails.projects_info} <a href={projectDetails.website_links[0]} target="_blank" rel="noopener noreferrer" className="text-sm dark:text-gray-400 text-gray-700 border rounded-full p-1">
        <svg width="24" height="24" viewBox="0 0 0.48 0.48" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M.132.09h.093a.102.102 0 0 1 .102.102v.006A.102.102 0 0 1 .225.3H.21V.27h.015A.072.072 0 0 0 .296.198V.192A.072.072 0 0 0 .225.12H.132A.072.072 0 0 0 .06.192v.006a.072.072 0 0 0 .06.071v.03a.102.102 0 0 1-.09-.1V.192A.102.102 0 0 1 .132.09zM.36.211v-.03a.102.102 0 0 1 .09.101v.006A.102.102 0 0 1 .348.39H.255A.102.102 0 0 1 .154.288V.282A.102.102 0 0 1 .255.18H.27v.03H.255a.072.072 0 0 0-.071.072v.006A.072.072 0 0 0 .255.36h.093A.072.072 0 0 0 .42.288V.282A.072.072 0 0 0 .36.211z"/></svg>
        </a></p>
        
    </div>
  )}
  <Button className="w-full focus:outline-none sm:px-5 mt-2 rounded sm:w-fit flex-grow sm:flex-grow-0 hover:text-black bg-gray-200 text-black hover:bg-gray-300 transition-colors duration-200"
      variant="outline"
      size="sm" onClick={closeModal}>Close</Button>
</Modal>
</div>
  )
}
