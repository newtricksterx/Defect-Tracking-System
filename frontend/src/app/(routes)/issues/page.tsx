//import { useFetchQuerySet } from "@/app/CustomHooks/useFetchQuerySet";
import { Issue, columns } from "./columns"
import { DataTable } from "./data-table"
import TablePage from "./table-page";
/*
async function getData(): Promise<Issue[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      title: "b",
      status: "COMPLETED",
      priority: "NORMAL",
    },
    {
      id: 2,
      title: "a",
      status: "COMPLETED",
      priority: "NORMAL",
    },
    // ...
  ]
}*/

export default function DemoPage() {
  //const data = await getData()
  //const data = useFetchQuerySet<Issue>('api/epic/');
  return (
    <TablePage />
  )
}
