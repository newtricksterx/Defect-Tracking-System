import { Issue, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Issue[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      title: "testissue",
      status: "COMPLETED",
      priority: "NORMAL",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
