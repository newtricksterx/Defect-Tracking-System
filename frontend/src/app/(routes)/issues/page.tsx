import { Issue, columns } from "./columns"
import { DataTable } from "./data-table"

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
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto p-10 h-full">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
