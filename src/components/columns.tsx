import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
export type Project = {
  id: string
  amount: number
  project: string
  logo: string
  date : number
  count : number
  stage: string
  categories: string
  investors: string
}

function formatAmount(n) {
  if (n >= 1e9) {
    return (n / 1e9).toFixed(3) + 'B';
  } else {
    return (n / 1e6).toFixed(2) + 'M';
  }
}

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "project",
    header: "Project",
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <img width={24} height={24} src={`https://s1.coincarp.com/${row.original.logo}`} alt="" className="w-6 h-46 rounded mr-2" />
          <span className="text-left font-medium">{row.getValue("project")}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "categories",
    header: "Categories",
    cell: ({ row }) => {
      return (row.getValue("categories") as string).split(',').map(category => category === 'Others' ? 'Misc.' : category).join(', ');
    },
  },
  {
    accessorKey: "stage",
    header: "Funding Round",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Fund Amount
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" aria-hidden="true"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" ></path></svg>
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className=" text-start font-medium">{row.getValue("amount") ? '$'+formatAmount(parseInt(row.getValue("amount"))): '--'}</div>
    },
  },
  {
    accessorKey: "investors",
    header: "Investors",
    cell: ({ row }) => { 
      return (
        <div>
          {row.getValue("investors") ? row.getValue("investors") + ((row.original.count - (row.getValue("investors") as string).split(',').length > 0) ? ' +' + (row.original.count - (row.getValue("investors")as string).split(',').length) : '') : '--'}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Fund Date
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" aria-hidden="true"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor"></path></svg>
      </Button>
    ),
    cell: ({ row }) => {
      const timestamp : number = row.getValue("date");
      const date = new Date(timestamp * 1000);
      return <div>
        {
          date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",})
        }
      </div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mytheme">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigator.clipboard.writeText(payment.project)}>
              Copy projects name
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">View projects details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]