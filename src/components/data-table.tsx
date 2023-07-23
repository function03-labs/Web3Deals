import { useEffect, useCallback, useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Search from "@/components/Search";
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

export function DataTable<TData, TValue>({
  columns,
  data,
  pageIndex,
  setPageIndex,
  pageCount,
  theme
}: DataTableProps<TData, TValue>) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sort = searchParams?.get("sort")
  const [column, order] = sort?.split(".") ?? []
  const searchTerm = searchParams?.get("search")
  useEffect(() => {
    if (sort && (column !== sorting[0]?.id || order !== (sorting[0]?.desc ? "desc" : "asc"))) {
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
    
  const [sorting, setSorting] = useState<SortingState>([{id: column ?? "",desc: order === "desc"}])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  useEffect(() => {
    const sortParam = sorting[0]?.id
      ? `${sorting[0]?.id}.${sorting[0]?.desc ? "desc" : "asc"}`
      : null;
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

  // Update search parameter when search field value changes
  const updateSearchValue = (value: string) => {
    router.push(
      `${pathname}?${createQueryString({
        search: value,
      })}`
    );
    table.getColumn("project")?.setFilterValue(value)
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
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  useEffect(() => {
    table.setPageSize(40);
  }, []);
  
  return (
    <div>
  <div className="flex flex-wrap items-center pb-2">
    <div className="w-full sm:w-auto mb-2 sm:mb-0">
      <Input
        placeholder="Filter Projects..."
        value={(table.getColumn("project")?.getFilterValue() as string) ?? ""}
        className={theme ==='light' ? "border-[1.85px] text-gray-400 border-gray-200  p-2":"border-[1.75px] border-gray-600 text-gray-400 p-2" }
        onChange={(event) =>
          updateSearchValue(event.target.value)
        }
      />
    </div>
    <div className="flex-grow sm:flex-grow-0">
      <Search theme={theme}  />
    </div>
    <div className="ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto hidden xl:block text-gray-400 border-gray-200 whitespace-nowrap dark:border-gray-600">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 inline h-4 w-4"><path d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM3 5C3.01671 5 3.03323 4.99918 3.04952 4.99758C3.28022 6.1399 4.28967 7 5.5 7C6.71033 7 7.71978 6.1399 7.95048 4.99758C7.96677 4.99918 7.98329 5 8 5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H8C7.98329 4 7.96677 4.00082 7.95048 4.00242C7.71978 2.86009 6.71033 2 5.5 2C4.28967 2 3.28022 2.86009 3.04952 4.00242C3.03323 4.00082 3.01671 4 3 4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H3ZM11.9505 10.9976C11.7198 12.1399 10.7103 13 9.5 13C8.28967 13 7.28022 12.1399 7.04952 10.9976C7.03323 10.9992 7.01671 11 7 11H1.5C1.22386 11 1 10.7761 1 10.5C1 10.2239 1.22386 10 1.5 10H7C7.01671 10 7.03323 10.0008 7.04952 10.0024C7.28022 8.8601 8.28967 8 9.5 8C10.7103 8 11.7198 8.8601 11.9505 10.0024C11.9668 10.0008 11.9833 10 12 10H13.5C13.7761 10 14 10.2239 14 10.5C14 10.7761 13.7761 11 13.5 11H12C11.9833 11 11.9668 10.9992 11.9505 10.9976ZM8 10.5C8 9.67157 8.67157 9 9.5 9C10.3284 9 11 9.67157 11 10.5C11 11.3284 10.3284 12 9.5 12C8.67157 12 8 11.3284 8 10.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mytheme dark:border-gray-600 border-gray-200 ">
          {table
            .getAllColumns()
            .filter(
              (column) => column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize cursor-pointer"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>

  <div className="overflow-x-auto  rounded border border-gray-200 dark:border-gray-600">
    <Table className="w-full relative ">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="text-gray-500 dark:border-gray-600 ">
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className="text-star font-normal text-gray-500 dark:text-gray-400 dark:font-normal">
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
              className="text-gray-900 hover:bg-gray-100 dark:border-gray-600 transition-colors duration-200 dark:hover:bg-gray-800 dark:text-gray-100"
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
      <p>Page {pageIndex+1}</p>
    </div>
    <div className="flex w-full sm:w-fit items-center space-x-2 justify-center sm:justify-start">
      <Button
        className="w-full sm:w-20 flex-grow sm:flex-grow-0 bg-gray-200 text-black hover:bg-gray-300 transition-colors duration-200"
        variant="outline"
        size="sm"
        onClick={() => setPageIndex(pageIndex - 1)}
        disabled={pageIndex === 0}
      >
        Previous
      </Button>
      <Button
        className="w-full sm:w-20 flex-grow sm:flex-grow-0 bg-gray-200 text-black hover:bg-gray-300 transition-colors duration-200"
        variant="outline"
        size="sm"
        onClick={() => setPageIndex(pageIndex + 1)}
        disabled={pageIndex >= pageCount - 1}
      >
        Next
      </Button>
    </div>
  </div>
</div>
  )
}
