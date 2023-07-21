import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as React from "react"
import Search from "@/components/Search";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  React.useEffect(() => {
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
   const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams]
  )
  const [sorting, setSorting] = React.useState<SortingState>([{
    id: column ?? "",
    desc: order === "desc",
  },
])
React.useEffect(() => {
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

React.useEffect(() => {
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


  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  
  const [columnVisibility, setColumnVisibility] =
  React.useState<VisibilityState>({})
  
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

  React.useEffect(() => {
    table.setPageSize(40);
  }, []);
  
  return (
    <div>
  <div className="flex flex-wrap items-center pb-3">
    <div className="w-full sm:w-auto mb-2 sm:mb-0">
      <Input
        placeholder="Search for a project"
        value={(table.getColumn("project")?.getFilterValue() as string) ?? ""}
        className={theme ==='light' ? "border-2 text-gray-500 border-gray-200 p-2":"border-2 border-gray-400 text-gray-400 p-2" }
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
          <Button variant="outline" className="ml-auto hidden xl:block text-gray-400 border-gray-200">
            Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mytheme border-gray-200">
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

  <div className="overflow-x-auto rounded-md border border-gray-200">
    <Table className="w-full">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="text-gray-500">
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className="text-start text-gray-500">
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
      <TableBody className="text-gray-500">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className="text-gray-500 hover:bg-gray-100 transition-colors duration-200"
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
