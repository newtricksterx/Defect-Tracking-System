import { IssuesTablePage } from "../../components/IssuesList/table-page";

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

export default function IssuesPage() {

  return (
    <IssuesTablePage />
  )
}
