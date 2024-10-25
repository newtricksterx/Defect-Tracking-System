import IssueListComponent from "@/components/IssuesList";
import ProjectListComponent from "@/components/ProjectList";
import { IssuesTablePage } from "@/components/IssuesList/table-page";
import { ProjectsTablePage } from "@/components/ProjectList/table-page";

function DashboardPage(){

    return (
        <main className="h-full grid gap-2 grid-cols-2  p-2 text-sm">
            <div className="border-black border-2 rounded shadow-md">
                Graphs
            </div>
            <div className="border-black border-2 rounded shadow-md">
                Sprint Progress
            </div >
            <div className="border-black border-2 rounded shadow-md">
                <h2 className="bg-black text-white p-1 pl-2">
                    Projects
                </h2>
                <ProjectsTablePage />
            </div>
            <div className="border-black border-2 rounded shadow-md">
                <h2 className="bg-black text-white p-1 pl-2">
                    Assigned To Me
                </h2>
                <IssuesTablePage />
            </div>
        </main>
    );

}

export default DashboardPage;